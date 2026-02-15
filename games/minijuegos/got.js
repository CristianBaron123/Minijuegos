// ============================================
// MINIJUEGO: GAME OF THRONES - Conquista el Trono
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
    firstEliminated: null,
    throneTimers: {},    // { playerId: entryTimestamp }
    thronePhases: {},    // { playerId: lastPhaseAnnounced (0,1,2) }
    lastAnnounceTime: 0 // cooldown global de anuncios
};

var config = {
    minPlayers: 2,
    checkMs: 100,
    explanationMs: 5000,
    maxGameTime: 120000,   // 2 minutos maximo
    throneHoldTime: 3000,  // 3 segundos para ganar
    announceCooldown: 400, // cooldown entre anuncios (ms)
    // Zona del trono: semicirculo central del mapa
    // Basado en los arcos internos y paredes curvas del centro
    throneZone: { x: 0, y: 10, radius: 30 }
};

function isPlayerInThrone(pos) {
    var dx = pos.x - config.throneZone.x;
    var dy = pos.y - config.throneZone.y;
    return Math.sqrt(dx * dx + dy * dy) <= config.throneZone.radius;
}

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('GOT - Iniciando juego...');
    try {
        if (!mapData) {
            console.error('GOT: mapData no disponible');
            if (onGameEnd) onGameEnd(null);
            return;
        }
        room.setCustomStadium(mapData);
    } catch (e) {
        console.error('GOT: error al cargar mapa', e && e.message);
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
    gameState.throneTimers = {};
    gameState.thronePhases = {};
    gameState.lastAnnounceTime = 0;

    setTimeout(function() {
        room.startGame();
        try { room.pauseGame(true); } catch(e) {}

        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n INSTRUCCIONES:\n' +
            'GAME OF THRONES - Conquista el Trono!\n' +
            'Llega al semicirculo del centro del mapa\n' +
            'Quedate dentro por 3 SEGUNDOS para ganar\n' +
            'Empuja a los demas para sacarlos del trono!\n\n' +
            'El juego comenzara en 5 segundos...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e) {}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('COMIENZA GAME OF THRONES!', null, 0x00FF00, 'bold', 2);
        }, config.explanationMs);
    }, 1500);

    // Timeout maximo del juego
    gameState.gameTimeout = setTimeout(function() {
        if (!gameState.active) return;
        // Buscar jugador con mas tiempo acumulado en el trono
        var bestPlayer = null;
        var bestTime = 0;
        var now = Date.now();
        gameState.players.forEach(function(p) {
            if (gameState.eliminated.indexOf(p.id) !== -1) return;
            var timer = gameState.throneTimers[p.id];
            if (timer) {
                var elapsed = now - timer;
                if (elapsed > bestTime) {
                    bestTime = elapsed;
                    bestPlayer = p;
                }
            }
        });
        if (bestPlayer) {
            room.sendAnnouncement('Tiempo agotado! El que mas tiempo estuvo en el trono gana.', null, 0xFFFF00, 'bold');
            declareWinner(room, bestPlayer, onGameEnd);
        } else {
            room.sendAnnouncement('Tiempo agotado - nadie conquisto el trono', null, 0xFF0000);
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

    var now = Date.now();
    var winnerFound = false;

    gameState.players.forEach(function(p) {
        if (winnerFound) return;
        if (gameState.eliminated.indexOf(p.id) !== -1) return;

        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            delete gameState.throneTimers[p.id];
            delete gameState.thronePhases[p.id];
            return;
        }

        var pos = player.position;
        if (!pos) return;

        if (isPlayerInThrone(pos)) {
            // Jugador esta en el trono
            if (!gameState.throneTimers[p.id]) {
                // Acaba de entrar
                gameState.throneTimers[p.id] = now;
                gameState.thronePhases[p.id] = 0;
                if (now - gameState.lastAnnounceTime > config.announceCooldown) {
                    room.sendAnnouncement('>> ' + p.name + ' entro al trono!', null, 0xFFD700);
                    gameState.lastAnnounceTime = now;
                }
            }

            var timeInThrone = now - gameState.throneTimers[p.id];
            var phase = gameState.thronePhases[p.id] || 0;

            // Anunciar progreso: 1s y 2s
            if (timeInThrone >= 1000 && phase < 1) {
                gameState.thronePhases[p.id] = 1;
                if (now - gameState.lastAnnounceTime > config.announceCooldown) {
                    room.sendAnnouncement('>> ' + p.name + ': 1s en el trono...', null, 0xFFA500);
                    gameState.lastAnnounceTime = now;
                }
            }
            if (timeInThrone >= 2000 && phase < 2) {
                gameState.thronePhases[p.id] = 2;
                if (now - gameState.lastAnnounceTime > config.announceCooldown) {
                    room.sendAnnouncement('>> ' + p.name + ': 2s en el trono!!', null, 0xFF4500, 'bold');
                    gameState.lastAnnounceTime = now;
                }
            }

            // Verificar victoria: 3 segundos
            if (timeInThrone >= config.throneHoldTime) {
                winnerFound = true;
                declareWinner(room, p, onGameEnd);
                return;
            }
        } else {
            // Jugador salio del trono - resetear timer
            if (gameState.throneTimers[p.id]) {
                delete gameState.throneTimers[p.id];
                delete gameState.thronePhases[p.id];
                if (now - gameState.lastAnnounceTime > config.announceCooldown) {
                    room.sendAnnouncement('X ' + p.name + ' salio del trono!', null, 0xFF6600);
                    gameState.lastAnnounceTime = now;
                }
            }
        }
    });
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
        '\n' + winner.name.toUpperCase() + ' HA CONQUISTADO EL TRONO!\n' +
        'Se mantuvo 3 segundos en el centro!',
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
    gameState.throneTimers = {};
    gameState.thronePhases = {};
    try { room.stopGame(); } catch(e) {}
}

// ============================================
// EVENTOS
// ============================================
function onPlayerLeave(room, player) {
    if (gameState.active && gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
        delete gameState.throneTimers[player.id];
        delete gameState.thronePhases[player.id];
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
