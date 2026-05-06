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
    eliminated: [],
    chatBlocked: false,
    hasBeenInBounds: {},
    callback: null
};

var config = {
    minPlayers: 2,
    bounds: 377,
    checkMs: 100
};

function isOutside(x, y) {
    var b = config.bounds;
    return x < -b || x > b || y < -b || y > b;
}

function start(room, onEnd) {
    if (gameState.active) return;
    gameState.active = true;
    gameState.callback = onEnd || null;
    gameState.eliminated = [];

    try {
        if (!mapData) {
            console.error('❌ SPACE_MELEE: mapData no está disponible');
        } else {
            room.setCustomStadium(mapData);
        }
    } catch (e) {
        console.error('❌ SPACE_MELEE: fallo al cargar mapa', e && e.message);
    }

    try { shuffleTeams(room); } catch (e) {}

    gameState.players = room.getPlayerList().filter(function(p){ return p.id !== 0; }).map(function(p) { return { id: p.id, name: p.name }; });
    gameState.hasBeenInBounds = {};

    room.sendAnnouncement('🎲 Minijuego: SPACE MELEE\n👥 Jugadores: ' + gameState.players.length + '\n⏱️ Iniciando en 3 segundos...', null, 0x00BFFF, 'bold', 2);

    setTimeout(function(){
        room.startGame();
        room.pauseGame(true);

        repositionSpawns(room);

        gameState.chatBlocked = true;

        room.sendAnnouncement('\n📋 INSTRUCCIONES:\n🌌 Estás dentro de la galaxia. Tu objetivo es evitar salir del círculo.\n🪐 Puedes usar los planetas para rebotar.\n🏆 El último en pie gana.\n\n⏱️ Comienza en 3s...', null, 0xFFFF00, 'bold', 2);

        setTimeout(function(){
            room.pauseGame(false);
            gameState.chatBlocked = false;
            room.sendAnnouncement('🟢 ¡COMIENZA SPACE MELEE!', null, 0x00FF00, 'bold', 2);
        }, 8000);
    }, 1500);

    setTimeout(function(){
        gameState.checkInterval = setInterval(function(){ checkPlayers(room, onEnd); }, config.checkMs);
    }, 9500);
}

function checkPlayers(room, onEnd) {
    if (!gameState.active) return;

    var alivePlayers = [];

    for (var i = 0; i < gameState.players.length; i++) {
        var p = gameState.players[i];
        if (gameState.eliminated.indexOf(p.id) !== -1) continue;

        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement('❌ ' + p.name + ' se desconectó', null, 0xFF6600);
            continue;
        }

        if (player.team === 0) {
            if (gameState.eliminated.indexOf(p.id) === -1) {
                gameState.eliminated.push(p.id);
            }
            continue;
        }

        try {
            var x = (typeof player.x === 'number') ? player.x : (player.position && player.position.x) || 0;
            var y = (typeof player.y === 'number') ? player.y : (player.position && player.position.y) || 0;

            if (isOutside(x, y)) {
                if (!gameState.hasBeenInBounds[p.id]) { alivePlayers.push(p); continue; }
                if (gameState.eliminated.indexOf(p.id) === -1) {
                    gameState.eliminated.push(p.id);
                    try {
                        room.setPlayerTeam(p.id, 0);
                        var remaining = gameState.players.length - gameState.eliminated.length;
                        room.sendAnnouncement('❌ ' + p.name + ' eliminado (salió del área)! (' + remaining + ' restantes)', null, 0xFF6600);
                    } catch(e) {}
                }
            } else {
                gameState.hasBeenInBounds[p.id] = true;
                alivePlayers.push(p);
            }
        } catch(e) { alivePlayers.push(p); }
    }

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos fueron eliminados', null, 0xFF0000);
        stop(room);
        if (onEnd) onEnd(null);
    }
}

function declareWinner(room, winner, onEnd) {
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }

    room.sendAnnouncement('\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO SPACE MELEE! 🏆', null, 0xFFD700, 'bold', 2);
    setTimeout(function(){ if (onEnd) onEnd(winner); }, 3000);
}

function stop(room) {
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    gameState.active = false;
    gameState.players = [];
    gameState.chatBlocked = false;
    try { room.stopGame(); } catch(e){}
}

function repositionSpawns(room) {
    var active = gameState.players;
    var n = active.length;
    if (n === 0) return;
    var b = config.bounds;
    var margin = Math.round(b * 0.25);
    var sMin = -b + margin, sMax = b - margin;
    var cols = Math.ceil(Math.sqrt(n));
    var rows = Math.ceil(n / cols);
    var cellW = (sMax - sMin) / cols;
    var cellH = (sMax - sMin) / rows;
    for (var i = 0; i < n; i++) {
        var col = i % cols, row = Math.floor(i / cols);
        var sx = Math.round(sMin + cellW * (col + 0.5));
        var sy = Math.round(sMin + cellH * (row + 0.5));
        try { room.setPlayerDiscProperties(active[i].id, { x: sx, y: sy, xspeed: 0, yspeed: 0 }); } catch(e){}
    }
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

module.exports = {
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: setMapData,
    isActive: isActive
};

