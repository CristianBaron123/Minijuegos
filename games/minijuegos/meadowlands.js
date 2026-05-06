// ============================================
// MINIJUEGO: MEADOWLANDS SURVIVAL
// Esquiva las bolas de colores. Ultimo en pie gana.
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false,
    hasBeenInBounds: {}
};

var config = {
    minPlayers: 2,
    arena: {
        minX: -522,
        maxX: 522,
        minY: -290,
        maxY: 290
    },
    checkMs: 100,
    explanationMs: 5000
};

function start(room, onGameEnd) {
    if (gameState.active) return;
    gameState.active = true;

    // Verificacion 1: cargar mapa al inicio
    try {
        if (!mapData) {
            console.error('❌ MEADOWLANDS: mapData no disponible');
        } else {
            room.setCustomStadium(mapData);
        }
    } catch (e) { console.error('❌ MEADOWLANDS: fallo al cargar mapa', e && e.message); }

    // Alternar entre equipo rojo y azul
    var players = room.getPlayerList().filter(function(p){ return p.id !== 0; });
    for (var k = 0; k < players.length; k++) {
        var team = (k % 2 === 0) ? 1 : 2;
        try { room.setPlayerTeam(players[k].id, team); } catch(e){}
    }

    gameState.players = room.getPlayerList().filter(function(p){ return p.id !== 0; });
    gameState.eliminated = [];
    gameState.hasBeenInBounds = {};

    room.sendAnnouncement('🌿 MEADOWLANDS SURVIVAL\n👥 Jugadores: ' + gameState.players.length, null, 0x00BFFF, 'bold', 2);

    setTimeout(function(){
        room.startGame();
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        repositionSpawns(room);

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🔰 Esquiva las bolas de colores!\n' +
            '📏 Si sales del area seras eliminado\n' +
            '🏆 El ultimo en pie gana\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function(){
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            room.sendAnnouncement('🟢 ¡COMIENZA MEADOWLANDS SURVIVAL!', null, 0x00FF00, 'bold', 2);
        }, config.explanationMs);
    }, 1500);

    setTimeout(function(){
        gameState.checkInterval = setInterval(function(){ checkPlayers(room, onGameEnd); }, config.checkMs);
    }, 8500);
}

function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;

    var minX = config.arena.minX, maxX = config.arena.maxX, minY = config.arena.minY, maxY = config.arena.maxY;
    var alivePlayers = [];

    gameState.players.forEach(function(p){
        if (gameState.eliminated.indexOf(p.id) !== -1) return;

        var pl = room.getPlayer(p.id);
        if (!pl) {
            gameState.eliminated.push(p.id);
            return;
        }

        var px = (typeof pl.x === 'number') ? pl.x : (pl.position && typeof pl.position.x === 'number' ? pl.position.x : null);
        var py = (typeof pl.y === 'number') ? pl.y : (pl.position && typeof pl.position.y === 'number' ? pl.position.y : null);
        if (px === null || py === null) return;

        var eliminated = false;
        if (px < minX || px > maxX || py < minY || py > maxY) {
            if (!gameState.hasBeenInBounds[p.id]) return;
            eliminated = true;
        } else {
            gameState.hasBeenInBounds[p.id] = true;
        }

        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            room.sendAnnouncement('❌ ' + p.name + ' eliminado (salio del area)', null, 0xFF6600);
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });

    if (alivePlayers.length === 1) {
        var winner = alivePlayers[0];
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        gameState.active = false;
        room.sendAnnouncement('\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO MEADOWLANDS SURVIVAL! 🏆', null, 0xFFD700, 'bold', 2);
        setTimeout(function(){ if (onGameEnd) onGameEnd(winner); }, 1000);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos fueron eliminados', null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

function repositionSpawns(room) {
    var active = gameState.players;
    var n = active.length;
    if (n === 0) return;
    var b = config.arena;
    var margin = 130;
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

module.exports = {
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: setMapData,
    isActive: isActive
};
