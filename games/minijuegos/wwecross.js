// ============================================
// MINIJUEGO: WWECROSS - Empuja a tus rivales fuera del ring
// Último en sobrevivir gana. Máx 12 jugadores (6v6)
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
    maxPlayers: 12,
    checkMs: 100,
    explanationMs: 5000,
    // Rectángulo del ring (basado en las coordenadas de las rayas rojas)
    minX: -295,
    maxX: 298,
    minY: -242,
    maxY: 241
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[WWECROSS] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[WWECROSS] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para WWECROSS', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    // Limitar a 12 jugadores, el resto a espectador
    if (players.length > config.maxPlayers) {
        // Mezclar y tomar los primeros 12
        for (var i = players.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
        }
        for (var i = config.maxPlayers; i < players.length; i++) {
            try { room.setPlayerTeam(players[i].id, 0); } catch(e){}
        }
        players = players.slice(0, config.maxPlayers);
        room.sendAnnouncement('ℹ️ Máximo 12 jugadores. Algunos fueron a espectador.', null, 0xFFFF00);
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.eliminated = [];
    gameState.hasBeenInBounds = {};
    gameState.gracePeriod = true;

    shuffleTeams(room);

    room.sendAnnouncement(
        '🤼 WWECROSS - EMPUJA A TUS RIVALES FUERA!\n👥 Jugadores: ' + players.length,
        null, 0xFF0000, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        repositionSpawns(room);

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🤼 Empuja a tus rivales fuera del ring!\n' +
            '🔴 Si tocas las rayas rojas (bordes), quedas ELIMINADO\n' +
            '🏆 El último jugador en pie gana!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            room.sendAnnouncement('🟢 ¡COMIENZA WWECROSS!', null, 0x00FF00, 'bold', 2);
            gameState.gracePeriod = false;
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

        var pos = player.position;
        if (!pos) return;

        if (pos.x < config.minX || pos.x > config.maxX || pos.y < config.minY || pos.y > config.maxY) {
            if (gameState.gracePeriod && !gameState.hasBeenInBounds[p.id]) return;
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement('🤼 ' + p.name + ' fue expulsado del ring! (' + remaining + ' restantes)', null, 0xFF6600);
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
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO WWECROSS! 🏆',
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
    gameState.gracePeriod = true;
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

function repositionSpawns(room) {
    var active = gameState.players;
    var n = active.length;
    if (n === 0) return;
    var margin = 70;
    var sMinX = config.minX + margin, sMaxX = config.maxX - margin;
    var sMinY = config.minY + margin, sMaxY = config.maxY - margin;
    var cols = Math.ceil(Math.sqrt(n));
    var rows = Math.ceil(n / cols);
    var cellW = (sMaxX - sMinX) / cols;
    var cellH = (sMaxY - sMinY) / rows;
    for (var i = 0; i < n; i++) {
        var col = i % cols, row = Math.floor(i / cols);
        var sx = Math.round(sMinX + cellW * (col + 0.5));
        var sy = Math.round(sMinY + cellH * (row + 0.5));
        try { room.setPlayerDiscProperties(active[i].id, { x: sx, y: sy, xspeed: 0, yspeed: 0 }); } catch(e){}
    }
}

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};
