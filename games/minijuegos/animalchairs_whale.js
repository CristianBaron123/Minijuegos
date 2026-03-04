// ============================================
// MINIJUEGO: ANIMALCHAIRS v2 WHALE
// Carrera: el primero en QUEDARSE 3 segundos en el OJO de la ballena gana
// NO hay eliminacion - solo carrera pura
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    checkInterval: null,
    chatBlocked: false,
    gameStartTime: null,
    winZoneTimers: {},  // { playerId: timestamp cuando entro al ojo }
    announced: {}       // { playerId: true } para no repetir el anuncio de "esta en el ojo"
};

var config = {
    minPlayers: 2,
    checkMs: 100,
    explanationMs: 5000,
    winHoldMs: 3000,
    // Ojo de la ballena: zona curva entre A(-174.68,-83.31) y B(-154.67,-85.27) con curva 180
    // Midpoint del arco como centro, radio ajustado al semicirculo
    winZone: { x: -164.7, y: -84.3, radius: 12 }
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[ANIMALCHAIRS] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    // Limpiar estado previo por seguridad
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[ANIMALCHAIRS] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para ANIMALCHAIRS', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.gameStartTime = null;
    gameState.winZoneTimers = {};
    gameState.announced = {};

    shuffleTeams(room);

    room.sendAnnouncement(
        '🐋 ANIMALCHAIRS WHALE\n👥 Jugadores: ' + players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        if (!gameState.active) return;
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🐋 Hay una BALLENA gigante en el mapa\n' +
            '👁️ Llega al OJO de la ballena y QUEDATE 3 SEGUNDOS!\n' +
            '🏆 El primero en mantenerse 3s en el ojo GANA!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            if (!gameState.active) return;
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ¡COMIENZA ANIMALCHAIRS WHALE!', null, 0x00FF00, 'bold', 2);

            // Empezar a verificar win zone
            gameState.checkInterval = setInterval(function() { checkPlayers(room, onGameEnd); }, config.checkMs);
        }, config.explanationMs);
    }, 1500);
}

function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;

    var now = Date.now();

    for (var i = 0; i < gameState.players.length; i++) {
        var p = gameState.players[i];
        var player = room.getPlayer(p.id);
        if (!player) continue;

        var pos = player.position;
        if (!pos) continue;

        // Verificar si esta en el ojo de la ballena
        var wz = config.winZone;
        var dx = pos.x - wz.x;
        var dy = pos.y - wz.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= wz.radius) {
            // Esta dentro del ojo
            if (!gameState.winZoneTimers[p.id]) {
                // Acaba de entrar
                gameState.winZoneTimers[p.id] = now;
                room.sendAnnouncement('👁️ ' + p.name + ' esta en el ojo! Debe quedarse 3 segundos...', null, 0x00BFFF);
                gameState.announced[p.id] = true;
            } else {
                // Ya estaba dentro, verificar si paso 3 segundos
                var elapsed = now - gameState.winZoneTimers[p.id];
                if (elapsed >= config.winHoldMs) {
                    declareWinner(room, p, onGameEnd);
                    return;
                }
            }
        } else {
            // Salio del ojo, resetear timer
            if (gameState.winZoneTimers[p.id]) {
                delete gameState.winZoneTimers[p.id];
                if (gameState.announced[p.id]) {
                    room.sendAnnouncement('❌ ' + p.name + ' salio del ojo!', null, 0xFF6600);
                    delete gameState.announced[p.id];
                }
            }
        }
    }
}

function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    var elapsed = gameState.gameStartTime ? ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1) : '?';
    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO ANIMALCHAIRS WHALE! 🏆\n👁️ Se mantuvo 3s en el ojo de la ballena! (' + elapsed + 's total)',
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
    gameState.chatBlocked = false;
    gameState.winZoneTimers = {};
    gameState.announced = {};
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (gameState.active) {
        gameState.players = gameState.players.filter(function(p) { return p.id !== player.id; });
        delete gameState.winZoneTimers[player.id];
        delete gameState.announced[player.id];
        if (gameState.players.length < 1) {
            stop(room);
        }
    }
}

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

function getStats() {
    return { firstEliminated: null };
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
