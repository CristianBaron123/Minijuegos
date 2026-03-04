// ============================================
// MINIJUEGO: FITANIC - Titanic survival
// Esquiva los obstaculos, no dejes que te golpeen
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
    graceUntil: null
};

var config = {
    minPlayers: 2,
    graceMs: 2000,
    checkMs: 100,
    explanationMs: 5000
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[FITANIC] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[FITANIC] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para FITANIC', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.eliminated = [];
    gameState.firstEliminated = null;
    gameState.graceUntil = null;

    shuffleTeams(room);

    room.sendAnnouncement(
        '🚢 FITANIC\n👥 Jugadores: ' + players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🚢 Estan en el TITANIC!\n' +
            '⚠️ Esquiva los obstaculos\n' +
            '❌ Si un obstaculo te golpea, quedas eliminado\n' +
            '🏆 El ultimo jugador en pie gana!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            gameState.graceUntil = Date.now() + config.graceMs;
            room.sendAnnouncement('🟢 ¡COMIENZA FITANIC!', null, 0x00FF00, 'bold', 2);
        }, config.explanationMs);
    }, 1500);

    setTimeout(function() {
        gameState.checkInterval = setInterval(function() { checkPlayers(room, onGameEnd); }, config.checkMs);
    }, 1500 + config.explanationMs + config.graceMs);
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

        var eliminated = false;
        var reason = '';

        // Eliminacion: si el jugador fue por encima de Y=-500 (golpeado por obstaculo)
        if (pos.y < -500) {
            eliminated = true;
            reason = 'fue golpeado por un obstaculo';
        }

        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            if (!gameState.firstEliminated && gameState.gameStartTime) {
                var elapsed = ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1);
                gameState.firstEliminated = { name: p.name, timeS: elapsed };
            }
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement('❌ ' + p.name + ' ' + reason + '! (' + remaining + ' restantes)', null, 0xFF6600);
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos fueron eliminados', null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO FITANIC! 🏆',
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
    gameState.graceUntil = null;
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
