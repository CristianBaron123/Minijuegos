// ============================================
// MINIJUEGO: FIT IN GRAVEYARD - Esquiva obstaculos y fantasmas
// Eliminado si sube demasiado (y <= -300) o cae (y >= 165)
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

var config = {
    upperLimit: -300,  // si y <= -300, eliminado (subio demasiado)
    lowerLimit: 165    // si y >= 165, eliminado (se cayo)
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[GRAVEYARD] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[GRAVEYARD] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) { room.sendAnnouncement('No hay suficientes jugadores para FIT IN GRAVEYARD', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = [];
    gameState.eliminated = [];
    gameState.hasBeenInBounds = {};
    for (var i = 0; i < players.length; i++) {
        gameState.players.push({ id: players[i].id, name: players[i].name });
        try { room.setPlayerTeam(players[i].id, (i % 2 === 0) ? 1 : 2); } catch(e) {}
    }

    try { room.stopGame(); } catch(e) {}
    setTimeout(function() {
        if (!gameState.active) return;
        try { room.startGame(); } catch(e) {}
        try { room.pauseGame(true); } catch(e) {}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n👻 FIT IN GRAVEYARD\n' +
            '🪦 Esquiva los obstaculos y fantasmas!\n' +
            '⬆️ Salta y presiona ABAJO en el aire para elevarte\n' +
            '💀 Si subes demasiado o caes, quedas eliminado\n' +
            '🏆 El ultimo en pie GANA!\n' +
            '⏳ Comienza en 5s...',
            null, 0x9900CC, 'bold', 2
        );

        setTimeout(function() {
            if (!gameState.active) return;
            gameState.chatBlocked = false;
            try { room.pauseGame(false); } catch(e) {}
            room.sendAnnouncement('🟢 COMIENZA!', null, 0x00FF00, 'bold', 2);

            setTimeout(function() {
                if (!gameState.active) return;
                gameState.checkInterval = setInterval(function() {
                    if (!gameState.active) return;
                    checkPlayers(room);
                }, 100);
            }, 3000);
        }, 5000);
    }, 1500);
}

function checkPlayers(room) {
    if (!gameState.active) return;

    for (var i = 0; i < gameState.players.length; i++) {
        var p = gameState.players[i];
        if (gameState.eliminated.indexOf(p.id) !== -1) continue;

        var player = room.getPlayer(p.id);
        if (!player) { eliminatePlayer(room, p, 'se desconecto'); continue; }
        var pos = player.position;
        if (!pos) continue;

        // Proteccion de spawn
        if (!gameState.hasBeenInBounds[p.id]) {
            if (pos.y > config.upperLimit && pos.y < config.lowerLimit) {
                gameState.hasBeenInBounds[p.id] = true;
            }
            continue;
        }

        if (pos.y <= config.upperLimit) {
            eliminatePlayer(room, p, 'subio demasiado');
        } else if (pos.y >= config.lowerLimit) {
            eliminatePlayer(room, p, 'se cayo');
        }
    }
}

function eliminatePlayer(room, p, reason) {
    if (gameState.eliminated.indexOf(p.id) !== -1) return;
    gameState.eliminated.push(p.id);
    try { room.setPlayerTeam(p.id, 0); } catch(e) {}

    var remaining = gameState.players.length - gameState.eliminated.length;
    room.sendAnnouncement('💀 ' + p.name + ' ' + reason + '! (' + remaining + ' restantes)', null, 0xFF6600);

    checkWinner(room);
}

function checkWinner(room) {
    var alive = [];
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.eliminated.indexOf(gameState.players[i].id) === -1) {
            alive.push(gameState.players[i]);
        }
    }

    if (alive.length === 1) {
        gameState.active = false;
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        room.sendAnnouncement('\n🏆 ' + alive[0].name.toUpperCase() + ' HA GANADO FIT IN GRAVEYARD! 🏆', null, 0xFFD700, 'bold', 2);
        var cb = gameState.callback;
        setTimeout(function() {
            try { room.stopGame(); } catch(e) {}
            if (cb) cb({ id: alive[0].id, name: alive[0].name });
        }, 3000);
    } else if (alive.length === 0) {
        gameState.active = false;
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        room.sendAnnouncement('💀 No hay ganador - todos fueron eliminados', null, 0xFF0000);
        var cb = gameState.callback;
        try { room.stopGame(); } catch(e) {}
        if (cb) cb(null);
    }
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    var p = null;
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].id === player.id) { p = gameState.players[i]; break; }
    }
    if (p) eliminatePlayer(room, p, 'se desconecto');
}

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.eliminated = [];
    gameState.hasBeenInBounds = {};
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
