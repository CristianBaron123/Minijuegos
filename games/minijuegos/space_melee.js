// ============================================
// MINIJUEGO: SPACE MELEE - Elimina al que salga de la galaxia
// ============================================

// NOTA: el mapa será inyectado por bot.js
// mapData debe ser una STRING JSON, no un objeto JavaScript
var mapData = null;

var gameState = {
    active: false,
    checkInterval: null,
    players: [],
    chatBlocked: false
};

var config = {
    minPlayers: 2,
    bounds: 377,
    checkMs: 500
};

function isOutside(x, y) {
    var b = config.bounds;
    return x < -b || x > b || y < -b || y > b;
}

function start(room, onEnd) {
    if (gameState.active) return;
    gameState.active = true;

    try {
        if (!mapData) {
            console.error('❌ SPACE_MELEE: mapData no está disponible');
        } else {
            room.setCustomStadium(mapData);
        }
    } catch (e) {
        console.error('❌ SPACE_MELEE: fallo al cargar mapa', e && e.message);
    }

    // Mezclar equipos y preparar la pausa de instrucciones
    try { shuffleTeams(room); } catch (e) {}

    gameState.players = room.getPlayerList().filter(function(p){ return p.id !== 0; });

    room.sendAnnouncement('🎲 Minijuego: SPACE MELEE\n👥 Jugadores: ' + gameState.players.length + '\n⏱️ Iniciando en 3 segundos...', null, 0x00BFFF, 'bold', 2);

    setTimeout(function(){
        room.startGame();
        room.pauseGame(true);

        // Bloquear chat durante la explicación
        gameState.chatBlocked = true;

        room.sendAnnouncement('\n📋 INSTRUCCIONES:\n🌌 Estás dentro de la galaxia. Tu objetivo es evitar salir del círculo.\n🪐 Puedes usar los planetas para rebotar.\n🏆 El último en pie gana.\n\n⏱️ Comienza en 3s...', null, 0xFFFF00, 'bold', 2);

        setTimeout(function(){
            room.pauseGame(false);
            gameState.chatBlocked = false;
            room.sendAnnouncement('🟢 ¡COMIENZA SPACE MELEE!', null, 0x00FF00, 'bold', 2);
        }, 8000);
    }, 1500);

    // Inicio de comprobación periódica
    setTimeout(function(){
        gameState.checkInterval = setInterval(function(){ checkPlayers(room, onEnd); }, config.checkMs);
    }, 9500);
}

function checkPlayers(room, onEnd) {
    if (!gameState.active) return;

    var players = room.getPlayerList().filter(function(p){ return p.id !== 0 && p.team !== 0; });

    players.forEach(function(p){
        if (!p) return;
        try {
            var x = (typeof p.x === 'number') ? p.x : (p.position && p.position.x) || 0;
            var y = (typeof p.y === 'number') ? p.y : (p.position && p.position.y) || 0;

            if (p.team === 0) return;

            if (isOutside(x, y)) {
                try {
                    room.setPlayerTeam(p.id, 0);
                    room.sendAnnouncement('❌ ' + p.name + ' eliminado (salió del área)', null, 0xFF0000);
                } catch(e) {}
            }
        } catch(e) {}
    });

    var alive = room.getPlayerList().filter(function(p){ return p.id !== 0 && p.team !== 0; });

    if (alive.length <= 1) {
        if (gameState.checkInterval) {
            clearInterval(gameState.checkInterval);
            gameState.checkInterval = null;
        }
        gameState.active = false;
        if (alive.length === 1) {
            room.sendAnnouncement('\n🏆 ¡' + alive[0].name.toUpperCase() + ' HA GANADO! 🏆', null, 0xFFD700, 'bold', 2);
            setTimeout(function(){ onEnd && onEnd(alive[0]); }, 1000);
        } else {
            room.sendAnnouncement('❌ No hay ganador - todos fueron eliminados', null, 0xFF0000);
            setTimeout(function(){ onEnd && onEnd(null); }, 1000);
        }
    }
}

function stop(room) {
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    gameState.active = false;
    gameState.players = [];
    gameState.chatBlocked = false;
}

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p){ return p.id !== 0; });
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var k = 0; k < players.length; k++) {
        room.setPlayerTeam(players[k].id, (k < half) ? 1 : 2);
    }
}

function onPlayerLeave(room, player) {
    // no-op adicional
}

function onPlayerChat(player) {
    if (gameState.chatBlocked) return false;
    return true;
}

function setMapData(m) { mapData = m; }

function isActive() { return gameState.active; }

module.exports = {
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: setMapData,
    isActive: isActive
};

