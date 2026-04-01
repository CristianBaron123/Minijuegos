// ============================================
// MÓDULO DE BASE DE DATOS - MongoDB
// ============================================
const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'haxball_minijuegos';

let db = null;
let client = null;

async function connect() {
    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db(DB_NAME);
        console.log('✅ MongoDB conectado a ' + DB_NAME);
        return db;
    } catch(e) {
        console.error('❌ Error conectando a MongoDB:', e.message);
        console.error('⚠️ El bot funcionará sin estadísticas persistentes');
        return null;
    }
}

async function saveWin(auth, name, minigame) {
    if (!db || !auth) return;
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
    if (!db || !auth) return;
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
    if (!db || !auth) return;
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
    if (!db || !auth) return;
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
    if (!db || !auth) return;
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
    if (!db || !auth) return;
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
    if (!db || !auth) return null;
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
    if (!db || !auth) return;
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

async function getMonthlyReport() {
    if (!db) return null;
    try {
        var topWins = await db.collection('players')
            .find({ wins: { $gt: 0 } })
            .sort({ wins: -1 })
            .limit(5)
            .toArray();

        var topRich = await db.collection('players')
            .find({ balance: { $gt: 0 } })
            .sort({ balance: -1 })
            .limit(5)
            .toArray();

        return { topWins: topWins, topRich: topRich };
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

async function close() {
    if (client) {
        try { await client.close(); } catch(e) {}
    }
}

module.exports = { connect, saveWin, saveGamePlayed, saveBestStreak, addGayCount, addKickCount, addBanCount, getStats, getTopPlayers, getPlayerRank, addBalance, resetMonthlyWins, getMonthlyReport, createClan, inviteToClan, acceptClanInvite, leaveClan, getClanInfo, getClanByAuth, addClanWin, getTopClans, resetClanWins, kickFromClan, saveMarriage, removeMarriage, loadMarriages, saveTitan, loadTitanData, resetTitanData, saveDailyReward, loadDailyRewards, close };
