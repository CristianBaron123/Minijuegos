// ============================================
// MINIJUEGO: SHOOTING SURVIVAL - Supervivencia vs disparos
// 1 azul (tirador), resto rojos. Ultimo rojo en pie gana.
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [], // { id, name, alive, team }
    checkInterval: null,
    explanationPhase: false,
    chatBlocked: false,
    callback: null,
    hasBeenInBounds: {}
};

var config = {
    minPlayers: 2,
    arena: {
        minX: -415,
        maxX: 332,
        minY: -200,
        maxY: 200
    },
    onlyEliminateWhenOutOfBounds: true,
    checkIntervalMs: 120,
    explanationMs: 5000,
    selectionPauseMs: 1500
};

function start(room, onGameEnd) {
    if (!mapData) {
        console.error('[SHOOTING_SURVIVAL] mapData no inyectado.');
        return;
    }

    gameState.callback = onGameEnd || null;

    try {
        room.setCustomStadium(mapData);
    } catch (e) {
        console.error('[SHOOTING_SURVIVAL] Error cargando mapa:', e.message);
        return;
    }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para SHOOTING SURVIVAL', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.hasBeenInBounds = {};
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name, alive: true, team: 1 }; });

    // 1 azul si <8 jugadores, 2 azules si >=8
    var blueCount = (players.length >= 8) ? 2 : 1;
    var shuffled = players.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }
    var bluePlayers = shuffled.slice(0, blueCount);
    var blueIds = {};
    for (var b = 0; b < bluePlayers.length; b++) { blueIds[bluePlayers[b].id] = true; }

    // Asignar equipos: azules = team 2, resto rojos = team 1
    gameState.players.forEach(function(p) {
        if (blueIds[p.id]) {
            p.team = 2;
            try { room.setPlayerTeam(p.id, 2); } catch(e){}
        } else {
            p.team = 1;
            try { room.setPlayerTeam(p.id, 1); } catch(e){}
        }
    });

    var blueNames = bluePlayers.map(function(p) { return p.name; }).join(', ');
    room.sendAnnouncement('🔫 SHOOTING SURVIVAL', null, 0x00BFFF, 'bold', 2);
    room.sendAnnouncement('👥 Jugadores: ' + players.length + ' • Tiradores (azul): ' + blueNames, null, 0x00BFFF);

    // Pausar para explicacion
    try { room.startGame(); } catch(e){}
    try { room.pauseGame(true); } catch(e){}
    gameState.chatBlocked = true;

    room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
        '🔵 El jugador AZUL es el tirador\n' +
        '🔴 Los ROJOS deben esquivar los disparos\n' +
        '📏 Si sales del area seras eliminado\n' +
        '🏆 El ultimo ROJO en pie gana',
        null, 0xFFFF00, 'bold', 2);

    setTimeout(function() {
        gameState.explanationPhase = false;
        gameState.chatBlocked = false;
        try { room.pauseGame(false); } catch(e){}
        room.sendAnnouncement('🟢 ¡COMIENZA SHOOTING SURVIVAL!', null, 0x00FF00, 'bold', 2);

        if (gameState.checkInterval) clearInterval(gameState.checkInterval);
        gameState.checkInterval = setInterval(function() { checkPlayers(room); }, config.checkIntervalMs);
    }, config.explanationMs + config.selectionPauseMs);
}

function checkPlayers(room) {
    if (!gameState.active) return;

    gameState.players.forEach(function(p) {
        if (!p.alive) return;
        var playerObj = room.getPlayer(p.id);
        if (!playerObj) {
            p.alive = false;
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            return;
        }
        var pos = playerObj.position;
        if (!pos) return;

        // Fuera del area = eliminado (solo afecta a ROJOS)
        if (pos.x < config.arena.minX || pos.x > config.arena.maxX || pos.y < config.arena.minY || pos.y > config.arena.maxY) {
            if (p.team === 1) {
                // Proteccion de spawn: no eliminar si nunca estuvo dentro
                if (!gameState.hasBeenInBounds[p.id]) return;
                eliminatePlayer(room, p, 'salio del area');
            }
            return;
        } else {
            gameState.hasBeenInBounds[p.id] = true;
        }
    });

    // Verificar ganador (ultimo rojo vivo)
    var aliveReds = gameState.players.filter(function(p) { return p.team === 1 && p.alive; });
    if (aliveReds.length === 1) {
        declareWinner(room, aliveReds[0]);
    } else if (aliveReds.length === 0) {
        room.sendAnnouncement('⚠️ No hay ganador en SHOOTING SURVIVAL', null, 0xFF6600);
        stop(room);
        if (gameState.callback) gameState.callback(null);
    }
}

function eliminatePlayer(room, player, reason) {
    if (!player || !player.alive) return;
    // Solo procesamos eliminaciones para ROJOS
    if (player.team !== 1) {
        player.alive = false;
        try { room.setPlayerTeam(player.id, 0); } catch(e){}
        return;
    }
    player.alive = false;
    try { room.setPlayerTeam(player.id, 0); } catch(e){}

    var aliveReds = gameState.players.filter(function(p) { return p.team === 1 && p.alive; }).length;
    var msg = '💀 ' + player.name + ' ha sido eliminado' + (reason ? ' - ' + reason : '') + ' (' + aliveReds + ' rojos restantes)';
    room.sendAnnouncement(msg, null, 0xFF6347, 'bold', 2);
    console.log('[SHOOTING_SURVIVAL] ' + msg);
}

function declareWinner(room, winner) {
    if (!gameState.active) return;
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    room.sendAnnouncement('\n🏆 ' + winner.name.toUpperCase() + ' HA GANADO SHOOTING SURVIVAL! 🏆', null, 0xFFD700, 'bold', 2);
    setTimeout(function() {
        if (gameState.callback) gameState.callback({ id: winner.id, name: winner.name });
        stop(room);
    }, 2500);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.explanationPhase = false;
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    var p = gameState.players.find(function(x) { return x.id === player.id; });
    if (p) p.alive = false;
    try { room.setPlayerTeam(player.id, 0); } catch(e){}
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) return false;
    return true;
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
