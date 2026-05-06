// ============================================
// MINIJUEGO: RUN MINI - Evita la bola azul
// No salirse del cuadro ni tocar la bola azul. Ultimo en pie gana y va a lucky.
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false,
    callback: null
};

var config = {
    minPlayers: 2,
    box: {
        minX: -560,
        maxX: 560,
        minY: -370,
        maxY: 300
    },
    checkMs: 100,
    explanationMs: 5000,
    selectionPauseMs: 1500
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[RUN_MINI] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[RUN_MINI] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para RUN MINI', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.eliminated = [];

    shuffleTeams(room);

    var activePlayers = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    gameState.players = activePlayers.map(function(p) { return { id: p.id, name: p.name }; });

    room.sendAnnouncement(
        '🏃 RUN MINI 🏃\n👥 Jugadores: ' + gameState.players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🔵 ¡Evita la BOLA AZUL que te persigue!\n' +
            '⚠️ Si tocas la bola o salis del cuadro, quedas eliminado\n' +
            '🏆 ¡El último jugador en pie GANA y va a LUCKY!\n\n' +
            '⏱️ El juego comenzará en 5 segundos...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            room.sendAnnouncement('🟢 ¡COMIENZA RUN MINI!', null, 0x00FF00, 'bold', 2);
        }, config.explanationMs);
    }, config.selectionPauseMs);

    setTimeout(function() {
        gameState.checkInterval = setInterval(function() { checkPlayers(room); }, config.checkMs);
    }, config.selectionPauseMs + config.explanationMs + 1000);
}

function checkPlayers(room) {
    if (!gameState.active) return;

    var ball = room.getBallPosition();
    if (!ball) return;

    var alivePlayers = [];

    for (var i = 0; i < gameState.players.length; i++) {
        var p = gameState.players[i];
        if (gameState.eliminated.indexOf(p.id) !== -1) continue;

        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            continue;
        }
        if (player.team === 0) {
            if (gameState.eliminated.indexOf(p.id) === -1) {
                gameState.eliminated.push(p.id);
            }
            continue;
        }

        var px = (typeof player.x === 'number') ? player.x : (player.position && typeof player.position.x === 'number' ? player.position.x : null);
        var py = (typeof player.y === 'number') ? player.y : (player.position && typeof player.position.y === 'number' ? player.position.y : null);
        if (px === null || py === null) { alivePlayers.push(p); continue; }

        // Verificar si sale del cuadro
        if (px < config.box.minX || px > config.box.maxX || py < config.box.minY || py > config.box.maxY) {
            eliminatePlayer(room, p, 'salió del cuadro');
            continue;
        }

        // Verificar colisión con la bola azul (distancia < 25 aprox)
        var dx = px - ball.x;
        var dy = py - ball.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 25) {
            eliminatePlayer(room, p, 'tocó la bola azul');
            continue;
        }

        alivePlayers.push(p);
    }

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0]);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos fueron eliminados', null, 0xFF0000);
        stop(room);
        if (gameState.callback) { var cb = gameState.callback; gameState.callback = null; cb(null); }
    }
}

function eliminatePlayer(room, player, reason) {
    if (gameState.eliminated.indexOf(player.id) !== -1) return;
    gameState.eliminated.push(player.id);
    try { room.setPlayerTeam(player.id, 0); } catch(e){}

    var remaining = gameState.players.length - gameState.eliminated.length;
    room.sendAnnouncement('❌ ' + player.name + ' ' + reason + ' (' + remaining + ' restantes)', null, 0xFF6600);
}

function declareWinner(room, winner) {
    if (!gameState.active) return;
    var cb = gameState.callback;
    gameState.callback = null;
    stop(room);

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO RUN MINI! 🏆\n' +
        '🍀 ¡Va directo a LUCKY! 🍀\n',
        null, 0xFFD700, 'bold', 2
    );
    setTimeout(function() { if (cb) cb(winner); }, 3000);
}

function stop(room) {
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.active = false;
    gameState.players = [];
    gameState.eliminated = [];
    gameState.chatBlocked = false;
    try { room.stopGame(); } catch(e){}
}

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    for (var k = 0; k < players.length; k++) {
        try { room.setPlayerTeam(players[k].id, 1); } catch(e){}
    }
}

function isActive() { return gameState.active; }
function onPlayerChat(player, message) { if (gameState.chatBlocked) return false; return true; }
function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    if (gameState.eliminated.indexOf(player.id) === -1) {
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
