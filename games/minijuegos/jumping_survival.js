// ============================================
// MINIJUEGO: JUMPING SURVIVAL - Evita las bolas grises en los cuadros
// Si sales del área total, quedas eliminado. El último en pie gana.
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

var bounds = {
    minX: -420,
    maxX: 380,
    minY: -200,
    maxY: 200
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[JUMPING_SURVIVAL] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[JUMPING_SURVIVAL] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para JUMPING SURVIVAL', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.eliminated = [];
    gameState.hasBeenInBounds = {};

    shuffleTeams(room);

    var activePlayers = room.getPlayerList().filter(function(p) { return p.id !== 0 && p.team !== 0; });
    gameState.players = activePlayers.map(function(p) { return { id: p.id, name: p.name }; });

    room.sendAnnouncement(
        '🦘 JUMPING SURVIVAL 🦘\n👥 Jugadores: ' + gameState.players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🦘 ¡Salta para evitar las bolas grises!\n' +
            '⚠️ Si sales del cuadro, quedas eliminado\n' +
            '🏆 ¡El último jugador en pie gana!\n\n' +
            '⏱️ El juego comenzará en 5 segundos...',
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
        if (!player) { gameState.eliminated.push(p.id); continue; }
        if (player.team === 0) {
            if (gameState.eliminated.indexOf(p.id) === -1) {
                gameState.eliminated.push(p.id);
            }
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
            room.sendAnnouncement('❌ ' + p.name + ' salió del área! (' + remaining + ' restantes)', null, 0xFF6600);
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

    room.sendAnnouncement('\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO JUMPING SURVIVAL! 🏆\n', null, 0xFFD700, 'bold', 2);
    setTimeout(function() { if (cb) cb(winner); }, 3000);
}

function stop(room) {
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
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
    var maxPerTeam = 15;
    var maxPlayers = maxPerTeam * 2;
    var playingCount = Math.min(players.length, maxPlayers);
    for (var i = 0; i < playingCount; i++) {
        var team = (i % 2 === 0) ? 1 : 2;
        try { room.setPlayerTeam(players[i].id, team); } catch(e){}
    }
}

function isActive() { return gameState.active; }
function onPlayerChat(player, message) { if (gameState.chatBlocked) return false; return true; }
function onPlayerLeave(room, player) {
    if (gameState.active && gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
    }
}

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerChat: onPlayerChat,
    onPlayerLeave: onPlayerLeave,
    setMapData: function(jsonString) { mapData = jsonString; }
};
