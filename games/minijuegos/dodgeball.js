// ============================================
// MINIJUEGO: DODGEBALL - Los rojos esquivan la bola negra
// ============================================

// mapData será inyectado desde bot.js como string JSON
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
    blueCountThreshold: 8, // si hay >=8 jugadores elegimos 2 azules, sino 1
    arena: {
        // Coordenadas del cuadro según puntos A,B,C,D proporcionados
        // A: (-505,255), B: (505,255), C: (505,-255), D:(-505,-255)
        minX: -505,
        maxX: 505,
        minY: -255,
        maxY: 255
    },
    // Si true: eliminar solo cuando salen del rectángulo (ignorar impacto con la bola)
    onlyEliminateWhenOutOfBounds: true,
    checkIntervalMs: 120,
    hitDistance: 26, // distancia para considerar impacto bola->jugador
    explanationMs: 5000,
    selectionPauseMs: 1500
};

function start(room, onGameEnd) {
    if (!mapData) {
        console.error('[DODGEBALL] mapData no inyectado.');
        return;
    }

    gameState.callback = onGameEnd || null;

    try {
        room.setCustomStadium(mapData);
    } catch (e) {
        console.error('[DODGEBALL] Error cargando mapa:', e.message);
        return;
    }

    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para DODGEBALL', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.hasBeenInBounds = {};
    gameState.players = players.map(p => ({ id: p.id, name: p.name, alive: true, team: 1 }));

    // Determinar cantidad de azules (tiradores)
    var blueCount = (players.length >= config.blueCountThreshold) ? 2 : 1;

    // Elegir azules aleatoriamente
    var shuffled = players.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }
    var bluePlayers = shuffled.slice(0, blueCount);
    // Asignar equipos: azules = team 2, rojos = team 1
    gameState.players.forEach(p => {
        var isBlue = bluePlayers.find(b => b.id === p.id);
        if (isBlue) {
            p.team = 2;
            try { room.setPlayerTeam(p.id, 2); } catch(e){};
        } else {
            p.team = 1;
            try { room.setPlayerTeam(p.id, 1); } catch(e){};
        }
    });

    room.sendAnnouncement('🎮 DODGEBALL - ¡SOBREVIVE A LA BOLA NEGRA!', null, 0x00BFFF, 'bold', 2);
    room.sendAnnouncement('👥 Jugadores: ' + players.length + ' • Tiradores (azul): ' + blueCount, null, 0x00BFFF);

    // Pausar para explicación
    room.startGame();
    room.pauseGame(true);
    gameState.chatBlocked = true;

    repositionSpawns(room);

    room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
        '🔵 Los jugadores AZULES serán los que tiren la bola negra\n' +
        '🔴 Los ROJOS deben esquivar la bola: si la tocan quedan eliminados\n' +
        '📏 Si sales del cuadro central serás eliminado\n' +
        '🏆 El último ROJO en pie gana y será enviado a Lucky',
        null, 0xFFFF00, 'bold', 2);

    setTimeout(() => {
        // Fin de explicación
        gameState.explanationPhase = false;
        gameState.chatBlocked = false;
        room.pauseGame(false);
        room.sendAnnouncement('🟢 ¡COMIENZA DODGEBALL! • Evita la bola negra', null, 0x00FF00, 'bold', 2);

        // Empezar verificación
        if (gameState.checkInterval) clearInterval(gameState.checkInterval);
        gameState.checkInterval = setInterval(() => checkPlayers(room), config.checkIntervalMs);
    }, config.explanationMs + config.selectionPauseMs);
}

function checkPlayers(room) {
    if (!gameState.active) return;

    var ballPos = room.getBallPosition();

    gameState.players.forEach(p => {
        if (!p.alive) return;
        var playerObj = room.getPlayer(p.id);
        if (!playerObj) {
            p.alive = false;
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            return;
        }
        var pos = playerObj.position;
        if (!pos) return;

        // Fuera del cuadro = eliminado (solo afecta a ROJOS)
        if (pos.x < config.arena.minX || pos.x > config.arena.maxX || pos.y < config.arena.minY || pos.y > config.arena.maxY) {
            if (p.team === 1) {
                // Protección de spawn: no eliminar si nunca estuvo dentro
                if (!gameState.hasBeenInBounds[p.id]) return;
                eliminatePlayer(room, p, 'salió del cuadro');
            } else {
                // Ignorar azules fuera del cuadro (no afectan al conteo de rojos)
                // Opcional: mover azul a espectador silenciosamente si deseas
                try { room.setPlayerTeam(p.id, 2); } catch(e){}
            }
            return;
        } else {
            gameState.hasBeenInBounds[p.id] = true;
        }

        // Impacto con bola: solamente se considera si la opción está desactivada
        if (!config.onlyEliminateWhenOutOfBounds) {
            // Si es ROJO y la bola lo toca -> eliminado
            if (p.team === 1 && ballPos) {
                var dx = pos.x - ballPos.x;
                var dy = pos.y - ballPos.y;
                var dist2 = dx*dx + dy*dy;
                if (dist2 <= config.hitDistance * config.hitDistance) {
                    eliminatePlayer(room, p, 'fue golpeado por la bola negra');
                    return;
                }
            }
        }
    });

    // Verificar ganador (último rojo vivo)
    var aliveReds = gameState.players.filter(p => p.team === 1 && p.alive);
    if (aliveReds.length === 1) {
        var winner = aliveReds[0];
        declareWinner(room, winner);
    } else if (aliveReds.length === 0) {
        // No hay ganador
        room.sendAnnouncement('⚠️ No hay ganador en DODGEBALL', null, 0xFF6600);
        stop(room);
    }
}

function eliminatePlayer(room, player, reason) {
    if (!player || !player.alive) return;
    // Solo procesamos eliminaciones visibles para ROJOS
    if (player.team !== 1) {
        // Marcar como no activo pero no contar ni anunciar
        player.alive = false;
        try { room.setPlayerTeam(player.id, 0); } catch(e){}
        return;
    }
    player.alive = false;
    try { room.setPlayerTeam(player.id, 0); } catch(e){}

    var aliveReds = gameState.players.filter(p => p.team === 1 && p.alive).length;
    var msg = `💀 ${player.name} ha sido eliminado${reason ? ' - ' + reason : ''} (${aliveReds} rojos restantes)`;
    room.sendAnnouncement(msg, null, 0xFF6347, 'bold', 2);
    console.log('[DODGEBALL] ' + msg);
}

function declareWinner(room, winner) {
    if (!gameState.active) return;
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    room.sendAnnouncement(`\n🏆 ${winner.name.toUpperCase()} HA GANADO DODGEBALL! 🏆`, null, 0xFFD700, 'bold', 2);
    // Enviar al ganador a Lucky mediante callback
    setTimeout(() => {
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
    // Intentar detener el juego
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    var p = gameState.players.find(x => x.id === player.id);
    if (p) p.alive = false;
    try { room.setPlayerTeam(player.id, 0); } catch(e){}
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

function repositionSpawns(room) {
    var active = gameState.players.filter(function(p) { return p.alive; });
    var n = active.length;
    if (n === 0) return;
    var b = config.arena;
    var margin = 120;
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

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    // permitimos que bot.js inyecte mapData
    setMapData: function(jsonString) { mapData = jsonString; }
};
