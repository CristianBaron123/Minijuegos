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
        var docs = await db.collection('players')
            .find({})
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

async function resetMonthlyWins() {
    if (!db) return;
    try {
        await db.collection('players').updateMany(
            {},
            { $set: { wins: 0, gamesPlayed: 0, bestStreak: 0, minigameWins: {} } }
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

async function close() {
    if (client) {
        try { await client.close(); } catch(e) {}
    }
}

module.exports = { connect, saveWin, saveGamePlayed, saveBestStreak, getStats, getTopPlayers, getPlayerRank, addBalance, resetMonthlyWins, getMonthlyReport, close };
