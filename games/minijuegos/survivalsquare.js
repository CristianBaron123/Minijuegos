// ============================================
// MINIJUEGO: SURVIVAL SQUARE - Empuja la pelota roja del centro y evita salir del cuadro
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [], // {id, name}
    eliminated: [],
    checkInterval: null,
    chatBlocked: false,
    explanationPhase: false,
    callback: null,
    hasBeenInBounds: {}
};

var config = {
    // Rectángulo A(-302,-302) a C(302,302)
    minX: -302,
    maxX: 302,
    minY: -302,
    maxY: 302,
    explanationMs: 5000,
    checkIntervalMs: 100
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[SURVIVAL_SQ] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;
    gameState.eliminated = [];
    gameState.hasBeenInBounds = {};

    // Obtener jugadores y asignar equipos ANTES de cargar el mapa
    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para SURVIVAL SQUARE', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    try { shuffleTeams(room); } catch(e) { console.error('[SURVIVAL_SQ] shuffle error', e.message); }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[SURVIVAL_SQ] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(p => ({ id: p.id, name: p.name }));

    // Anuncio y explicación (pausar mapa y bloquear chat durante explicación)
    room.sendAnnouncement('🧱 SURVIVAL SQUARE - Empuja la pelota roja y evita salir del cuadro', null, 0x00BFFF, 'bold', 2);
    gameState.chatBlocked = true;
    gameState.explanationPhase = true;
    try { room.startGame(); } catch(e){}
    try { room.pauseGame(true); } catch(e){}

    repositionSpawns(room);

    room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
        '🟥 Mantente dentro del cuadrado central para no ser eliminado.\n' +
        '🔴 Hay una pelota en el centro que empujan los jugadores.\n' +
        '⏱️ El último jugador dentro del cuadrado gana y va a Lucky.\n' +
        '⏳ Comienza en 5s...'
    , null, 0xFFFF00, 'bold', 2);

    setTimeout(function() {
        gameState.explanationPhase = false;
        gameState.chatBlocked = false;
        try { room.pauseGame(false); } catch(e){}
        // Comenzar verificación periódica
        if (gameState.checkInterval) clearInterval(gameState.checkInterval);
        gameState.checkInterval = setInterval(function() { checkPlayers(room); }, config.checkIntervalMs);
    }, config.explanationMs);
}

function checkPlayers(room) {
    if (!gameState.active) return;

    var alive = [];
    for (var pInfo of gameState.players) {
        if (gameState.eliminated.indexOf(pInfo.id) !== -1) continue;
        var p = room.getPlayer(pInfo.id);
        if (!p) { gameState.eliminated.push(pInfo.id); continue; }
        var pos = p.position;
        if (!pos) continue;

        if (pos.x < config.minX || pos.x > config.maxX || pos.y < config.minY || pos.y > config.maxY) {
            // Protección de spawn: no eliminar si nunca estuvo dentro
            if (!gameState.hasBeenInBounds[pInfo.id]) continue;
            // Eliminado
            gameState.eliminated.push(pInfo.id);
            try { room.setPlayerTeam(pInfo.id, 0); } catch(e){}
            room.sendAnnouncement('❌ ' + pInfo.name + ' salió del cuadro y fue eliminado', null, 0xFF6600);
        } else {
            gameState.hasBeenInBounds[pInfo.id] = true;
            alive.push(pInfo);
        }
    }

    if (alive.length === 1) {
        var winner = alive[0];
        declareWinner(room, winner);
    } else if (alive.length === 0) {
        // nadie -> no winner
        room.sendAnnouncement('❌ No hay ganador - todos fuera del cuadro', null, 0xFF0000);
        stop(room);
        if (gameState.callback) gameState.callback(null);
    }
}

function declareWinner(room, winner) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    room.sendAnnouncement('\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO SURVIVAL SQUARE! 🏆', null, 0xFFD700, 'bold', 2);
    setTimeout(function() {
        if (gameState.callback) gameState.callback({ id: winner.id, name: winner.name });
        stop(room);
    }, 2000);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.eliminated = [];
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
    var margin = 75;
    var sMinX = config.minX + margin, sMaxX = config.maxX - margin;
    var sMinY = config.minY + margin, sMaxY = config.maxY - margin;
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
    setMapData: function(jsonString) { mapData = jsonString; }
};

// Helper: shuffle teams similar a otros minijuegos
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
