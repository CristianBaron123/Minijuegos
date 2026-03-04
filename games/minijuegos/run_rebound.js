// ============================================
// MINIJUEGO: RUN REBOUND - Parkour
// Llega primero a la meta. Limite de 3 minutos.
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
    winZone: { minX: 3780 }
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[RUN_REBOUND] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    gameState.callback = onGameEnd || null;

    // Verificacion 1: cargar mapa al inicio
    try { room.setCustomStadium(mapData); } catch(e) { console.error('[RUN_REBOUND] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para RUN REBOUND', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.winnerFound = false;
    gameState.timeWarnings = {};

    shuffleTeams(room);

    room.sendAnnouncement(
        '🏁 RUN REBOUND\n👥 Jugadores: ' + players.length,
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
            '🧗 Es PARKOUR! Salta y rebota hasta la meta\n' +
            '🏆 El primero en llegar GANA\n' +
            '⏰ Tienen 3 MINUTOS - si nadie llega, se acaba\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ¡COMIENZA RUN REBOUND! (3 min)', null, 0x00FF00, 'bold', 2);

            // Timer de 3 minutos
            gameState.gameTimer = setTimeout(function() {
                if (!gameState.active) return;
                room.sendAnnouncement('⏰ ¡TIEMPO AGOTADO! Nadie llego a la meta', null, 0xFF6600, 'bold', 2);
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
        gameState.checkInterval = setInterval(function() { checkPlayers(room, onGameEnd); }, config.checkMs);
    }, 1500 + config.explanationMs + config.graceMs);
}

function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;
    if (gameState.winnerFound) return;

    // Avisos de tiempo
    if (gameState.gameStartTime) {
        var elapsed = Date.now() - gameState.gameStartTime;
        var remaining = config.gameDurationMs - elapsed;
        if (remaining <= 60000 && !gameState.timeWarnings['60']) {
            gameState.timeWarnings['60'] = true;
            room.sendAnnouncement('⏰ ¡1 MINUTO restante!', null, 0xFFFF00, 'bold', 2);
        }
        if (remaining <= 30000 && !gameState.timeWarnings['30']) {
            gameState.timeWarnings['30'] = true;
            room.sendAnnouncement('⏰ ¡30 SEGUNDOS restantes!', null, 0xFF6600, 'bold', 2);
        }
    }

    gameState.players.forEach(function(p) {
        if (gameState.winnerFound) return;

        var player = room.getPlayer(p.id);
        if (!player) return;

        var pos = player.position;
        if (!pos) return;

        if (pos.x >= config.winZone.minX) {
            gameState.winnerFound = true;
            declareWinner(room, p, onGameEnd);
        }
    });
}

function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO RUN REBOUND! Llego a la meta! 🏆',
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
