// ============================================
// MINIJUEGO: LASER RACE 20000 - Carrera con obstaculos laser
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    checkInterval: null,
    chatBlocked: false,
    gameStartTime: null,
    graceUntil: null
};

// Config
var config = {
    explanationMs: 5000,
    graceMs: 3000,   // gracia antes de verificar zona de meta
    checkMs: 100     // intervalo de verificacion
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[LASER_RACE] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[LASER_RACE] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 1) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para LASER RACE', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.gameStartTime = null;
    gameState.graceUntil = null;

    // Poner a todos en equipo 1 (RED)
    shuffleTeams(room);

    room.sendAnnouncement(
        '🔫 LASER RACE 20000\n👥 Jugadores: ' + players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🔫 LASER RACE - Carrera con obstaculos laser!\n' +
            '⚠️ Esquiva los lasers mientras corres\n' +
            '🏆 El primero en llegar a la meta GANA!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            gameState.graceUntil = Date.now() + config.graceMs;
            room.sendAnnouncement('🟢 ¡COMIENZA LASER RACE!', null, 0x00FF00, 'bold', 2);

            // Iniciar verificacion periodica de zona de meta
            gameState.checkInterval = setInterval(function() { checkWinZone(room, onGameEnd); }, config.checkMs);
        }, config.explanationMs);
    }, 1500);
}

function checkWinZone(room, onGameEnd) {
    if (!gameState.active) return;

    // No verificar durante periodo de gracia
    if (gameState.graceUntil && Date.now() < gameState.graceUntil) return;

    var allPlayers = room.getPlayerList().filter(function(p) { return p.id !== 0 && p.team !== 0; });

    for (var i = 0; i < allPlayers.length; i++) {
        var p = allPlayers[i];
        if (!p) continue;

        var pos = p.position;
        if (!pos) continue;

        // Zona de meta: cruzar la linea x=-300 de izq a der, entre y=-14 y y=14
        if (pos.x >= -300 && pos.y >= -14 && pos.y <= 14) {
            // Primer jugador en cruzar gana
            declareWinner(room, p, onGameEnd);
            return;
        }
    }
}

function declareWinner(room, winner, onGameEnd) {
    if (!gameState.active) return;

    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    var elapsed = '';
    if (gameState.gameStartTime) {
        elapsed = ' (' + ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1) + 's)';
    }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO LASER RACE! Llego primero a la meta!' + elapsed + ' 🏆',
        null, 0xFFD700, 'bold', 2
    );

    setTimeout(function() {
        if (onGameEnd) onGameEnd(winner);
    }, 3000);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.gameStartTime = null;
    gameState.graceUntil = null;
    try { room.stopGame(); } catch(e){}
}

// Todos al equipo 1 (RED) - es una carrera, no hay equipos enfrentados
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, 1); } catch(e){}
    }
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].id === player.id) {
            gameState.players.splice(i, 1);
            break;
        }
    }
}

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

function getStats() {
    return {
        playerCount: gameState.players.length,
        gameStartTime: gameState.gameStartTime
    };
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
