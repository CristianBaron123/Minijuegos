// ============================================
// MINIJUEGO: GYMMIX - Carrera de Obstaculos
// ============================================

// Nota: el mapa sera inyectado por bot.js como STRING JSON
var mapData = null;

var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false,
    gameTimeout: null,
    gameStartTime: null,
    firstEliminated: null // { name, timeS }
};

var config = {
    minPlayers: 2,
    checkMs: 150,
    explanationMs: 5000,
    maxGameTime: 1800000, // 30 minutos maximo (practicamente sin limite)
    // Zonas validas del recorrido (rectangulares, con margen generoso)
    // Cada zona cubre una seccion de la pista; si el jugador esta en ALGUNA, esta en pista
    trackZones: [
        // Zona 1: Area inicial amplia
        { minX: -2100, maxX: 1700, minY: -240, maxY: 240 },
        // Zona 2: Primer tunel estrecho + transicion
        { minX: 1600, maxX: 2250, minY: -110, maxY: 110 },
        // Zona 3: Corredor medio
        { minX: 2100, maxX: 3450, minY: -210, maxY: 210 },
        // Zona 4: Escalera/plataformas
        { minX: 3250, maxX: 3650, minY: -260, maxY: 260 },
        // Zona 5: Corredor largo
        { minX: 3450, maxX: 5400, minY: -210, maxY: 210 },
        // Zona 6: Area de expansion con escalones
        { minX: 5200, maxX: 5950, minY: -200, maxY: 200 },
        // Zona 7: Seccion estrecha
        { minX: 5850, maxX: 6350, minY: -100, maxY: 100 },
        // Zona 8: Area abierta compleja
        { minX: 6150, maxX: 6950, minY: -240, maxY: 240 },
        // Zona 9: Tunel estrecho
        { minX: 6800, maxX: 7150, minY: -120, maxY: 120 },
        // Zona 10: Expansion vertical
        { minX: 6950, maxX: 7500, minY: -260, maxY: 260 },
        // Zona 11: Tunel largo
        { minX: 7300, maxX: 8700, minY: -120, maxY: 120 },
        // Zona 12: Escalera cerca del final
        { minX: 8500, maxX: 8850, minY: -160, maxY: 160 },
        // Zona 13: Corredor final largo
        { minX: 8650, maxX: 10850, minY: -120, maxY: 120 },
        // Zona 14: Area de meta
        { minX: 10700, maxX: 11350, minY: -220, maxY: 220 }
    ],
    // Zona de meta: cuadrado pequeño al final (coordenadas exactas del mapa)
    winZone: { minX: 10925, maxX: 10970, minY: -25, maxY: 25 }
};

function isPlayerOnTrack(pos) {
    for (var i = 0; i < config.trackZones.length; i++) {
        var z = config.trackZones[i];
        if (pos.x >= z.minX && pos.x <= z.maxX && pos.y >= z.minY && pos.y <= z.maxY) {
            return true;
        }
    }
    return false;
}

function isPlayerInWinZone(pos) {
    var w = config.winZone;
    return pos.x >= w.minX && pos.x <= w.maxX && pos.y >= w.minY && pos.y <= w.maxY;
}

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('🏃 GYMMIX - Iniciando juego...');
    try {
        if (!mapData) {
            console.error('❌ GYMMIX: mapData no disponible');
            if (onGameEnd) onGameEnd(null);
            return;
        }
        room.setCustomStadium(mapData);
    } catch (e) {
        console.error('❌ GYMMIX: error al cargar mapa', e && e.message);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    // Asignar equipos
    try { shuffleTeams(room); } catch (e) {}

    gameState.players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    gameState.eliminated = [];
    gameState.active = true;
    gameState.firstEliminated = null;
    gameState.gameStartTime = null;

    setTimeout(function() {
        room.startGame();
        try { room.pauseGame(true); } catch(e) {}

        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🏃 Recorre la pista de obstaculos de izquierda a derecha\n' +
            '⚠️ Esquiva las bolas y obstaculos que se mueven\n' +
            '🔵 NO TOQUES LO AZUL!\n' +
            '💨 Cuidado: te deslizas muy rapido\n' +
            '🔲 El primero en llegar al cuadrado del final GANA\n' +
            '❌ Si sales de la pista, quedas eliminado\n\n' +
            '⏱️ El juego comenzara en 5 segundos...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e) {}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ¡COMIENZA GYMMIX!', null, 0x00FF00, 'bold', 2);
        }, config.explanationMs);
    }, 1500);

    // Timeout maximo del juego
    gameState.gameTimeout = setTimeout(function() {
        if (!gameState.active) return;
        // Buscar el jugador mas avanzado (mayor X)
        var bestPlayer = null;
        var bestX = -99999;
        gameState.players.forEach(function(p) {
            if (gameState.eliminated.indexOf(p.id) !== -1) return;
            var player = room.getPlayer(p.id);
            if (!player || !player.position) return;
            if (player.position.x > bestX) {
                bestX = player.position.x;
                bestPlayer = p;
            }
        });
        if (bestPlayer) {
            room.sendAnnouncement('⏱️ Tiempo agotado! El jugador mas avanzado gana.', null, 0xFFFF00, 'bold');
            declareWinner(room, bestPlayer, onGameEnd);
        } else {
            room.sendAnnouncement('❌ Tiempo agotado - sin ganador', null, 0xFF0000);
            stop(room);
            if (onGameEnd) onGameEnd(null);
        }
    }, config.maxGameTime);

    // Iniciar comprobaciones tras el delay de explicacion
    setTimeout(function() {
        gameState.checkInterval = setInterval(function() { checkPlayers(room, onGameEnd); }, config.checkMs);
    }, 8500);
}

// ============================================
// VERIFICAR JUGADORES
// ============================================
function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;

    var alivePlayers = [];
    var winnerFound = false;

    gameState.players.forEach(function(p) {
        if (winnerFound) return;
        if (gameState.eliminated.indexOf(p.id) !== -1) return;

        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement('❌ ' + p.name + ' se desconecto', null, 0xFF6600);
            return;
        }

        var pos = player.position;
        if (!pos) return;

        // Verificar si llego a la meta PRIMERO
        if (isPlayerInWinZone(pos)) {
            winnerFound = true;
            declareWinner(room, p, onGameEnd);
            return;
        }

        // Verificar si salio de la pista
        if (!isPlayerOnTrack(pos)) {
            if (gameState.eliminated.indexOf(p.id) === -1) {
                gameState.eliminated.push(p.id);
                try { room.setPlayerTeam(p.id, 0); } catch(e) {}
                // Trackear primer eliminado
                if (!gameState.firstEliminated && gameState.gameStartTime) {
                    var elapsedS = ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1);
                    gameState.firstEliminated = { name: p.name, timeS: elapsedS };
                }
                var remaining = gameState.players.length - gameState.eliminated.length;
                room.sendAnnouncement(
                    '❌ ' + p.name + ' salio de la pista! (' + remaining + ' restantes)',
                    null, 0xFF6600
                );
                console.log('💀 ' + p.name + ' fuera de pista - X:' + pos.x.toFixed(0) + ' Y:' + pos.y.toFixed(0));
            }
        } else {
            alivePlayers.push(p);
        }
    });

    if (winnerFound) return;

    // Todos eliminados, sin ganador
    if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement('❌ No hay ganador - todos fueron eliminados', null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner, onGameEnd) {
    if (!gameState.active) return;
    gameState.active = false;

    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    if (gameState.gameTimeout) {
        clearTimeout(gameState.gameTimeout);
        gameState.gameTimeout = null;
    }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO GYMMIX! 🏆\n' +
        '🎯 Llego primero a la meta!',
        null, 0xFFD700, 'bold', 2
    );

    setTimeout(function() {
        if (onGameEnd) onGameEnd(winner);
    }, 3000);
}

// ============================================
// REVOLVER EQUIPOS
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var k = 0; k < players.length; k++) {
        try { room.setPlayerTeam(players[k].id, (k < half) ? 1 : 2); } catch(e) {}
    }
}

// ============================================
// DETENER JUEGO
// ============================================
function stop(room) {
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    if (gameState.gameTimeout) {
        clearTimeout(gameState.gameTimeout);
        gameState.gameTimeout = null;
    }
    gameState.active = false;
    gameState.players = [];
    gameState.eliminated = [];
    gameState.chatBlocked = false;
    try { room.stopGame(); } catch(e) {}
}

// ============================================
// EVENTOS
// ============================================
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

function getStats() {
    return { firstEliminated: gameState.firstEliminated };
}

// ============================================
// EXPORTS
// ============================================
module.exports = {
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: setMapData,
    isActive: isActive,
    getStats: getStats
};
