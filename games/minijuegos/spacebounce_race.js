// ============================================
// MINIJUEGO: SPACEBOUNCE RACE - Carrera SpaceBounce
// Llega primero a la meta
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    checkInterval: null,
    chatBlocked: false,
    gameStartTime: null,
    winnerFound: false
};

var config = {
    minPlayers: 2,
    graceMs: 3000,
    checkMs: 100,
    explanationMs: 5000,
    winZone: { minX: 12110, minY: -15, maxY: 15 }
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[SPACEBOUNCE_RACE] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    // Verificacion 1: cargar mapa al inicio
    try { room.setCustomStadium(mapData); } catch(e) { console.error('[SPACEBOUNCE_RACE] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para SPACEBOUNCE RACE', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.winnerFound = false;

    shuffleTeams(room);

    room.sendAnnouncement(
        '🏁 SPACEBOUNCE RACE\n👥 Jugadores: ' + players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        // Verificacion 2: confirmar mapa antes de iniciar
        try { room.setCustomStadium(mapData); } catch(e){}
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🏁 Es una CARRERA SpaceBounce!\n' +
            '🚀 Rebota y avanza hasta la meta\n' +
            '🏆 El primero en llegar a la meta GANA!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ¡COMIENZA SPACEBOUNCE RACE!', null, 0x00FF00, 'bold', 2);
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

        if (pos.x >= config.winZone.minX && pos.y >= config.winZone.minY && pos.y <= config.winZone.maxY) {
            gameState.winnerFound = true;
            declareWinner(room, p, onGameEnd);
        }
    });
}

function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO SPACEBOUNCE RACE! 🏆',
        null, 0xFFD700, 'bold', 2
    );
    setTimeout(function() { if (onGameEnd) onGameEnd(winner); }, 3000);
}

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    for (var k = 0; k < players.length; k++) {
        try { room.setPlayerTeam(players[k].id, 1); } catch(e){}
    }
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.chatBlocked = false;
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

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};
