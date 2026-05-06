// ============================================
// MINIJUEGO: RACING GROUND - Carrera con checkpoints
// Mapa: 1.-Racing-Ground by HaxMods
// Sentido antihorario. 9 checkpoints obligatorios.
// ============================================

var mapData = null;

// Spawn: y=505-575, centro-bottom
// Finish line: y=420, x=-150 a 500 (cruzar yendo al NORTE = y decrece)
// Orden: izquierda → noroeste → norte → este → sureste → finish
var CHECKPOINTS = [
    { x: -350, y:  575, r: 120, name: 'CP1' },  // Izquierda-bottom
    { x: -350, y:  505, r: 120, name: 'CP2' },  // Izquierda-medio
    { x: -774, y:   74, r: 130, name: 'CP3' },  // Izquierda
    { x: -811, y: -338, r: 130, name: 'CP4' },  // Noroeste
    { x: -474, y: -414, r: 130, name: 'CP5' },  // Norte-oeste
    { x:  290, y: -515, r: 130, name: 'CP6' },  // Norte
    { x: 1345, y:   28, r: 130, name: 'CP7' },  // Este
    { x: 1453, y:  235, r: 130, name: 'CP8' },  // Este-sur
    { x:  665, y:  599, r: 120, name: 'CP9' },  // Sureste
];

// Finish: entrar al túnel desde la derecha (x decrece pasando 450) con y entre 480 y 620
var FINISH_X     = 450;
var FINISH_YMIN  = 480;
var FINISH_YMAX  = 620;

var gameState = {
    active:        false,
    started:       false,
    racers:        {},   // { pid: { name, auth, startTime, finishTime, nextCp, lastX, lastY, finished } }
    rankings:      [],
    callback:      null,
    checkInterval: null,
    gameTimer:     null
};

var config = {
    minPlayers:  2,
    maxGameMs:   360000   // 6 minutos máximo
};

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

function getPos(room, pid) {
    try {
        var d = room.getPlayerDiscProperties(pid);
        if (d) return { x: d.x, y: d.y };
    } catch(e) {}
    return null;
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

    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, (i % 2 === 0) ? 1 : 2); } catch(e) {}
    }

    room.sendAnnouncement(
        '🏎️ RACING GROUND - ' + players.length + ' corredores\n' +
        '🏁 Pasa los 9 checkpoints en orden y cruza la meta\n' +
        '⚠️ Saltarte un CP = no cuenta la vuelta',
        null, 0xFFD700, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e) {}
        try { room.pauseGame(true); } catch(e) {}
        try { botState.chatBlocked = true; } catch(e) {}

        room.sendAnnouncement('🟡 ¡Preparados! Arranca en 5 segundos...', null, 0xFFFF00, 'bold', 2);

        setTimeout(function() {
            try { botState.chatBlocked = false; } catch(e) {}
            try { room.pauseGame(false); } catch(e) {}

            var now = Date.now();
            var ps = room.getPlayerList().filter(function(p) { return p.id !== 0; });
            ps.forEach(function(p) {
                var pos = getPos(room, p.id);
                gameState.racers[p.id] = {
                    name:      p.name,
                    auth:      p.auth || null,
                    startTime: now,   // El timer empieza para todos al mismo tiempo
                    finishTime: null,
                    nextCp:    0,
                    lastX:     pos ? pos.x : 100,
                    lastY:     pos ? pos.y : 540,
                    finished:  false
                };
                try { room.setPlayerAvatar(p.id, '1'); } catch(e) {}
            });

            gameState.started = true;
            room.sendAnnouncement(
                '🟢 ¡ARRANCA! Ve a los checkpoints en orden. ¡Primero al CP1!',
                null, 0x00FF00, 'bold', 2
            );

            gameState.checkInterval = setInterval(function() { checkRace(room); }, 50);

            gameState.gameTimer = setTimeout(function() {
                if (!gameState.active) return;
                var sorted = buildRankings();
                var msg = '⏰ Tiempo agotado!\n🏆 Resultados:\n';
                sorted.forEach(function(r, i) {
                    var medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + '.';
                    msg += medal + ' ' + r.name +
                           (r.finished ? ' — ' + formatTime(r.finishTime - r.startTime) :
                            ' (CP ' + r.nextCp + '/' + CHECKPOINTS.length + ')') + '\n';
                });
                room.sendAnnouncement(msg, null, 0xFFFF00, 'bold', 2);
                endRace(room, sorted.length > 0 ? sorted[0] : null);
            }, config.maxGameMs);

        }, 5000);
    }, 1500);
}

// ──────────────────────────────────────────
// CHECK TICK (cada 50ms)
// ──────────────────────────────────────────
function checkRace(room) {
    if (!gameState.active || !gameState.started) return;

    var now = Date.now();
    var ps  = room.getPlayerList().filter(function(p) { return p.id !== 0; });

    ps.forEach(function(p) {
        var r = gameState.racers[p.id];
        if (!r || r.finished) return;

        var pos = getPos(room, p.id);
        if (!pos) return;

        var cx = pos.x;
        var cy = pos.y;

        // ── Checkpoints ─────────────────────────────────
        if (r.nextCp < CHECKPOINTS.length) {
            var cp = CHECKPOINTS[r.nextCp];
            if (dist2d(cx, cy, cp.x, cp.y) <= cp.r) {
                r.nextCp++;
                var cpNum = r.nextCp;
                var total = CHECKPOINTS.length;

                if (cpNum >= total) {
                    // Todos los CPs completos
                    try { room.setPlayerAvatar(p.id, '⚡'); } catch(e) {}
                    room.sendAnnouncement('✅ ' + p.name + ' ¡Todos los CPs! ¡Ve a la META!', null, 0x00FF00, 'bold');
                } else {
                    try { room.setPlayerAvatar(p.id, cpNum.toString()); } catch(e) {}
                    if (cpNum % 3 === 0) {
                        room.sendAnnouncement('📍 ' + p.name + ': CP ' + cpNum + '/' + total, null, 0xAAAAAA);
                    }
                }
            }
        }

        // ── Detección de META: vienen del CP9 (x=665) hacia la izquierda, entran al túnel cruzando x=450 ──
        var prevX = r.lastX;
        if (r.nextCp >= CHECKPOINTS.length) {
            if (cy >= FINISH_YMIN && cy <= FINISH_YMAX && prevX > FINISH_X && cx <= FINISH_X) {
                r.finished   = true;
                r.finishTime = now;
                var elapsed  = now - r.startTime;
                var pos2     = gameState.rankings.length + 1;
                var medal    = pos2 === 1 ? '🥇' : pos2 === 2 ? '🥈' : pos2 === 3 ? '🥉' : pos2 + '.';

                gameState.rankings.push({ id: p.id, name: p.name, time: elapsed, auth: r.auth });

                room.sendAnnouncement(
                    medal + ' ' + p.name.toUpperCase() + ' TERMINA! ⏱️ ' + formatTime(elapsed),
                    null, pos2 === 1 ? 0xFFD700 : 0x00BFFF, 'bold', 2
                );
                try { room.setPlayerAvatar(p.id, medal); } catch(e) {}

                if (pos2 === 1) {
                    setTimeout(function() { if (gameState.active) endRace(room, gameState.rankings[0]); }, 3000);
                }

                var unfinished = Object.keys(gameState.racers).filter(function(id) {
                    return !gameState.racers[id].finished;
                });
                if (unfinished.length === 0) { endRace(room, gameState.rankings[0]); }
            }
        }

        r.lastX = cx;
        r.lastY = cy;
    });
}

function buildRankings() {
    return Object.keys(gameState.racers).map(function(id) {
        return gameState.racers[id];
    }).sort(function(a, b) {
        if (a.finished && !b.finished) return -1;
        if (!a.finished && b.finished) return 1;
        if (a.finished && b.finished) return a.finishTime - b.finishTime;
        return b.nextCp - a.nextCp;
    });
}

function endRace(room, winner) {
    if (!gameState.active) return;
    gameState.active = false;

    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer)     { clearTimeout(gameState.gameTimer);     gameState.gameTimer = null; }

    if (gameState.rankings.length > 1) {
        var podio = '\n🏆 PODIO FINAL:\n';
        gameState.rankings.slice(0, 5).forEach(function(r, i) {
            var medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + '.';
            podio += medal + ' ' + r.name + ' — ' + formatTime(r.time) + '\n';
        });
        room.sendAnnouncement(podio, null, 0xFFD700, 'bold', 2);
    }

    setTimeout(function() {
        var all = room.getPlayerList().filter(function(p) { return p.id !== 0; });
        all.forEach(function(p) { try { room.setPlayerAvatar(p.id, null); } catch(e) {} });
        try { room.stopGame(); } catch(e) {}
        // Asegurar que el ganador esté en team 1 para que loadLuckyMap no lo anule
        if (winner && winner.id) {
            try {
                var w = room.getPlayer(winner.id);
                if (w && w.team === 0) { room.setPlayerTeam(winner.id, 1); }
            } catch(e) {}
        }
        if (gameState.callback) { gameState.callback(winner || null); }
    }, 3000);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer)     { clearTimeout(gameState.gameTimer);     gameState.gameTimer = null; }
    gameState.racers   = {};
    gameState.rankings = [];
    try { botState.chatBlocked = false; } catch(e) {}
    try { room.stopGame(); } catch(e) {}
}

function onPlayerLeave(room, player) {
    if (!gameState.active || !gameState.racers[player.id]) return;
    delete gameState.racers[player.id];
    room.sendAnnouncement('❌ ' + player.name + ' abandonó la carrera', null, 0xFF6600);
    var remaining = Object.keys(gameState.racers).filter(function(id) {
        return !gameState.racers[id].finished;
    });
    if (remaining.length === 0 && gameState.rankings.length > 0) {
        endRace(room, gameState.rankings[0]);
    }
}

function onPlayerChat(player, message) { return true; }
function isActive()  { return gameState.active; }
function getStats()  { return {}; }

module.exports = {
    start:         start,
    stop:          stop,
    isActive:      isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat:  onPlayerChat,
    getStats:      getStats,
    setMapData:    function(d) { mapData = d; }
};
