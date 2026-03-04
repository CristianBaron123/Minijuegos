// ============================================
// MINIJUEGO: COVID-19 SURVIVAL (Teams)
// ============================================

// mapData será inyectado por bot.js como STRING JSON
var mapData = null;

var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false,
    gameStartTime: null,
    firstEliminated: null,
    hasBeenInBounds: {}
};

const config = {
    minPlayers: 2,
    // Rectángulo permitido definido por A(-300,300), B(300,300), C(300,-300), D(-300,-300)
    minX: -300,
    maxX: 300,
    minY: -300,
    maxY: 300
};

function start(room, onGameEnd) {
    console.log('🎮 COVID19 - Iniciando...');
    if (!mapData) {
        console.error('mapData no cargado en COVID19');
        return;
    }

    try {
        room.setCustomStadium(mapData);
    } catch (e) {
        console.error('Error al setCustomStadium COVID19', e);
        return;
    }

    // Preparar discos (zonas peligrosas) a partir del mapa
    var mapObj = null;
    try { mapObj = JSON.parse(mapData); } catch(e){ mapObj = null; }
    var dangerousDiscs = [];
    if (mapObj && Array.isArray(mapObj.discs)) {
        dangerousDiscs = mapObj.discs.filter(function(d) {
            try {
                if (d.cMask && d.cMask.indexOf && d.cMask.indexOf('red') !== -1) return true;
                if (d.color && d.color.toUpperCase() === 'FF0000') return true;
            } catch(e){}
            return false;
        });
    }

    // Revolver y asignar equipos
    try { shuffleTeams(room); } catch(e){console.error('shuffleTeams error', e);}

    gameState.active = true;
    gameState.players = room.getPlayerList().filter(function(p){ return p.id !== 0; });
    gameState.eliminated = [];
    gameState.hasBeenInBounds = {};
    gameState.firstEliminated = null;
    gameState.gameStartTime = null;

    setTimeout(function() {
        room.startGame();
        room.pauseGame(true);
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            "📋 INSTRUCCIONES:\n" +
            "- Mantente dentro del cuadro señalado\n" +
            "- Evita tocar las bolas rojas y el COVID-19\n" +
            "- Si sales del área o tocas una zona roja, quedas eliminado\n\n" +
            "⏱️ El juego empezará en 5 segundos...",
            null,
            0xFFFF00,
            'bold',
            2
        );

        setTimeout(function(){
            room.pauseGame(false);
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ¡COMIENZA!', null, 0x00FF00, 'bold', 2);
        }, 5000);

    }, 1500);

    // Empezar verificación después de explicación
    setTimeout(function() {
        gameState.checkInterval = setInterval(function(){ checkPlayers(room, onGameEnd, dangerousDiscs); }, 100);
    }, 8500);
}

function checkPlayers(room, onGameEnd, dangerousDiscs) {
    if (!gameState.active) return;
    var alive = [];

    gameState.players.forEach(function(p){
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
        var reason = '';

        // Fuera de límites (usar el mismo método que en WEB SURVIVAL)
        if (pos.x < config.minX || pos.x > config.maxX || pos.y < config.minY || pos.y > config.maxY) {
            // Protección de spawn: no eliminar si nunca estuvo dentro
            if (!gameState.hasBeenInBounds[p.id]) return;
            eliminated = true;
            reason = 'salió del área';
        } else {
            gameState.hasBeenInBounds[p.id] = true;
        }

        // Colisión con discos peligrosos
        if (!eliminated && Array.isArray(dangerousDiscs)) {
            for (var i = 0; i < dangerousDiscs.length; i++) {
                var d = dangerousDiscs[i];
                if (!d || !d.pos) continue;
                var dx = pos.x - d.pos[0];
                var dy = pos.y - d.pos[1];
                var dist2 = dx*dx + dy*dy;
                var r = d.radius || 0;
                var threshold = (r + config.playerRadius + 1);
                if (dist2 <= threshold*threshold) {
                    eliminated = true;
                    reason = 'tocó una zona roja';
                    break;
                }
            }
        }

        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            // Trackear primer eliminado
            if (!gameState.firstEliminated && gameState.gameStartTime) {
                var elapsedS = ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1);
                gameState.firstEliminated = { name: p.name, timeS: elapsedS };
            }
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement('❌ ' + p.name + ' ' + reason + '! (' + remaining + ' restantes)', null, 0xFF6600);
        } else if (!eliminated) {
            alive.push(p);
        }
    });

    if (alive.length === 1) {
        declareWinner(room, alive[0], onGameEnd);
    } else if (alive.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos eliminados', null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement('\n🏆 ¡¡¡' + winner.name.toUpperCase() + ' HA GANADO!!! 🏆\n', null, 0xFFD700, 'bold', 2);

    setTimeout(function(){
        if (onGameEnd) onGameEnd(winner);
    }, 3000);
}

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

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.eliminated = [];
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

function isActive() { return gameState.active === true; }

function getStats() {
    return { firstEliminated: gameState.firstEliminated };
}

function setMapData(m) { mapData = m; }

module.exports = {
    config,
    start,
    stop,
    onPlayerLeave,
    onPlayerChat,
    isActive,
    getStats,
    setMapData
};
