// Registro de modulos: nombre del juego -> archivo del modulo -> mapa (todo leido de bot.js tal como lo conecta de verdad)
const fs = require('fs'), path = require('path');

function buildRegistry(root) {
    const bot = fs.readFileSync(path.join(root, 'bot.js'), 'utf8');
    const room = fs.readFileSync(path.join(root, 'room-main.txt'), 'utf8');
    const evalJoin = args => new Function('path', '__dirname', 'return path.join(__dirname,' + args + ')')(path, root);

    // const xPath = path.join(__dirname, ...);
    const paths = {};
    for (const m of bot.matchAll(/const (\w+) = path\.join\(__dirname,\s*([^;]*?)\);/g)) { try { paths[m[1]] = evalJoin(m[2]); } catch (e) {} }
    // const xCode = fs.readFileSync(xPath, 'utf8');
    const reads = {};
    for (const m of bot.matchAll(/const (\w+) = fs\.readFileSync\((\w+)(?:,\s*'utf8')?\);/g)) reads[m[1]] = m[2];
    // const xModule = transformModuleForBrowser(xCode, mapData);
    const transforms = {};
    for (const m of bot.matchAll(/const (\w+) = transformModuleForBrowser\((\w+),\s*(\w+)\)/g)) transforms[m[1]] = { codeVar: m[2], mapVar: m[3] };
    // var NOMBRE = ` + xModule + `;
    const assigns = [];
    for (const m of bot.matchAll(/var (\w+) = `\s*\+\s*(\w+)\s*\+\s*`;/g)) assigns.push({ global: m[1], moduleVar: m[2] });
    // { name: 'X', module: X, displayName: 'Y' }
    const registered = [];
    for (const m of room.matchAll(/\{ name: '([A-Z0-9_]+)', module: ([A-Z0-9_]+), displayName: '([^']+)' \}/g)) registered.push({ name: m[1], moduleGlobal: m[2], displayName: m[3] });

    const out = [];
    for (const r of registered) {
        const a = assigns.find(x => x.global === r.moduleGlobal);
        const t = a && transforms[a.moduleVar];
        const entry = { name: r.name, displayName: r.displayName, file: null, mapFile: null, notes: [] };
        if (!a) entry.notes.push('no se encontro "var ' + r.name + ' = `+ modulo +`" en bot.js');
        else if (!t) entry.notes.push('el modulo ' + a.moduleVar + ' no pasa por transformModuleForBrowser (carga especial)');
        else {
            const codePath = paths[reads[t.codeVar]]; const mapPath = paths[reads[t.mapVar]];
            entry.file = codePath ? path.relative(root, codePath) : null;
            entry.mapFile = mapPath ? path.relative(root, mapPath) : null;
            if (!entry.file) entry.notes.push('no se resolvio el archivo del modulo (' + t.codeVar + ')');
            if (!entry.mapFile) entry.notes.push('no se resolvio el archivo del mapa (' + t.mapVar + ')');
        }
        out.push(entry);
    }
    return out;
}
module.exports = { buildRegistry };

if (require.main === module) {
    const root = process.argv[2];
    const reg = buildRegistry(root);
    console.log('juegos registrados en room-main.txt:', reg.length);
    const bad = reg.filter(e => e.notes.length);
    console.log('con archivo y mapa resueltos:', reg.length - bad.length, '| con problemas:', bad.length);
    bad.forEach(e => console.log('  -', e.name.padEnd(22), e.notes.join(' ; ')));
    // modulos en disco no registrados / registrados sin archivo
    const onDisk = fs.readdirSync(path.join(root, 'games/minijuegos')).filter(f => f.endsWith('.js')).map(f => 'games\\minijuegos\\' + f);
    const used = new Set(reg.map(e => e.file));
    console.log('archivos en games/minijuegos sin usar por ningun juego registrado:');
    onDisk.filter(f => !used.has(f)).forEach(f => console.log('  -', f));
    const missingFiles = reg.filter(e => e.file && !fs.existsSync(path.join(root, e.file)));
    const missingMaps = reg.filter(e => e.mapFile && !fs.existsSync(path.join(root, e.mapFile)));
    console.log('archivos de modulo inexistentes:', missingFiles.length, '| mapas inexistentes:', missingMaps.length);
    const dupMap = {}; reg.forEach(e => { if (e.mapFile) (dupMap[e.mapFile] = dupMap[e.mapFile] || []).push(e.name); });
    console.log('mapas compartidos por mas de un juego:', Object.entries(dupMap).filter(([k, v]) => v.length > 1).map(([k, v]) => v.join('+')).join(' | ') || 'ninguno');
}
