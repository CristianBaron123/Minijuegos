// ============================================
// MINIJUEGO: COVID-2 by Namajunas
// Esquiva el virus del COVID-19, ultimo en pie gana
// El virus te saca del mapa si te toca (KO zones)
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
    // Mapa: 850x350
    teleportThreshold: 100,
    bounds: { minX: -700, maxX: 700, minY: -300, maxY: 150 },
    spawnArea: { minX: -380, maxX: 380, minY: -120, maxY: -40 }
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[COVID2] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    // Limpiar estado previo por seguridad
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.active = false;
    gameState.eliminated = [];
    gameState.prevPositions = {};
    gameState.firstEliminated = null;
    gameState.graceUntil = 0;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[COVID2] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para COVID-2', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });

    shuffleTeams(room);

    room.sendAnnouncement(
        '🦠 COVID-2 SURVIVAL\n👥 Jugadores: ' + players.length,
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
            '🦠 Esquiva los virus del COVID-19!\n' +
            '💀 Si un virus te toca, te saca del mapa = ELIMINADO\n' +
            '🏃 Muevete rapido para sobrevivir\n' +
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
            room.sendAnnouncement('🟢 ¡COMIENZA COVID-2 SURVIVAL!', null, 0x00FF00, 'bold', 2);

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

        // Detectar teletransporte (virus te lanza a zona KO)
        var prev = gameState.prevPositions[p.id];
        if (prev) {
            var dx = pos.x - prev.x;
            var dy = pos.y - prev.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > config.teleportThreshold) {
                eliminated = true;
                reason = 'fue infectado por el virus';
            }
        }

        // Detectar fuera de limites del mapa
        if (!eliminated && (pos.x < config.bounds.minX || pos.x > config.bounds.maxX ||
            pos.y < config.bounds.minY || pos.y > config.bounds.maxY)) {
            eliminated = true;
            reason = 'cayo fuera del mapa';
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
            room.sendAnnouncement('🦠 ' + p.name + ' ' + reason + '! (' + remaining + ' restantes)', null, 0xFF0000);
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos infectados', null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' SOBREVIVIO AL COVID-2! 🏆\n🦠 Ultimo en pie!',
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
    var s = config.spawnArea;
    var cols = Math.ceil(Math.sqrt(n));
    var rows = Math.ceil(n / cols);
    var cellW = (s.maxX - s.minX) / cols;
    var cellH = (s.maxY - s.minY) / rows;
    for (var i = 0; i < n; i++) {
        var col = i % cols, row = Math.floor(i / cols);
        var sx = Math.round(s.minX + cellW * (col + 0.5));
        var sy = Math.round(s.minY + cellH * (row + 0.5));
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
