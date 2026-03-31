// ============================================
// MINIJUEGO: FCT 1 - Falafels Collision Team 1
// Carrera de obstaculos de subida, el primero en cruzar la meta gana
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    checkInterval: null,
    chatBlocked: false,
    winnerDeclared: false,
    callback: null
};

var config = {
    // Meta: linea horizontal entre estos dos puntos
    // punto 1: -45,-5168   punto 2: 45,-5168
    lineMinX: -45,
    lineMaxX: 45,
    lineY: -5168
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[FCT1] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;
    gameState.winnerDeclared = false;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[FCT1] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) { room.sendAnnouncement('No hay suficientes jugadores para FCT 1', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = [];
    for (var i = 0; i < players.length; i++) {
        gameState.players.push({ id: players[i].id, name: players[i].name, finished: false });
        try { room.setPlayerTeam(players[i].id, (i % 2 === 0) ? 1 : 2); } catch(e) {}
    }

    try { room.stopGame(); } catch(e) {}
    setTimeout(function() {
        if (!gameState.active) return;
        try { room.startGame(); } catch(e) {}
        try { room.pauseGame(true); } catch(e) {}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n🏁 FCT 1 - CARRERA DE OBSTACULOS\n' +
            '🏃 Sube lo mas rapido posible!\n' +
            '🏆 El primero en cruzar la meta GANA!\n' +
            '⏳ Comienza en 5s...',
            null, 0x00BFFF, 'bold', 2
        );

        setTimeout(function() {
            if (!gameState.active) return;
            gameState.chatBlocked = false;
            try { room.pauseGame(false); } catch(e) {}
            room.sendAnnouncement('🟢 COMIENZA LA CARRERA!', null, 0x00FF00, 'bold', 2);

            gameState.checkInterval = setInterval(function() {
                if (!gameState.active) return;
                checkPlayers(room);
            }, 100);
        }, 5000);
    }, 1500);
}

function checkPlayers(room) {
    if (!gameState.active || gameState.winnerDeclared) return;

    for (var i = 0; i < gameState.players.length; i++) {
        var p = gameState.players[i];
        if (p.finished) continue;

        var player = room.getPlayer(p.id);
        if (!player) { p.finished = true; continue; }
        var pos = player.position;
        if (!pos) continue;

        // Subida: y se hace mas negativo. Cruza meta si y <= lineY y x entre lineMinX y lineMaxX
        if (pos.y <= config.lineY && pos.x >= config.lineMinX && pos.x <= config.lineMaxX) {
            declareWinner(room, p);
            return;
        }
    }
}

function declareWinner(room, winner) {
    if (gameState.winnerDeclared) return;
    gameState.winnerDeclared = true;
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement(
        '\n🏆 ' + winner.name.toUpperCase() + ' HA GANADO FCT 1! 🏆',
        null, 0xFFD700, 'bold', 2
    );

    var cb = gameState.callback;
    setTimeout(function() {
        try { room.stopGame(); } catch(e) {}
        if (cb) cb({ id: winner.id, name: winner.name });
    }, 3000);
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    var rec = gameState.players.find(function(x) { return x.id === player.id; });
    if (rec) rec.finished = true;

    var alive = gameState.players.filter(function(x) { return !x.finished; });
    if (alive.length === 1) {
        declareWinner(room, alive[0]);
    } else if (alive.length === 0) {
        gameState.active = false;
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        var cb = gameState.callback;
        try { room.stopGame(); } catch(e) {}
        if (cb) cb(null);
    }
}

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function stop(room) {
    gameState.active = false;
    gameState.winnerDeclared = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.callback = null;
    try { room.stopGame(); } catch(e) {}
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
