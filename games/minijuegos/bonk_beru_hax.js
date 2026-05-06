// ============================================
// MINIJUEGO: BONK GAME BY BERU (from HaxMaps)
// Esquiva las bolas amarillas, golpea circulos azules para rebotar
// Teleport detection + bounds check
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    eliminated: [],
    prevPositions: {},
    checkInterval: null,
    chatBlocked: false,
    gameStartTime: null,
    firstEliminated: null,
    graceUntil: 0
};

var config = {
    minPlayers: 2,
    checkMs: 100,
    explanationMs: 5000,
    graceMs: 2000,
    // Mapa: 650x380
    teleportThreshold: 120,
    bounds: { minX: -630, maxX: 630, minY: -370, maxY: 370 }
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[BONK_BERU_HAX] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    // Limpiar estado previo por seguridad
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.active = false;
    gameState.eliminated = [];
    gameState.prevPositions = {};
    gameState.firstEliminated = null;
    gameState.graceUntil = 0;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[BONK_BERU_HAX] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para BONK GAME', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });

    shuffleTeams(room);

    room.sendAnnouncement(
        '🟡 BONK GAME by Beru\n👥 Jugadores: ' + players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        if (!gameState.active) return;
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        repositionSpawns(room);

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🟡 Esquiva las bolas AMARILLAS: si te tocan, quedas eliminado\n' +
            '🔵 Golpea los circulos AZULES para rebotar y escapar\n' +
            '❌ Cae fuera de la plataforma = eliminado\n' +
            '🏆 El ultimo jugador en pie gana!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            if (!gameState.active) return;
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            gameState.graceUntil = Date.now() + config.graceMs;
            gameState.prevPositions = {};
            room.sendAnnouncement('🟢 ¡COMIENZA BONK GAME!', null, 0x00FF00, 'bold', 2);

            // Iniciar check DESPUES del unpause + gracia
            gameState.checkInterval = setInterval(function() { checkPlayers(room, onGameEnd); }, config.checkMs);
        }, config.explanationMs);
    }, 1500);
}

function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;

    // Periodo de gracia: solo registrar posiciones, no eliminar
    var inGrace = Date.now() < gameState.graceUntil;

    var alivePlayers = [];

    gameState.players.forEach(function(p) {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;

        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            return;
        }

        var pos = player.position;
        if (!pos) return;

        if (inGrace) {
            // Solo registrar posiciones durante gracia
            gameState.prevPositions[p.id] = { x: pos.x, y: pos.y };
            alivePlayers.push(p);
            return;
        }

        var eliminated = false;
        var reason = '';

        // Detectar teletransporte (bola amarilla o KO)
        var prev = gameState.prevPositions[p.id];
        if (prev) {
            var dx = pos.x - prev.x;
            var dy = pos.y - prev.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > config.teleportThreshold) {
                eliminated = true;
                reason = 'fue golpeado por una bola amarilla';
            }
        }

        // Detectar si subio por encima de la linea Y=-240 (bug de expulsion)
        if (!eliminated && pos.y < -240) {
            eliminated = true;
            reason = 'salio por arriba de la plataforma';
        }

        // Detectar fuera de limites
        if (!eliminated && (pos.x < config.bounds.minX || pos.x > config.bounds.maxX ||
            pos.y < config.bounds.minY || pos.y > config.bounds.maxY)) {
            eliminated = true;
            reason = 'cayo fuera de la plataforma';
        }

        gameState.prevPositions[p.id] = { x: pos.x, y: pos.y };

        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            if (!gameState.firstEliminated && gameState.gameStartTime) {
                var elapsed = ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1);
                gameState.firstEliminated = { name: p.name, timeS: elapsed };
            }
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement('❌ ' + p.name + ' ' + reason + '! (' + remaining + ' restantes)', null, 0xFF6600);
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos eliminados', null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO BONK GAME! 🏆',
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
    gameState.eliminated = [];
    gameState.prevPositions = {};
    gameState.chatBlocked = false;
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

function repositionSpawns(room) {
    var active = gameState.players;
    var n = active.length;
    if (n === 0) return;
    var b = config.bounds;
    var margin = 160;
    var sMinX = b.minX + margin, sMaxX = b.maxX - margin;
    var sMinY = b.minY + margin, sMaxY = b.maxY - margin;
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

function getStats() {
    return { firstEliminated: gameState.firstEliminated };
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
