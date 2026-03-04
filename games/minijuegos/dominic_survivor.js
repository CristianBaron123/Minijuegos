// ============================================
// MINIJUEGO: DOMINIC SURVIVOR 15
// Carrera de obstaculos 1v1: el primero en anotar gol gana
// Solo aparece en 1v1 de minijuegos tipo partido (ultraball, carryball)
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],  // solo 2 jugadores (1v1)
    chatBlocked: false,
    gameStartTime: null,
    prevOnGoal: null,
    onGameEnd: null,
    goalEnabled: false
};

var config = {
    explanationMs: 5000,
    graceMs: 3000   // gracia antes de aceptar goles (evita auto-gol por fisica)
};

function start(room, player1, player2, onGameEnd) {
    if (!mapData) { console.error('[DOMINIC] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    // Limpiar estado previo y detener juego anterior
    try { room.stopGame(); } catch(e){}

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[DOMINIC] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.goalEnabled = false;
    gameState.onGameEnd = onGameEnd;
    gameState.players = [
        { id: player1.id, name: player1.name },
        { id: player2.id, name: player2.name }
    ];

    // Poner cada jugador en un equipo
    try { room.setPlayerTeam(player1.id, 1); } catch(e){}
    try { room.setPlayerTeam(player2.id, 2); } catch(e){}

    // Mover a todos los demas a espectador
    var allPlayers = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    allPlayers.forEach(function(p) {
        if (p.id !== player1.id && p.id !== player2.id) {
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
        }
    });

    room.sendAnnouncement(
        '⚔️ DOMINIC SURVIVOR - DESEMPATE 1v1!\n🔴 ' + player1.name + ' vs 🔵 ' + player2.name,
        null, 0xFF4500, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '⚔️ Carrera de obstaculos 1v1!\n' +
            '🏃 Pasa los obstaculos lo mas rapido posible\n' +
            '⚽ El PRIMERO en golpear la pelota del MEDIO y anotar GOL gana!\n' +
            '🏆 El ganador avanza al Lucky!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ¡COMIENZA LA CARRERA!', null, 0x00FF00, 'bold', 2);

            // Detectar gol para declarar ganador
            gameState.prevOnGoal = room.onTeamGoal;
            room.onTeamGoal = function(team) {
                if (!gameState.active) return;
                // Ignorar goles durante grace period (evita auto-gol por fisica del mapa)
                if (!gameState.goalEnabled) return;
                if (team === 1 || team === 2) {
                    // El equipo que anoto gana
                    var winner = null;
                    for (var i = 0; i < gameState.players.length; i++) {
                        var p = gameState.players[i];
                        // team 1 = player1 (index 0), team 2 = player2 (index 1)
                        if ((i === 0 && team === 1) || (i === 1 && team === 2)) {
                            winner = p;
                            break;
                        }
                    }
                    if (winner) {
                        declareWinner(room, winner, '⚽ Anoto gol primero!');
                    }
                }
            };

            // Habilitar deteccion de gol despues del grace period
            setTimeout(function() {
                gameState.goalEnabled = true;
            }, config.graceMs);
        }, config.explanationMs);
    }, 1500);
}

function declareWinner(room, winner, reason) {
    if (!gameState.active) return;
    gameState.active = false;
    gameState.goalEnabled = false;
    // Restaurar handler de gol
    try { room.onTeamGoal = gameState.prevOnGoal; } catch(e){}

    var elapsed = '';
    if (gameState.gameStartTime) {
        elapsed = ' (' + ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1) + 's)';
    }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' GANA DOMINIC SURVIVOR! 🏆\n' + reason + elapsed,
        null, 0xFFD700, 'bold', 2
    );

    // Detener el juego de HaxBall
    try { room.stopGame(); } catch(e){}

    var cb = gameState.onGameEnd;
    setTimeout(function() { if (cb) cb(winner); }, 3000);
}

function stop(room) {
    gameState.active = false;
    gameState.goalEnabled = false;
    try { room.onTeamGoal = gameState.prevOnGoal; } catch(e){}
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.onGameEnd = null;
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;

    var leaverId = player.id;
    var isParticipant = false;
    var otherPlayer = null;
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].id === leaverId) {
            isParticipant = true;
        } else {
            otherPlayer = gameState.players[i];
        }
    }

    // Solo actuar si el que se fue era participante del 1v1
    if (!isParticipant) return;

    if (otherPlayer) {
        declareWinner(room, otherPlayer, '❌ ' + player.name + ' se desconecto');
    } else {
        stop(room);
    }
}

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};
