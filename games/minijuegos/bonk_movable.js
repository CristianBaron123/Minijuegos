// ============================================
// MINIJUEGO: BONK MOVABLE - Rebota en plataformas circulares
// Si caes al fondo, quedas eliminado. Último en pie gana.
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

// Eliminación: si el jugador cae al cuadro (esquinas: -658,238 y 660,298)
var bounds = {
    eliminationY: 238
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[BONK_MOVABLE] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;

    // Inyectar spawn points para 30 jugadores (15 por equipo)
    try {
        var mapObj = JSON.parse(mapData);
        mapObj.redSpawnPoints = [
            [-540, -423], [-465, -423], [-390, -423], [-315, -423], [-240, -423],
            [-540, -393], [-465, -393], [-390, -393], [-315, -393], [-240, -393],
            [-540, -363], [-465, -363], [-390, -363], [-315, -363], [-240, -363]
        ];
        mapObj.blueSpawnPoints = [
            [240, -423], [315, -423], [390, -423], [465, -423], [540, -423],
            [240, -393], [315, -393], [390, -393], [465, -393], [540, -393],
            [240, -363], [315, -363], [390, -363], [465, -363], [540, -363]
        ];
        room.setCustomStadium(JSON.stringify(mapObj));
    } catch(e) { console.error('[BONK_MOVABLE] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para BONK MOVABLE', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.eliminated = [];
    gameState.hasBeenInBounds = {};

    shuffleTeams(room);

    room.sendAnnouncement(
        '🔴 BONK MOVABLE 🔴\n' +
        '👥 Jugadores: ' + gameState.players.length,
        null, 0xFF4444, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '⚪ Golpea los circulos para rebotar y mantenerte arriba!\n' +
            '⬇️ Si caes al fondo, quedas ELIMINADO\n' +
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

    // Spawn protection: esperar antes de chequear
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
            room.sendAnnouncement('❌ ' + p.name + ' se desconectó', null, 0xFF6600);
            continue;
        }

        // Leer posición de forma robusta
        var py = (typeof player.y === 'number') ? player.y : (player.position && typeof player.position.y === 'number' ? player.position.y : null);
        if (py === null) { alivePlayers.push(p); continue; }

        var fell = py >= bounds.eliminationY;

        if (fell) {
            if (!gameState.hasBeenInBounds[p.id]) { alivePlayers.push(p); continue; }
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}

            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                '❌ ' + p.name + ' cayó! (' + remaining + ' restantes)',
                null, 0xFF6600
            );
        } else {
            gameState.hasBeenInBounds[p.id] = true;
            alivePlayers.push(p);
        }
    }

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0]);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos cayeron', null, 0xFF0000);
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
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO BONK MOVABLE! 🏆\n',
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
    // checkPlayers lo detectará
}

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerChat: onPlayerChat,
    onPlayerLeave: onPlayerLeave,
    setMapData: function(jsonString) { mapData = jsonString; }
};
