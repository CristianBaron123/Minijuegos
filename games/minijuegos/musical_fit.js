// ============================================
// MINIJUEGO: MUSICAL FIT - Esquiva las bolas negras
// Si sales del area, quedas eliminado. Ultimo en pie gana.
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false,
    hasBeenInBounds: {},
    callback: null
};

// Limites del area segura (esquinas: -1000,-500 y 1000,500)
var bounds = {
    minX: -1000,
    maxX: 1000,
    minY: -500,
    maxY: 500
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[MUSICAL_FIT] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[MUSICAL_FIT] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para MUSICAL FIT', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.eliminated = [];
    gameState.hasBeenInBounds = {};

    shuffleTeams(room);

    room.sendAnnouncement(
        '🎵 MUSICAL FIT 🎵\n' +
        '👥 Jugadores: ' + gameState.players.length,
        null, 0xFF44FF, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        repositionSpawns(room);

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '⚫ Esquiva las bolas negras!\n' +
            '⚠️ Si sales del area, quedas ELIMINADO\n' +
            '🏆 El ultimo jugador en pie gana!\n\n' +
            '⏱️ El juego comenzara en 5 segundos...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            room.sendAnnouncement('🟢 ¡COMIENZA!', null, 0x00FF00, 'bold', 2);
        }, 5000);
    }, 1500);

    setTimeout(function() {
        gameState.checkInterval = setInterval(function() { checkPlayers(room); }, 100);
    }, 8500);
}

function checkPlayers(room) {
    if (!gameState.active) return;

    var alivePlayers = [];

    for (var i = 0; i < gameState.players.length; i++) {
        var p = gameState.players[i];
        if (gameState.eliminated.indexOf(p.id) !== -1) continue;

        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement('❌ ' + p.name + ' se desconecto', null, 0xFF6600);
            continue;
        }

        var px = (typeof player.x === 'number') ? player.x : (player.position && typeof player.position.x === 'number' ? player.position.x : null);
        var py = (typeof player.y === 'number') ? player.y : (player.position && typeof player.position.y === 'number' ? player.position.y : null);
        if (px === null || py === null) { alivePlayers.push(p); continue; }

        var outOfBounds = false;

        if (px < bounds.minX || px > bounds.maxX || py < bounds.minY || py > bounds.maxY) {
            if (!gameState.hasBeenInBounds[p.id]) { alivePlayers.push(p); continue; }
            outOfBounds = true;
        } else {
            gameState.hasBeenInBounds[p.id] = true;
        }

        if (outOfBounds && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}

            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                '❌ ' + p.name + ' salio del area! (' + remaining + ' restantes)',
                null, 0xFF6600
            );
        } else if (!outOfBounds) {
            alivePlayers.push(p);
        }
    }

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0]);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos fueron eliminados', null, 0xFF0000);
        stop(room);
        if (gameState.callback) { var cb = gameState.callback; gameState.callback = null; cb(null); }
    }
}

function declareWinner(room, winner) {
    if (!gameState.active) return;

    var cb = gameState.callback;
    gameState.callback = null;
    stop(room);

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO MUSICAL FIT! 🏆\n',
        null, 0xFFD700, 'bold', 2
    );

    setTimeout(function() {
        if (cb) cb(winner);
    }, 3000);
}

function stop(room) {
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    gameState.active = false;
    gameState.players = [];
    gameState.eliminated = [];
    gameState.chatBlocked = false;
    gameState.hasBeenInBounds = {};
    try { room.stopGame(); } catch(e){}
}

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });

    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i]; players[i] = players[j]; players[j] = temp;
    }

    for (var i = 0; i < players.length; i++) {
        var team = (i % 2 === 0) ? 1 : 2;
        try { room.setPlayerTeam(players[i].id, team); } catch(e){}
    }
}

function isActive() { return gameState.active; }

function repositionSpawns(room) {
    var active = gameState.players;
    var n = active.length;
    if (n === 0) return;
    var margin = 250;
    var sMinX = bounds.minX + margin, sMaxX = bounds.maxX - margin;
    var sMinY = bounds.minY + margin, sMaxY = bounds.maxY - margin;
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

function onPlayerChat(player) {
    if (gameState.chatBlocked) return false;
    return true;
}

function onPlayerLeave(player) {
}

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerChat: onPlayerChat,
    onPlayerLeave: onPlayerLeave,
    setMapData: function(jsonString) { mapData = jsonString; }
};
