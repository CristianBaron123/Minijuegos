// ============================================
// MINIJUEGO: COLLISION TEAM RACING
// Carrera por equipos — el primero que cruce ambas líneas gana
// ============================================

// mapData será inyectado desde bot.js como string JSON
var mapData = null;

var gameState = {
    active: false,
    players: [], // { id, name, team, finished }
    checkInterval: null,
    chatBlocked: false,
    explanationPhase: false,
    callback: null,
    firstCross: {}, // playerId -> { crossedLine1: bool }
    winnerDeclared: false
};

var config = {
    minPlayers: 2,
    checkIntervalMs: 100,
    explanationMs: 5000,
    selectionPauseMs: 1500,
    // Líneas de meta (usaremos rango X entre A.x y B.x y comprobación por Y)
    line1Y: -4702.777,
    line2Y: -4710.777,
    lineMinX: -15,
    lineMaxX: 15
};

function start(room, onGameEnd) {
    if (!mapData) {
        console.error('[COLLISION_RACING] mapData no inyectado.');
        return;
    }

    gameState.callback = onGameEnd || null;

    try { room.setCustomStadium(mapData); } catch (e) { console.error('[COLLISION_RACING] Error cargando mapa:', e.message); return; }

    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para COLLISION TEAM RACING', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.winnerDeclared = false;
    gameState.firstCross = {};

    // Inicializar players state
    gameState.players = players.map(p => ({ id: p.id, name: p.name, team: 1, finished: false }));

    // Separar equipos (mitad rojo, mitad azul)
    var shuffled = players.slice();
    for (var i = shuffled.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp; }
    var half = Math.floor(shuffled.length / 2);
    for (var k = 0; k < shuffled.length; k++) {
        var p = shuffled[k];
        var team = (k < half) ? 1 : 2;
        try { room.setPlayerTeam(p.id, team); } catch(e){}
        var rec = gameState.players.find(x => x.id === p.id);
        if (rec) rec.team = team;
    }

    room.sendAnnouncement('🏁 COLLISION TEAM RACING — ¡A competir!', null, 0x00BFFF, 'bold', 2);
    room.sendAnnouncement('👥 Jugadores: ' + players.length + ' • Equipos separados', null, 0x00BFFF);

    // Pausa para explicación
    room.startGame();
    try { room.pauseGame(true); } catch(e){}
    gameState.chatBlocked = true;
    gameState.explanationPhase = true;

    room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
        '🔴 vs 🔵 — Cruza la meta primero para ganar\n' +
        '📏 La meta tiene DOS LÍNEAS de verificación. Debes pasar ambas (se detecta por coordenadas)\n' +
        '🏆 El PRIMERO que complete ambas líneas gana y será enviado a Lucky',
        null, 0xFFFF00, 'bold', 2);

    setTimeout(() => {
        // Fin de explicación
        try { room.pauseGame(false); } catch(e){}
        gameState.explanationPhase = false;
        gameState.chatBlocked = false;

        // Iniciar verificación periódica
        if (gameState.checkInterval) clearInterval(gameState.checkInterval);
        gameState.checkInterval = setInterval(() => checkPlayers(room), config.checkIntervalMs);
    }, config.explanationMs + config.selectionPauseMs);
}

function checkPlayers(room) {
    if (!gameState.active || gameState.winnerDeclared) return;

    gameState.players.forEach(p => {
        if (!p || p.finished) return;
        var playerObj = room.getPlayer(p.id);
        if (!playerObj) return;
        var pos = playerObj.position;
        if (!pos) return;

        // Solo considerar si está dentro del rango X de la línea
        if (pos.x >= config.lineMinX && pos.x <= config.lineMaxX) {
            // Línea 1
            if (!gameState.firstCross[p.id] && pos.y <= config.line1Y) {
                gameState.firstCross[p.id] = { crossedLine1: true };
                // pequeño log
                try { room.sendAnnouncement('ℹ️ ' + p.name + ' cruzó la primera línea de meta', p.id, 0xFFFF00); } catch(e){}
            }
            // Línea 2 (confirmación). Solo si ya cruzó línea1
            if (gameState.firstCross[p.id] && gameState.firstCross[p.id].crossedLine1 && pos.y <= config.line2Y) {
                // declarar ganador (solo el primero)
                declareWinner(room, p);
            }
        }
    });
}

function declareWinner(room, winnerRec) {
    if (gameState.winnerDeclared) return;
    gameState.winnerDeclared = true;
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement('\n🏆 ¡' + winnerRec.name.toUpperCase() + ' HA GANADO COLLISION TEAM RACING! 🏆', null, 0xFFD700, 'bold', 2);
    console.log('[COLLISION_RACING] Ganador:', winnerRec.name);

    // Enviar ganador al callback para que el bot lo lleve a Lucky
    setTimeout(() => {
        if (gameState.callback) {
            try { gameState.callback({ id: winnerRec.id, name: winnerRec.name }); } catch(e){}
        }
        stop(room);
    }, 1500);
}

function stop(room) {
    gameState.active = false;
    gameState.winnerDeclared = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.firstCross = {};
    gameState.chatBlocked = false;
    gameState.callback = null;
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    var rec = gameState.players.find(x => x.id === player.id);
    if (rec) rec.finished = true;
}

function onPlayerChat(player, message) {
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
