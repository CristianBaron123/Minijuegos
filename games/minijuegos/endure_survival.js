// ============================================
// MINIJUEGO: ENDURE SURVIVAL 2
// Controles al revés, evita las bolas rojas y el borde
// El último en sobrevivir gana
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false,
    gameStartTime: null,
    firstEliminated: null,
    hasBeenInBounds: {} // { playerId: true } - protección de spawn
};

var config = {
    minPlayers: 2,
    checkMs: 120,
    explanationMs: 5000,
    // Límites del área jugable (dentro de las bolas rojas)
    // Mapa: 600x380, bolas rojas en X:±450, Y:±280
    bounds: { minX: -430, maxX: 430, minY: -265, maxY: 265 }
};

function isOutOfBounds(pos) {
    return pos.x < config.bounds.minX || pos.x > config.bounds.maxX ||
           pos.y < config.bounds.minY || pos.y > config.bounds.maxY;
}

function start(room, onGameEnd) {
    if (!mapData) { console.error('[ENDURE_SURVIVAL] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[ENDURE_SURVIVAL] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para ENDURE SURVIVAL', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.eliminated = [];
    gameState.firstEliminated = null;
    gameState.hasBeenInBounds = {};

    shuffleTeams(room);

    room.sendAnnouncement(
        '🔴 ENDURE SURVIVAL 2\n👥 Jugadores: ' + players.length,
        null, 0xFF4444, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🔄 Los CONTROLES están AL REVÉS!\n' +
            '🔴 Evita tocar las bolas rojas: te empujarán fuera\n' +
            '🚫 No salgas del área de juego o serás eliminado\n' +
            '🏆 El último jugador en pie gana!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ¡COMIENZA ENDURE SURVIVAL!', null, 0x00FF00, 'bold', 2);
        }, config.explanationMs);
    }, 1500);

    setTimeout(function() {
        gameState.checkInterval = setInterval(function() { checkPlayers(room, onGameEnd); }, config.checkMs);
    }, 8500);
}

function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;

    var alivePlayers = [];

    gameState.players.forEach(function(p) {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;

        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement('❌ ' + p.name + ' se desconectó', null, 0xFF6600);
            return;
        }

        var pos = player.position;
        if (!pos) return;

        if (isOutOfBounds(pos)) {
            // Protección de spawn: no eliminar si nunca ha estado dentro del área
            if (!gameState.hasBeenInBounds[p.id]) {
                alivePlayers.push(p); // contar como vivo mientras tiene proteccion
                return;
            }
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            if (!gameState.firstEliminated && gameState.gameStartTime) {
                var elapsed = ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1);
                gameState.firstEliminated = { name: p.name, timeS: elapsed };
            }
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement('❌ ' + p.name + ' salió del área! (' + remaining + ' restantes)', null, 0xFF6600);
        } else {
            gameState.hasBeenInBounds[p.id] = true;
            alivePlayers.push(p);
        }
    });

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos salieron del área', null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO ENDURE SURVIVAL! 🏆',
        null, 0xFFD700, 'bold', 2
    );
    setTimeout(function() { if (onGameEnd) onGameEnd(winner); }, 3000);
}

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var k = 0; k < players.length; k++) {
        try { room.setPlayerTeam(players[k].id, k < half ? 1 : 2); } catch(e){}
    }
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.eliminated = [];
    gameState.chatBlocked = false;
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (gameState.active && gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
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
