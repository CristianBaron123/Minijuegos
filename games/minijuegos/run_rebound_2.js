// ============================================
// MINIJUEGO: RUN REBOUND 2 - Parkour rebote
// Llega primero a la meta. Limite de 3 minutos.
// Meta en x>=3230, y entre 85 y 100
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    checkInterval: null,
    chatBlocked: false,
    gameStartTime: null,
    winnerFound: false,
    gameTimer: null,
    timeWarnings: {},
    callback: null
};

var config = {
    minPlayers: 2,
    graceMs: 3000,
    checkMs: 100,
    explanationMs: 5000,
    gameDurationMs: 180000, // 3 minutos
    winZone: { minX: 3230, minY: 50, maxY: 200 }
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[RUN_REBOUND_2] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    gameState.callback = onGameEnd || null;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[RUN_REBOUND_2] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para RUN REBOUND 2', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.winnerFound = false;
    gameState.timeWarnings = {};

    // Todos al equipo rojo para que aparezcan en los spawns
    for (var k = 0; k < players.length; k++) {
        try { room.setPlayerTeam(players[k].id, (k % 2 === 0) ? 1 : 2); } catch(e){}
    }

    room.sendAnnouncement(
        '🏁 RUN REBOUND 2\n👥 Jugadores: ' + players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        try { room.setCustomStadium(mapData); } catch(e){}
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🧗 PARKOUR! Calcula bien como rebotas y caes\n' +
            '🏆 El primero en llegar a la meta GANA\n' +
            '⏰ Tienen 3 MINUTOS - si nadie llega, se acaba\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 COMIENZA RUN REBOUND 2! (3 min)', null, 0x00FF00, 'bold', 2);

            // Timer de 3 minutos
            gameState.gameTimer = setTimeout(function() {
                if (!gameState.active) return;
                room.sendAnnouncement('⏰ TIEMPO AGOTADO! Nadie llego a la meta', null, 0xFF6600, 'bold', 2);
                gameState.active = false;
                if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
                setTimeout(function() {
                    if (gameState.callback) gameState.callback(null);
                    stop(room);
                }, 2000);
            }, config.gameDurationMs);
        }, config.explanationMs);
    }, 1500);

    setTimeout(function() {
        gameState.checkInterval = setInterval(function() { checkPlayers(room); }, config.checkMs);
    }, 1500 + config.explanationMs + config.graceMs);
}

function checkPlayers(room) {
    if (!gameState.active || gameState.winnerFound) return;

    // Avisos de tiempo
    if (gameState.gameStartTime) {
        var elapsed = Date.now() - gameState.gameStartTime;
        var remaining = config.gameDurationMs - elapsed;
        if (remaining <= 60000 && !gameState.timeWarnings['60']) {
            gameState.timeWarnings['60'] = true;
            room.sendAnnouncement('⏰ 1 MINUTO restante!', null, 0xFFFF00, 'bold', 2);
        }
        if (remaining <= 30000 && !gameState.timeWarnings['30']) {
            gameState.timeWarnings['30'] = true;
            room.sendAnnouncement('⏰ 30 SEGUNDOS restantes!', null, 0xFF6600, 'bold', 2);
        }
    }

    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.winnerFound) return;
        var p = gameState.players[i];
        var player = room.getPlayer(p.id);
        if (!player) continue;
        var pos = player.position;
        if (!pos) continue;

        if (pos.x >= config.winZone.minX && pos.y >= config.winZone.minY && pos.y <= config.winZone.maxY) {
            gameState.winnerFound = true;
            declareWinner(room, p);
            return;
        }
    }
}

function declareWinner(room, winner) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }

    room.sendAnnouncement(
        '\n🏆 ' + winner.name.toUpperCase() + ' HA GANADO RUN REBOUND 2! 🏆',
        null, 0xFFD700, 'bold', 2
    );
    setTimeout(function() { if (gameState.callback) gameState.callback(winner); }, 3000);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.winnerFound = false;
    gameState.timeWarnings = {};
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    gameState.players = gameState.players.filter(function(p) { return p.id !== player.id; });
    if (gameState.players.length === 0) {
        room.sendAnnouncement('❌ No hay ganador - todos se fueron', null, 0xFF0000);
        if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }
        stop(room);
    }
}

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};
