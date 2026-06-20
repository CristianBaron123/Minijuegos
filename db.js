// ============================================
// MÓDULO DE BASE DE DATOS - MongoDB
// ============================================
const { MongoClient } = require('mongodb');
const crypto = require('crypto');

// NO caer silenciosamente a localhost: eso causaba el split-brain entre Atlas y
// una base local de la VPS (la sala "se reiniciaba" o cambiaba de base según
// desde dónde se lanzó el proceso). Si MONGO_URI no está, dejamos null y NO
// conectamos a ninguna base, salvo que se habilite local a propósito con
// ALLOW_LOCAL_DB=true.
const MONGO_URI = process.env.MONGO_URI
    || (process.env.ALLOW_LOCAL_DB === 'true' ? 'mongodb://localhost:27017' : null);
const DB_NAME = 'haxball_minijuegos';

let db = null;
let client = null;

// ============================================
// SISTEMA DE CUENTAS (registro/login)
// ============================================
// Las stats viven en la colección 'players' por AUTH de HaxBall. Una cuenta
// puede vincular varios auths (distintos navegadores/PCs). Para que las stats
// "sigan" a la cuenta, mantenemos en memoria un mapa auth -> authCanonico
// (el auth con el que se registró la cuenta). Las funciones de stats traducen
// el auth recibido a su canónico ANTES de leer/escribir.
// IMPORTANTE: esto NO afecta seguridad (bans/mods/anti-multijoin siguen usando
// el auth real en room-main.txt). Solo unifica el almacenamiento de stats.
let authToCanonical = new Map();

function canon(auth) {
    if (!auth) return auth;
    return authToCanonical.get(auth) || auth;
}

async function loadAccountLinks() {
    authToCanonical = new Map();
    if (!db) return;
    try {
        var accounts = await db.collection('accounts').find({}).project({ mainAuth: 1, linkedAuths: 1 }).toArray();
        for (var i = 0; i < accounts.length; i++) {
            var a = accounts[i];
            if (!a.mainAuth) continue;
            authToCanonical.set(a.mainAuth, a.mainAuth);
            if (Array.isArray(a.linkedAuths)) {
                for (var j = 0; j < a.linkedAuths.length; j++) {
                    authToCanonical.set(a.linkedAuths[j], a.mainAuth);
                }
            }
        }
        console.log('🔐 Cuentas cargadas: ' + accounts.length + ' (' + authToCanonical.size + ' auths vinculados)');
    } catch(e) {
        console.error('❌ loadAccountLinks error:', e.message);
    }
}

function hashPassword(password, salt) {
    salt = salt || crypto.randomBytes(16).toString('hex');
    var hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
    return { salt: salt, hash: hash };
}

function verifyPassword(password, salt, hash) {
    try {
        var calc = crypto.scryptSync(String(password), salt, 64).toString('hex');
        // Comparación en tiempo constante
        var a = Buffer.from(calc, 'hex');
        var b = Buffer.from(hash, 'hex');
        return a.length === b.length && crypto.timingSafeEqual(a, b);
    } catch(e) { return false; }
}

// Registrar una cuenta nueva ligada al auth actual
async function registerAccount(username, password, auth) {
    await ensureConnected();
    if (!db) return { error: 'Base de datos no disponible' };
    if (!auth) return { error: 'No se pudo verificar tu identidad' };
    try {
        username = String(username || '').trim();
        if (username.length < 3 || username.length > 16 || !/^[a-zA-Z0-9_]+$/.test(username)) {
            return { error: 'Usuario: 3-16 caracteres, solo letras/números/_' };
        }
        if (!password || String(password).length < 4) {
            return { error: 'La contraseña debe tener al menos 4 caracteres' };
        }
        var unameLower = username.toLowerCase();
        // ¿Usuario ya tomado?
        var exists = await db.collection('accounts').findOne({ username: unameLower });
        if (exists) return { error: 'Ese usuario ya existe' };
        // ¿Este auth ya está en una cuenta?
        var already = await db.collection('accounts').findOne({ $or: [ { mainAuth: auth }, { linkedAuths: auth } ] });
        if (already) return { error: 'Tu cuenta de HaxBall ya está registrada como "' + already.displayName + '". Usá !login' };
        var pw = hashPassword(password);
        await db.collection('accounts').insertOne({
            username: unameLower,
            displayName: username,
            salt: pw.salt,
            hash: pw.hash,
            mainAuth: auth,
            linkedAuths: [],
            createdAt: new Date(),
            lastLogin: new Date()
        });
        authToCanonical.set(auth, auth);
        return { success: true, username: username };
    } catch(e) {
        console.error('❌ registerAccount error:', e.message);
        return { error: 'Error interno al registrar' };
    }
}

// Iniciar sesión: vincula el auth actual a la cuenta para que las stats lo sigan
async function loginAccount(username, password, auth) {
    await ensureConnected();
    if (!db) return { error: 'Base de datos no disponible' };
    if (!auth) return { error: 'No se pudo verificar tu identidad' };
    try {
        var unameLower = String(username || '').trim().toLowerCase();
        var acc = await db.collection('accounts').findOne({ username: unameLower });
        if (!acc) return { error: 'Usuario no encontrado' };
        if (!verifyPassword(password, acc.salt, acc.hash)) return { error: 'Contraseña incorrecta' };
        // Si este auth ya está en OTRA cuenta, no permitir
        var other = await db.collection('accounts').findOne({ $or: [ { mainAuth: auth }, { linkedAuths: auth } ] });
        if (other && other.username !== unameLower) {
            return { error: 'Tu cuenta de HaxBall ya está vinculada a "' + other.displayName + '"' };
        }
        // Vincular el auth si no es el principal ni está ya en linkedAuths
        if (acc.mainAuth !== auth && (!acc.linkedAuths || acc.linkedAuths.indexOf(auth) === -1)) {
            await db.collection('accounts').updateOne(
                { username: unameLower },
                { $addToSet: { linkedAuths: auth }, $set: { lastLogin: new Date() } }
            );
        } else {
            await db.collection('accounts').updateOne({ username: unameLower }, { $set: { lastLogin: new Date() } });
        }
        authToCanonical.set(auth, acc.mainAuth);
        return { success: true, username: acc.displayName };
    } catch(e) {
        console.error('❌ loginAccount error:', e.message);
        return { error: 'Error interno al iniciar sesión' };
    }
}

// Obtener la cuenta vinculada a un auth (o null)
async function getAccountByAuth(auth) {
    await ensureConnected();
    if (!db || !auth) return null;
    try {
        var acc = await db.collection('accounts').findOne(
            { $or: [ { mainAuth: auth }, { linkedAuths: auth } ] },
            { projection: { username: 1, displayName: 1, mainAuth: 1, linkedAuths: 1, createdAt: 1 } }
        );
        if (acc && acc._id) acc._id = acc._id.toString();
        return acc;
    } catch(e) {
        console.error('❌ getAccountByAuth error:', e.message);
        return null;
    }
}

// Cerrar sesión: desvincula el auth actual de su cuenta (las stats vuelven a ese auth).
// No se permite desde el auth PRINCIPAL (es el ancla de la cuenta).
async function logoutAuth(auth) {
    await ensureConnected();
    if (!db) return { error: 'Base de datos no disponible' };
    if (!auth) return { error: 'No se pudo verificar tu identidad' };
    try {
        var acc = await db.collection('accounts').findOne({ $or: [ { mainAuth: auth }, { linkedAuths: auth } ] });
        if (!acc) return { error: 'No tenés ninguna sesión iniciada en este dispositivo' };
        if (acc.mainAuth === auth) {
            return { error: 'Este es el dispositivo principal de "' + acc.displayName + '". No se cierra sesión acá.' };
        }
        await db.collection('accounts').updateOne({ username: acc.username }, { $pull: { linkedAuths: auth } });
        authToCanonical.delete(auth);
        return { success: true, username: acc.displayName };
    } catch(e) {
        console.error('❌ logoutAuth error:', e.message);
        return { error: 'Error interno' };
    }
}

// Eliminar la cuenta por completo. Solo el dueño (auth principal) puede hacerlo.
// Las stats (colección players) NO se borran; solo se elimina el login/vinculación.
async function deleteAccount(auth) {
    await ensureConnected();
    if (!db) return { error: 'Base de datos no disponible' };
    if (!auth) return { error: 'No se pudo verificar tu identidad' };
    try {
        var acc = await db.collection('accounts').findOne({ mainAuth: auth });
        if (!acc) {
            var linked = await db.collection('accounts').findOne({ linkedAuths: auth });
            if (linked) return { error: 'Solo el dueño puede eliminar la cuenta (entrá desde el dispositivo donde la registraste)' };
            return { error: 'No tenés una cuenta registrada' };
        }
        await db.collection('accounts').deleteOne({ _id: acc._id });
        // Quitar todos los auths de esa cuenta del mapa en memoria
        authToCanonical.delete(acc.mainAuth);
        if (Array.isArray(acc.linkedAuths)) {
            for (var i = 0; i < acc.linkedAuths.length; i++) authToCanonical.delete(acc.linkedAuths[i]);
        }
        return { success: true, username: acc.displayName };
    } catch(e) {
        console.error('❌ deleteAccount error:', e.message);
        return { error: 'Error interno' };
    }
}

async function connect() {
    if (!MONGO_URI) {
        console.error('🚨🚨🚨 MONGO_URI NO está definido — el .env no se cargó.');
        console.error('🚨 NO me conecto a ninguna base para evitar escribir en una DB equivocada (split-brain con la local).');
        console.error('🚨 Verificá que el archivo .env esté en la carpeta del bot y tenga MONGO_URI.');
        console.error('🚨 Si de verdad querés usar la base local de la VPS, arrancá con ALLOW_LOCAL_DB=true');
        db = null;
        return null;
    }
    try {
        if (client) { try { await client.close(); } catch(e) {} }
        client = new MongoClient(MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 0,
            heartbeatFrequencyMS: 10000,
            retryWrites: true
        });
        await client.connect();
        db = client.db(DB_NAME);
        // Mostrar host (sin credenciales) para distinguir Atlas de la base local
        var _host = 'desconocido';
        try { _host = MONGO_URI.replace(/^[^@]*@/, '').split(/[\/?]/)[0]; } catch(e) {}
        var _esLocal = /localhost|127\.0\.0\.1/.test(MONGO_URI);
        console.log('✅ MongoDB conectado a ' + DB_NAME + ' @ ' + _host + (_esLocal ? '  ⚠️ ¡BASE LOCAL!' : '  (Atlas)'));
        await loadAccountLinks();
        return db;
    } catch(e) {
        console.error('❌ Error conectando a MongoDB:', e.message);
        console.error('⚠️ El bot funcionará sin estadísticas persistentes');
        db = null;
        return null;
    }
}

async function ensureConnected() {
    if (!db || !client) { await connect(); return; }
    try {
        await db.command({ ping: 1 });
    } catch(e) {
        console.error('⚠️ MongoDB desconectado, reconectando...');
        await connect();
    }
}

async function saveWin(auth, name, minigame) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        var update = {
            $set: { name: name, lastSeen: new Date() },
            $inc: { wins: 1 }
        };
        if (minigame) {
            update.$inc['minigameWins.' + minigame] = 1;
        }
        await db.collection('players').updateOne(
            { auth: auth },
            update,
            { upsert: true }
        );
    } catch(e) {
        console.error('❌ DB saveWin error:', e.message);
    }
}

async function saveGamePlayed(auth, name) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        await db.collection('players').updateOne(
            { auth: auth },
            {
                $set: { name: name, lastSeen: new Date() },
                $inc: { gamesPlayed: 1 }
            },
            { upsert: true }
        );
    } catch(e) {
        console.error('❌ DB saveGamePlayed error:', e.message);
    }
}

async function addKickCount(auth, name) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        await db.collection('players').updateOne(
            { auth: auth },
            {
                $set: { name: name, lastSeen: new Date() },
                $inc: { kickCount: 1 }
            },
            { upsert: true }
        );
    } catch(e) {
        console.error('❌ DB addKickCount error:', e.message);
    }
}

async function addBanCount(auth, name) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        await db.collection('players').updateOne(
            { auth: auth },
            {
                $set: { name: name, lastSeen: new Date() },
                $inc: { banCount: 1 }
            },
            { upsert: true }
        );
    } catch(e) {
        console.error('❌ DB addBanCount error:', e.message);
    }
}

async function addGayCount(auth, name) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        await db.collection('players').updateOne(
            { auth: auth },
            {
                $set: { name: name, lastSeen: new Date() },
                $inc: { gayCount: 1 }
            },
            { upsert: true }
        );
    } catch(e) {
        console.error('❌ DB addGayCount error:', e.message);
    }
}

async function saveBestStreak(auth, streak) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        await db.collection('players').updateOne(
            { auth: auth },
            {
                $max: { bestStreak: streak },
                $set: { lastSeen: new Date() }
            },
            { upsert: true }
        );
    } catch(e) {
        console.error('❌ DB saveBestStreak error:', e.message);
    }
}

async function getStats(auth) {
    await ensureConnected();
    if (!db || !auth) return null;
    auth = canon(auth);
    try {
        var doc = await db.collection('players').findOne({ auth: auth });
        if (doc && doc._id) {
            doc._id = doc._id.toString();
        }
        return doc;
    } catch(e) {
        console.error('❌ DB getStats error:', e.message);
        return null;
    }
}

async function getTopPlayers(field, limit) {
    if (!db) return [];
    try {
        var filter = {};
        filter[field] = { $gt: 0 };
        var docs = await db.collection('players')
            .find(filter)
            .sort({ [field]: -1 })
            .limit(limit || 5)
            .toArray();
        docs.forEach(function(doc) {
            if (doc._id) doc._id = doc._id.toString();
        });
        return docs;
    } catch(e) {
        console.error('❌ DB getTopPlayers error:', e.message);
        return [];
    }
}

async function getPlayerRank(auth, field) {
    if (!db || !auth) return null;
    try {
        var player = await db.collection('players').findOne({ auth: auth });
        if (!player || !player[field]) return null;
        var rank = await db.collection('players').countDocuments({
            [field]: { $gt: player[field] }
        });
        return rank + 1;
    } catch(e) {
        console.error('❌ DB getPlayerRank error:', e.message);
        return null;
    }
}

async function addBalance(auth, name, amount) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        await db.collection('players').updateOne(
            { auth: auth },
            {
                $set: { name: name, lastSeen: new Date() },
                $inc: { balance: amount }
            },
            { upsert: true }
        );
    } catch(e) {
        console.error('❌ DB addBalance error:', e.message);
    }
}

// ============================================
// MATRIMONIOS
// ============================================
async function saveMarriage(auth1, auth2) {
    if (!db || !auth1 || !auth2) return;
    try {
        await db.collection('players').updateOne(
            { auth: auth1 },
            { $set: { marriedTo: auth2 } },
            { upsert: true }
        );
        await db.collection('players').updateOne(
            { auth: auth2 },
            { $set: { marriedTo: auth1 } },
            { upsert: true }
        );
    } catch(e) {
        console.error('❌ DB saveMarriage error:', e.message);
    }
}

async function removeMarriage(auth1, auth2) {
    if (!db) return;
    try {
        if (auth1) {
            await db.collection('players').updateOne(
                { auth: auth1 },
                { $unset: { marriedTo: '' } }
            );
        }
        if (auth2) {
            await db.collection('players').updateOne(
                { auth: auth2 },
                { $unset: { marriedTo: '' } }
            );
        }
    } catch(e) {
        console.error('❌ DB removeMarriage error:', e.message);
    }
}

async function loadMarriages() {
    if (!db) return {};
    try {
        var docs = await db.collection('players')
            .find({ marriedTo: { $exists: true, $ne: null } })
            .project({ auth: 1, marriedTo: 1 })
            .toArray();
        var marriages = {};
        for (var i = 0; i < docs.length; i++) {
            marriages[docs[i].auth] = docs[i].marriedTo;
        }
        return marriages;
    } catch(e) {
        console.error('❌ DB loadMarriages error:', e.message);
        return {};
    }
}

async function resetMonthlyWins() {
    if (!db) return;
    try {
        await db.collection('players').updateMany(
            {},
            { $set: { wins: 0, gamesPlayed: 0, bestStreak: 0, gayCount: 0, kickCount: 0, banCount: 0, minigameWins: {} } }
        );
        console.log('✅ Stats mensuales reseteadas (wins, gamesPlayed, bestStreak)');
    } catch(e) {
        console.error('❌ DB resetMonthlyWins error:', e.message);
    }
}

async function getMonthlyReport(creatorAuths) {
    if (!db) return null;
    try {
        var richFilter = (creatorAuths && creatorAuths.length > 0)
            ? { balance: { $gt: 0 }, auth: { $nin: creatorAuths } }
            : { balance: { $gt: 0 } };

        var topWins = await db.collection('players').find({ wins: { $gt: 0 } }).sort({ wins: -1 }).limit(5).toArray();
        var topRich = await db.collection('players').find(richFilter).sort({ balance: -1 }).limit(5).toArray();
        var topStreak = await db.collection('players').find({ bestStreak: { $gt: 0 } }).sort({ bestStreak: -1 }).limit(5).toArray();
        var topGeis = await db.collection('players').find({ gayCount: { $gt: 0 } }).sort({ gayCount: -1 }).limit(5).toArray();
        var topKick = await db.collection('players').find({ kickCount: { $gt: 0 } }).sort({ kickCount: -1 }).limit(5).toArray();
        var topBan = await db.collection('players').find({ banCount: { $gt: 0 } }).sort({ banCount: -1 }).limit(5).toArray();

        return { topWins, topRich, topStreak, topGeis, topKick, topBan };
    } catch(e) {
        console.error('❌ DB getMonthlyReport error:', e.message);
        return null;
    }
}

// ============================================
// CLANES
// ============================================
async function createClan(tag, name, leaderAuth, leaderName) {
    if (!db) return { error: 'DB no disponible' };
    try {
        // Validar tag: 2-5 caracteres, alfanumérico
        if (!tag || tag.length < 2 || tag.length > 5 || !/^[a-zA-Z0-9]+$/.test(tag)) {
            return { error: 'El tag debe tener 2-5 caracteres alfanumericos' };
        }
        // Validar nombre: 3-20 caracteres
        if (!name || name.length < 3 || name.length > 20) {
            return { error: 'El nombre debe tener 3-20 caracteres' };
        }
        tag = tag.toUpperCase();
        // Verificar que el jugador no esté ya en un clan
        var existing = await db.collection('clans').findOne({
            $or: [
                { 'members.auth': leaderAuth },
                { leaderAuth: leaderAuth }
            ]
        });
        if (existing) return { error: 'Ya perteneces a un clan (' + existing.tag + ')' };
        // Verificar tag único
        var tagExists = await db.collection('clans').findOne({ tag: tag });
        if (tagExists) return { error: 'El tag [' + tag + '] ya esta en uso' };
        // Crear clan
        await db.collection('clans').insertOne({
            tag: tag,
            name: name,
            leaderAuth: leaderAuth,
            leaderName: leaderName,
            members: [{ auth: leaderAuth, name: leaderName, joinedAt: new Date() }],
            invites: [],
            createdAt: new Date(),
            totalWins: 0
        });
        // Guardar tag en el jugador
        await db.collection('players').updateOne(
            { auth: leaderAuth },
            { $set: { clanTag: tag } },
            { upsert: true }
        );
        return { success: true, tag: tag, name: name };
    } catch(e) {
        console.error('❌ DB createClan error:', e.message);
        return { error: 'Error interno' };
    }
}

async function inviteToClan(leaderAuth, targetAuth, targetName) {
    if (!db) return { error: 'DB no disponible' };
    try {
        var clan = await db.collection('clans').findOne({ leaderAuth: leaderAuth });
        if (!clan) return { error: 'No eres lider de ningun clan' };
        if (clan.members.length >= 10) return { error: 'El clan esta lleno (max 10)' };
        // Verificar que el target no esté en otro clan
        var targetClan = await db.collection('clans').findOne({ 'members.auth': targetAuth });
        if (targetClan) return { error: targetName + ' ya pertenece a un clan' };
        // Verificar que no esté ya invitado
        if (clan.invites && clan.invites.indexOf(targetAuth) !== -1) {
            return { error: targetName + ' ya tiene una invitacion pendiente' };
        }
        await db.collection('clans').updateOne(
            { tag: clan.tag },
            { $addToSet: { invites: targetAuth } }
        );
        return { success: true, clanTag: clan.tag, clanName: clan.name };
    } catch(e) {
        console.error('❌ DB inviteToClan error:', e.message);
        return { error: 'Error interno' };
    }
}

async function acceptClanInvite(playerAuth, playerName) {
    if (!db) return { error: 'DB no disponible' };
    try {
        // Buscar clan que tenga invitación para este jugador
        var clan = await db.collection('clans').findOne({ invites: playerAuth });
        if (!clan) return { error: 'No tienes invitaciones pendientes' };
        if (clan.members.length >= 10) return { error: 'El clan esta lleno (max 10)' };
        // Verificar que no esté en otro clan
        var existingClan = await db.collection('clans').findOne({ 'members.auth': playerAuth });
        if (existingClan) return { error: 'Ya perteneces a un clan' };
        // Aceptar
        await db.collection('clans').updateOne(
            { tag: clan.tag },
            {
                $push: { members: { auth: playerAuth, name: playerName, joinedAt: new Date() } },
                $pull: { invites: playerAuth }
            }
        );
        await db.collection('players').updateOne(
            { auth: playerAuth },
            { $set: { clanTag: clan.tag } },
            { upsert: true }
        );
        return { success: true, tag: clan.tag, name: clan.name };
    } catch(e) {
        console.error('❌ DB acceptClanInvite error:', e.message);
        return { error: 'Error interno' };
    }
}

async function leaveClan(playerAuth) {
    if (!db) return { error: 'DB no disponible' };
    try {
        var clan = await db.collection('clans').findOne({ 'members.auth': playerAuth });
        if (!clan) return { error: 'No perteneces a ningun clan' };
        // Si es el líder y hay más miembros, transferir liderazgo
        if (clan.leaderAuth === playerAuth) {
            if (clan.members.length > 1) {
                var newLeader = clan.members.find(function(m) { return m.auth !== playerAuth; });
                await db.collection('clans').updateOne(
                    { tag: clan.tag },
                    {
                        $pull: { members: { auth: playerAuth } },
                        $set: { leaderAuth: newLeader.auth, leaderName: newLeader.name }
                    }
                );
            } else {
                // Último miembro, eliminar clan
                await db.collection('clans').deleteOne({ tag: clan.tag });
            }
        } else {
            await db.collection('clans').updateOne(
                { tag: clan.tag },
                { $pull: { members: { auth: playerAuth } } }
            );
        }
        await db.collection('players').updateOne(
            { auth: playerAuth },
            { $unset: { clanTag: '' } }
        );
        return { success: true, tag: clan.tag };
    } catch(e) {
        console.error('❌ DB leaveClan error:', e.message);
        return { error: 'Error interno' };
    }
}

async function getClanInfo(tag) {
    if (!db) return null;
    try {
        return await db.collection('clans').findOne({ tag: tag.toUpperCase() });
    } catch(e) {
        console.error('❌ DB getClanInfo error:', e.message);
        return null;
    }
}

async function getClanByAuth(auth) {
    if (!db) return null;
    try {
        return await db.collection('clans').findOne({ 'members.auth': auth });
    } catch(e) {
        console.error('❌ DB getClanByAuth error:', e.message);
        return null;
    }
}

async function addClanWin(auth) {
    if (!db || !auth) return;
    try {
        await db.collection('clans').updateOne(
            { 'members.auth': auth },
            { $inc: { totalWins: 1 } }
        );
    } catch(e) {
        console.error('❌ DB addClanWin error:', e.message);
    }
}

async function getTopClans(limit) {
    if (!db) return [];
    try {
        return await db.collection('clans')
            .find({})
            .sort({ totalWins: -1 })
            .limit(limit || 5)
            .toArray();
    } catch(e) {
        console.error('❌ DB getTopClans error:', e.message);
        return [];
    }
}

async function resetClanWins() {
    if (!db) return;
    try {
        await db.collection('clans').updateMany(
            {},
            { $set: { totalWins: 0 } }
        );
        console.log('✅ Wins de clanes reseteadas');
    } catch(e) {
        console.error('❌ DB resetClanWins error:', e.message);
    }
}

async function kickFromClan(leaderAuth, targetAuth) {
    if (!db) return { error: 'DB no disponible' };
    try {
        var clan = await db.collection('clans').findOne({ leaderAuth: leaderAuth });
        if (!clan) return { error: 'No eres lider de ningun clan' };
        if (targetAuth === leaderAuth) return { error: 'No puedes expulsarte a ti mismo' };
        var member = clan.members.find(function(m) { return m.auth === targetAuth; });
        if (!member) return { error: 'Ese jugador no esta en tu clan' };
        await db.collection('clans').updateOne(
            { tag: clan.tag },
            { $pull: { members: { auth: targetAuth } } }
        );
        await db.collection('players').updateOne(
            { auth: targetAuth },
            { $unset: { clanTag: '' } }
        );
        return { success: true, name: member.name };
    } catch(e) {
        console.error('❌ DB kickFromClan error:', e.message);
        return { error: 'Error interno' };
    }
}

// ============ TITAN ============

async function saveTitan(auth, name, value) {
    await ensureConnected();
    if (!db || !auth) return;
    try {
        await db.collection('titan').updateOne(
            { auth: auth },
            { $set: { auth, name, value, timestamp: new Date() } },
            { upsert: true }
        );
    } catch(e) {
        console.error('❌ DB saveTitan error:', e.message);
    }
}

async function loadTitanData() {
    if (!db) return { values: {}, taken: [] };
    try {
        var docs = await db.collection('titan').find({}).toArray();
        var values = {};
        var taken = [];
        docs.forEach(function(d) {
            values[d.auth] = { name: d.name, value: d.value };
            if (d.value >= 33) taken.push(d.value);
        });
        return { values, taken };
    } catch(e) {
        console.error('❌ DB loadTitanData error:', e.message);
        return { values: {}, taken: [] };
    }
}

async function resetTitanData() {
    if (!db) return;
    try {
        await db.collection('titan').deleteMany({});
    } catch(e) {
        console.error('❌ DB resetTitanData error:', e.message);
    }
}

// ============ DAILY REWARDS ============

async function saveDailyReward(auth, lastClaim, streak) {
    await ensureConnected();
    if (!db || !auth) return;
    try {
        await db.collection('dailyRewards').updateOne(
            { auth: auth },
            { $set: { auth, lastClaim, streak, timestamp: new Date() } },
            { upsert: true }
        );
    } catch(e) {
        console.error('❌ DB saveDailyReward error:', e.message);
    }
}

async function loadDailyRewards() {
    if (!db) return {};
    try {
        var docs = await db.collection('dailyRewards').find({}).toArray();
        var result = {};
        for (var i = 0; i < docs.length; i++) {
            result[docs[i].auth] = { lastClaim: docs[i].lastClaim, streak: docs[i].streak };
        }
        return result;
    } catch(e) {
        console.error('❌ DB loadDailyRewards error:', e.message);
        return {};
    }
}

// ============================================
// BACKUPS AUTOMÁTICOS
// ============================================
async function createBackup() {
    await ensureConnected();
    if (!db) { console.error('❌ Backup fallido: sin conexión a MongoDB'); return; }
    try {
        var players     = await db.collection('players').find({}).toArray();
        var clans       = await db.collection('clans').find({}).toArray();
        var titan       = await db.collection('titan').find({}).toArray();
        var daily       = await db.collection('dailyRewards').find({}).toArray();

        var timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        var snapshot = {
            createdAt: new Date(),
            players:  players,
            clans:    clans,
            titan:    titan,
            dailyRewards: daily
        };

        // Guardar en Atlas (colección backups, máximo 7)
        await db.collection('backups').insertOne(snapshot);
        var total = await db.collection('backups').countDocuments();
        if (total > 7) {
            var oldest = await db.collection('backups').find({}).sort({ createdAt: 1 }).limit(total - 7).toArray();
            var ids = oldest.map(function(d) { return d._id; });
            await db.collection('backups').deleteMany({ _id: { $in: ids } });
        }

        // Guardar como archivo JSON local
        try {
            var fs = require('fs');
            var path = require('path');
            var dir = path.join(__dirname, 'backups');
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);
            fs.writeFileSync(
                path.join(dir, 'backup_' + timestamp + '.json'),
                JSON.stringify(snapshot, null, 2),
                'utf8'
            );
        } catch(fe) {
            console.warn('⚠️ No se pudo guardar backup local:', fe.message);
        }

        console.log('✅ Backup creado: ' + players.length + ' jugadores, ' + clans.length + ' clanes');
    } catch(e) {
        console.error('❌ createBackup error:', e.message);
    }
}

// ============================================
// FUTSAL
// ============================================
async function saveFutsalGoal(auth, name) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        await db.collection('players').updateOne(
            { auth },
            { $set: { name, lastSeen: new Date() }, $inc: { fGoals: 1 } },
            { upsert: true }
        );
    } catch(e) { console.error('❌ saveFutsalGoal:', e.message); }
}

async function saveFutsalAssist(auth, name) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        await db.collection('players').updateOne(
            { auth },
            { $set: { name, lastSeen: new Date() }, $inc: { fAssists: 1 } },
            { upsert: true }
        );
    } catch(e) { console.error('❌ saveFutsalAssist:', e.message); }
}

async function saveFutsalWin(auth, name) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        await db.collection('players').updateOne(
            { auth },
            { $set: { name, lastSeen: new Date() }, $inc: { fWins: 1 } },
            { upsert: true }
        );
    } catch(e) { console.error('❌ saveFutsalWin:', e.message); }
}

async function saveFutsalLoss(auth, name) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        await db.collection('players').updateOne(
            { auth },
            { $set: { name, lastSeen: new Date() }, $inc: { fLosses: 1 } },
            { upsert: true }
        );
    } catch(e) { console.error('❌ saveFutsalLoss:', e.message); }
}

async function saveFutsalGame(auth, name) {
    await ensureConnected();
    if (!db || !auth) return;
    auth = canon(auth);
    try {
        await db.collection('players').updateOne(
            { auth },
            { $set: { name, lastSeen: new Date() }, $inc: { fGames: 1 } },
            { upsert: true }
        );
    } catch(e) { console.error('❌ saveFutsalGame:', e.message); }
}

async function getFutsalStats(auth) {
    await ensureConnected();
    if (!db || !auth) return null;
    auth = canon(auth);
    try {
        var doc = await db.collection('players').findOne({ auth });
        if (doc && doc._id) doc._id = doc._id.toString();
        return doc;
    } catch(e) { console.error('❌ getFutsalStats:', e.message); return null; }
}

async function getFutsalTop(field, limit) {
    if (!db) return [];
    try {
        var filter = {};
        filter[field] = { $gt: 0 };
        var docs = await db.collection('players').find(filter).sort({ [field]: -1 }).limit(limit || 5).toArray();
        docs.forEach(function(d) { if (d._id) d._id = d._id.toString(); });
        return docs;
    } catch(e) { console.error('❌ getFutsalTop:', e.message); return []; }
}

async function getLatestBackup() {
    if (!db) return null;
    try {
        return await db.collection('backups').findOne({}, { sort: { createdAt: -1 } });
    } catch(e) {
        console.error('❌ getLatestBackup error:', e.message);
        return null;
    }
}

async function addWarning(auth, playerName, reason, byAuth, byName) {
    await ensureConnected();
    if (!db) return;
    try {
        var warning = { reason: reason || 'Sin razón', byAuth: byAuth, byName: byName || 'Sistema', date: new Date().toISOString() };
        await db.collection('players').updateOne(
            { auth: auth },
            { $push: { warnings: warning }, $set: { name: playerName } },
            { upsert: true }
        );
    } catch(e) { console.error('❌ DB addWarning error:', e.message); }
}

async function removeWarning(auth, index) {
    await ensureConnected();
    if (!db) return null;
    try {
        var player = await db.collection('players').findOne({ auth: auth });
        if (!player || !player.warnings || player.warnings.length === 0) return { error: 'No tiene advertencias' };
        var idx = (index !== undefined) ? index : player.warnings.length - 1;
        if (idx < 0 || idx >= player.warnings.length) return { error: 'Índice inválido' };
        player.warnings.splice(idx, 1);
        await db.collection('players').updateOne(
            { auth: auth },
            { $set: { warnings: player.warnings } }
        );
        return { removed: true, remaining: player.warnings.length };
    } catch(e) { console.error('❌ DB removeWarning error:', e.message); return { error: e.message }; }
}

async function getWarnings(auth) {
    await ensureConnected();
    if (!db) return [];
    try {
        var player = await db.collection('players').findOne({ auth: auth });
        return (player && player.warnings) ? player.warnings : [];
    } catch(e) { console.error('❌ DB getWarnings error:', e.message); return []; }
}

async function getAllWarnings() {
    await ensureConnected();
    if (!db) return [];
    try {
        return await db.collection('players').find(
            { warnings: { $exists: true, $ne: [] } },
            { projection: { auth: 1, name: 1, warnings: 1 } }
        ).toArray();
    } catch(e) { console.error('❌ DB getAllWarnings error:', e.message); return []; }
}

async function setVip(auth, playerName, status) {
    await ensureConnected();
    if (!db) return;
    try {
        await db.collection('players').updateOne(
            { auth: auth },
            { $set: { vip: status, name: playerName } },
            { upsert: true }
        );
    } catch(e) { console.error('❌ DB setVip error:', e.message); }
}

async function getAllVips() {
    await ensureConnected();
    if (!db) return [];
    try {
        return await db.collection('players').find(
            { vip: true },
            { projection: { auth: 1, name: 1 } }
        ).toArray();
    } catch(e) { console.error('❌ DB getAllVips error:', e.message); return []; }
}

async function setAdmin(auth, playerName, level) {
    await ensureConnected();
    if (!db) return;
    try {
        await db.collection('players').updateOne(
            { auth: auth },
            { $set: { adminLevel: level, name: playerName } },
            { upsert: true }
        );
    } catch(e) { console.error('❌ DB setAdmin error:', e.message); }
}

async function removeAdmin(auth) {
    await ensureConnected();
    if (!db) return;
    try {
        await db.collection('players').updateOne(
            { auth: auth },
            { $unset: { adminLevel: '' } }
        );
    } catch(e) { console.error('❌ DB removeAdmin error:', e.message); }
}

async function getAllAdmins() {
    await ensureConnected();
    if (!db) return [];
    try {
        return await db.collection('players').find(
            { adminLevel: { $exists: true } },
            { projection: { auth: 1, name: 1, adminLevel: 1 } }
        ).toArray();
    } catch(e) { console.error('❌ DB getAllAdmins error:', e.message); return []; }
}

// Incrementar un campo arbitrario de stats (spent, gambleLosses, gambleWins,
// misiones, etc.). Redirige al auth canónico de la cuenta.
async function incStat(auth, name, field, amount) {
    await ensureConnected();
    if (!db || !auth || !field) return;
    auth = canon(auth);
    try {
        var inc = {}; inc[field] = amount;
        var set = { lastSeen: new Date() };
        if (name) set.name = name;
        await db.collection('players').updateOne({ auth: auth }, { $set: set, $inc: inc }, { upsert: true });
    } catch(e) { console.error('❌ DB incStat error:', e.message); }
}

async function close() {
    if (client) {
        try { await client.close(); } catch(e) {}
    }
}

module.exports = { connect, saveWin, saveGamePlayed, saveBestStreak, addGayCount, addKickCount, addBanCount, getStats, getTopPlayers, getPlayerRank, addBalance, resetMonthlyWins, getMonthlyReport, createClan, inviteToClan, acceptClanInvite, leaveClan, getClanInfo, getClanByAuth, addClanWin, getTopClans, resetClanWins, kickFromClan, saveMarriage, removeMarriage, loadMarriages, saveTitan, loadTitanData, resetTitanData, saveDailyReward, loadDailyRewards, createBackup, getLatestBackup, saveFutsalGoal, saveFutsalAssist, saveFutsalWin, saveFutsalLoss, saveFutsalGame, getFutsalStats, getFutsalTop, close, addWarning, removeWarning, getWarnings, getAllWarnings, setVip, getAllVips, setAdmin, removeAdmin, getAllAdmins, registerAccount, loginAccount, getAccountByAuth, logoutAuth, deleteAccount, incStat };
