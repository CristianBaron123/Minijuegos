// ============================================
// MINIJUEGO: 1234 - Juego de los Números
// Entra en un cuadro (1-4), se sorteará un número.
// Los que estén en ese número: eliminados.
// Fuera de todo cuadro = eliminado automáticamente.
// ============================================

var mapData = null;

var boxes = [
    { num: 1, minX: -441, maxX: -283, minY: -100, maxY: 50, name: 'ROJO' },
    { num: 2, minX: -199, maxX: -49,  minY: -100, maxY: 50, name: 'AMARILLO' },
    { num: 3, minX: 48,   maxX: 198,  minY: -100, maxY: 50, name: 'VERDE' },
    { num: 4, minX: 286,  maxX: 444,  minY: -100, maxY: 50, name: 'AZUL' }
];

var gameState = {
    active: false,
    alivePlayers: [],
    round: 0,
    phase: null,
    sameBoxStreak: 0,
    callback: null,
    timers: []
};

function addTimer(t) { gameState.timers.push(t); }

function clearTimers() {
    for (var i = 0; i < gameState.timers.length; i++) {
        try { clearTimeout(gameState.timers[i]); } catch(e) {}
        try { clearInterval(gameState.timers[i]); } catch(e) {}
    }
    gameState.timers = [];
}

function getPlayerBox(pos) {
    if (!pos) return 0;
    for (var i = 0; i < boxes.length; i++) {
        var b = boxes[i];
        if (pos.x > b.minX && pos.x < b.maxX && pos.y > b.minY && pos.y < b.maxY) {
            return b.num;
        }
    }
    return 0;
}

function pickRandomNumbers(count) {
    var pool = [1, 2, 3, 4];
    var result = [];
    for (var i = 0; i < count && pool.length > 0; i++) {
        var idx = Math.floor(Math.random() * pool.length);
        result.push(pool[idx]);
        pool.splice(idx, 1);
    }
    return result;
}

function findAliveIndex(id) {
    for (var i = 0; i < gameState.alivePlayers.length; i++) {
        if (gameState.alivePlayers[i].id === id) return i;
    }
    return -1;
}

function isStillAlive(id) {
    return findAliveIndex(id) !== -1;
}

function eliminatePlayer(room, playerId) {
    try { room.setPlayerTeam(playerId, 0); } catch(e) {}
    var idx = findAliveIndex(playerId);
    if (idx !== -1) gameState.alivePlayers.splice(idx, 1);
}

function start(room, onGameEnd) {
    if (!mapData) { console.error('[JUEGO_1234] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[JUEGO_1234] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) {
        room.sendAnnouncement('⚠️ Se necesitan al menos 2 jugadores para el Juego 1234', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.round = 0;
    gameState.sameBoxStreak = 0;
    gameState.phase = null;
    gameState.callback = onGameEnd || null;
    gameState.timers = [];
    gameState.alivePlayers = [];

    for (var i = 0; i < players.length; i++) {
        var team = (i % 2 === 0) ? 1 : 2;
        try { room.setPlayerTeam(players[i].id, team); } catch(e) {}
        gameState.alivePlayers.push({ id: players[i].id, name: players[i].name });
    }

    try { room.startGame(); } catch(e) {}
    try { room.pauseGame(true); } catch(e) {}

    room.sendAnnouncement(
        '🔢 ¡JUEGO DE LOS NÚMEROS - 1234!\n\n' +
        '📋 Entra en uno de los 4 cuadros:\n' +
        '1️⃣ ROJO (izquierda) | 2️⃣ AMARILLO\n' +
        '3️⃣ VERDE | 4️⃣ AZUL (derecha)\n\n' +
        '⚡ Se sorteará un número al azar — los que estén dentro: ¡ELIMINADOS!\n' +
        '⚠️ Estar FUERA de todos los cuadros = eliminado automáticamente\n' +
        '🏆 ¡El último en pie gana!',
        null, 0xFFFF00, 'bold', 2
    );

    addTimer(setTimeout(function() {
        if (!gameState.active) return;
        try { room.pauseGame(false); } catch(e) {}
        startRound(room);
    }, 5000));
}

function startRound(room) {
    if (!gameState.active) return;
    gameState.round++;
    gameState.phase = 'countdown';
    try { botState.chatBlocked = true; } catch(e){}

    var isFinale = gameState.alivePlayers.length === 2;
    var isFast = gameState.alivePlayers.length <= 4;

    room.sendAnnouncement(
        '🔢 RONDA ' + gameState.round +
        (isFinale ? ' ⚡ — ¡FINAL 1v1! Se eliminan 2 números!' : (isFast ? ' ⚡ — ¡Quedan pocos! Se eliminan 2 números!' : '')) + '\n' +
        '📍 ¡Entra en un cuadro! Tienes 15 segundos...\n' +
        '1️⃣ ROJO | 2️⃣ AMARILLO | 3️⃣ VERDE | 4️⃣ AZUL',
        null, 0x00BFFF, 'bold', 2
    );
    addTimer(setTimeout(function() { try { botState.chatBlocked = false; } catch(e){} }, 3000));

    addTimer(setTimeout(function() {
        if (gameState.active && gameState.phase === 'countdown')
            room.sendAnnouncement('⏱️ 10 segundos!', null, 0xFFFF00);
    }, 5000));
    addTimer(setTimeout(function() {
        if (gameState.active && gameState.phase === 'countdown')
            room.sendAnnouncement('⏱️ 5 segundos!', null, 0xFF6600);
    }, 10000));
    addTimer(setTimeout(function() {
        if (gameState.active && gameState.phase === 'countdown')
            room.sendAnnouncement('⏱️ 3...', null, 0xFF0000);
    }, 12000));
    addTimer(setTimeout(function() {
        if (gameState.active && gameState.phase === 'countdown')
            room.sendAnnouncement('⏱️ 2...', null, 0xFF0000);
    }, 13000));
    addTimer(setTimeout(function() {
        if (gameState.active && gameState.phase === 'countdown')
            room.sendAnnouncement('⏱️ 1...', null, 0xFF0000);
    }, 14000));

    addTimer(setTimeout(function() {
        if (!gameState.active) return;
        gameState.phase = 'selecting';
        checkRound(room);
    }, 15000));
}

function checkRound(room) {
    if (!gameState.active) return;

    var outside = [];
    var insideGroups = { 1: [], 2: [], 3: [], 4: [] };
    var playerBoxMap = {};

    for (var i = 0; i < gameState.alivePlayers.length; i++) {
        var p = gameState.alivePlayers[i];
        var player = room.getPlayer(p.id);
        if (!player || !player.position) {
            outside.push(p);
            continue;
        }
        var boxNum = getPlayerBox(player.position);
        if (boxNum === 0) {
            outside.push(p);
        } else {
            insideGroups[boxNum].push({ id: p.id, name: p.name });
            playerBoxMap[p.id] = boxNum;
        }
    }

    // Eliminar jugadores fuera de todo cuadro
    for (var i = 0; i < outside.length; i++) {
        eliminatePlayer(room, outside[i].id);
    }
    if (outside.length > 0) {
        var outsideNames = [];
        for (var i = 0; i < outside.length; i++) outsideNames.push(outside[i].name);
        room.sendAnnouncement('⚠️ ¡Fuera del campo! Eliminados: ' + outsideNames.join(', '), null, 0xFF6600, 'bold');
    }

    // Revisar condición de fin tras eliminaciones por fuera
    if (gameState.alivePlayers.length === 0) {
        addTimer(setTimeout(function() { if (gameState.active) endGame(room, null); }, 2000));
        return;
    }
    if (gameState.alivePlayers.length === 1) {
        addTimer(setTimeout(function() { if (gameState.active) endGame(room, gameState.alivePlayers[0]); }, 2000));
        return;
    }

    // Regla 1v1: misma caja
    var isFinale = gameState.alivePlayers.length === 2;
    if (isFinale) {
        var p1Id = gameState.alivePlayers[0].id;
        var p2Id = gameState.alivePlayers[1].id;
        var p1Box = playerBoxMap[p1Id];
        var p2Box = playerBoxMap[p2Id];

        if (p1Box !== undefined && p2Box !== undefined && p1Box === p2Box) {
            gameState.sameBoxStreak++;
            if (gameState.sameBoxStreak >= 3) {
                room.sendAnnouncement('💀 ¡Eligieron el mismo número por 3ª vez! ¡AMBOS ELIMINADOS! Empate.', null, 0xFF0000, 'bold', 2);
                addTimer(setTimeout(function() { if (gameState.active) endGame(room, null); }, 2000));
                return;
            } else if (gameState.sameBoxStreak === 2) {
                room.sendAnnouncement('⚠️ ¡Segunda vez en el mismo cuadro! Si vuelve a pasar, ¡AMBOS ELIMINADOS!', null, 0xFF6600, 'bold', 2);
            }
        } else {
            gameState.sameBoxStreak = 0;
        }
    }

    // Sortear número(s)
    var isFast = gameState.alivePlayers.length <= 4;
    var selectedNums = (isFinale || isFast) ? pickRandomNumbers(2) : pickRandomNumbers(1);
    var numLabels = [];
    for (var i = 0; i < selectedNums.length; i++) {
        numLabels.push(selectedNums[i] + ' (' + boxes[selectedNums[i] - 1].name + ')');
    }
    room.sendAnnouncement(
        '🎲 ¡NÚMERO' + (selectedNums.length > 1 ? 'S' : '') + ' SORTEADO' + (selectedNums.length > 1 ? 'S' : '') + '! ► ' + numLabels.join(' y ') + ' ◄',
        null, 0xFF0000, 'bold', 2
    );

    // Eliminar jugadores en los cuadros seleccionados
    var eliminatedInBox = [];
    for (var s = 0; s < selectedNums.length; s++) {
        var group = insideGroups[selectedNums[s]];
        if (!group) continue;
        for (var i = 0; i < group.length; i++) {
            if (isStillAlive(group[i].id)) {
                eliminatedInBox.push(group[i]);
                eliminatePlayer(room, group[i].id);
            }
        }
    }

    if (eliminatedInBox.length > 0) {
        var elimNames = [];
        for (var i = 0; i < eliminatedInBox.length; i++) elimNames.push(eliminatedInBox[i].name);
        room.sendAnnouncement('💥 Eliminados del cuadro ' + selectedNums.join('/') + ': ' + elimNames.join(', '), null, 0xFF6600);
    } else {
        room.sendAnnouncement('✅ ¡Nadie estaba en ese cuadro! Todos se salvan esta ronda.', null, 0x00FF00);
    }

    // Revisar condición de fin
    if (gameState.alivePlayers.length === 0) {
        addTimer(setTimeout(function() { if (gameState.active) endGame(room, null); }, 2000));
        return;
    }
    if (gameState.alivePlayers.length === 1) {
        addTimer(setTimeout(function() { if (gameState.active) endGame(room, gameState.alivePlayers[0]); }, 2000));
        return;
    }

    // Mostrar sobrevivientes
    var remainingNames = [];
    for (var i = 0; i < gameState.alivePlayers.length; i++) remainingNames.push(gameState.alivePlayers[i].name);
    room.sendAnnouncement('✅ Sobrevivientes (' + gameState.alivePlayers.length + '): ' + remainingNames.join(', '), null, 0x00BFFF);

    // Siguiente ronda: detener y reiniciar para resetear posiciones
    addTimer(setTimeout(function() {
        if (!gameState.active) return;
        try { room.stopGame(); } catch(e) {}
        addTimer(setTimeout(function() {
            if (!gameState.active) return;
            // Reasignar equipos (los eliminados quedaron en team 0)
            for (var i = 0; i < gameState.alivePlayers.length; i++) {
                var team = (i % 2 === 0) ? 1 : 2;
                try { room.setPlayerTeam(gameState.alivePlayers[i].id, team); } catch(e) {}
            }
            try { room.startGame(); } catch(e) {}
            try { room.pauseGame(true); } catch(e) {}
            addTimer(setTimeout(function() {
                if (!gameState.active) return;
                try { room.pauseGame(false); } catch(e) {}
                startRound(room);
            }, 1500));
        }, 1000));
    }, 3000));
}

function endGame(room, winner) {
    gameState.active = false;
    clearTimers();

    if (winner) {
        room.sendAnnouncement(
            '\n🏆 ¡' + winner.name + ' GANA EL JUEGO 1234! 🔢🏆',
            null, 0xFFD700, 'bold', 2
        );
    } else {
        room.sendAnnouncement('🤝 ¡Empate! Nadie gana esta vez.', null, 0xFFFFFF, 'bold', 2);
    }

    addTimer(setTimeout(function() {
        try { room.stopGame(); } catch(e) {}
        if (gameState.callback) {
            gameState.callback(winner ? { id: winner.id, name: winner.name } : null);
        }
    }, 3000));
}

function stop(room) {
    gameState.active = false;
    clearTimers();
    gameState.alivePlayers = [];
    gameState.phase = null;
    try { botState.chatBlocked = false; } catch(e){}
    try { room.stopGame(); } catch(e) {}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    var idx = findAliveIndex(player.id);
    if (idx === -1) return;

    gameState.alivePlayers.splice(idx, 1);
    room.sendAnnouncement('❌ ' + player.name + ' se fue. Quedan ' + gameState.alivePlayers.length + ' jugadores.', null, 0xFF6600);

    if (gameState.phase === 'selecting') return; // checkRound ya maneja el final

    if (gameState.alivePlayers.length === 1) {
        addTimer(setTimeout(function() { if (gameState.active) endGame(room, gameState.alivePlayers[0]); }, 1000));
    } else if (gameState.alivePlayers.length === 0) {
        addTimer(setTimeout(function() { if (gameState.active) endGame(room, null); }, 1000));
    }
}

function isActive() { return gameState.active; }
function getStats() { return {}; }

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    getStats: getStats,
    setMapData: function(jsonString) { mapData = jsonString; }
};
