// Corre las pruebas automáticas (no arranca el bot ni toca la base de datos).
const { spawnSync } = require('child_process');
const path = require('path');
const sim = path.join(__dirname, 'goal_sim.js');
let fail = false;
for (const [label, args, env] of [
    ['Torneos de goles (con finales 1v1)', [sim], { WITHFINALES: '1' }],
    ['Finales 1v1', [sim, 'air_hockey,dominic_survivor,gol_a_gol,space_vortex,survivor_vol17'], { FINALE: '1' }],
    ['BUHO (3 a 16 jugadores, mapas reales)', [path.join(__dirname, 'buho_sim.js')], {}]
]) {
    console.log('\n== ' + label + ' ==');
    const r = spawnSync(process.execPath, args, { env: Object.assign({}, process.env, env), encoding: 'utf8' });
    process.stdout.write(r.stdout || '');
    if (r.stderr) process.stderr.write(r.stderr);
    // Una línea "x/y partidas limpias" con x != y es un fallo
    (r.stdout || '').split('\n').forEach(l => { const m = l.match(/(\d+)\/(\d+) partidas limpias/); if (m && m[1] !== m[2]) fail = true; });
}
console.log(fail ? '\nHAY FALLOS' : '\nTodo OK');
process.exit(fail ? 1 : 0);
