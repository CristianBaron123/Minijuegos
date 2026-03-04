// ============================================
// MINIJUEGO: NAMAJUNAS RACE 2 - Carrera de izquierda a derecha
// El primero en cruzar la meta gana.
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    checkInterval: null,
    chatBlocked: false,
    callback: null,
    winnerDeclared: false
};

// Meta: linea vertical en X=11790 (entre Y=-25 y Y=5)
var finishLineX = 11790;

function start(room, onGameEnd) {
    if (!mapData) { console.error('[NAMAJUNAS_RACE_2] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;

    // Inyectar spawn points para 30 jugadores
    try {
        var mapObj = JSON.parse(mapData);
        mapObj.redSpawnPoints = [
            [-100, -80], [-100, -55], [-100, -30], [-100, -5], [-100, 20],
            [-100, 45], [-100, 70], [-150, -80], [-150, -55], [-150, -30],
            [-150, -5], [-150, 20], [-150, 45], [-150, 70], [-200, -30]
        ];
        mapObj.blueSpawnPoints = [
            [-250, -80], [-250, -55], [-250, -30], [-250, -5], [-250, 20],
            [-250, 45], [-250, 70], [-300, -80], [-300, -55], [-300, -30],
            [-300, -5], [-300, 20], [-300, 45], [-300, 70], [-350, -30]
        ];
        room.setCustomStadium(JSON.stringify(mapObj));
    } catch(e) { console.error('[NAMAJUNAS_RACE_2] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para NAMAJUNAS RACE 2', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.winnerDeclared = false;

    shuffleTeams(room);

    room.sendAnnouncement(
        '🏁 NAMAJUNAS RACE 2 🏁\n' +
        '👥 Jugadores: ' + gameState.players.length,
        null, 0x00FFAA, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🏁 Corre de izquierda a derecha!\n' +
            '🥇 El primero en cruzar la meta GANA!\n\n' +
            '⏱️ La carrera comenzara en 5 segundos...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            room.sendAnnouncement('🟢 ¡CORRAN!', null, 0x00FF00, 'bold', 2);
        }, 5000);
    }, 1500);

    setTimeout(function() {
        gameState.checkInterval = setInterval(function() { checkPlayers(room); }, 100);
    }, 8500);
}

function checkPlayers(room) {
    if (!gameState.active || gameState.winnerDeclared) return;

    for (var i = 0; i < gameState.players.length; i++) {
        var p = gameState.players[i];
        var player = room.getPlayer(p.id);
        if (!player) continue;

        var px = (typeof player.x === 'number') ? player.x : (player.position && typeof player.position.x === 'number' ? player.position.x : null);
        if (px === null) continue;

        if (px >= finishLineX) {
            gameState.winnerDeclared = true;
            declareWinner(room, p);
            return;
        }
    }
}

function declareWinner(room, winner) {
    if (!gameState.active) return;

    var cb = gameState.callback;
    gameState.callback = null;
    stop(room);

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO LA CARRERA! 🏆\n',
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
    gameState.chatBlocked = false;
    gameState.winnerDeclared = false;
    try { room.stopGame(); } catch(e){}
}

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });

    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i]; players[i] = players[j]; players[j] = temp;
    }

    var maxPerTeam = 15;
    var playingCount = Math.min(players.length, maxPerTeam * 2);

    for (var i = 0; i < playingCount; i++) {
        var team = (i % 2 === 0) ? 1 : 2;
        try { room.setPlayerTeam(players[i].id, team); } catch(e){}
    }
}

function isActive() { return gameState.active; }

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
