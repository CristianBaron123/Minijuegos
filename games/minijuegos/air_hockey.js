// ============================================
// MINIJUEGO: AIR HOCKEY 1v1
// Hockey de mesa 1v1: el primero en anotar 3 goles gana
// Solo aparece en 1v1 de minijuegos (alternativa a Dominic Survivor)
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
    scores: {1: 0, 2: 0},
    safetyTimeout: null
};

var config = {
    explanationMs: 5000,
    graceMs: 2000,
    goalGraceMs: 1500,
    goalsToWin: 3,
    maxGameMs: 300000
};

function start(room, player1, player2, onGameEnd) {
    if (!mapData) { console.error('[AIR_HOCKEY] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.stopGame(); } catch(e){}

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[AIR_HOCKEY] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.goalEnabled = false;
    gameState.onGameEnd = onGameEnd;
    gameState.scores = {1: 0, 2: 0};
    gameState.players = [
        { id: player1.id, name: player1.name, team: 1 },
        { id: player2.id, name: player2.name, team: 2 }
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
        '🏒 AIR HOCKEY - DESEMPATE 1v1!\n🔴 ' + player1.name + ' vs 🔵 ' + player2.name,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        if (!gameState.active) return;
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🏒 Air Hockey 1v1!\n' +
            '⚽ El PRIMERO en anotar ' + config.goalsToWin + ' GOLES gana!\n' +
            '🏆 El ganador avanza al Lucky!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0x00BFFF, 'bold', 2
        );

        setTimeout(function() {
            if (!gameState.active) return;
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ¡COMIENZA EL PARTIDO! Primero a ' + config.goalsToWin + ' goles.', null, 0x00FF00, 'bold', 2);

            // Detectar goles
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
                    if (scorer) declareWinner(room, scorer, '⚽ Primero en anotar ' + config.goalsToWin + ' goles!');
                } else {
                    room.sendAnnouncement('⚽ ¡GOL de ' + scorerName + '!\n' + scoreStr, null, 0x00BFFF, 'bold', 2);
                    // Breve gracia despues de cada gol para evitar auto-goles en kickoff
                    gameState.goalEnabled = false;
                    setTimeout(function() {
                        if (gameState.active) gameState.goalEnabled = true;
                    }, config.goalGraceMs);
                }
            };

            // Habilitar deteccion de gol despues del grace period inicial
            setTimeout(function() {
                gameState.goalEnabled = true;
            }, config.graceMs);

            if (gameState.safetyTimeout) clearTimeout(gameState.safetyTimeout);
            gameState.safetyTimeout = setTimeout(function() {
                if (!gameState.active) return;
                console.log('[AIR_HOCKEY] Safety timeout');
                if (gameState.scores[1] > gameState.scores[2]) {
                    declareWinner(room, gameState.players[0], '⏱️ Tiempo agotado - gana por marcador');
                } else if (gameState.scores[2] > gameState.scores[1]) {
                    declareWinner(room, gameState.players[1], '⏱️ Tiempo agotado - gana por marcador');
                } else {
                    room.sendAnnouncement('⏱️ Tiempo agotado - empate, sin ganador', null, 0xFF6600);
                    stop(room);
                }
            }, config.maxGameMs);
        }, config.explanationMs);
    }, 1500);
}

function declareWinner(room, winner, reason) {
    if (!gameState.active) return;
    gameState.active = false;
    gameState.goalEnabled = false;
    try { room.onTeamGoal = gameState.prevOnGoal; } catch(e){}

    var elapsed = '';
    if (gameState.gameStartTime) {
        elapsed = ' (' + ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1) + 's)';
    }

    room.sendAnnouncement(
        '\n🏆 ¡' + winner.name.toUpperCase() + ' GANA AIR HOCKEY! 🏆\n' + reason + elapsed,
        null, 0xFFD700, 'bold', 2
    );

    try { room.stopGame(); } catch(e){}

    var cb = gameState.onGameEnd;
    setTimeout(function() { if (cb) cb(winner); }, 3000);
}

function stop(room) {
    var cb = gameState.onGameEnd;
    gameState.active = false;
    gameState.goalEnabled = false;
    if (gameState.safetyTimeout) { clearTimeout(gameState.safetyTimeout); gameState.safetyTimeout = null; }
    try { room.onTeamGoal = gameState.prevOnGoal; } catch(e){}
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.onGameEnd = null;
    gameState.scores = {1: 0, 2: 0};
    try { room.stopGame(); } catch(e){}
    if (cb) cb(null);
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
