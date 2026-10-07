// Simulador de torneos de goles: juega partidas completas con una sala falsa y reloj virtual.
// Uso:  node tests/goal_sim.js [modulo1,modulo2,...] [leave]
//   (sin argumentos prueba los 12 juegos de torneo; "leave" hace que un jugador se desconecte a mitad)
//   WITHFINALES=1  incluye los finales 1v1   |   FINALE=1  prueba los finales 1v1 directamente
// Comprueba que cada partida termina, con ganador valido, equipos parejos y sin timers sueltos.
const vm = require('vm'), fs = require('fs');
const root = require('path').join(__dirname, '..') + '/';
const balancer = fs.readFileSync(root + 'games/shared/tournament_balancer.js', 'utf8');

function load(file, extraGlobals, sharedSt) {
    let code = fs.readFileSync(root + 'games/minijuegos/' + file, 'utf8').replace(/var mapData = null;.*/, 'var mapData = "{}";');
    const st = sharedSt || { now: 1000000, timers: new Map(), id: 0 };
    class FakeDate extends Date {
        constructor(...a) { if (a.length) super(...a); else super(st.now); }
        static now() { return st.now; }
    }
    const sb = {
        console: { log() {}, error() {}, warn() {} }, Math, JSON, Array, Object, Promise, String, Number, parseInt, parseFloat, isNaN, RegExp, Map, Set, Error,
        Date: FakeDate,
        setTimeout: (f, ms) => { const i = ++st.id; st.timers.set(i, { f, at: st.now + (ms || 0), seq: i }); return i; },
        clearTimeout: (i) => st.timers.delete(i),
        setInterval: (f, ms) => { const i = ++st.id; st.timers.set(i, { f, at: st.now + (ms || 1), seq: i, every: ms || 1 }); return i; },
        clearInterval: (i) => st.timers.delete(i)
    };
    vm.createContext(sb);
    vm.runInContext(balancer, sb);
    for (const [name, mod] of Object.entries(extraGlobals || {})) sb[name] = mod;
    const exp = vm.runInContext('(function(){' + code.replace(/module\.exports\s*=\s*/, 'return ') + '\n})()', sb);
    return { sb, st, exp };
}

function makeRoom(st, n) {
    const players = [];
    for (let i = 1; i <= n; i++) players.push({ id: i, name: 'P' + i, team: 0, position: { x: (i % 5) * 20, y: 0 } });
    const state = { scores: { red: 0, blue: 0 }, inGame: false, anomalies: [], goalLog: [] };
    const base = {
        onTeamGoal: null,
        getPlayerList: () => players.slice(),
        getPlayer: (id) => players.find(p => p.id === id) || null,
        setPlayerTeam: (id, t) => { const p = players.find(q => q.id === id); if (p) { p.team = t; p.position = { x: t === 1 ? 500 : t === 2 ? -500 : 0, y: 0 }; } },
        getScores: () => state.inGame ? { red: state.scores.red, blue: state.scores.blue, time: 0, scoreLimit: 3, timeLimit: 0 } : null,
        startGame: () => { state.inGame = true; state.scores = { red: 0, blue: 0 }; },
        stopGame: () => { state.inGame = false; },
        pauseGame: () => {},
        sendAnnouncement: () => {},
        setCustomStadium: () => {},
        getDiscProperties: () => ({ x: 0, y: 0, xspeed: 0, yspeed: 0, radius: 15, invMass: 1 }),
        getPlayerDiscProperties: () => ({ x: 0, y: 0, xspeed: 0, yspeed: 0, radius: 15, invMass: 1 }),
        getBallPosition: () => ({ x: 0, y: 0 }),
        getPlayerSettings: () => ({})
    };
    const room = new Proxy(base, {
        get: (t, k) => (k in t) ? t[k] : (typeof k === 'string' && k.startsWith('on') ? undefined : () => undefined),
        set: (t, k, v) => { t[k] = v; return true; }
    });
    return { room, base, players, state };
}

const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); await new Promise(r => setImmediate(r)); };

// opts.leaveAt: paso en el que se va un jugador al azar (para probar desconexiones)
async function play(file, n, opts) {
    opts = opts || {};
    const sharedSt = { now: 1000000, timers: new Map(), id: 0 };
    let globals = opts.globals;
    if (opts.withFinales) {
        globals = {};
        for (const [name, f] of [['AIR_HOCKEY','air_hockey'],['GOL_A_GOL','gol_a_gol'],['DOMINIC_SURVIVOR','dominic_survivor'],['SPACE_VORTEX','space_vortex'],['SURVIVOR_VOL17','survivor_vol17']]) globals[name] = load(f + '.js', null, sharedSt).exp;
    }
    const { sb, st, exp } = load(file, globals, sharedSt);
    const { room, base, players, state } = makeRoom(st, n);
    const result = { ended: false, winner: undefined, steps: 0, errors: [], anomalies: state.anomalies, matches: 0 };
    let leftDone = false;
    try {
        if (opts.finale) exp.start(room, players[0], players[1], (w) => { result.ended = true; result.winner = w; });
        else exp.start(room, (w) => { result.ended = true; result.winner = w; });
    } catch (e) { result.errors.push('start: ' + e.message); return result; }

    for (let step = 0; step < 4000 && !result.ended; step++) {
        result.steps = step;
        await flush();
        if (result.ended) break;
        // goles: si hay 2 equipos en juego, se anota (un equipo al azar) con probabilidad 40%
        const t1 = players.filter(p => p.team === 1).length, t2 = players.filter(p => p.team === 2).length;
        if (state.inGame && t1 > 0 && t2 > 0 && typeof base.onTeamGoal === 'function' && (Math.random() < 0.4 || st.timers.size === 0)) {
            if (t1 !== t2) state.anomalies.push('equipos desparejos en partido: ' + t1 + ' vs ' + t2 + ' (n=' + n + ')');
            const team = Math.random() < 0.5 ? 1 : 2;
            if (team === 1) state.scores.red++; else state.scores.blue++;
            try { base.onTeamGoal(team); } catch (e) { result.errors.push('gol: ' + e.message); }
            result.matches++;
            await flush();
            continue;
        }
        // desconexión de un jugador a mitad de juego
        if (opts.leaveAt != null && !leftDone && step >= opts.leaveAt && players.length > 1) {
            leftDone = true;
            const cand = players.filter(p => p.team !== 0);
            const victim = (cand.length ? cand : players)[Math.floor(Math.random() * (cand.length || players.length))];
            players.splice(players.indexOf(victim), 1);
            try { if (exp.onPlayerLeave) exp.onPlayerLeave(room, victim); } catch (e) { result.errors.push('leave: ' + e.message); }
            await flush();
        }
        // adelantar el reloj al próximo timer
        const next = [...st.timers.entries()].sort((a, b) => a[1].at - b[1].at || a[1].seq - b[1].seq)[0];
        if (!next) { if (state.inGame) continue; break; }
        const [id, t] = next;
        st.now = Math.max(st.now, t.at);
        if (t.every) t.at = st.now + t.every; else st.timers.delete(id);
        try { t.f(); } catch (e) { result.errors.push('timer: ' + e.message); }
    }
    await flush();
    result.leftoverTimers = [...st.timers.values()].filter(t => !t.every).length;
    result.leftoverInfo = [...st.timers.values()].filter(t => !t.every).map(t => ({ in: t.at - st.now, src: String(t.f).replace(/\s+/g,' ').slice(0, 110) }));
    result.activeAfter = exp.isActive ? exp.isActive() : null;
    result.players = players;
    return result;
}

module.exports = { play };

if (require.main === module) {
    const files = process.argv[2] ? process.argv[2].split(',') : 'xd_goals boomerang_league super_gravedad earn_easily kafa_topu kafa_topu_shadow plum ultraball shaolin_soccer futbol_callejero american_carryball capture_the_flag'.split(' ');
    const mode = process.argv[3] || 'normal';
    (async () => {
        for (const f of files) {
            const issues = {}; let ok = 0, total = 0;
            for (let n = 2; n <= 9; n++) {
                for (let trial = 0; trial < 6; trial++) {
                    total++;
                    let r;
                    try { r = await play(f + '.js', n, Object.assign(mode === 'leave' ? { leaveAt: 3 + trial * 7 } : {}, process.env.FINALE ? { finale: true } : {}, process.env.WITHFINALES ? { withFinales: true } : {})); }
                    catch (e) { r = { ended: false, errors: ['sim: ' + e.message], anomalies: [] }; }
                    const bad = [];
                    if (!r.ended) bad.push('SE TRABÓ (no terminó, activo=' + r.activeAfter + ')');
                    if (r.ended && r.winner && r.winner.id && !(r.players || []).some(p => p.id === r.winner.id) && mode !== 'leave') bad.push('ganador inexistente');
                    r.errors.forEach(e => bad.push('ERROR ' + e));
                    r.anomalies.slice(0, 1).forEach(a => bad.push(a));
                    if (r.ended && r.activeAfter) bad.push('terminó pero sigue activo');
                    if (r.ended && r.leftoverTimers > 0) bad.push('timers vivos tras terminar: ' + r.leftoverTimers);
                    if (bad.length) bad.forEach(b => { const k = b.replace(/\(n=\d+\)/, '').replace(/\d+ vs \d+/, 'A vs B'); (issues[k] = issues[k] || { c: 0, ex: 'n=' + n }).c++; });
                    else ok++;
                }
            }
            console.log(f.padEnd(20) + ok + '/' + total + ' partidas limpias');
            Object.entries(issues).forEach(([k, v]) => console.log('     ' + k + '  [x' + v.c + ', ej. ' + v.ex + ']'));
        }
    })();
}
