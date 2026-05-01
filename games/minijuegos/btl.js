// ============================================
// MINIJUEGO: B.T.L (Bounce The Lights) by Serefli Seref
// Golpea los circulos del semaforo para rebotar
// El ultimo en pie gana. Eliminado si cae a y <= -628
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false,
    gameStartTime: null,
    callback: null,
    _lastAliveCount: 0,
    _announcedElim: {}
};

var config = {
    minPlayers: 2,
    checkMs: 100,
    explanationMs: 5000,
    eliminationY: -628
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[BTL] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[BTL] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para B.T.L', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.callback = onGameEnd;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.eliminated = [];
    gameState._lastAliveCount = players.length;
    gameState._announcedElim = {};

    shuffleTeams(room);

    room.sendAnnouncement(
        '🚦 B.T.L - Bounce The Lights!\n👥 Jugadores: ' + players.length,
        null, 0xFF4500, 'bold', 2
    );

    setTimeout(function() {
        if (!gameState.active) return;
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🚦 Golpea los circulos del semaforo para rebotar!\n' +
            '❌ Si caes al vacio quedas eliminado\n' +
            '🏆 El ultimo jugador en pie gana!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            if (!gameState.active) return;
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 COMIENZA B.T.L!', null, 0x00FF00, 'bold', 2);

            gameState.checkInterval = setInterval(function() { checkPlayers(room); }, config.checkMs);
        }, config.explanationMs);
    }, 1500);
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
            continue;
        }

        // Eliminado si esta en espectador (team 0)
        if (player.team === 0) {
            if (gameState.eliminated.indexOf(p.id) === -1) {
                gameState.eliminated.push(p.id);
            }
            continue;
        }

        var pos = player.position;
        if (!pos) { alivePlayers.push(p); continue; }

        if (pos.y <= config.eliminationY) {
            if (gameState.eliminated.indexOf(p.id) === -1) {
                gameState.eliminated.push(p.id);
                try { room.setPlayerTeam(p.id, 0); } catch(e){}
            }
        } else {
            alivePlayers.push(p);
        }
    }

    // Anunciar eliminaciones pendientes
    var newElimCount = gameState.players.length - gameState.eliminated.length;
    if (alivePlayers.length < gameState._lastAliveCount) {
        var eliminated = gameState.players.filter(function(p) {
            return gameState.eliminated.indexOf(p.id) !== -1 && !gameState._announcedElim[p.id];
        });
        for (var ei = 0; ei < eliminated.length; ei++) {
            gameState._announcedElim[eliminated[ei].id] = true;
            room.sendAnnouncement('❌ ' + eliminated[ei].name + ' eliminado! (' + alivePlayers.length + ' restantes)', null, 0xFF6600);
        }
    }
    gameState._lastAliveCount = alivePlayers.length;

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0]);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos eliminados', null, 0xFF0000);
        stop(room);
        if (gameState.callback) gameState.callback(null);
    }
}

function declareWinner(room, winner) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement(
        '\n🏆 ' + winner.name.toUpperCase() + ' HA GANADO B.T.L! 🏆',
        null, 0xFFD700, 'bold', 2
    );
    var cb = gameState.callback;
    setTimeout(function() { if (cb) cb(winner); }, 3000);
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
    gameState.callback = null;
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
    setMapData: function(d) { mapData = d; }
};
