// ============================================
// MINIJUEGO: EARN EASILY
// Torneo de goles: primero a 3 con tiempo
// El equipo ganador pierde la mitad al otro equipo
// Ultimo en pie gana
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
    if (!mapData) { console.error('[EARN_EASILY] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;
    gameState.stopRequested = false;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[EARN_EASILY] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para Earn Easily', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(function(p) { return p.id; });
    gameState.spectatorPool = [];

    if (gameState.players.length > 2 && (gameState.players.length % 2) === 1) {
        var rndIdx = Math.floor(Math.random() * gameState.players.length);
        var movedId = gameState.players.splice(rndIdx, 1)[0];
        gameState.spectatorPool.push(movedId);
        try { room.setPlayerTeam(movedId, 0); } catch(e){}
        room.sendAnnouncement('ℹ️ Se movio a un jugador a espectador para equilibrar equipos (impar).', null, 0xFFFF00);
    }

    shuffleTeams(room);

    room.sendAnnouncement('⚽ EARN EASILY - Primero a ' + config.goalsToWin + ' goles! El ganador pierde la mitad.', null, 0x00BFFF, 'bold', 2);

    if (gameState.firstRound) {
        try { room.stopGame(); } catch(e){}
        setTimeout(function() {
            try { room.startGame(); } catch(e){}
            try { room.pauseGame(true); } catch(e){}
            gameState.chatBlocked = true;

            room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
                '⚽ Primero a ' + config.goalsToWin + ' goles gana la ronda\n' +
                '🔄 El equipo ganador pierde la mitad de sus jugadores al otro equipo\n' +
                '🏆 Torneo por eliminacion - ultimo en pie gana!\n' +
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

function runTournament(room) {
    (async function loop() {
        while (!gameState.stopRequested) {
            var activePlayers = gameState.players.filter(function(id) { return !!room.getPlayer(id); });
            gameState.players = activePlayers;
            gameState.spectatorPool = gameState.spectatorPool.filter(function(id) { return !!room.getPlayer(id); });

            if (gameState.players.length <= 1) {
                var lone = gameState.players[0];
                if (lone && gameState.callback) {
                    var p = room.getPlayerList().find(function(x) { return x.id === lone; });
                    if (p) gameState.callback({ id: p.id, name: p.name });
                }
                stop(room);
                return;
            }

            if (gameState.players.length > 2 && (gameState.players.length % 2) === 1) {
                if (gameState.spectatorPool.length > 0) {
                    var pickIdx = Math.floor(Math.random() * gameState.spectatorPool.length);
                    var picked = gameState.spectatorPool.splice(pickIdx, 1)[0];
                    gameState.players.push(picked);
                    try { room.setPlayerTeam(picked, 1); } catch(e){}
                } else {
                    var moveIdx = Math.floor(Math.random() * gameState.players.length);
                    var movedToSpec = gameState.players.splice(moveIdx, 1)[0];
                    gameState.spectatorPool.push(movedToSpec);
                    try { room.setPlayerTeam(movedToSpec, 0); } catch(e){}
                }
            }

            if (gameState.players.length < 2) {
                if (gameState.players.length === 1) {
                    var wp = room.getPlayer(gameState.players[0]);
                    if (wp && gameState.callback) { var cb = gameState.callback; gameState.callback = null; stop(room); cb({ id: wp.id, name: wp.name }); }
                    else { stop(room); }
                } else { var cb = gameState.callback; gameState.callback = null; stop(room); if (cb) cb(null); }
                return;
            }

            if (gameState.players.length === 2) {
                var ids = gameState.players.slice();

                var _finaleGames = [];
                if (typeof DOMINIC_SURVIVOR !== 'undefined') _finaleGames.push(DOMINIC_SURVIVOR);
                if (typeof AIR_HOCKEY !== 'undefined') _finaleGames.push(AIR_HOCKEY);
                if (typeof GOL_A_GOL !== 'undefined') _finaleGames.push(GOL_A_GOL);
                if (typeof SPACE_VORTEX !== 'undefined') _finaleGames.push(SPACE_VORTEX);
                if (_finaleGames.length > 0 && Math.random() < 0.50) {
                    var p1 = room.getPlayerList().find(function(x) { return x.id === ids[0]; });
                    var p2 = room.getPlayerList().find(function(x) { return x.id === ids[1]; });
                    if (p1 && p2) {
                        var _chosenFinale = _finaleGames[Math.floor(Math.random() * _finaleGames.length)];
                        room.sendAnnouncement('\n🎮 ¡FINAL ESPECIAL 1v1! Mapa sorpresa', null, 0xFF69B4, 'bold', 2);
                        _chosenFinale.start(room, p1, p2, function(winner) {
                            if (winner && gameState.callback) {
                                gameState.callback(winner);
                            } else if (gameState.callback) {
                                gameState.callback(null);
                            }
                            stop(room);
                        });
                        return;
                    }
                }

                try { room.setPlayerTeam(ids[0], 1); room.setPlayerTeam(ids[1], 2); } catch(e){}
                var result = await playMatch(room, ids, config.goalsToWin, config.matchTimeMs);
                if (result && result.winners && result.winners.length > 0) {
                    var winnerId = result.winners[0];
                    var p = room.getPlayerList().find(function(x) { return x.id === winnerId; });
                    if (p) {
                        room.sendAnnouncement('\n🏆 ¡' + p.name.toUpperCase() + ' HA GANADO EARN EASILY! 🏆', null, 0xFFD700, 'bold', 2);
                        setTimeout(function() { if (gameState.callback) gameState.callback({ id: p.id, name: p.name }); }, 2000);
                    }
                }
                stop(room);
                return;
            }

            var matchPlayers = gameState.players.slice();
            var result = await playMatch(room, matchPlayers, config.goalsToWin, config.matchTimeMs);
            if (!result) { stop(room); return; }

            try { room.stopGame(); } catch(e){}

            // Perdedores: todos al spectator pool
            for (var i = 0; i < result.losers.length; i++) {
                var id = result.losers[i];
                try { room.setPlayerTeam(id, 0); } catch(e){}
                var idx = gameState.players.indexOf(id);
                if (idx !== -1) gameState.players.splice(idx, 1);
                gameState.spectatorPool.push(id);
            }

            // Ganadores: la mitad se mueve al otro equipo
            var winners = result.winners.slice();
            if (winners.length >= 2) {
                var half = Math.floor(winners.length / 2);
                // Mezclar ganadores aleatoriamente antes de dividir
                for (var si = winners.length - 1; si > 0; si--) {
                    var sj = Math.floor(Math.random() * (si + 1));
                    var stmp = winners[si]; winners[si] = winners[sj]; winners[sj] = stmp;
                }
                // La mitad que se mueve: pasa al spectator pool (se reintegrara en la proxima ronda)
                var movedWinners = winners.splice(half);
                for (var mi = 0; mi < movedWinners.length; mi++) {
                    gameState.spectatorPool.push(movedWinners[mi]);
                    var mIdx = gameState.players.indexOf(movedWinners[mi]);
                    if (mIdx !== -1) gameState.players.splice(mIdx, 1);
                    try { room.setPlayerTeam(movedWinners[mi], 0); } catch(e){}
                }
                room.sendAnnouncement('🔄 ' + movedWinners.length + ' jugador(es) del equipo ganador pasan al otro lado!', null, 0x00BFFF);
                // Los que quedan siguen como jugadores activos
                gameState.players = winners.slice();
            } else if (winners.length === 1) {
                gameState.players = [winners[0]];
            } else { stop(room); return; }

            // Reintegrar espectadores para llenar el otro equipo
            if (gameState.players.length >= 1 && gameState.spectatorPool.length > 0) {
                var needed = gameState.players.length;
                var available = gameState.spectatorPool.filter(function(id) { return !!room.getPlayer(id); });
                var toBring = available.slice(0, needed);
                for (var bi = 0; bi < toBring.length; bi++) {
                    var spIdx = gameState.spectatorPool.indexOf(toBring[bi]);
                    if (spIdx !== -1) gameState.spectatorPool.splice(spIdx, 1);
                    gameState.players.push(toBring[bi]);
                }
                if (toBring.length > 0) {
                    room.sendAnnouncement('🔄 ' + toBring.length + ' jugador(es) reintegrados desde espectadores.', null, 0xFFFF00);
                }
            }

            gameState.firstRound = false;

            if (gameState.players.length <= 1) {
                if (gameState.players.length === 1) {
                    var wp = room.getPlayer(gameState.players[0]);
                    if (wp && gameState.callback) { var cb = gameState.callback; gameState.callback = null; stop(room); cb({ id: wp.id, name: wp.name }); }
                    else { stop(room); }
                } else { var cb = gameState.callback; gameState.callback = null; stop(room); if (cb) cb(null); }
                return;
            }
            await new Promise(function(r) { setTimeout(r, 2000); });
        }
    })();
}

function playMatch(room, playerIds, goalsToWin, timeMs) {
    return new Promise(function(resolve) {
        var scores = { 1: 0, 2: 0 };
        var stopped = false;

        try { room.stopGame(); } catch(e){}

        var validIds = [];
        for (var vi = 0; vi < playerIds.length; vi++) {
            if (room.getPlayer(playerIds[vi])) validIds.push(playerIds[vi]);
        }
        playerIds = validIds;
        if (playerIds.length < 2) { resolve(null); return; }

        // Si impar, intentar traer espectador
        if ((playerIds.length % 2) === 1 && gameState.spectatorPool.length > 0) {
            for (var si = 0; si < gameState.spectatorPool.length; si++) {
                var sp = gameState.spectatorPool[si];
                if (room.getPlayer(sp)) {
                    gameState.spectatorPool.splice(si, 1);
                    playerIds.push(sp);
                    if (gameState.players.indexOf(sp) === -1) gameState.players.push(sp);
                    break;
                }
            }
        }
        // Si sigue impar, mover uno a espectador
        if ((playerIds.length % 2) === 1) {
            var moveIdx = Math.floor(Math.random() * playerIds.length);
            var movedToSpec = playerIds.splice(moveIdx, 1)[0];
            gameState.spectatorPool.push(movedToSpec);
            try { room.setPlayerTeam(movedToSpec, 0); } catch(e){}
            var pIdx = gameState.players.indexOf(movedToSpec);
            if (pIdx !== -1) gameState.players.splice(pIdx, 1);
        }
        if (playerIds.length < 2) { resolve(null); return; }

        // Mover no participantes a espectador
        var allP = room.getPlayerList();
        for (var ni = 0; ni < allP.length; ni++) {
            if (allP[ni].id === 0) continue;
            if (playerIds.indexOf(allP[ni].id) === -1) {
                try { room.setPlayerTeam(allP[ni].id, 0); } catch(e){}
            }
        }

        var half = Math.floor(playerIds.length / 2);
        for (var i = 0; i < playerIds.length; i++) {
            try { room.setPlayerTeam(playerIds[i], i < half ? 1 : 2); } catch(e){}
        }
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
    var idx = gameState.players.indexOf(player.id);
    if (idx !== -1) gameState.players.splice(idx, 1);
    var idx2 = gameState.spectatorPool.indexOf(player.id);
    if (idx2 !== -1) gameState.spectatorPool.splice(idx2, 1);
    if (gameState.active && gameState.players.length === 1) {
        var winnerId = gameState.players[0];
        var winner = room.getPlayerList().find(function(p) { return p.id === winnerId; });
        var cb = gameState.callback;
        gameState.callback = null;
        stop(room);
        if (winner && cb) cb({ id: winner.id, name: winner.name });
        else if (cb) cb(null);
    } else if (gameState.active && gameState.players.length === 0) {
        var cb = gameState.callback;
        gameState.callback = null;
        stop(room);
        if (cb) cb(null);
    }
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

function shuffleTeams(room) {
    var ids = gameState.players.slice();
    for (var i = ids.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = ids[i]; ids[i] = ids[j]; ids[j] = tmp;
    }
    var half = Math.floor(ids.length / 2);
    for (var i = 0; i < ids.length; i++) {
        try { room.setPlayerTeam(ids[i], i < half ? 1 : 2); } catch(e){}
    }
}

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};
