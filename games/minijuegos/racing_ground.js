// ============================================
// MINIJUEGO: RACING GROUND - Carrera con checkpoints
// Mapa: 1.-Racing-Ground by HaxMods
// Anti-trampa: 9 checkpoints obligatorios en orden
// ============================================

var mapData = null;

// ──────────────────────────────────────────
// CHECKPOINTS en orden de carrera
// (basados en los discos transparentes del mapa)
// Dirección: Inicio → Este → Norte → Oeste → Inicio
// ──────────────────────────────────────────
var CHECKPOINTS = [
    { x:  665, y:  600, r: 115, name: 'CP1' },  // Sur-Este
    { x: 1440, y:  235, r: 140, name: 'CP2' },  // Este-Sur
    { x: 1345, y:   28, r: 140, name: 'CP3' },  // Este-Norte
    { x:  802, y: -418, r: 130, name: 'CP4' },  // Norte-Este
    { x:  290, y: -515, r: 130, name: 'CP5' },  // Norte
    { x: -474, y: -414, r: 130, name: 'CP6' },  // Norte-Oeste
    { x: -811, y: -338, r: 130, name: 'CP7' },  // Oeste
    { x: -774, y:   74, r: 130, name: 'CP8' },  // Oeste-Sur
    { x: -350, y:  540, r: 115, name: 'CP9' },  // Sur-Oeste
];

// Línea de meta: franja horizontal en y≈420, x entre -200 y 550
// Cruzar hacia NORTE (y baja) = arrancar
// Cruzar hacia SUR  (y sube) + todos CPs = terminar
var FINISH_Y    = 420;
var FINISH_XMIN = -200;
var FINISH_XMAX = 550;

var gameState = {
    active:   false,
    started:  false,
    racers:   {},       // { pid: { name, auth, startTime, finishTime, nextCp, lastY, finished } }
    rankings: [],
    callback: null,
    checkInterval: null,
    gameTimer:     null
};

var config = {
    minPlayers:  2,
    countdownMs: 5000,
    maxGameMs:   360000   // 6 minutos máximo
};

// ──────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────
function dist2d(x1, y1, x2, y2) {
    var dx = x1 - x2, dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

function formatTime(ms) {
    var totalSec = Math.floor(ms / 1000);
    var min  = Math.floor(totalSec / 60);
    var sec  = totalSec % 60;
    var cent = Math.floor((ms % 1000) / 10);
    return (min > 0 ? min + ':' + (sec < 10 ? '0' : '') : '') +
           sec + '.' + (cent < 10 ? '0' : '') + cent + 's';
}

// ──────────────────────────────────────────
// START
// ──────────────────────────────────────────
function start(room, onGameEnd) {
    if (!mapData) {
        console.error('[RACING_GROUND] mapData no inyectado.');
        if (onGameEnd) onGameEnd(null);
        return;
    }

    try { room.setCustomStadium(mapData); } catch(e) {
        console.error('[RACING_GROUND] Error mapa:', e.message);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ Se necesitan al menos 2 jugadores para la carrera', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active   = true;
    gameState.started  = false;
    gameState.racers   = {};
    gameState.rankings = [];
    gameState.callback = onGameEnd || null;

    // Distribuir equipos alternando para usar ambos spawns
    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, (i % 2 === 0) ? 1 : 2); } catch(e) {}
    }

    room.sendAnnouncement(
        '🏎️ RACING GROUND - ' + players.length + ' corredores\n' +
        '🏁 Completa 1 vuelta pasando los 9 checkpoints en orden\n' +
        '⚠️ Saltarte un CP = no cuenta la vuelta',
        null, 0xFFD700, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e) {}
        try { room.pauseGame(true); } catch(e) {}

        room.sendAnnouncement('🟡 ¡Preparados! Comienza en 5 segundos...', null, 0xFFFF00, 'bold', 2);

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e) {}

            // Inicializar corredores con su Y actual
            var ps = room.getPlayerList().filter(function(p) { return p.id !== 0 && p.team !== 0; });
            ps.forEach(function(p) {
                var py = (p.position) ? p.position.y : 540;
                gameState.racers[p.id] = {
                    name:       p.name,
                    auth:       p.auth || null,
                    startTime:  null,
                    finishTime: null,
                    nextCp:     0,
                    lastY:      py,
                    finished:   false
                };
                try { room.setPlayerAvatar(p.id, '🏁'); } catch(e) {}
            });

            gameState.started = true;
            room.sendAnnouncement(
                '🟢 ¡ARRANCA! Cruza la línea de meta yendo HACIA ARRIBA para iniciar tu vuelta.',
                null, 0x00FF00, 'bold', 2
            );

            gameState.checkInterval = setInterval(function() { checkRace(room); }, 50);

            // Tiempo máximo
            gameState.gameTimer = setTimeout(function() {
                if (!gameState.active) return;
                var sorted = buildRankings(room);
                var msg = '⏰ Tiempo agotado!\n🏆 Resultados:\n';
                sorted.forEach(function(r, i) {
                    var medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + '.';
                    msg += medal + ' ' + r.name +
                           (r.finished ? ' — ' + formatTime(r.finishTime - r.startTime) :
                            ' (' + r.nextCp + '/' + CHECKPOINTS.length + ' CPs)') + '\n';
                });
                room.sendAnnouncement(msg, null, 0xFFFF00, 'bold', 2);
                endRace(room, sorted.length > 0 ? sorted[0] : null);
            }, config.maxGameMs);

        }, config.countdownMs);
    }, 1500);
}

// ──────────────────────────────────────────
// CHECK TICK (cada 50ms)
// ──────────────────────────────────────────
function checkRace(room) {
    if (!gameState.active || !gameState.started) return;

    var now = Date.now();
    var ps  = room.getPlayerList().filter(function(p) { return p.id !== 0 && p.team !== 0; });

    ps.forEach(function(p) {
        var r = gameState.racers[p.id];
        if (!r || r.finished || !p.position) return;

        var cx = p.position.x;
        var cy = p.position.y;
        var prevY = r.lastY;

        // ── Detección de cruce de META ──────────────────
        if (cx >= FINISH_XMIN && cx <= FINISH_XMAX) {

            // START: cruzó yendo hacia el NORTE (y bajando a través de FINISH_Y)
            if (!r.startTime && prevY > FINISH_Y && cy <= FINISH_Y) {
                r.startTime = now;
                r.nextCp = 0;
                room.sendAnnouncement('🏁 ' + p.name + ' ¡ARRANCÓ! Busca los checkpoints.', null, 0x00FF00);
                try { room.setPlayerAvatar(p.id, '1'); } catch(e) {}
            }

            // FINISH: cruzó yendo hacia el SUR (y subiendo a través de FINISH_Y) con todos los CPs
            if (r.startTime && prevY < FINISH_Y && cy >= FINISH_Y) {
                if (r.nextCp >= CHECKPOINTS.length) {
                    // ¡TERMINÓ!
                    r.finished   = true;
                    r.finishTime = now;
                    var elapsed  = now - r.startTime;
                    var pos      = gameState.rankings.length + 1;
                    var medal    = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : pos + '.';

                    gameState.rankings.push({ id: p.id, name: p.name, time: elapsed, auth: r.auth });

                    room.sendAnnouncement(
                        medal + ' ' + p.name.toUpperCase() + ' TERMINA! ⏱️ ' + formatTime(elapsed),
                        null, pos === 1 ? 0xFFD700 : 0x00BFFF, 'bold', 2
                    );
                    try { room.setPlayerAvatar(p.id, medal); } catch(e) {}

                    // Si ganó el 1º, esperar 20s para los demás y terminar
                    if (pos === 1) {
                        setTimeout(function() { if (gameState.active) endRace(room, gameState.rankings[0]); }, 20000);
                    }

                    // Si todos terminaron, terminar ya
                    var unfinished = Object.keys(gameState.racers).filter(function(id) {
                        return !gameState.racers[id].finished && gameState.racers[id].startTime;
                    });
                    if (unfinished.length === 0) { endRace(room, gameState.rankings[0]); }

                } else {
                    // Intentó cruzar la meta sin todos los CPs
                    room.sendAnnouncement(
                        '⛔ ' + p.name + ' te falta completar checkpoints! (' + r.nextCp + '/' + CHECKPOINTS.length + ')',
                        p.id, 0xFF0000, 'bold'
                    );
                }
            }
        }

        // ── Detección de CHECKPOINTS ────────────────────
        if (r.startTime && !r.finished && r.nextCp < CHECKPOINTS.length) {
            var cp = CHECKPOINTS[r.nextCp];
            if (dist2d(cx, cy, cp.x, cp.y) <= cp.r) {
                r.nextCp++;
                var progress = r.nextCp + '/' + CHECKPOINTS.length;
                try { room.setPlayerAvatar(p.id, r.nextCp >= CHECKPOINTS.length ? '⚡' : r.nextCp.toString()); } catch(e) {}

                if (r.nextCp >= CHECKPOINTS.length) {
                    room.sendAnnouncement('✅ ' + p.name + ' ¡Todos los CPs! Vuelve a la META!', null, 0x00FF00, 'bold');
                } else {
                    // Solo anuncio cada 3 CPs para no saturar el chat
                    if (r.nextCp % 3 === 0) {
                        room.sendAnnouncement('📍 ' + p.name + ': ' + progress, null, 0xAAAAAA);
                    }
                }
            }
        }

        r.lastY = cy;
    });
}

// ──────────────────────────────────────────
// Helpers internos
// ──────────────────────────────────────────
function buildRankings(room) {
    var all = Object.keys(gameState.racers).map(function(id) {
        return gameState.racers[id];
    });
    return all.sort(function(a, b) {
        if (a.finished && !b.finished) return -1;
        if (!a.finished && b.finished) return 1;
        if (a.finished && b.finished) return a.finishTime - b.finishTime;
        // Por progreso de CPs
        return b.nextCp - a.nextCp;
    });
}

function endRace(room, winner) {
    if (!gameState.active) return;
    gameState.active = false;

    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer)     { clearTimeout(gameState.gameTimer);     gameState.gameTimer = null; }

    // Limpiar avatars
    var all = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    all.forEach(function(p) { try { room.setPlayerAvatar(p.id, null); } catch(e) {} });

    // Mostrar podio final si hay más de 1 clasificado
    if (gameState.rankings.length > 1) {
        var podio = '\n🏆 PODIO FINAL:\n';
        gameState.rankings.slice(0, 5).forEach(function(r, i) {
            var medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + '.';
            podio += medal + ' ' + r.name + ' — ' + formatTime(r.time) + '\n';
        });
        room.sendAnnouncement(podio, null, 0xFFD700, 'bold', 2);
    }

    setTimeout(function() {
        try { room.stopGame(); } catch(e) {}
        if (gameState.callback) {
            gameState.callback(winner || null);
        }
    }, 3000);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer)     { clearTimeout(gameState.gameTimer);     gameState.gameTimer = null; }
    gameState.racers   = {};
    gameState.rankings = [];
    try { room.stopGame(); } catch(e) {}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    if (!gameState.racers[player.id]) return;

    delete gameState.racers[player.id];
    room.sendAnnouncement('❌ ' + player.name + ' abandonó la carrera', null, 0xFF6600);

    var remaining = Object.keys(gameState.racers).filter(function(id) {
        return gameState.racers[id].startTime && !gameState.racers[id].finished;
    });
    if (remaining.length === 0 && gameState.rankings.length > 0) {
        endRace(room, gameState.rankings[0]);
    }
}

function onPlayerChat(player, message) { return true; }
function isActive()  { return gameState.active; }
function getStats()  { return {}; }

module.exports = {
    start:        start,
    stop:         stop,
    isActive:     isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    getStats:     getStats,
    setMapData:   function(d) { mapData = d; }
};
