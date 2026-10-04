// Copia la base local (mongodb://localhost:27017) a la de MONGO_URI (.env), sin pisar lo que ya exista.
//   node migrate-local-to-atlas.js           -> simulacro: solo muestra qué copiaría
//   node migrate-local-to-atlas.js --apply   -> copia de verdad
// Inserta solo documentos cuyo _id no exista en destino. No borra ni modifica nada.
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const dns = require('dns');
const { MongoClient } = require('mongodb');

const SOURCE_URI = process.env.SOURCE_URI || 'mongodb://localhost:27017';
const TARGET_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME || 'haxball_minijuegos';
const APPLY = process.argv.includes('--apply');

if (!TARGET_URI) { console.error('Falta MONGO_URI en .env'); process.exit(1); }
if (/<db_password>/.test(TARGET_URI)) { console.error('MONGO_URI todavía tiene <db_password>: poné la contraseña real en el .env'); process.exit(1); }
if (/^mongodb\+srv:/.test(TARGET_URI)) dns.setServers(['8.8.8.8', '1.1.1.1']);
const targetOpts = process.env.MONGO_USER && process.env.MONGO_PASSWORD
    ? { auth: { username: process.env.MONGO_USER, password: process.env.MONGO_PASSWORD } } : {};

(async () => {
    const src = new MongoClient(SOURCE_URI, { serverSelectionTimeoutMS: 8000 });
    const dst = new MongoClient(TARGET_URI, { serverSelectionTimeoutMS: 15000, ...targetOpts });
    try {
        await src.connect();
        await dst.connect();
        const sdb = src.db(DB_NAME), ddb = dst.db(DB_NAME);
        console.log((APPLY ? 'COPIANDO' : 'SIMULACRO') + ': ' + SOURCE_URI + ' -> destino (' + DB_NAME + ')\n');
        for (const col of await sdb.listCollections().toArray()) {
            const name = col.name;
            const docs = await sdb.collection(name).find({}).toArray();
            const ids = docs.map(d => d._id);
            const existing = new Set((await ddb.collection(name).find({ _id: { $in: ids } }, { projection: { _id: 1 } }).toArray()).map(d => String(d._id)));
            const toInsert = docs.filter(d => !existing.has(String(d._id)));
            console.log(name.padEnd(14) + ' origen: ' + docs.length + ' | ya en destino: ' + existing.size + ' | a copiar: ' + toInsert.length);
            if (APPLY && toInsert.length) {
                await ddb.collection(name).insertMany(toInsert, { ordered: false });
            }
        }
        console.log(APPLY ? '\n✅ Listo.' : '\nNada se copió. Si está bien, corré de nuevo con --apply');
    } catch (e) {
        console.error('❌ Error:', e.message);
        process.exitCode = 1;
    } finally {
        await src.close().catch(() => {});
        await dst.close().catch(() => {});
    }
})();
