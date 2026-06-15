// ============================================
// RECONCILIAR clanTag: sincroniza players.clanTag desde la colección clans
// ============================================
// La colección `clans` es la fuente de verdad de quién pertenece a qué clan.
// El campo `players.clanTag` está denormalizado y puede quedar desincronizado
// (escritura perdida o split-brain entre Atlas y una base local). Este script
// recorre todos los clanes y deja `players.clanTag` consistente con la membresía.
//
// Uso (en la VPS, dentro de /root/Minijuegos):
//   node reconcile-clantags.js            -> modo DRY RUN (solo muestra, no escribe)
//   node reconcile-clantags.js --apply    -> aplica los cambios
//
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const { MongoClient } = require('mongodb');

const APPLY = process.argv.includes('--apply');
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'haxball_minijuegos';

(async () => {
    if (!MONGO_URI) {
        console.error('🚨 MONGO_URI no definido. Revisá el .env.');
        process.exit(1);
    }
    const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const host = MONGO_URI.replace(/^[^@]*@/, '').split(/[\/?]/)[0];
        console.log('Conectado a ' + DB_NAME + ' @ ' + host + (APPLY ? '  [APPLY]' : '  [DRY RUN]'));

        const clans = await db.collection('clans').find({}).toArray();
        let toFix = 0, fixed = 0, ok = 0;

        for (const clan of clans) {
            const members = clan.members || [];
            for (const m of members) {
                if (!m.auth) continue;
                const player = await db.collection('players').findOne({ auth: m.auth }, { projection: { clanTag: 1, name: 1 } });
                if (player && player.clanTag === clan.tag) { ok++; continue; }
                toFix++;
                console.log('  FIX  ' + (m.name || m.auth) + '  clanTag: ' + (player ? player.clanTag : '(sin player)') + ' -> ' + clan.tag);
                if (APPLY) {
                    await db.collection('players').updateOne(
                        { auth: m.auth },
                        { $set: { clanTag: clan.tag, name: m.name } },
                        { upsert: true }
                    );
                    fixed++;
                }
            }
        }

        console.log('---');
        console.log('Clanes: ' + clans.length + ' | ya consistentes: ' + ok + ' | a corregir: ' + toFix + (APPLY ? (' | corregidos: ' + fixed) : ''));
        if (!APPLY && toFix > 0) console.log('Volvé a correr con  --apply  para aplicar los cambios.');
    } catch (e) {
        console.error('ERROR:', e.message);
        process.exit(1);
    } finally {
        await client.close();
    }
})();
