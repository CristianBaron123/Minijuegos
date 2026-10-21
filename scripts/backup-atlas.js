// Respaldo COMPLETO de la base de produccion (Atlas) a archivos JSON en esta PC: backups/respaldo-AAAA-MM-DDTHH-MM-SS/<coleccion>.json
// Solo LEE la base (no modifica nada). Uso:  npm run backup        (o:  node scripts/backup-atlas.js [--keep=10])
// Los datos de los jugadores viven en Atlas, no en la VPS: reinstalar la VPS no los borra. Este respaldo es la copia
// de seguridad por si se pierde el cluster de Atlas (el plan gratis NO hace copias automaticas).
require('dotenv').config({ quiet: true });
const fs = require('fs'), path = require('path');
const { MongoClient, BSON } = require('mongodb');
const EJSON = BSON.EJSON;

(async () => {
    const keepArg = process.argv.find(a => a.startsWith('--keep='));
    const keep = keepArg ? Math.max(1, parseInt(keepArg.slice(7), 10) || 10) : 10;
    if (!process.env.MONGO_URI) { console.error('Falta MONGO_URI en el .env: no se puede respaldar.'); process.exit(1); }
    const dbName = process.env.MONGO_DB_NAME || 'haxball_minijuegos';
    const client = new MongoClient(process.env.MONGO_URI, { serverSelectionTimeoutMS: 20000 });
    try {
        await client.connect();
        const db = client.db(dbName);
        const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const dir = path.join(__dirname, '..', 'backups', 'respaldo-' + stamp);
        fs.mkdirSync(dir, { recursive: true });
        console.log('Respaldando la base "' + dbName + '" en ' + path.relative(process.cwd(), dir));
        let total = 0, problems = 0;
        for (const col of await db.listCollections().toArray()) {
            // 'backups' son copias internas dentro de la misma base: se omiten (el respaldo de verdad es este)
            if (col.name === 'backups' || col.name.startsWith('system.')) continue;
            const docs = await db.collection(col.name).find({}).toArray();
            fs.writeFileSync(path.join(dir, col.name + '.json'), EJSON.stringify(docs, { relaxed: false }, 2), 'utf8');
            // verificacion: se vuelve a leer el archivo y se compara la cantidad
            const back = EJSON.parse(fs.readFileSync(path.join(dir, col.name + '.json'), 'utf8')).length;
            const ok = back === docs.length;
            if (!ok) problems++;
            total += docs.length;
            console.log('  ' + col.name.padEnd(16) + String(docs.length).padStart(6) + ' documentos ' + (ok ? 'OK' : 'ERROR: el archivo no coincide'));
        }
        fs.writeFileSync(path.join(dir, 'LEEME.txt'), 'Respaldo de ' + dbName + ' el ' + new Date().toISOString() + '\nFormato: EJSON (conserva fechas y ObjectId). Restaurar: importar cada <coleccion>.json con EJSON.parse + insertMany.\n', 'utf8');
        // conservar solo los ultimos N respaldos completos
        const root = path.join(__dirname, '..', 'backups');
        const old = fs.readdirSync(root).filter(n => /^respaldo-\d{4}-\d{2}-\d{2}T/.test(n)).sort();
        old.slice(0, Math.max(0, old.length - keep)).forEach(n => { fs.rmSync(path.join(root, n), { recursive: true, force: true }); console.log('  (se borro el respaldo viejo ' + n + ')'); });
        console.log(problems ? '\nHAY PROBLEMAS: revisa los archivos de arriba' : '\nListo: ' + total + ' documentos respaldados y verificados.');
        process.exitCode = problems ? 1 : 0;
    } catch (e) {
        console.error('No se pudo respaldar: ' + e.message); process.exitCode = 1;
    } finally { await client.close(); }
})();
