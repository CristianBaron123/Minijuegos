// ============================================
// MINIJUEGO: NUMBER CHAIRS - Entra al número 1 (círculo) y mantente 3s
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    timers: {},
    chatBlocked: false,
    checkInterval: null,
    callback: null
};

var config = {
    explanationMs: 5000,
    requiredMs: 3000,
    checkIntervalMs: 100,
    // Circle derived from semicircles A(-12.19,157) B(20.19,157)
    circleCenter: { x: 4.0, y: 157.0 },
    circleRadius: 16.19,
    tolerance: 6
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[NUMBERCHAIRS] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;

    // Obtener jugadores y asignar equipos ANTES de cargar mapa
    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < 1) { room.sendAnnouncement('⚠️ No hay jugadores para NUMBER CHAIRS', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }
    try { shuffleTeams(room); } catch(e){ }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[NUMBERCHAIRS] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(p => ({ id: p.id, name: p.name }));
    gameState.timers = {};

    // Explanation phase: load map, start and pause the room, block chat for explanation, then unpause and begin checks
    try { room.startGame(); } catch(e){}
    try { room.pauseGame(true); } catch(e){}
    gameState.chatBlocked = true;
    room.sendAnnouncement('\n🔢 NUMBER CHAIRS - Entra en el número 1 y quédate 3s\n', null, 0x00BFFF, 'bold', 2);
    room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
        '🔵 Debes entrar y mantenerte dentro del círculo del número 1 durante 3s para ganar.\n' +
        '⏳ Explicación: 5s (chat bloqueado).\n'
    , null, 0xFFFF00, 'bold', 2);

    setTimeout(function(){
        gameState.chatBlocked = false;
        try { room.pauseGame(false); } catch(e){}
        // Ensure previous interval cleared
        if (gameState.checkInterval) clearInterval(gameState.checkInterval);
        gameState.checkInterval = setInterval(() => checkPlayers(room), config.checkIntervalMs);
    }, config.explanationMs);
}

function checkPlayers(room) {
    if (!gameState.active) return;
    var playersList = room.getPlayerList().filter(p=>p.id!==0);
    for (var p of playersList) {
        var ps = gameState.players.find(x=>x.id===p.id);
        if (!ps) continue;
        var pos = p.position;
        if (!pos) continue;
        var dx = pos.x - config.circleCenter.x;
        var dy = pos.y - config.circleCenter.y;
        var dist2 = dx*dx + dy*dy;
        var inCircle = dist2 <= Math.pow(config.circleRadius + config.tolerance,2);
        if (inCircle) {
            gameState.timers[p.id] = (gameState.timers[p.id]||0) + config.checkIntervalMs;
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
    room.sendAnnouncement('\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO NUMBER CHAIRS! 🏆', null, 0xFFD700, 'bold', 2);
    setTimeout(function(){
        if (gameState.callback) gameState.callback({ id: winner.id, name: winner.name });
        stop(room);
    }, 2000);
}

function stop(room){
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.timers = {};
    gameState.chatBlocked = false;
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player){
    var idx = gameState.players.findIndex(x=>x.id===player.id);
    if (idx!==-1) gameState.players.splice(idx,1);
}

function onPlayerChat(player, message){
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive(){ return gameState.active; }

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
    setMapData: function(jsonString){ mapData = jsonString; }
};
