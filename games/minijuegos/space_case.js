// ============================================
// MINIJUEGO: SPACE CASE - Sobrevive en el rectángulo
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false,
    hasBeenInBounds: {}
};

var config = {
    minPlayers: 2,
    checkMs: 100,
    explanationMs: 5000,
    // Límites del rectángulo (si sales, eliminado)
    boundsX: 575,
    boundsY: 160
};

function start(room, onGameEnd) {
    console.log('🎮 SPACE CASE - Iniciando juego...');

    try {
        if (!mapData) {
            console.error('❌ SPACE CASE: mapData es null');
            if (onGameEnd) onGameEnd(null);
            return;
        }
        room.setCustomStadium(mapData);
    } catch(e) {
        console.error('❌ SPACE CASE: Error al cargar mapa:', e.message);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    try { shuffleTeams(room); } catch(e) {
        console.error('❌ SPACE CASE: Error al asignar equipos:', e.message);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    gameState.eliminated = [];
    gameState.hasBeenInBounds = {};

    room.sendAnnouncement(
        '🚀 SPACE CASE 🚀\n👥 Jugadores: ' + gameState.players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        room.startGame();
        try { room.pauseGame(true); } catch(e) {}

        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🟫 Esquiva los circulos cafes que se mueven!\n' +
            '📦 Permanece dentro del rectangulo\n' +
            '❌ Si tocas un circulo cafe o sales del area, quedas eliminado\n' +
            '🏆 El ultimo jugador en pie gana!\n\n' +
            '⏱️ Comienza en 5 segundos...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e) {}
            gameState.chatBlocked = false;
            room.sendAnnouncement('🟢 ¡COMIENZA SPACE CASE!', null, 0x00FF00, 'bold', 2);
        }, config.explanationMs);
    }, 1500);

    // Iniciar comprobaciones tras explicación + margen
    setTimeout(function() {
        if (gameState.active) {
            gameState.checkInterval = setInterval(function() { checkPlayers(room, onGameEnd); }, config.checkMs);
        }
    }, 1500 + config.explanationMs + 1000);
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

        // Fuera del rectángulo
        if (Math.abs(pos.x) > config.boundsX || Math.abs(pos.y) > config.boundsY) {
            // Protección de spawn: no eliminar si nunca estuvo dentro
            if (!gameState.hasBeenInBounds[p.id]) return;
            eliminated = true;
            reason = 'salió del área';
        } else {
            gameState.hasBeenInBounds[p.id] = true;
        }

        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e) {}

            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                '❌ ' + p.name + ' eliminado (' + reason + ')! (' + remaining + ' restantes)',
                null, 0xFF6600
            );
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });

    // Verificar ganador
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
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }

    room.sendAnnouncement(
        '\n🏆 ¡¡¡' + winner.name.toUpperCase() + ' HA GANADO SPACE CASE!!! 🏆\n',
        null, 0xFFD700, 'bold', 2
    );

    setTimeout(function() {
        if (onGameEnd) onGameEnd(winner);
    }, 3000);
}

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i];
        players[i] = players[j];
        players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var i = 0; i < players.length; i++) {
        room.setPlayerTeam(players[i].id, i < half ? 1 : 2);
    }
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    gameState.players = [];
    gameState.eliminated = [];
    gameState.chatBlocked = false;
    try { room.stopGame(); } catch(e) {}
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

function setMapData(m) { mapData = m; }

function isActive() { return gameState.active; }

function getStats() {
    return null;
}

module.exports = {
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: setMapData,
    isActive: isActive,
    getStats: getStats
};
