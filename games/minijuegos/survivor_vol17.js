// ============================================
// MINIJUEGO: SURVIVOR VOL 17 - 1v1 de goles
// Usado como mapa alternativo en finales 1v1
// (como AIR_HOCKEY / DOMINIC_SURVIVOR)
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    chatBlocked: false,
    gameStartTime: null,
    prevOnGoal: null,
    onGameEnd: null,
    goalEnabled: false,
    scores: {1: 0, 2: 0}
};

var config = {
    explanationMs: 5000,
    graceMs: 2000,
    goalGraceMs: 1500,
    goalsToWin: 3
};

function start(room, player1, player2, onGameEnd) {
    if (!mapData) { console.error('[SURVIVOR_VOL17] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.stopGame(); } catch(e){}

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[SURVIVOR_VOL17] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.goalEnabled = false;
    gameState.onGameEnd = onGameEnd;
    gameState.scores = {1: 0, 2: 0};
    gameState.players = [
        { id: player1.id, name: player1.name, team: 1 },
        { id: player2.id, name: player2.name, team: 2 }
    ];

    try { room.setPlayerTeam(player1.id, 1); } catch(e){}
    try { room.setPlayerTeam(player2.id, 2); } catch(e){}

    // Mover a todos los demás a espectador
    var allPlayers = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    allPlayers.forEach(function(p) {
        if (p.id !== player1.id && p.id !== player2.id) {
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
        }
    });

    room.sendAnnouncement(
        '⚔️ SURVIVOR VOL 17 - DESEMPATE 1v1!\n🔴 ' + player1.name + ' vs 🔵 ' + player2.name,
        null, 0xFF4444, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '⚔️ Survivor Vol 17 - 1v1!\n' +
            '⚽ El PRIMERO en anotar ' + config.goalsToWin + ' GOLES gana!\n' +
            '🏆 El ganador avanza al Lucky!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ¡COMIENZA! Primero a ' + config.goalsToWin + ' goles.', null, 0x00FF00, 'bold', 2);

            gameState.prevOnGoal = room.onTeamGoal;
            room.onTeamGoal = function(team) {
                if (!gameState.active) return;
                if (!gameState.goalEnabled) return;

                gameState.scores[team]++;

                var scorer = null;
                for (var i = 0; i < gameState.players.length; i++) {
                    if (gameState.players[i].team === team) {
                        scorer = gameState.players[i];
                        break;
                    }
                }

                var scorerName = scorer ? scorer.name : 'Equipo ' + team;
                var scoreStr = '🔴 ' + gameState.scores[1] + ' - ' + gameState.scores[2] + ' 🔵';

                if (gameState.scores[team] >= config.goalsToWin) {
                    room.sendAnnouncement('⚽ ¡GOL de ' + scorerName + '!\n' + scoreStr + '\n🏆 ¡' + scorerName.toUpperCase() + ' GANA!', null, 0xFFD700, 'bold', 2);
                    declareWinner(room, scorer);
                } else {
                    room.sendAnnouncement('⚽ ¡GOL de ' + scorerName + '!\n' + scoreStr, null, 0x00BFFF, 'bold', 2);
                    gameState.goalEnabled = false;
                    setTimeout(function() {
                        if (gameState.active) gameState.goalEnabled = true;
                    }, config.goalGraceMs);
                }
            };

            setTimeout(function() {
                gameState.goalEnabled = true;
            }, config.graceMs);
        }, config.explanationMs);
    }, 1500);
}

function declareWinner(room, winner) {
    if (!gameState.active) return;
    gameState.active = false;
    gameState.goalEnabled = false;
    try { room.onTeamGoal = gameState.prevOnGoal; } catch(e){}

    var elapsed = '';
    if (gameState.gameStartTime) {
        elapsed = ' (' + ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1) + 's)';
    }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' GANA SURVIVOR VOL 17! 🏆' + elapsed,
        null, 0xFFD700, 'bold', 2
    );

    try { room.stopGame(); } catch(e){}

    var cb = gameState.onGameEnd;
    gameState.onGameEnd = null;
    setTimeout(function() { if (cb) cb(winner); }, 3000);
}

function stop(room) {
    gameState.active = false;
    gameState.goalEnabled = false;
    try { room.onTeamGoal = gameState.prevOnGoal; } catch(e){}
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.onGameEnd = null;
    gameState.scores = {1: 0, 2: 0};
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

    if (!isParticipant) return;

    if (otherPlayer) {
        declareWinner(room, otherPlayer);
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
