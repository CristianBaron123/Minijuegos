// Uso:  node tests/audit_minijuegos.js [--only=XD_GOALS,SURVIVAL] [--json] [--autotest]
//   --autotest: comprueba que el propio auditor detecta 5 modulos defectuosos de mentira (si no los detecta, falla)
// AUDITORIA DE MINIJUEGOS (sin abrir la sala): carga cada modulo con la MISMA transformacion que usa bot.js,
// una sala simulada con estado y relojes virtuales, y lo somete a escenarios tipicos de fallo.
const fs = require('fs'), vm = require('vm'), path = require('path');
const { buildRegistry } = require('./audit_registry.js');
const argv = process.argv.slice(2);
const flag = n => { const a = argv.find(x => x.startsWith('--' + n + '=')); return a ? a.slice(n.length + 3) : null; };
const root = flag('root') || path.resolve(__dirname, '..');
const only = flag('only') ? flag('only').split(',') : null;
const AUTOTEST = argv.includes('--autotest');
const WRITE_JSON = argv.includes('--json');
const balancerCode = fs.readFileSync(path.join(root, 'games/shared/tournament_balancer.js'), 'utf8');

// ---------- misma transformacion que transformModuleForBrowser de bot.js ----------
function transform(moduleCode, mapData) {
    const mapJsonString = JSON.stringify(mapData);
    let code = moduleCode
        .replace(/const fs = require\('fs'\);?\n?/g, '').replace(/const path = require\('path'\);?\n?/g, '')
        .replace(/const /g, 'var ').replace(/let /g, 'var ')
        .replace(/module\.exports\s*=\s*/g, 'return ')
        .replace(/var mapData = null;.*$/m, 'var mapData = ' + mapJsonString + ';');
    return '(function() {\n' + code + '\n})()';
}

// ---------- reloj virtual ----------
function makeClock() {
    let now = 1_700_000_000_000, seq = 0, execs = 0; const timers = new Map();
    const api = {
        now: () => now, get execs() { return execs; },
        setTimeout: (fn, ms, ...a) => { const id = ++seq; timers.set(id, { id, fn, at: now + Math.max(0, +ms || 0), interval: null, a }); return id; },
        setInterval: (fn, ms, ...a) => { const id = ++seq; ms = Math.max(1, +ms || 1); timers.set(id, { id, fn, at: now + ms, interval: ms, a }); return id; },
        clear: id => { timers.delete(id); },
        live: () => ({ intervals: [...timers.values()].filter(t => t.interval).length, timeouts: [...timers.values()].filter(t => !t.interval).length,
            nextTimeoutMs: Math.max(0, ...[...timers.values()].filter(t => !t.interval).map(t => t.at - now)) }),
        async advance(ms, onError) {
            const end = now + ms; let sinceFlush = 0;
            for (;;) {
                let next = null;
                for (const t of timers.values()) if (t.at <= end && (!next || t.at < next.at || (t.at === next.at && t.id < next.id))) next = t;
                if (!next) break;
                now = next.at; if (next.interval) next.at += next.interval; else timers.delete(next.id);
                if (++execs > 3_000_000) throw new Error('RUNAWAY: demasiados temporizadores');
                try { next.fn(...next.a); } catch (e) { onError(e, 'temporizador'); }
                if (!next.interval || ++sinceFlush >= 40) { sinceFlush = 0; await new Promise(r => setImmediate(r)); }
            }
            now = end; await new Promise(r => setImmediate(r));
        },
    };
    return api;
}

// ---------- sala simulada ----------
function makeRoom(clock, mapDiscs, rec, mapObj) {
    const st = { players: new Map(), running: false, paused: false, discs: mapDiscs.map(d => ({ x: d.pos ? d.pos[0] : 0, y: d.pos ? d.pos[1] : 0, xspeed: d.speed ? d.speed[0] : 0, yspeed: d.speed ? d.speed[1] : 0, radius: d.radius || 10 })), startedAt: 0 };
    const spawn = (id) => { const p = st.players.get(id); const i = [...st.players.values()].filter(q => q.team === p.team).findIndex(q => q.id === id); const pts = (p.team === 1 ? mapObj.redSpawnPoints : mapObj.blueSpawnPoints); if (pts && pts.length) { const q = pts[Math.max(0, i) % pts.length]; return { x: q[0], y: q[1], xspeed: 0, yspeed: 0, radius: 15 }; } const sd = mapObj.spawnDistance || 200; return { x: (p.team === 1 ? -sd : sd), y: -60 + (Math.max(0, i) % 5) * 30, xspeed: 0, yspeed: 0, radius: 15 }; };
    const view = p => ({ id: p.id, name: p.name, team: p.team, admin: false, position: st.running && p.team !== 0 && p.disc ? { x: p.disc.x, y: p.disc.y } : null, auth: 'auth' + p.id, conn: 'c' + p.id });
    const base = {
        _st: st,
        getPlayerList: () => [...st.players.values()].map(view),
        getPlayer: id => st.players.has(id) ? view(st.players.get(id)) : null,
        setPlayerTeam: (id, t) => { const p = st.players.get(id); if (!p) return; p.team = t; if (t === 0) p.disc = null; else if (st.running && !p.disc) p.disc = spawn(id); },
        setPlayerDiscProperties: (id, props) => { const p = st.players.get(id); if (p && p.disc && props) Object.assign(p.disc, props); },
        getPlayerDiscProperties: id => { const p = st.players.get(id); return p && p.disc ? Object.assign({}, p.disc) : null; },
        startGame: () => { st.running = true; st.paused = false; st.startedAt = clock.now(); for (const p of st.players.values()) p.disc = p.team !== 0 ? spawn(p.id) : null; rec.starts++; },
        stopGame: () => { st.running = false; for (const p of st.players.values()) p.disc = null; rec.stops++; },
        pauseGame: b => { st.paused = !!b; },
        isGamePaused: () => st.paused,
        getScores: () => st.running ? { red: 0, blue: 0, time: (clock.now() - st.startedAt) / 1000, scoreLimit: 0, timeLimit: 0 } : null,
        getBallPosition: () => st.running && st.discs[0] ? { x: st.discs[0].x, y: st.discs[0].y } : null,
        getDiscCount: () => st.discs.length,
        getDiscProperties: i => st.discs[i] ? Object.assign({}, st.discs[i]) : null,
        setDiscProperties: (i, p) => { if (st.discs[i] && p) Object.assign(st.discs[i], p); },
        setCustomStadium: s => {
            if (typeof s !== 'string') throw new Error('setCustomStadium espera una string JSON (recibio ' + typeof s + ')');
            const o = JSON.parse(s); rec.stadiums.push(o.name || '?');
            if (st.running) rec.stadiumWhileRunning++;
            st.discs = (o.discs || []).map(d => ({ x: d.pos ? d.pos[0] : 0, y: d.pos ? d.pos[1] : 0, xspeed: d.speed ? d.speed[0] : 0, yspeed: d.speed ? d.speed[1] : 0, radius: d.radius || 10 }));
        },
        sendAnnouncement: (m, to) => { rec.say.push({ t: clock.now(), m: String(m) }); },
        kickPlayer: id => { rec.kicks.push(id); },
        onTeamGoal: null,
    };
    return new Proxy(base, {
        get: (t, k) => { if (k in t) return t[k]; if (typeof k === 'string' && k !== 'then') { rec.unknown[k] = (rec.unknown[k] || 0) + 1; return () => undefined; } return undefined; },
        set: (t, k, v) => { t[k] = v; return true; },
    });
}

function mulberry32(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// ---------- un escenario ----------
async function runScenario(entry, code, mapStr, mapDiscs, scn, mapObj) {
    const clock = makeClock();
    const rec = { say: [], errors: [], throws: [], unknown: {}, stadiums: [], kicks: [], starts: 0, stops: 0, stadiumWhileRunning: 0, cb: [] };
    const room = makeRoom(clock, mapDiscs, rec, mapObj);
    const seeded = Object.create(Math); const rnd = mulberry32(scn.seed || 1); seeded.random = rnd;
    class VDate extends Date { constructor(...a) { if (a.length === 0) super(clock.now()); else super(...a); } static now() { return clock.now(); } }
    const ctx = {
        console: { log() {}, info() {}, warn() {}, error: (...a) => rec.errors.push(a.map(String).join(' ').slice(0, 200)) },
        setTimeout: clock.setTimeout, setInterval: clock.setInterval, clearTimeout: clock.clear, clearInterval: clock.clear,
        Date: VDate, Math: seeded, JSON, Object, Array, String, Number, Promise, parseInt, parseFloat, isNaN, isFinite, Boolean, RegExp, Error, Map, Set, Symbol,
        room, window: {}, formatText: x => x, formatKeep: x => x, isPlayerAfk: () => false, botState: { afkProtected: {}, authMap: {}, gameActive: true },
        reportBug: (c, e) => rec.errors.push('reportBug ' + c + ': ' + (e && e.message || e)),
    };
    vm.createContext(ctx);
    const onErr = (e, where) => rec.throws.push(where + ': ' + (e && e.message || e));
    let mod;
    try { vm.runInContext(balancerCode, ctx); mod = vm.runInContext(transform(code, mapStr), ctx, { timeout: 5000 }); }
    catch (e) { return { loadError: e.message }; }
    if (!mod || typeof mod.start !== 'function') return { loadError: 'el modulo no exporta start()' };
    const hooks = { tick: typeof mod.onGameTick === 'function', goal: typeof mod.onTeamGoal === 'function', leave: typeof mod.onPlayerLeave === 'function', chat: typeof mod.onPlayerChat === 'function', reset: typeof mod.onPositionsReset === 'function' };

    for (let i = 1; i <= scn.n; i++) room._st.players.set(i, { id: i, name: 'P' + i, team: 0, disc: null });
    let runId = 0; const stoppedRuns = new Set();
    const call = (fn, where) => { try { return fn(); } catch (e) { onErr(e, where); } };
    // tick de juego (60/s) como room.onGameTick -> modulo.onGameTick(room), solo mientras el modulo esta activo
    let tickId = null;
    const startTicks = () => { if (!hooks.tick || tickId) return; tickId = clock.setInterval(() => { if (mod.isActive && mod.isActive() && room._st.running && !room._st.paused) call(() => mod.onGameTick(room), 'onGameTick'); }, 16); };
    const out = { hooks, scn: scn.name, phases: [] };
    const activeNow = () => { try { return !!(mod.isActive && mod.isActive()); } catch (e) { return false; } };
    const step = async (ms) => { try { await clock.advance(ms, onErr); } catch (e) { onErr(e, 'avance'); } };
    const startGame = () => { startTicks(); const myRun = ++runId; const onEnd = w => { rec.cb.push({ t: clock.now(), run: myRun, afterStop: stoppedRuns.has(myRun), winner: w === undefined ? undefined : w }); }; call(() => mod.start(room, onEnd), 'start()'); };

    if (scn.name === 'quieto') { startGame(); await step(10000); out.activeAt10s = activeNow(); out.cbAt10s = rec.cb.length; await step(110000); }
    else if (scn.name === 'salidas') {
        startGame(); await step(15000);
        for (let i = 1; i < scn.n; i++) { const p = room.getPlayer(i); room._st.players.delete(i); if (hooks.leave && activeNow()) call(() => mod.onPlayerLeave(room, p), 'onPlayerLeave'); await step(1000); }
        await step(40000);
    } else if (scn.name === 'detener') {
        startGame(); await step(12000);
        const before = rec.say.length; out.activeBeforeStop = activeNow();
        stoppedRuns.add(runId); call(() => mod.stop(room), 'stop()'); out.activeAfterStop = activeNow(); await step(1000); const snap = { stops: rec.stops, starts: rec.starts, stadiums: rec.stadiums.length, kicks: rec.kicks.length };
        const t0 = clock.now(); const cbBefore = rec.cb.length;
        await step(19000); out.liveAt20s = clock.live();
        await step(100000); out.liveAt120s = clock.live();
        out.sayAfterStop = rec.say.filter(s => s.t > t0 + 20000).length; out.cbAfterStop = rec.cb.length - cbBefore; out.activeAtEnd = activeNow();
        out.lastSayAfterStop = (rec.say.filter(s => s.t > t0 + 20000).slice(-1)[0] || {}).m; out.zombie = { stopGame: rec.stops - snap.stops, startGame: rec.starts - snap.starts, setCustomStadium: rec.stadiums.length - snap.stadiums, kick: rec.kicks.length - snap.kicks };
    } else if (scn.name === 'reinicio') {
        startGame(); await step(10000); stoppedRuns.add(runId); call(() => mod.stop(room), 'stop()'); await step(5000);
        room._st.running = false; for (const p of room._st.players.values()) { p.team = 0; p.disc = null; }
        const cb1 = rec.cb.filter(c => !c.afterStop).length; startGame(); await step(10000);
        out.secondStartActive = activeNow(); out.secondStartCb = rec.cb.filter(c => c.run === 2).length; await step(20000);
    } else if (scn.name === 'goles') {
        startGame(); await step(10000);
        for (const team of [1, 1, 2, 1, 2, 2, 1]) { if (hooks.goal) call(() => mod.onTeamGoal(room, team), 'onTeamGoal'); if (typeof room.onTeamGoal === 'function') call(() => room.onTeamGoal(team), 'room.onTeamGoal'); if (hooks.reset) call(() => mod.onPositionsReset(room), 'onPositionsReset'); await step(1500); }
        if (hooks.chat) call(() => mod.onPlayerChat({ id: 1, name: 'P1' }, 'hola'), 'onPlayerChat'); await step(30000);
    }
    out.finalActive = activeNow(); out.cbsLate = rec.cb.filter(c => c.afterStop).length; out.cbsPerRun = {}; rec.cb.forEach(c => { out.cbsPerRun[c.run] = (out.cbsPerRun[c.run] || 0) + 1; }); out.cbs = rec.cb.filter(c => !c.afterStop).map(c => ({ afterS: Math.round((c.t - 1_700_000_000_000) / 1000), winner: c.winner === null ? null : (c.winner === undefined ? undefined : { id: c.winner.id, name: c.winner.name }) }));
    out.throws = [...new Set(rec.throws)].slice(0, 4); out.errors = [...new Set(rec.errors)].slice(0, 4);
    out.unknown = Object.keys(rec.unknown); out.stadiums = [...new Set(rec.stadiums)]; out.stadiumWhileRunning = rec.stadiumWhileRunning; out.says = rec.say.length;
    return out;
}

// ---------- veredicto ----------
function judge(entry, results) {
    const fails = [], warns = [], infos = [];
    for (const r of results) {
        if (r.loadError) { fails.push('CARGA: ' + r.loadError); continue; }
        const tag = '[' + r.scn + ']';
        r.throws.forEach(t => fails.push(tag + ' EXCEPCION ' + t));
        r.errors.forEach(t => fails.push(tag + ' console.error: ' + t));
        Object.keys(r.cbsPerRun).forEach(k => { if (r.cbsPerRun[k] > 1) fails.push(tag + ' el aviso de fin se llamo ' + r.cbsPerRun[k] + ' veces en una misma partida'); });
        r.cbs.forEach(c => { if (c.winner !== null && c.winner !== undefined && (c.winner.id === undefined || !c.winner.name)) fails.push(tag + ' ganador sin id/nombre'); });
        if (r.scn === 'quieto') {
            if (!r.activeAt10s && r.cbAt10s === 0 && r.stadiums.length === 0) fails.push(tag + ' NO ARRANCA: a los 10 s ni esta activo, ni cargo mapa, ni avisó fin');
            else if (!r.activeAt10s && r.cbAt10s === 0) fails.push(tag + ' NO ARRANCA: cargo el mapa pero a los 10 s no esta activo ni avisó fin (pantalla en blanco)');
            if (r.finalActive && r.cbs.length === 0) infos.push(tag + ' sigue activo a los 120 s con jugadores quietos (lo corta el limite de 10 min)');
        }
        if (r.scn === 'detener') {
            if (r.activeAfterStop) fails.push(tag + ' tras stop() sigue isActive()=true');
            if (r.liveAt20s.intervals > 0) fails.push(tag + ' ' + r.liveAt20s.intervals + ' temporizador(es) repetitivo(s) VIVOS 20 s despues de stop() (fuga)');
            else if (r.liveAt120s.intervals > 0) fails.push(tag + ' temporizador repetitivo vivo 120 s despues de stop()');
            if (r.liveAt120s.timeouts > 0) warns.push(tag + ' ' + r.liveAt120s.timeouts + ' temporizador(es) pendiente(s) 120 s despues de stop() (proximo en ' + Math.round(r.liveAt120s.nextTimeoutMs / 1000) + ' s)');
            if (r.sayAfterStop > 0) warns.push(tag + ' el modulo siguio mandando ' + r.sayAfterStop + ' mensaje(s) despues de stop() (ultimo: "' + String(r.lastSayAfterStop).replace(/\s+/g, ' ').slice(0, 60) + '")');
            if (r.zombie && (r.zombie.stopGame || r.zombie.startGame || r.zombie.setCustomStadium || r.zombie.kick)) fails.push(tag + ' ZOMBI: despues de stop() siguio actuando sobre la sala (stopGame x' + r.zombie.stopGame + ', startGame x' + r.zombie.startGame + ', setCustomStadium x' + r.zombie.setCustomStadium + ', kick x' + r.zombie.kick + '): puede cortar o pisar el juego siguiente');
        if (r.cbAfterStop > 0) warns.push(tag + ' llamo al aviso de fin ' + r.cbAfterStop + ' vez/veces despues de stop() (la sala lo descarta)');
        }
        if (r.scn === 'reinicio' && !r.secondStartActive && r.secondStartCb === 0) fails.push(tag + ' tras detener y volver a iniciar NO arranca (estado sucio)');
        if (r.stadiumWhileRunning > 0) infos.push(tag + ' cargo mapa con la partida en marcha ' + r.stadiumWhileRunning + 'x');
    }
    return { fails: [...new Set(fails)], warns: [...new Set(warns)], infos: [...new Set(infos)] };
}


// ---------- autoprueba: modulos defectuosos de mentira (el auditor DEBE marcarlos todos como FALLA) ----------
function autotestRegistry() {
    const os = require('os');
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'auditoria-'));
    const hdr = "var mapData = null;\nvar gameState = { active: false };\n";
    const mods = {
        NEG_NO_ARRANCA: hdr + "function start(room, onGameEnd) { room.setCustomStadium(mapData); }\nfunction stop(room) { gameState.active = false; }\nfunction isActive() { return gameState.active; }\nmodule.exports = { start: start, stop: stop, isActive: isActive };",
        NEG_FUGA: hdr + "function start(room, onGameEnd) { room.setCustomStadium(mapData); gameState.active = true; setInterval(function() { room.sendAnnouncement('tic'); }, 1000); }\nfunction stop(room) { gameState.active = false; }\nfunction isActive() { return gameState.active; }\nmodule.exports = { start: start, stop: stop, isActive: isActive };",
        NEG_DOBLE_AVISO: hdr + "function start(room, onGameEnd) { room.setCustomStadium(mapData); gameState.active = true; setTimeout(function() { onGameEnd({ id: 1, name: 'P1' }); onGameEnd({ id: 1, name: 'P1' }); }, 3000); }\nfunction stop(room) { gameState.active = false; }\nfunction isActive() { return gameState.active; }\nmodule.exports = { start: start, stop: stop, isActive: isActive };",
        NEG_EXCEPCION: hdr + "function start(room, onGameEnd) { room.setCustomStadium(mapData); gameState.active = true; setTimeout(function() { var x = undefined; x.boom(); }, 2000); }\nfunction stop(room) { gameState.active = false; }\nfunction isActive() { return gameState.active; }\nmodule.exports = { start: start, stop: stop, isActive: isActive };",
        NEG_ZOMBI: hdr + "function start(room, onGameEnd) { room.setCustomStadium(mapData); gameState.active = true; setTimeout(function() { room.stopGame(); }, 40000); }\nfunction stop(room) { gameState.active = false; /* no cancela el temporizador */ }\nfunction isActive() { return gameState.active; }\nmodule.exports = { start: start, stop: stop, isActive: isActive };",
    };
    const mapFile = path.join(dir, 'mapa.hbs'); fs.writeFileSync(mapFile, '{"name":"mini","width":100,"height":100,"vertexes":[],"segments":[],"discs":[],"planes":[],"goals":[],"playerPhysics":{}}');
    return Object.keys(mods).map(k => { const f = path.join(dir, k + '.js'); fs.writeFileSync(f, mods[k]); return { name: k, file: f, mapFile, notes: [] }; });
}
(async () => {
    let reg = AUTOTEST ? autotestRegistry() : buildRegistry(root); reg = reg.filter(e => !only || only.includes(e.name));
    const scenarios = [{ name: 'quieto', n: 2, seed: 1 }, { name: 'quieto', n: 6, seed: 2 }, { name: 'salidas', n: 5, seed: 3 }, { name: 'detener', n: 4, seed: 4 }, { name: 'reinicio', n: 4, seed: 5 }, { name: 'goles', n: 4, seed: 6 }];
    const summary = [];
    for (const e of reg) {
        if (!e.file || !e.mapFile) { summary.push({ name: e.name, status: 'OMITIDO', fails: [], warns: [], infos: e.notes }); continue; }
        const code = fs.readFileSync(path.resolve(root, e.file), 'utf8'); const mapStr = fs.readFileSync(path.resolve(root, e.mapFile), 'utf8');
        let mapDiscs = [], mapObj = {}; let mapOk = true; try { mapObj = JSON.parse(mapStr); mapDiscs = mapObj.discs || []; } catch (er) { mapOk = false; }
        const results = [];
        for (const s of scenarios) { try { results.push(await runScenario(e, code, mapStr, mapDiscs, s, mapObj)); } catch (er) { results.push({ loadError: 'arnes: ' + er.message }); } }
        const j = judge(e, results);
        if (!mapOk) j.fails.unshift('MAPA: el archivo ' + e.mapFile + ' no es JSON valido');
        const unknown = [...new Set(results.flatMap(r => r.unknown || []))];
        const hooks = results.find(r => r.hooks) ? results.find(r => r.hooks).hooks : {};
        summary.push({ name: e.name, file: e.file, status: j.fails.length ? 'FALLA' : (j.warns.length ? 'AVISO' : 'OK'), fails: j.fails, warns: j.warns, infos: j.infos, unknown, hooks });
        process.stdout.write(summary[summary.length - 1].status === 'OK' ? '.' : (summary[summary.length - 1].status === 'FALLA' ? 'F' : 'a'));
    }
    console.log('\n');
    if (WRITE_JSON) fs.writeFileSync(path.join(__dirname, 'audit_result.json'), JSON.stringify(summary, null, 1));
    const c = s => summary.filter(x => x.status === s).length;
    if (AUTOTEST) {
        const missed = summary.filter(x => x.status !== 'FALLA');
        console.log('AUTOPRUEBA del auditor: detecta ' + (summary.length - missed.length) + '/' + summary.length + ' modulos defectuosos de mentira');
        missed.forEach(x => console.log('  NO DETECTADO:', x.name));
        process.exit(missed.length ? 1 : 0);
    }
    summary.filter(x => x.status === 'FALLA' || x.status === 'AVISO').forEach(x => {
        console.log('== ' + x.name + ' (' + x.file + ') -> ' + x.status);
        x.fails.forEach(t => console.log('   FALLA: ' + t)); x.warns.forEach(t => console.log('   aviso: ' + t));
    });
    console.log('Auditoria de minijuegos: ' + summary.length + ' juegos | OK: ' + c('OK') + ' | AVISO: ' + c('AVISO') + ' | FALLA: ' + c('FALLA') + ' | OMITIDO (carga especial): ' + c('OMITIDO'));
    process.exit(c('FALLA') ? 1 : 0);
})();