// ============================================
// MINIJUEGO: CHAIRMIX - Mantente dentro del hueco (círculo) para evitar las bolas verdes
// ============================================

// Nota: el mapa será inyectado por bot.js como STRING JSON
var mapData = null;

var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false
};

// Configuración: usar los datos que proporcionaste
var config = {
    minPlayers: 2,
    // Arena rectangular (usar coordenadas proporcionadas)
    arena: {
        minX: -204,
        maxX: 204,
        minY: -200,
        maxY: 200
    },
    checkMs: 100,
    explanationMs: 5000,
    eps: 8 // tolerancia para evitar jitter
};

// Circle helpers removed — using rectangular arena detection instead

function start(room, onGameEnd) {
    if (gameState.active) return;
    gameState.active = true;

    try {
        if (!mapData) {
            console.error('❌ CHAIRMIX: mapData no disponible');
        } else {
            room.setCustomStadium(mapData);
        }
    } catch (e) { console.error('❌ CHAIRMIX: fallo al cargar mapa', e && e.message); }

    // Mezclar equipos (usa misma lógica que LALALA)
    try { shuffleTeams(room); } catch(e) {}

    gameState.players = room.getPlayerList().filter(function(p){ return p.id !== 0; });
    gameState.eliminated = [];

    room.sendAnnouncement('🎲 Minijuego: CHAIRMIX\n👥 Jugadores: ' + gameState.players.length + '\n⏱️ Iniciando en 3 segundos...', null, 0x00BFFF, 'bold', 2);

    setTimeout(function(){
        room.startGame();
        try { room.pauseGame(true); } catch(e){}

        // Bloquear chat durante explicación
        gameState.chatBlocked = true;

        room.sendAnnouncement('\n📋 INSTRUCCIONES:\n🔰 Mantente dentro del hueco circular para que las bolas verdes no te toquen.\n🏆 El último en pie gana.\n\n⏱️ Comienza en 5 segundos...', null, 0xFFFF00, 'bold', 2);

        setTimeout(function(){
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            room.sendAnnouncement('🟢 ¡COMIENZA CHAIRMIX!', null, 0x00FF00, 'bold', 2);
        }, config.explanationMs);
    }, 1500);

    setTimeout(function(){
        gameState.checkInterval = setInterval(function(){ checkPlayers(room, onGameEnd); }, config.checkMs);
    }, 8500);
}

function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;

    // Rectangle bounds from config.arena
    var minX = config.arena.minX, maxX = config.arena.maxX, minY = config.arena.minY, maxY = config.arena.maxY;
    var alivePlayers = [];

    gameState.players.forEach(function(p){
        if (gameState.eliminated.indexOf(p.id) !== -1) return;

        var pl = room.getPlayer(p.id);
        if (!pl) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement('❌ ' + p.name + ' se desconectó', null, 0xFF6600);
            return;
        }

        // Leer posición de forma robusta (pl.x/pl.y o pl.position.x/ y)
        var px = (typeof pl.x === 'number') ? pl.x : (pl.position && typeof pl.position.x === 'number' ? pl.position.x : null);
        var py = (typeof pl.y === 'number') ? pl.y : (pl.position && typeof pl.position.y === 'number' ? pl.position.y : null);
        if (px === null || py === null) return;

        // Rectangular check: if player outside box -> eliminated
        var eliminated = false;
        if (px < minX || px > maxX || py < minY || py > maxY) {
            eliminated = true;
            console.log('💀 ' + p.name + ' salió del área rectangular - X:' + px.toFixed(0) + ' Y:' + py.toFixed(0));
        }

        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            room.sendAnnouncement('❌ ' + p.name + ' eliminado (salió del hueco)', null, 0xFF6600);
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });

    if (alivePlayers.length === 1) {
        var winner = alivePlayers[0];
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        gameState.active = false;
        room.sendAnnouncement('\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO CHAIRMIX! 🏆', null, 0xFFD700, 'bold', 2);
        setTimeout(function(){ if (onGameEnd) onGameEnd(winner); }, 1000);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos fueron eliminados', null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

function stop(room) {
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.active = false;
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

function onPlayerChat(player) {
    if (gameState.chatBlocked) return false;
    return true;
}

function setMapData(m) { mapData = m; }

function isActive() { return gameState.active; }

// Copiar shuffleTeams (misma lógica que LALALA)
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p){ return p.id !== 0; });
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var k = 0; k < players.length; k++) {
        try { room.setPlayerTeam(players[k].id, (k < half) ? 1 : 2); } catch(e){}
    }
}

module.exports = {
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: setMapData,
    isActive: isActive
};
