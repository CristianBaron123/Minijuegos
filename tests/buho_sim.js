// Simulador de BUHO con los mapas reales: elimina jugadores poniendo la pelota en su portería.
// Uso: node tests/buho_sim.js   (juega partidas completas de 3 a 16 jugadores y busca fallos:
// jugador equivocado eliminado, posiciones apiladas, mapa mal reducido, ganador incorrecto, avatares/equipos sobrantes)
const vm = require('vm'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..') + '/';

function buildBuhoData() {
    const dir = root + 'Buho/mapas';
    const maps = {}, goalCenters = {};
    fs.readdirSync(dir).forEach(f => {
        const m = f.match(/^(\d+|CAMPEON)-MAN/); if (!m) return;
        const content = fs.readFileSync(path.join(dir, f), 'utf8');
        maps[m[1]] = content;
        const parsed = JSON.parse(content);
        goalCenters[m[1]] = (parsed.goals || []).map(g => ({ x: Math.round((g.p0[0] + g.p1[0]) / 2), y: Math.round((g.p0[1] + g.p1[1]) / 2) }));
    });
    return { maps, goalCenters };
}
const BUHO_DATA = buildBuhoData();

function setup(n) {
    const code = fs.readFileSync(root + 'games/minijuegos/buho.js', 'utf8');
    const st = { now: 1000000, timers: new Map(), id: 0 };
    class FakeDate extends Date { constructor(...a) { if (a.length) super(...a); else super(st.now); } static now() { return st.now; } }
    const sb = {
        console: { log() {}, error() {}, warn() {} }, Math, JSON, Array, Object, Promise, String, Number, parseInt, parseFloat, isNaN, RegExp, Map, Set, Error,
        Date: FakeDate,
        setTimeout: (f, ms) => { const i = ++st.id; st.timers.set(i, { f, at: st.now + (ms || 0), seq: i }); return i; },
        clearTimeout: (i) => st.timers.delete(i)
    };
    vm.createContext(sb);
    const exp = vm.runInContext('(function(){' + code.replace(/module\.exports\s*=\s*/, 'return ') + '\n})()', sb);
    exp.setMapData(JSON.parse(JSON.stringify(BUHO_DATA)));

    const players = [];
    for (let i = 1; i <= n; i++) players.push({ id: i, name: 'P' + i, team: 0, auth: 'a' + i, pos: null, avatar: null });
    const log = { announcements: [], stadiums: [], starts: 0, stops: 0, paused: null };
    const ball = { x: 0, y: 0 };
    const base = {
        getPlayerList: () => players.map(p => ({ id: p.id, name: p.name, team: p.team, auth: p.auth, position: p.pos })),
        getPlayer: (id) => { const p = players.find(q => q.id === id); return p ? { id: p.id, name: p.name, team: p.team, position: p.pos } : null; },
        setPlayerTeam: (id, t) => { const p = players.find(q => q.id === id); if (p) p.team = t; },
        setPlayerAvatar: (id, a) => { const p = players.find(q => q.id === id); if (p) p.avatar = a; },
        setPlayerDiscProperties: (id, props) => { const p = players.find(q => q.id === id); if (p && props.x != null) p.pos = { x: props.x, y: props.y }; },
        getDiscProperties: (i) => i === 0 ? { x: ball.x, y: ball.y } : null,
        setCustomStadium: (s) => { log.stadiums.push(JSON.parse(s)); },
        startGame: () => { log.starts++; log.inGame = true; },
        stopGame: () => { log.stops++; log.inGame = false; },
        pauseGame: (b) => { log.paused = b; },
        sendAnnouncement: (m) => { log.announcements.push(String(m)); }
    };
    const room = new Proxy(base, { get: (t, k) => (k in t) ? t[k] : () => undefined });
    return { exp, room, players, log, ball, st };
}

function runFor(env, ms) {
    const end = env.st.now + ms;
    for (let guard = 0; guard < 5000; guard++) {
        const next = [...env.st.timers.entries()].sort((a, b) => a[1].at - b[1].at || a[1].seq - b[1].seq)[0];
        if (!next || next[1].at > end) break;
        const [id, t] = next;
        env.st.now = Math.max(env.st.now, t.at);
        env.st.timers.delete(id);
        try { t.f(); } catch (e) { env.errors = (env.errors || []).concat('timer: ' + e.message); }
    }
    env.st.now = end;
}

const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

// Juega una partida completa eliminando jugadores uno a uno. Devuelve las anomalías detectadas.
function playFull(n, opts) {
    opts = opts || {};
    const env = setup(n);
    const { exp, room, players, log, ball } = env;
    const issues = [];
    let winner = 'no-callback', cbCount = 0;
    exp.start(room, (w) => { cbCount++; winner = w; });
    runFor(env, 6000); // intro + asignación de porterías

    const alive = new Set(players.map(p => p.id));
    const elimOrder = [];
    const checkPositions = (label) => {
        const ps = players.filter(p => alive.has(p.id) && p.pos);
        for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
            if (dist(ps[i].pos, ps[j].pos) < 20) { issues.push(label + ': ' + ps[i].name + ' y ' + ps[j].name + ' quedaron en la MISMA posición (n=' + n + ')'); return; }
        }
        if (ps.length !== alive.size) issues.push(label + ': hay jugadores vivos sin posición asignada (n=' + n + ')');
    };
    checkPositions('inicio');
    // el mapa cargado debe tener tantas porterías (distintas) como jugadores vivos
    const goalsOfLastMap = () => {
        const m = log.stadiums[log.stadiums.length - 1];
        const uniq = new Set((m.goals || []).map(g => Math.round((g.p0[0] + g.p1[0]) / 2) + ',' + Math.round((g.p0[1] + g.p1[1]) / 2)));
        return uniq.size;
    };
    if (goalsOfLastMap() !== alive.size) issues.push('mapa inicial con ' + goalsOfLastMap() + ' porterías distintas para ' + alive.size + ' jugadores');

    let step = 0;
    while (alive.size > 1 && step++ < 40) {
        const list = [...alive];
        const victimId = list[Math.floor(Math.random() * list.length)];
        const victim = players.find(p => p.id === victimId);
        // la pelota entra por la portería donde fue puesto este jugador (posición = 0.7 * centro)
        if (!victim.pos) { issues.push('victima sin posición'); break; }
        ball.x = victim.pos.x / 0.7; ball.y = victim.pos.y / 0.7;
        log.announcements.length = 0;
        if (opts.beforeGoal) opts.beforeGoal(env, victimId, alive);
        exp.onTeamGoal(room, 2);
        const eliminated = log.announcements.map(a => a.match(/☠️ (\S+) ELIMINADO/)).filter(Boolean).map(m => m[1]);
        if (eliminated.length !== 1) issues.push('el gol no eliminó a nadie o eliminó a varios: [' + eliminated.join(',') + '] esperado ' + victim.name + ' (n=' + n + ', vivos=' + alive.size + ')');
        else if (eliminated[0] !== victim.name) issues.push('ELIMINÓ AL JUGADOR EQUIVOCADO: ' + eliminated[0] + ' en vez de ' + victim.name + ' (n=' + n + ', vivos=' + alive.size + ')');
        else { alive.delete(victimId); elimOrder.push(victim.name); }
        if (eliminated.length !== 1) { alive.delete(victimId); } // para no quedar en bucle
        if (log.inGame) exp.onPositionsReset(room);
        runFor(env, 7000);
        if (alive.size > 1) {
            checkPositions('tras reducir a ' + alive.size);
            if (goalsOfLastMap() !== alive.size) issues.push('tras ' + (n - alive.size) + ' eliminados el mapa tiene ' + goalsOfLastMap() + ' porterías distintas y quedan ' + alive.size + ' vivos (n=' + n + ')');
        }
    }
    runFor(env, 8000); // mapa campeón + callback
    const survivor = players.find(p => alive.has(p.id));
    if (cbCount !== 1) issues.push('callback llamado ' + cbCount + ' veces (n=' + n + ')');
    else if (survivor && (!winner || winner.id !== survivor.id)) issues.push('ganador incorrecto: ' + (winner && winner.name) + ' en vez de ' + survivor.name);
    if (players.some(p => p.team !== 0)) issues.push('al terminar quedaron jugadores con equipo asignado: ' + players.filter(p => p.team !== 0).map(p => p.name + ':' + p.team).join(','));
    if (players.some(p => p.avatar)) issues.push('al terminar quedaron avatares puestos: ' + players.filter(p => p.avatar).map(p => p.name + ':' + p.avatar).join(','));
    if (exp.isActive()) issues.push('el juego quedó activo');
    if (env.st.timers.size) issues.push('timers vivos al terminar: ' + env.st.timers.size);
    (env.errors || []).forEach(e => issues.push('ERROR ' + e));
    return { issues, env, elimOrder };
}

module.exports = { playFull, setup, runFor, BUHO_DATA };

if (require.main === module) {
    const counts = {};
    for (let n = 3; n <= 16; n++) {
        let bad = 0;
        for (let t = 0; t < 8; t++) {
            const r = playFull(n);
            if (r.issues.length) { bad++; r.issues.forEach(i => { const k = i.replace(/P\d+/g, 'Px').replace(/\d+/g, 'N'); counts[k] = counts[k] || { c: 0, ex: i, n }; counts[k].c++; }); }
        }
        console.log('jugadores=' + String(n).padEnd(3) + ' partidas con problemas: ' + bad + '/8');
    }
    console.log('\nProblemas distintos:');
    Object.values(counts).sort((a, b) => b.c - a.c).forEach(v => console.log('  x' + v.c + '  ' + v.ex));
}
