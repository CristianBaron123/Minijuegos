// ============================================
// MINIJUEGO: SPACE VORTEX - 1v1
// Se mueven rapido y descontrolado
// Primero a 3 goles gana
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
    scores: { 1: 0, 2: 0 }
};

var config = {
    explanationMs: 5000,
    graceMs: 3000,
    goalsToWin: 3
};

function start(room, player1, player2, onGameEnd) {
    if (!mapData) { console.error('[SPACE_VORTEX] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.stopGame(); } catch(e) {}
    try { room.setCustomStadium(mapData); } catch(e) { console.error('[SPACE_VORTEX] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.goalEnabled = false;
    gameState.onGameEnd = onGameEnd;
    gameState.scores = { 1: 0, 2: 0 };
    gameState.players = [
        { id: player1.id, name: player1.name },
        { id: player2.id, name: player2.name }
    ];

    try { room.setPlayerTeam(player1.id, 1); } catch(e) {}
    try { room.setPlayerTeam(player2.id, 2); } catch(e) {}

    var allPlayers = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    for (var i = 0; i < allPlayers.length; i++) {
        if (allPlayers[i].id !== player1.id && allPlayers[i].id !== player2.id) {
            try { room.setPlayerTeam(allPlayers[i].id, 0); } catch(e) {}
        }
    }

    room.sendAnnouncement(
        '🌀 SPACE VORTEX - 1v1!\n🔴 ' + player1.name + ' vs 🔵 ' + player2.name,
        null, 0x8A2BE2, 'bold', 2
    );

    setTimeout(function() {
        if (!gameState.active) return;
        try { room.startGame(); } catch(e) {}
        try { room.pauseGame(true); } catch(e) {}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🌀 Te mueves rapido y descontrolado!\n' +
            '⚽ Mete gol al arco contrario\n' +
            '🏆 Primero a ' + config.goalsToWin + ' goles GANA!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            if (!gameState.active) return;
            try { room.pauseGame(false); } catch(e) {}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 COMIENZA!', null, 0x00FF00, 'bold', 2);

            gameState.prevOnGoal = room.onTeamGoal;
            room.onTeamGoal = function(team) {
                if (!gameState.active || !gameState.goalEnabled) return;
                if (team === 1 || team === 2) {
                    gameState.scores[team]++;
                    room.sendAnnouncement('⚽ Gol del equipo ' + (team === 1 ? '🔴' : '🔵') + ' — ' + gameState.scores[1] + ' : ' + gameState.scores[2], null, 0x00FF00, 'bold');
                    if (gameState.scores[team] >= config.goalsToWin) {
                        var winner = null;
                        for (var i = 0; i < gameState.players.length; i++) {
                            if ((i === 0 && team === 1) || (i === 1 && team === 2)) {
                                winner = gameState.players[i];
                                break;
                            }
                        }
                        if (winner) declareWinner(room, winner, '⚽ Anoto ' + config.goalsToWin + ' goles!');
                    }
                }
            };

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
    try { room.onTeamGoal = gameState.prevOnGoal; } catch(e) {}

    var elapsed = '';
    if (gameState.gameStartTime) {
        elapsed = ' (' + ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1) + 's)';
    }

    room.sendAnnouncement(
        '\n🏆 ' + winner.name.toUpperCase() + ' GANA SPACE VORTEX! 🏆\n' + reason + elapsed,
        null, 0xFFD700, 'bold', 2
    );

    try { room.stopGame(); } catch(e) {}
    var cb = gameState.onGameEnd;
    setTimeout(function() { if (cb) cb(winner); }, 3000);
}

function stop(room) {
    gameState.active = false;
    gameState.goalEnabled = false;
    try { room.onTeamGoal = gameState.prevOnGoal; } catch(e) {}
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.onGameEnd = null;
    gameState.scores = { 1: 0, 2: 0 };
    try { room.stopGame(); } catch(e) {}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    var isParticipant = false;
    var otherPlayer = null;
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].id === player.id) isParticipant = true;
        else otherPlayer = gameState.players[i];
    }
    if (!isParticipant) return;
    if (otherPlayer) declareWinner(room, otherPlayer, '❌ ' + player.name + ' se desconecto');
    else stop(room);
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
