// ============================================
// MINIJUEGO: XD - Balon sin gravedad, primero a 3 goles
// Refactorizado con TournamentBalancer
// ============================================

var mapData = null;

var gameState = {
    active: false,
    firstRound: true,
    players: [],
    spectatorPool: [],
    stopRequested: false,
    chatBlocked: false,
    callback: null
};

var config = {
    firstExplanationMs: 5000,
    matchTimeMs: 60000,
    goalsToWin: 3
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[XD] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;
    gameState.stopRequested = false;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[XD] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para XD', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(function(p) { return p.id; });
    gameState.spectatorPool = [];

    // BALANCE ROUND — single call replaces all manual impar logic
    var bal = TournamentBalancer.balanceRound(room, gameState.players, gameState.spectatorPool);
    gameState.players = bal.activePlayers;
    gameState.spectatorPool = bal.spectators;

    if (bal.isTerminal) {
        if (bal.winnerId && gameState.callback) {
            var p = room.getPlayer(bal.winnerId);
            if (p) gameState.callback({ id: p.id, name: p.name });
        }
        stop(room);
        return;
    }

    // Assign teams and move spectators to team 0
    TournamentBalancer.assignTeams(room, gameState.players);
    for (var i = 0; i < gameState.spectatorPool.length; i++) {
        try { room.setPlayerTeam(gameState.spectatorPool[i], 0); } catch(e){}
    }

    room.sendAnnouncement('\ud83d\ude02 XD - Balon sin gravedad! Primero a ' + config.goalsToWin + ' goles gana.', null, 0x00BFFF, 'bold', 2);

    if (gameState.firstRound) {
        try { room.stopGame(); } catch(e){}
        setTimeout(function() {
            try { room.startGame(); } catch(e){}
            try { room.pauseGame(true); } catch(e){}
            gameState.chatBlocked = true;

            room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
                '\ud83d\ude02 El balon NO tiene gravedad, siempre cae!\n' +
                '⚽ Primero a ' + config.goalsToWin + ' goles gana la ronda\n' +
                '🏆 Eliminacion por rondas hasta quedar 1 ganador\n' +
                '⏳ Comienza en 5s...'
            , null, 0xFFFF00, 'bold', 2);

            setTimeout(function() {
                gameState.chatBlocked = false;
                try { room.pauseGame(false); } catch(e){}
                gameState.firstRound = false;
                runTournament(room);
            }, config.firstExplanationMs);
        }, 1500);
    } else {
        runTournament(room);
    }
}

function resolveWinner(room, winnerId) {
    if (winnerId && gameState.callback) {
        var p = room.getPlayer(winnerId);
        if (p) {
            room.sendAnnouncement('\n🏆 ¡' + p.name.toUpperCase() + ' HA GANADO XD! 🏆', null, 0xFFD700, 'bold', 2);
            setTimeout(function() { if (gameState.callback) gameState.callback({ id: p.id, name: p.name }); }, 2000);
        }
    }
    stop(room);
}

function runTournament(room) {
    (async function loop() {
        while (!gameState.stopRequested) {
            // SINGLE balanceRound call at start of each iteration
            var bal = TournamentBalancer.balanceRound(room, gameState.players, gameState.spectatorPool);
            gameState.players = bal.activePlayers;
            gameState.spectatorPool = bal.spectators;

            if (bal.isTerminal) {
                resolveWinner(room, bal.winnerId);
                return;
            }

            if (gameState.players.length === 2) {
                var ids = gameState.players.slice();
                try { room.setPlayerTeam(ids[0], 1); room.setPlayerTeam(ids[1], 2); } catch(e){}
                var result = await playMatch(room, ids, config.goalsToWin, config.matchTimeMs);
                if (result && result.winners && result.winners.length > 0) {
                    resolveWinner(room, result.winners[0]);
                } else {
                    stop(room);
                }
                return;
            }

            var matchPlayers = gameState.players.slice();
            var result = await playMatch(room, matchPlayers, config.goalsToWin, config.matchTimeMs);
            if (!result) { stop(room); return; }

            try { room.stopGame(); } catch(e){}

            // SINGLE processMatchResult — replaces all manual impar fixes
            var proc = TournamentBalancer.processMatchResult(
                room, result, gameState.players, gameState.spectatorPool, { keepHalfWinners: false }
            );
            gameState.players = proc.activePlayers;
            gameState.spectatorPool = proc.spectators;

            if (proc.isTerminal) {
                resolveWinner(room, proc.winnerId);
                return;
            }

            gameState.firstRound = false;
            await new Promise(function(r) { setTimeout(r, 2000); });
        }
    })();
}

function playMatch(room, playerIds, goalsToWin, timeMs) {
    return new Promise(function(resolve) {
        var scores = { 1: 0, 2: 0 };
        var stopped = false;

        try { room.stopGame(); } catch(e){}

        // Validate only — NO impar logic here (already balanced)
        var valid = TournamentBalancer.validatePlayers(room, playerIds);
        playerIds = valid.validIds;
        if (playerIds.length < 2) { resolve(null); return; }

        // Move non-participants to spectator
        TournamentBalancer.moveNonParticipantsToSpectator(room, playerIds);

        // Assign teams
        TournamentBalancer.assignTeams(room, playerIds);
        room.startGame();

        var prevOnGoal = room.onTeamGoal;
        room.onTeamGoal = function(team) {
            if (stopped) return;
            if (team === 1 || team === 2) {
                scores[team]++;
                room.sendAnnouncement('⚽ Gol del equipo ' + (team === 1 ? '🔴' : '🔵') + ' — ' + scores[1] + ' : ' + scores[2], null, 0x00FF00);
                if (scores[team] >= goalsToWin) { stopped = true; cleanupAndResolve(team); }
            }
        };

        var to = gameState.matchTimeout = setTimeout(function() {
            if (stopped) return;
            if (gameState.stopRequested) { resolve(null); return; }
            stopped = true;
            if (scores[1] === scores[2]) {
                room.sendAnnouncement('\n⚡ Empate. Muerte Subita!', null, 0xFFFF00);
                stopped = false;
                room.onTeamGoal = function(team) {
                    if (stopped) return;
                    stopped = true;
                    room.sendAnnouncement('⚽ ¡GOL! Equipo ' + (team === 1 ? '🔴' : '🔵') + ' GANA!', null, 0xFFD700, 'bold', 2);
                    cleanupAndResolve(team);
                };
                return;
            }
            cleanupAndResolve(scores[1] > scores[2] ? 1 : 2);
        }, timeMs);

        function cleanupAndResolve(team) {
            clearTimeout(to);
            try { room.onTeamGoal = prevOnGoal; } catch(e){}
            if (team === null) { resolve(null); return; }
            var winners = [], losers = [];
            var half = Math.floor(playerIds.length / 2);
            for (var i = 0; i < playerIds.length; i++) {
                if (!room.getPlayer(playerIds[i])) continue;
                if ((i < half ? 1 : 2) === team) winners.push(playerIds[i]); else losers.push(playerIds[i]);
            }
            room.sendAnnouncement('\n🏁 Ronda finalizada. Gano el equipo ' + (team === 1 ? '🔴' : '🔵') + ' (' + scores[1] + ' : ' + scores[2] + ')', null, 0xFFD700);
            resolve({ team: team, winners: winners, losers: losers });
        }
    });
}

function stop(room) {
    gameState.active = false;
    gameState.stopRequested = true;
    gameState.firstRound = true;
    gameState.players = [];
    gameState.spectatorPool = [];
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;

    // SINGLE handleDisconnect replaces all manual rebalancing
    var result = TournamentBalancer.handleDisconnect(room, player.id, gameState.players, gameState.spectatorPool);
    gameState.players = result.activePlayers;
    gameState.spectatorPool = result.spectators;

    if (result.isTerminal) {
        resolveWinner(room, result.winnerId);
    }
}

function onPlayerChat(room, player, message) {
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
