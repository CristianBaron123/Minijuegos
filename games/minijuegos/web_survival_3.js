// ============================================
// MINIJUEGO: WEB SURVIVAL III - Evita los bordes y la telaraña
// Último en sobrevivir gana
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
    // Rectángulo del área jugable (basado en vértices del mapa)
    minX: -298,
    maxX: 298,
    minY: -298,
    maxY: 298
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[WEB3] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[WEB3] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para WEB SURVIVAL III', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.eliminated = [];
    gameState.hasBeenInBounds = {};

    shuffleTeams(room);

    room.sendAnnouncement(
        '🕸️ WEB SURVIVAL III - EVITA LA TELARAÑA!\n👥 Jugadores: ' + players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🕸️ Evita la telaraña del centro, te atrapa!\n' +
            '⚠️ No toques los bordes del mapa\n' +
            '❌ Si te mandan fuera del área, quedas ELIMINADO\n' +
            '🏆 El último jugador en pie gana!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            room.sendAnnouncement('🟢 ¡COMIENZA WEB SURVIVAL III!', null, 0x00FF00, 'bold', 2);
        }, config.explanationMs);
    }, 1500);

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

        var px = (typeof player.x === 'number') ? player.x : (player.position && typeof player.position.x === 'number' ? player.position.x : null);
        var py = (typeof player.y === 'number') ? player.y : (player.position && typeof player.position.y === 'number' ? player.position.y : null);
        if (px === null || py === null) return;

        if (px < config.minX || px > config.maxX || py < config.minY || py > config.maxY) {
            if (!gameState.hasBeenInBounds[p.id]) return;
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement('🕸️ ' + p.name + ' salió del área! (' + remaining + ' restantes)', null, 0xFF6600);
        } else {
            gameState.hasBeenInBounds[p.id] = true;
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
    var cb = onGameEnd;
    gameState.callback = null;
    stop(room);

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO WEB SURVIVAL III! 🏆',
        null, 0xFFD700, 'bold', 2
    );
    setTimeout(function() { if (cb) cb(winner); }, 3000);
}

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });

    // Mover todos a espectadores primero
    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, 0); } catch(e){}
    }

    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }

    // Max 15 por equipo = 30 total jugando
    var maxPerTeam = 15;
    var maxPlayers = maxPerTeam * 2;
    var playingCount = Math.min(players.length, maxPlayers);

    for (var k = 0; k < playingCount; k++) {
        try { room.setPlayerTeam(players[k].id, (k % 2 === 0) ? 1 : 2); } catch(e){}
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

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};
