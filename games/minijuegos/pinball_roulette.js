// ============================================
// MINIJUEGO: PINBALL ROULETTE - Cae por el pinball
// El primero en llegar a y >= 1701 gana. Limite de 3 minutos.
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    checkInterval: null,
    chatBlocked: false,
    gameStartTime: null,
    winnerFound: false,
    gameTimer: null,
    timeWarnings: {},
    callback: null
};

var config = {
    minPlayers: 2,
    graceMs: 3000,
    checkMs: 100,
    explanationMs: 5000,
    gameDurationMs: 180000,
    winZone: { minX: -50, maxX: 50, minY: 1701 }
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[PINBALL_ROULETTE] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[PINBALL_ROULETTE] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para PINBALL ROULETTE', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.winnerFound = false;
    gameState.timeWarnings = {};

    shuffleTeams(room);

    var activePlayers = room.getPlayerList().filter(function(p) { return p.id !== 0 && p.team !== 0; });
    gameState.players = activePlayers.map(function(p) { return { id: p.id, name: p.name }; });

    room.sendAnnouncement(
        '🎰 PINBALL ROULETTE 🎰\n👥 Jugadores: ' + gameState.players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🎰 ¡Cae por el pinball hasta llegar abajo!\n' +
            '⚠️ La suerte decidirá tu camino\n' +
            '🏆 El primero en llegar al final GANA y va a LUCKY\n' +
            '⏰ Tienen 3 MINUTOS\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ¡COMIENZA PINBALL ROULETTE! (3 min)', null, 0x00FF00, 'bold', 2);

            gameState.gameTimer = setTimeout(function() {
                if (!gameState.active) return;
                room.sendAnnouncement('⏰ TIEMPO AGOTADO! Nadie llegó al final', null, 0xFF6600, 'bold', 2);
                gameState.active = false;
                if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
                setTimeout(function() {
                    if (gameState.callback) gameState.callback(null);
                    stop(room);
                }, 2000);
            }, config.gameDurationMs);
        }, config.explanationMs);
    }, 1500);

    setTimeout(function() {
        gameState.checkInterval = setInterval(function() { checkPlayers(room); }, config.checkMs);
    }, 1500 + config.explanationMs + config.graceMs);
}

function checkPlayers(room) {
    if (!gameState.active || gameState.winnerFound) return;

    if (gameState.gameStartTime) {
        var elapsed = Date.now() - gameState.gameStartTime;
        var remaining = config.gameDurationMs - elapsed;
        if (remaining <= 60000 && !gameState.timeWarnings['60']) {
            gameState.timeWarnings['60'] = true;
            room.sendAnnouncement('⏰ 1 MINUTO restante!', null, 0xFFFF00, 'bold', 2);
        }
        if (remaining <= 30000 && !gameState.timeWarnings['30']) {
            gameState.timeWarnings['30'] = true;
            room.sendAnnouncement('⏰ 30 SEGUNDOS restantes!', null, 0xFF6600, 'bold', 2);
        }
    }

    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.winnerFound) return;
        var p = gameState.players[i];
        var player = room.getPlayer(p.id);
        if (!player) continue;

        var px = (typeof player.x === 'number') ? player.x : (player.position && typeof player.position.x === 'number' ? player.position.x : null);
        var py = (typeof player.y === 'number') ? player.y : (player.position && typeof player.position.y === 'number' ? player.position.y : null);
        if (px === null || py === null) continue;

        if (py >= config.winZone.minY && px >= config.winZone.minX && px <= config.winZone.maxX) {
            gameState.winnerFound = true;
            declareWinner(room, p);
            return;
        }
    }
}

function declareWinner(room, winner) {
    var cb = gameState.callback;
    gameState.callback = null;
    stop(room);

    room.sendAnnouncement(
        '\n🏆 ' + winner.name.toUpperCase() + ' HA GANADO PINBALL ROULETTE! 🏆\n' +
        '🍀 ¡Va directo a LUCKY! 🍀\n' +
        '⏳ Cargando en 3 segundos...',
        null, 0xFFD700, 'bold', 2
    );
    setTimeout(function() {
        if (cb && winner) {
            console.log('✅ PINBALL_ROULETTE: Llamando callback con ganador ' + winner.name);
            cb(winner);
        } else {
            console.error('❌ PINBALL_ROULETTE: Callback inválido o ganador nulo');
        }
    }, 3000);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.winnerFound = false;
    gameState.timeWarnings = {};
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

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    gameState.players = gameState.players.filter(function(p) { return p.id !== player.id; });
    if (gameState.players.length === 0) {
        room.sendAnnouncement('❌ No hay ganador - todos se fueron', null, 0xFF0000);
        if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }
        stop(room);
    }
}

function isActive() { return gameState.active; }
function onPlayerChat(player, message) { if (gameState.chatBlocked) return false; return true; }

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};
