// Verifica que TODA función window.__algo() que usa el bot esté expuesta en bot.js y en el panel.
// (Si falta en el panel, el comando correspondiente dice "no disponible" en producción.)
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const used = new Set();
const files = ['room-main.txt']
    .concat(fs.readdirSync(path.join(root, 'games/minijuegos')).map(f => 'games/minijuegos/' + f))
    .concat(fs.readdirSync(path.join(root, 'games/luckys')).map(f => 'games/luckys/' + f));
for (const f of files) for (const m of read(f).matchAll(/window\.(__[A-Za-z]+)/g)) used.add(m[1]);
for (const m of read('room-main.txt').matchAll(/typeof (__db[A-Za-z]+)|\b(__db[A-Za-z]+)\(/g)) used.add(m[1] || m[2]);
const exposed = (f) => new Set([...read(f).matchAll(/exposeFunction\('(__[A-Za-z]+)'/g)].map(m => m[1]));
const bridge = new Set(Object.keys(require('../lib/db-bridge')({})));
const bot = exposed('bot.js');
const panel = new Set([...exposed('panel.js'), ...bridge]);
let fail = false;
for (const [label, set] of [['bot.js', bot], ['panel.js (con lib/db-bridge.js)', panel]]) {
    const missing = [...used].filter(u => !set.has(u)).sort();
    if (missing.length) { fail = true; console.log('FALTAN en ' + label + ': ' + missing.join(' ')); }
    else console.log('OK ' + label + ': las ' + used.size + ' funciones usadas están expuestas');
}
process.exit(fail ? 1 : 0);
