// ============================================
// MINIJUEGO: LUCKY RACE - Carrera de suerte
// Llega primero a la meta esquivando obstaculos
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    checkInterval: null,
    chatBlocked: false,
    gameStartTime: null,
    firstEliminated: null,
    graceUntil: null,
    winnerFound: false
};

var config = {
    minPlayers: 2,
    graceMs: 3000,
    checkMs: 100,
    explanationMs: 5000,
    // Zona de meta: llegar a x=-2000
    winZone: { minX: -2020 }
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[LUCKY_RACE] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[LUCKY_RACE] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para LUCKY RACE', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.firstEliminated = null;
    gameState.graceUntil = null;
    gameState.winnerFound = false;

    shuffleTeams(room);

    room.sendAnnouncement(
        '🏁 LUCKY RACE\n👥 Jugadores: ' + players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🏁 Es una CARRERA de suerte!\n' +
            '🎲 Depende de tu suerte no chocar con obstaculos\n' +
            '🏆 El primero en llegar a la meta GANA!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            gameState.graceUntil = Date.now() + config.graceMs;
            room.sendAnnouncement('🟢 ¡COMIENZA LUCKY RACE!', null, 0x00FF00, 'bold', 2);
        }, config.explanationMs);
    }, 1500);

    setTimeout(function() {
        gameState.checkInterval = setInterval(function() { checkPlayers(room, onGameEnd); }, config.checkMs);
    }, 1500 + config.explanationMs + config.graceMs);
}

function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;
    if (gameState.winnerFound) return;

    gameState.players.forEach(function(p) {
        if (gameState.winnerFound) return;

        var player = room.getPlayer(p.id);
        if (!player) return;

        var pos = player.position;
        if (!pos) return;

        // Detectar si llego a la linea de meta
        if (pos.x >= config.winZone.minX) {
            gameState.winnerFound = true;
            declareWinner(room, p, onGameEnd);
        }
    });
}

function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO LUCKY RACE! Llego primero a la meta! 🏆',
        null, 0xFFD700, 'bold', 2
    );
    setTimeout(function() { if (onGameEnd) onGameEnd(winner); }, 3000);
}

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    // Carrera: todos al equipo 1 (RED)
    for (var k = 0; k < players.length; k++) {
        try { room.setPlayerTeam(players[k].id, 1); } catch(e){}
    }
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.graceUntil = null;
    gameState.winnerFound = false;
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    gameState.players = gameState.players.filter(function(p) { return p.id !== player.id; });
    if (gameState.players.length === 0) {
        room.sendAnnouncement('❌ No hay ganador - todos se fueron', null, 0xFF0000);
        stop(room);
    }
}

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

function getStats() {
    return { firstEliminated: gameState.firstEliminated };
}

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    getStats: getStats,
    setMapData: function(jsonString) { mapData = jsonString; }
};
