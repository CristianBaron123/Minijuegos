// ============================================
// MINIJUEGO: SPOT BONK - Evita caerte y alejarte de la bola
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

var config = {
    minPlayers: 2,
    // Zona de eliminación: franja horizontal entre Y 420 y 450, X entre -1000 y 1000
    elimMinY: 420,
    elimMaxY: 450,
    elimMinX: -1000,
    elimMaxX: 1000,
    checkMs: 100,
    explanationMs: 5000
};

function start(room, onGameEnd) {
    console.log('🎮 SPOT BONK - Iniciando juego...');
    try {
        if (!mapData) {
            console.error('❌ SPOT_BONK: mapData no está disponible');
        } else {
            room.setCustomStadium(mapData);
        }
    } catch (e) {
        console.error('❌ SPOT_BONK: fallo al cargar mapa', e && e.message);
    }

    // Asignar equipos
    try { shuffleTeams(room); } catch (e) {}

    gameState.players = room.getPlayerList().filter(function(p){ return p.id !== 0; });
    gameState.eliminated = [];
    gameState.active = true;

    room.sendAnnouncement('🎲 Minijuego: SPOT BONK\n👥 Jugadores: ' + gameState.players.length + '\n⏱️ Iniciando en 3 segundos...', null, 0x00BFFF, 'bold', 2);

    setTimeout(function(){
        room.startGame();
        try { room.pauseGame(true); } catch(e){}

        // Bloquear chat durante explicación
        gameState.chatBlocked = true;

        room.sendAnnouncement('\n📋 INSTRUCCIONES:\n🌐 Están en una plataforma, evita caerte y no te acerques a la franja donde caerá la bola.\n🏆 El último en pie gana.\n\n⏱️ Comienza en 5 segundos...', null, 0xFFFF00, 'bold', 2);

        setTimeout(function(){
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            room.sendAnnouncement('🟢 ¡COMIENZA SPOT BONK!', null, 0x00FF00, 'bold', 2);
        }, config.explanationMs);
    }, 1500);

    // Iniciar comprobaciones tras un breve retraso
    setTimeout(function(){
        gameState.checkInterval = setInterval(function(){ checkPlayers(room, onGameEnd); }, config.checkMs);
    }, 8500);
}

function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;

    var alivePlayers = [];

    gameState.players.forEach(function(p) {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;

        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement('❌ ' + p.name + ' se desconectó', null, 0xFF6600);
            return;
        }

        var pos = player.position;
        if (!pos) return;

        var eliminated = false;

        // Si el jugador entra en la franja de eliminación, eliminarlo
        if (pos.x >= config.elimMinX && pos.x <= config.elimMaxX && pos.y >= config.elimMinY && pos.y <= config.elimMaxY) {
            eliminated = true;
            console.log('💀 ' + p.name + ' cayó en la franja de eliminación - X:' + pos.x.toFixed(0) + ' Y:' + pos.y.toFixed(0));
        }

        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement('❌ ' + p.name + ' eliminado (cayó)', null, 0xFF6600);
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });

    if (alivePlayers.length === 1) {
        // Ganador
        var winner = alivePlayers[0];
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        gameState.active = false;
        room.sendAnnouncement('\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO SPOT BONK! 🏆', null, 0xFFD700, 'bold', 2);
        setTimeout(function(){ if (onGameEnd) onGameEnd(winner); }, 1000);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos fueron eliminados', null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

function stop(room) {
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
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

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function setMapData(m) { mapData = m; }

function isActive() { return gameState.active; }

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
