// Equipos de los juegos de goles con torneo, con 4 jugadores:
//  1) los equipos que se ven en la introduccion son los mismos con los que arranca la ronda,
//  2) salen las 3 parejas posibles (antes, 14 juegos armaban SIEMPRE 12|34 por orden de entrada),
//  3) en juegos seguidos con las mismas personas NO se repite la pareja.
// Uso: node tests/teams_sim.js
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.resolve(__dirname, '..');
const { buildRegistry } = require('./audit_registry.js');
const balancer = fs.readFileSync(path.join(root, 'games/shared/tournament_balancer.js'), 'utf8');
const GOAL = ['AMERICAN_CARRYBALL', 'BOOMERANG_LEAGUE', 'CAPTURE_THE_FLAG', 'EARN_EASILY', 'FUTBOL_CALLEJERO', 'KAFA_TOPU', 'KAFA_TOPU_SHADOW', 'PLUM', 'SHAOLIN_SOCCER', 'SPACEBOUNCE_POWER', 'SUPER_GRAVEDAD', 'WAR_CONQUEST', 'XD_GOALS', 'ULTRABALL', 'TANK_WAR'];
const reg = buildRegistry(root).filter(e => GOAL.includes(e.name));

function transform(code, mapStr) {
    return '(function() {\n' + code.replace(/const fs = require\('fs'\);?\n?/g, '').replace(/const path = require\('path'\);?\n?/g, '').replace(/const /g, 'var ').replace(/let /g, 'var ')
        .replace(/module\.exports\s*=\s*/g, 'return ').replace(/var mapData = null;.*$/m, 'var mapData = ' + JSON.stringify(mapStr) + ';') + '\n})()';
}
function mulberry32(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// Una "sala" con relojes virtuales; el balanceador es UNO solo (como en la pagina real) y persiste entre juegos.
function makeSession(seed) {
    let now = 1_700_000_000_000, seq = 0; const timers = new Map();
    const clock = {
        setTimeout: (fn, ms) => { const id = ++seq; timers.set(id, { id, fn, at: now + Math.max(0, +ms || 0), iv: null }); return id; },
        setInterval: (fn, ms) => { const id = ++seq; timers.set(id, { id, fn, at: now + Math.max(1, +ms || 1), iv: Math.max(1, +ms || 1) }); return id; },
        clear: id => timers.delete(id),
        async advance(ms) { const end = now + ms; for (;;) { let nx = null; for (const t of timers.values()) if (t.at <= end && (!nx || t.at < nx.at || (t.at === nx.at && t.id < nx.id))) nx = t; if (!nx) break; now = nx.at; if (nx.iv) nx.at += nx.iv; else timers.delete(nx.id); try { nx.fn(); } catch (e) {} await new Promise(r => setImmediate(r)); } now = end; },
    };
    const players = new Map([1, 2, 3, 4].map(id => [id, { id, name: 'P' + id, team: 0 }]));
    const part = () => { const a = [], b = []; for (const p of players.values()) { if (p.team === 1) a.push(p.id); else if (p.team === 2) b.push(p.id); } return a.length + b.length === 4 ? [a.sort().join(''), b.sort().join('')].sort().join('|') : null; };
    const st = { lastStartPart: null };
    const base = {
        getPlayerList: () => [...players.values()].map(p => ({ ...p, position: p.team ? { x: 0, y: 0 } : null })),
        getPlayer: id => players.has(id) ? { ...players.get(id), position: players.get(id).team ? { x: 0, y: 0 } : null } : null,
        setPlayerTeam: (id, t) => { if (players.has(id)) players.get(id).team = t; }, startGame: () => { st.lastStartPart = part(); }, stopGame() {}, pauseGame() {}, setCustomStadium() {}, sendAnnouncement() {},
        getScores: () => ({ red: 0, blue: 0, time: 0 }), onTeamGoal: null,
    };
    const room = new Proxy(base, { get: (t, k) => (k in t ? t[k] : (() => undefined)), set: (t, k, v) => { t[k] = v; return true; } });
    const seeded = Object.create(Math); const rnd = mulberry32(seed); seeded.random = rnd;
    class VDate extends Date { constructor(...a) { if (a.length === 0) super(now); else super(...a); } static now() { return now; } }
    const ctx = { console: { log() {}, error() {} }, setTimeout: clock.setTimeout, setInterval: clock.setInterval, clearTimeout: clock.clear, clearInterval: clock.clear, Date: VDate, Math: seeded, JSON, Object, Array, String, Number, Promise, Map, Set, parseInt, isNaN, room, window: {}, formatText: x => x, botState: { afkProtected: {}, authMap: {} } };
    vm.createContext(ctx); vm.runInContext(balancer, ctx);
    return {
        rnd, part, st,
        async play(entry) {   // un juego: devuelve { intro, match }
            const code = fs.readFileSync(path.join(root, entry.file), 'utf8'), mapStr = fs.readFileSync(path.join(root, entry.mapFile), 'utf8');
            const mod = vm.runInContext(transform(code, mapStr), ctx);
            st.lastStartPart = null; mod.start(room, () => {});
            await clock.advance(4000); const intro = part();
            await clock.advance(30000); const match = st.lastStartPart;
            mod.stop(room); await clock.advance(2000);
            for (const p of players.values()) p.team = 0;     // entre juegos la sala deja a todos en espectador
            return { intro, match };
        },
    };
}

(async () => {
    let fail = false;
    const say = (ok, msg) => { console.log((ok ? 'OK    ' : 'FALLA ') + msg); if (!ok) fail = true; };

    // 1 y 2: por juego, 30 partidas con semillas distintas
    for (const e of reg) {
        let changed = 0, ran = 0; const dist = {};
        for (let seed = 1; seed <= 30; seed++) {
            const s = makeSession(seed); let r; try { r = await s.play(e); } catch (er) { continue; }
            ran++; if (!r.intro || !r.match || r.intro !== r.match) changed++;
            dist[r.match] = (dist[r.match] || 0) + 1;
        }
        const kinds = Object.keys(dist).length, min = Math.min(...Object.values(dist));
        say(changed === 0 && kinds === 3 && min >= 3, e.name.padEnd(20) + 'intro = ronda en ' + (ran - changed) + '/' + ran + ' | parejas distintas: ' + kinds + '/3 (' + Object.values(dist).join('/') + ')');
    }

    // 3: juegos seguidos con las mismas 4 personas: ninguna pareja repetida
    let pairs = 0, repeats = 0;
    for (let seed = 1; seed <= 30; seed++) {
        const s = makeSession(1000 + seed); const seq = [];
        for (let g = 0; g < 6; g++) { const e = reg[Math.floor(s.rnd() * reg.length)]; try { seq.push((await s.play(e)).match); } catch (er) {} }
        for (let i = 1; i < seq.length; i++) { pairs++; if (seq[i] === seq[i - 1]) repeats++; }
    }
    say(repeats === 0, 'juegos seguidos con las mismas 4 personas: parejas repetidas ' + repeats + ' de ' + pairs);
    console.log(fail ? '\nHAY FALLOS' : '\nTodo OK');
    process.exit(fail ? 1 : 0);
})();
