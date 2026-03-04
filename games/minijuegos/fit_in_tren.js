// ============================================
// MINIJUEGO: FIT IN TREN by NAMAJUNAS
// Esquiva obstaculos en el tren, ultimo en pie gana
// Eliminado si Y < -340
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
    graceUntil: 0
};

var config = {
    minPlayers: 2,
    checkMs: 100,
    explanationMs: 5000,
    graceMs: 2000,
    eliminationY: -340
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[FIT_TREN] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.active = false;
    gameState.eliminated = [];
    gameState.firstEliminated = null;
    gameState.graceUntil = 0;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[FIT_TREN] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para FIT IN TREN', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });

    shuffleTeams(room);

    room.sendAnnouncement(
        '🚂 FIT IN TREN\n👥 Jugadores: ' + players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        if (!gameState.active) return;
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🚂 Estan en un TREN en movimiento!\n' +
            '⚠️ Esquiva los obstaculos que aparecen\n' +
            '❌ Si un obstaculo te golpea, quedas eliminado\n' +
            '🏆 El ultimo jugador en pie gana!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            if (!gameState.active) return;
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            gameState.graceUntil = Date.now() + config.graceMs;
            room.sendAnnouncement('🟢 ¡COMIENZA FIT IN TREN!', null, 0x00FF00, 'bold', 2);

            gameState.checkInterval = setInterval(function() { checkPlayers(room, onGameEnd); }, config.checkMs);
        }, config.explanationMs);
    }, 1500);
}

function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;

    var inGrace = Date.now() < gameState.graceUntil;
    var alivePlayers = [];

    gameState.players.forEach(function(p) {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;

        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            return;
        }

        var pos = player.position;
        if (!pos) return;

        if (inGrace) {
            alivePlayers.push(p);
            return;
        }

        var eliminated = false;

        if (pos.y < config.eliminationY) {
            eliminated = true;
        }

        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            if (!gameState.firstEliminated && gameState.gameStartTime) {
                var elapsed = ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1);
                gameState.firstEliminated = { name: p.name, timeS: elapsed };
            }
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement('❌ ' + p.name + ' fue golpeado por un obstaculo! (' + remaining + ' restantes)', null, 0xFF6600);
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos eliminados', null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO FIT IN TREN! 🏆',
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

function getStats() { return { firstEliminated: gameState.firstEliminated }; }

module.exports = {
    start: start, stop: stop, isActive: isActive,
    onPlayerLeave: onPlayerLeave, onPlayerChat: onPlayerChat,
    getStats: getStats,
    setMapData: function(jsonString) { mapData = jsonString; }
};
