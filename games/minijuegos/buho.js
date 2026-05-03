// ============================================
// MINIJUEGO: BUHO - Todos contra Todos
// 1 vida por jugador. 2-16 jugadores.
// Cada jugador defiende su portería.
// ============================================

var buhoData = null; // { maps: { "2": "...", ..., "CAMPEON": "..." }, goalCenters: { "2": [{x,y},...], ... } }

var gameState = {
    active: false,
    players: {},         // { id: { name, auth, goalIndex, alive } }
    goalCenters: [],     // centros de goals del mapa actual
    currentMapSize: 0,
    lastBallPos: null,
    callback: null,
    shrinkTimeout: null,
    championTimeout: null
};

// ──────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────

function loadMapForPlayers(room, n) {
    var maps = buhoData.maps;
    var key = n.toString();
    if (!maps[key]) {
        for (var k = n; k >= 2; k--) {
            if (maps[k.toString()]) { key = k.toString(); break; }
        }
    }
    if (!maps[key]) return false;
    try {
        room.setCustomStadium(maps[key]);
        gameState.currentMapSize = parseInt(key);
        gameState.goalCenters = buhoData.goalCenters[key] || [];
        return true;
    } catch(e) {
        console.error('[BUHO] Error cargando mapa ' + key + '-MAN: ' + e.message);
        return false;
    }
}

function getAlivePlayers() {
    var result = [];
    for (var id in gameState.players) {
        if (gameState.players[id].alive) result.push(parseInt(id));
    }
    return result;
}

function assignGoals(room) {
    var alive = getAlivePlayers();
    var goals = gameState.goalCenters;
    if (goals.length === 0 || alive.length === 0) return;

    var claimed = {};

    function closestFreeGoal(playerX, playerY) {
        var best = -1, bestDist = 999999;
        for (var i = 0; i < goals.length; i++) {
            if (claimed[i]) continue;
            var dx = playerX - goals[i].x;
            var dy = playerY - goals[i].y;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < bestDist) { bestDist = d; best = i; }
        }
        return best;
    }

    var playersWithPos = [];
    for (var k = 0; k < alive.length; k++) {
        var pid = alive[k];
        var pos = null;
        try { var pp = room.getPlayerDiscProperties(pid); if (pp) pos = { x: pp.x, y: pp.y }; } catch(e) {}
        playersWithPos.push({ id: pid, x: pos ? pos.x : 0, y: pos ? pos.y : 0 });
    }

    for (var j = 0; j < playersWithPos.length; j++) {
        var pw = playersWithPos[j];
        var gi = closestFreeGoal(pw.x, pw.y);
        if (gi >= 0) {
            gameState.players[pw.id].goalIndex = gi;
            claimed[gi] = true;
        }
    }

    for (var m = 0; m < alive.length; m++) {
        var pid2 = alive[m];
        var gi2 = gameState.players[pid2].goalIndex;
        if (gi2 < 0 || gi2 >= goals.length) continue;
        var gx = goals[gi2].x;
        var gy = goals[gi2].y;
        try {
            var curPos = null;
            try { var cp = room.getPlayerDiscProperties(pid2); if (cp) curPos = { x: cp.x, y: cp.y }; } catch(e2) {}
            if (curPos) {
                var cdx = curPos.x - gx;
                var cdy = curPos.y - gy;
                var cdist = Math.sqrt(cdx * cdx + cdy * cdy);
                if (cdist > 100) {
                    room.setPlayerDiscProperties(pid2, { x: Math.round(gx * 0.7), y: Math.round(gy * 0.7), xspeed: 0, yspeed: 0 });
                }
            }
        } catch(e) {}
    }
}

function checkRemaining(room) {
    if (!gameState.active) return;
    var alive = getAlivePlayers();

    if (alive.length <= 1) {
        gameState.active = false;
        var winnerId = alive.length === 1 ? alive[0] : null;

        if (gameState.shrinkTimeout) { clearTimeout(gameState.shrinkTimeout); gameState.shrinkTimeout = null; }
        if (gameState.championTimeout) { clearTimeout(gameState.championTimeout); gameState.championTimeout = null; }

        if (winnerId) {
            var winner = gameState.players[winnerId];
            winner.id = winnerId;
            room.sendAnnouncement('\n🏆🦉 ' + winner.name.toUpperCase() + ' GANA BUHO! 🦉🏆', null, 0xFFD700, 'bold', 2);
            try { room.setPlayerAvatar(winnerId, null); } catch(e) {}

            // Mapa campeón
            if (buhoData.maps['CAMPEON']) {
                try { room.stopGame(); } catch(e) {}
                try { room.setCustomStadium(buhoData.maps['CAMPEON']); } catch(e) {}
                try { room.setPlayerTeam(winnerId, 1); } catch(e) {}
                try { room.startGame(); } catch(e) {}
            }

            gameState.championTimeout = setTimeout(function() {
                try { room.stopGame(); } catch(e) {}
                var all = room.getPlayerList().filter(function(p) { return p.id !== 0; });
                for (var i = 0; i < all.length; i++) {
                    try { room.setPlayerTeam(all[i].id, 0); } catch(e) {}
                    try { room.setPlayerAvatar(all[i].id, null); } catch(e) {}
                }
                if (gameState.callback) gameState.callback(winner);
            }, 4000);

        } else {
            room.sendAnnouncement('🦉 Empate! No hay ganador.', null, 0xFF6600);
            try { room.stopGame(); } catch(e) {}
            if (gameState.callback) gameState.callback(null);
        }

    } else if (alive.length < gameState.currentMapSize) {
        // Reducir mapa
        try { room.stopGame(); } catch(e) {}

        gameState.shrinkTimeout = setTimeout(function() {
            if (!gameState.active && alive.length > 1) {
                // ya se resolvió en otro path, no hacer nada
                return;
            }
            var newSize = Math.min(alive.length, 16);
            if (!loadMapForPlayers(room, newSize)) return;

            // Mover eliminados a spec, reasignar equipos a los vivos
            for (var id in gameState.players) {
                if (!gameState.players[id].alive) {
                    try { room.setPlayerTeam(parseInt(id), 0); } catch(e) {}
                }
            }
            var aliveList = getAlivePlayers();
            for (var j = 0; j < aliveList.length; j++) {
                try { room.setPlayerTeam(aliveList[j], (j % 2 === 0) ? 1 : 2); } catch(e) {}
            }

            room.sendAnnouncement('⚡ ' + aliveList.length + ' jugadores restantes! Defiende donde apareces', null, 0xFFFF00, 'bold', 2);
            try { room.startGame(); } catch(e) {}
            try { room.pauseGame(true); } catch(e) {}
            setTimeout(function() {
                assignGoals(room);
                try { room.pauseGame(false); } catch(e) {}
            }, 1500);
        }, 1500);
    }
}

// ──────────────────────────────────────────
// API del módulo
// ──────────────────────────────────────────

function start(room, onGameEnd) {
    if (!buhoData) {
        console.error('[BUHO] buhoData no inyectado.');
        if (onGameEnd) onGameEnd(null);
        return;
    }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0 && p.team !== 0; });
    if (players.length < 3) {
        room.sendAnnouncement('⚠️ Se necesitan al menos 3 jugadores para Buho', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }
    if (players.length > 16) {
        room.sendAnnouncement('⚠️ Buho es para máximo 16 jugadores', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = {};
    gameState.lastBallPos = null;
    gameState.callback = onGameEnd || null;
    gameState.shrinkTimeout = null;
    gameState.championTimeout = null;

    // Distribuir equipos y registrar jugadores
    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, (i % 2 === 0) ? 1 : 2); } catch(e) {}
        gameState.players[players[i].id] = {
            name: players[i].name,
            auth: players[i].auth || null,
            goalIndex: -1,
            alive: true
        };
        try { room.setPlayerAvatar(players[i].id, null); } catch(e) {}
    }

    var mapSize = Math.min(players.length, 16);
    if (!loadMapForPlayers(room, mapSize)) {
        room.sendAnnouncement('❌ Error cargando mapa Buho', null, 0xFF0000);
        gameState.active = false;
        if (onGameEnd) onGameEnd(null);
        return;
    }

    room.sendAnnouncement(
        '🦉 BUHO — ' + players.length + ' jugadores\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        '🎯 Defiende la cancha donde apareces\n' +
        '💀 1 sola vida — si meten gol en tu cancha, quedas eliminado\n' +
        '🏆 El último en pie gana!\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        null, 0xFFD700, 'bold', 2
    );

    try { room.startGame(); } catch(e) {}
    try { room.pauseGame(true); } catch(e) {}

    setTimeout(function() {
        assignGoals(room);
        room.sendAnnouncement('🎯 Defiende la cancha donde apareciste!', null, 0x00FFFF, 'bold', 2);
        setTimeout(function() {
            try { room.pauseGame(false); } catch(e) {}
        }, 3000);
    }, 1500);
}

function stop(room) {
    gameState.active = false;
    if (gameState.shrinkTimeout) { clearTimeout(gameState.shrinkTimeout); gameState.shrinkTimeout = null; }
    if (gameState.championTimeout) { clearTimeout(gameState.championTimeout); gameState.championTimeout = null; }
    var all = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    for (var i = 0; i < all.length; i++) {
        try { room.setPlayerAvatar(all[i].id, null); } catch(e) {}
    }
    gameState.players = {};
    try { room.stopGame(); } catch(e) {}
}

function onTeamGoal(room, team) {
    if (!gameState.active) return;

    // Intentar obtener posición actual de la bola (más preciso), fallback a lastBallPos
    var ballPos = null;
    try {
        var bp = room.getDiscProperties(0);
        if (bp) ballPos = { x: bp.x, y: bp.y };
    } catch(e) {}
    if (!ballPos) ballPos = gameState.lastBallPos;
    if (!ballPos) {
        console.log('[BUHO] onTeamGoal: sin posición de bola');
        room.sendAnnouncement('⚠️ Error: no se detectó posición de la bola', null, 0xFF0000);
        return;
    }

    if (gameState.goalCenters.length === 0) {
        console.log('[BUHO] onTeamGoal: goalCenters vacío! mapSize=' + gameState.currentMapSize);
        room.sendAnnouncement('⚠️ Error: goalCenters no cargados para mapa ' + gameState.currentMapSize, null, 0xFF0000);
        return;
    }

    // Encontrar goal más cercano a la posición de la bola
    var closest = -1;
    var minDist = 999999;
    for (var i = 0; i < gameState.goalCenters.length; i++) {
        var dx = ballPos.x - gameState.goalCenters[i].x;
        var dy = ballPos.y - gameState.goalCenters[i].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) { minDist = dist; closest = i; }
    }
    if (closest === -1) {
        console.log('[BUHO] onTeamGoal: no se encontró goal cercano. goalCenters=' + gameState.goalCenters.length);
        return;
    }

    // Encontrar dueño de esa portería
    var ownerId = null;
    for (var id in gameState.players) {
        if (gameState.players[id].goalIndex === closest && gameState.players[id].alive) {
            ownerId = parseInt(id);
            break;
        }
    }
    if (ownerId === null) {
        console.log('[BUHO] onTeamGoal: goal ' + closest + ' sin dueño vivo. goalIndex de jugadores:');
        for (var id2 in gameState.players) {
            console.log('  ' + id2 + ': goalIndex=' + gameState.players[id2].goalIndex + ' alive=' + gameState.players[id2].alive);
        }
        return;
    }

    var p = gameState.players[ownerId];
    p.alive = false;
    room.sendAnnouncement('☠️ ' + p.name + ' ELIMINADO!', null, 0xFF0000, 'bold', 2);
    try { room.setPlayerAvatar(ownerId, '💀'); } catch(e) {}

    setTimeout(function() { checkRemaining(room); }, 1000);
}

function onGameTick(room) {
    if (!gameState.active) return;
    try {
        var bp = room.getDiscProperties(0);
        if (bp) gameState.lastBallPos = { x: bp.x, y: bp.y };
    } catch(e) {}
}

function onPositionsReset(room) {
    if (!gameState.active) return;
    setTimeout(function() { assignGoals(room); }, 200);
}

function onPlayerLeave(room, player) {
    if (!gameState.active || !gameState.players[player.id]) return;
    gameState.players[player.id].alive = false;
    delete gameState.players[player.id];
    room.sendAnnouncement('❌ ' + player.name + ' salió de Buho', null, 0xFF6600);
    checkRemaining(room);
}

function onPlayerChat(player, message) { return true; }
function isActive() { return gameState.active; }
function getStats() { return {}; }

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    getStats: getStats,
    onTeamGoal: onTeamGoal,
    onGameTick: onGameTick,
    onPositionsReset: onPositionsReset,
    setMapData: function(data) { buhoData = data; }
};
