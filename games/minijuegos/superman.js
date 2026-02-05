// ============================================
// MINIJUEGO: SUPERMAN CHAIR - Párate en la cabeza de Superman
// ============================================

// mapData será inyectado desde bot.js
var mapData = null;

var gameState = {
    active: false,
    players: [], // {id, name, alive}
    checkInterval: null,
    explanationPhase: false,
    chatBlocked: false,
    timers: {}, // acumulador de tiempo en zona por jugador (ms)
    callback: null
};

// Configuración basada en coordenadas provistas
var config = {
    pointA: { x: -9.29, y: -47.15 },
    pointB: { x: 33.08, y: -34.58 },
    // tolerancia en píxeles alrededor de la línea AB
    tolerance: 20,
    requiredMs: 3000,
    checkIntervalMs: 100,
    explanationMs: 5000
};

function start(room, onGameEnd) {
    if (!mapData) {
        console.error('[SUPERMAN] mapData no inyectado.');
        return;
    }
    gameState.callback = onGameEnd || null;

    // Obtener lista de jugadores y comprobar mínimo
    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para SUPERMAN', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    // Revolver y asignar equipos ANTES de cargar el mapa (pedido del usuario)
    try { shuffleTeams(room); } catch(e) { console.error('[SUPERMAN] shuffle error', e.message); }

    try { room.setCustomStadium(mapData); } catch (e) { console.error('[SUPERMAN] Error cargando mapa', e.message); return; }

    gameState.active = true;
    gameState.players = players.map(p => ({ id: p.id, name: p.name, alive: true }));
    gameState.timers = {};

    room.sendAnnouncement('🎮 SUPERMAN CHAIR - Párate en la cabeza de Superman', null, 0x00BFFF, 'bold', 2);
    room.startGame();
    room.pauseGame(true);
    gameState.chatBlocked = true;

    room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
        '🔴 Todos se separan en equipos\n' +
        '🎯 Debes pararte en la cabeza de Superman (zona marcada en el mapa)\n' +
        '⏱️ Si permaneces 3s en esa zona, ganas y vas a Lucky\n' +
        '⏳ El juego comenzará después de la explicación de 5s...'
    , null, 0xFFFF00, 'bold', 2);

    setTimeout(function() {
        gameState.explanationPhase = false;
        gameState.chatBlocked = false;
        room.pauseGame(false);
        room.sendAnnouncement('🟢 ¡COMIENZA SUPERMAN CHAIR! Ponte en la cabeza de Superman', null, 0x00FF00, 'bold', 2);

        if (gameState.checkInterval) clearInterval(gameState.checkInterval);
        gameState.checkInterval = setInterval(() => checkPlayers(room), config.checkIntervalMs);
    }, config.explanationMs);
}

function checkPlayers(room) {
    if (!gameState.active) return;

    var AB = { x: config.pointB.x - config.pointA.x, y: config.pointB.y - config.pointA.y };
    var ABlen2 = AB.x*AB.x + AB.y*AB.y;

    var playersList = room.getPlayerList().filter(p => p.id !== 0);
    for (var p of playersList) {
        var ps = gameState.players.find(x => x.id === p.id);
        if (!ps || !ps.alive) continue;
        var pos = p.position;
        if (!pos) continue;

        // Distancia al segmento AB
        var AP = { x: pos.x - config.pointA.x, y: pos.y - config.pointA.y };
        var t = (AP.x * AB.x + AP.y * AB.y) / ABlen2;
        // Proyección más cercana
        var closest;
        if (t < 0) closest = config.pointA;
        else if (t > 1) closest = config.pointB;
        else closest = { x: config.pointA.x + AB.x * t, y: config.pointA.y + AB.y * t };

        var dx = pos.x - closest.x;
        var dy = pos.y - closest.y;
        var dist2 = dx*dx + dy*dy;

        var inZone = dist2 <= config.tolerance * config.tolerance;

        if (inZone) {
            gameState.timers[p.id] = (gameState.timers[p.id] || 0) + config.checkIntervalMs;
            if (gameState.timers[p.id] >= config.requiredMs) {
                declareWinner(room, { id: p.id, name: p.name });
                return;
            }
        } else {
            gameState.timers[p.id] = 0;
        }
    }
}

function declareWinner(room, winner) {
    if (!gameState.active) return;
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement('\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO SUPERMAN CHAIR! 🏆', null, 0xFFD700, 'bold', 2);
    setTimeout(function() {
        if (gameState.callback) gameState.callback({ id: winner.id, name: winner.name });
        stop(room);
    }, 2500);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.timers = {};
    gameState.chatBlocked = false;
    try { room.stopGame(); } catch(e) {}
}

function onPlayerLeave(room, player) {
    var p = gameState.players.find(x => x.id === player.id);
    if (p) p.alive = false;
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

// Helpers
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, i < half ? 1 : 2); } catch(e){}
    }
}

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};
