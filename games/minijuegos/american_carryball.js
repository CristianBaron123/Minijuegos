// ============================================
// MINIJUEGO: AMERICAN SPACE CARRYBALL - Fútbol Americano
// Basado en ultraball.js - equipos anotan llevando el balón al otro lado
// ============================================

var mapData = null;

var gameState = {
    active: false,
    firstRound: true,
    players: [],
    spectatorPool: [],
    currentMatch: null,
    stopRequested: false,
    chatBlocked: false,
    callback: null
};

var config = {
    firstExplanationMs: 5000,
    matchTimeMs: 90000, // 1.5 minutos por partido
    goalsToWin: 3       // 3 touchdowns para ganar
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[CARRYBALL] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;
    gameState.stopRequested = false;
    gameState.firstRound = true;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[CARRYBALL] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para CARRYBALL', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return p.id; });
    gameState.spectatorPool = [];

    // Si hay cantidad impar de jugadores, mover uno aleatorio a espectador para equilibrar equipos
    if (gameState.players.length > 2 && (gameState.players.length % 2) === 1) {
        var rndIdx = Math.floor(Math.random() * gameState.players.length);
        var movedId = gameState.players.splice(rndIdx, 1)[0];
        gameState.spectatorPool.push(movedId);
        try { room.setPlayerTeam(movedId, 0); } catch(e){}
        room.sendAnnouncement('ℹ️ Se movio a un jugador a espectador para equilibrar equipos (impar).', null, 0xFFFF00);
    }

    shuffleTeams(room);

    room.sendAnnouncement('🏈 AMERICAN SPACE CARRYBALL - Lleva tu balón al otro lado!', null, 0x00BFFF, 'bold', 2);

    try { room.stopGame(); } catch(e){}
    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        try { lockTeamChanges(); } catch(e) {}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🏈 Hay 2 balones: uno 🔴 ROJO y uno 🔵 AZUL\n' +
            '🎯 Lleva el balón de TU COLOR al lado contrario para anotar (TOUCHDOWN)\n' +
            '⚽ Para mover el balón debes estar cerca de él (te deslizas con el)\n' +
            '🔴 vs 🔵 - Primero en ' + config.goalsToWin + ' touchdowns gana la ronda\n' +
            '❌ El equipo perdedor queda eliminado\n' +
            '🏆 El último jugador en pie va al Lucky!\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { unlockTeamChanges(); } catch(e) {}
            gameState.chatBlocked = false;
            try { room.pauseGame(false); } catch(e){}
            gameState.firstRound = false;
            runTournament(room);
        }, config.firstExplanationMs);
    }, 1500);
}

// Ejecuta las rondas hasta quedar 1v1 y enviar ganador a Lucky (misma logica que ultraball)
function runTournament(room) {
    (async function loop() {
        while (!gameState.stopRequested) {
            if (gameState.players.length <= 1) {
                var lone = gameState.players[0];
                if (lone && gameState.callback) {
                    var p = room.getPlayerList().find(function(x) { return x.id === lone; });
                    if (p) gameState.callback({ id: p.id, name: p.name });
                }
                stop(room);
                return;
            }

            // Si hay 3 jugadores exactos: mover uno aleatorio a espectador
            if (gameState.players.length === 3) {
                var rnd = Math.floor(Math.random() * gameState.players.length);
                var moved = gameState.players.splice(rnd, 1)[0];
                gameState.spectatorPool.push(moved);
                try { room.setPlayerTeam(moved, 0); } catch(e){}
                room.sendAnnouncement('ℹ️ 1 jugador movido a espectador para equilibrar (3 jugadores).', null, 0xFFFF00);
            }

            if (gameState.players.length === 2) {
                var ids = gameState.players.slice();

                // 50% probabilidad de juego especial 1v1 (Dominic Survivor o Air Hockey)
                var _finaleGames = [];
                if (typeof DOMINIC_SURVIVOR !== 'undefined') _finaleGames.push(DOMINIC_SURVIVOR);
                if (typeof AIR_HOCKEY !== 'undefined') _finaleGames.push(AIR_HOCKEY);
                if (typeof SURVIVOR_VOL17 !== 'undefined') _finaleGames.push(SURVIVOR_VOL17);
                if (_finaleGames.length > 0 && Math.random() < 0.50) {
                    var p1 = room.getPlayerList().find(function(x) { return x.id === ids[0]; });
                    var p2 = room.getPlayerList().find(function(x) { return x.id === ids[1]; });
                    if (p1 && p2) {
                        var _chosenFinale = _finaleGames[Math.floor(Math.random() * _finaleGames.length)];
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

                // Asignar equipos 1 vs 2
                try { room.setPlayerTeam(ids[0], 1); room.setPlayerTeam(ids[1], 2); } catch(e){}
                var result = await playMatch(room, ids, config.goalsToWin, config.matchTimeMs);
                if (result && result.winners && result.winners.length > 0) {
                    var winnerId = result.winners[0];
                    var p = room.getPlayerList().find(function(x) { return x.id === winnerId; });
                    if (p) {
                        room.sendAnnouncement('\n🏈 ¡' + p.name.toUpperCase() + ' HA GANADO EL 1v1! 🏆', null, 0xFFD700, 'bold', 2);
                        setTimeout(function() {
                            if (gameState.callback) gameState.callback({ id: p.id, name: p.name });
                        }, 2000);
                    }
                }
                stop(room);
                return;
            }

            // Ronda normal
            var matchPlayers = gameState.players.slice();
            var result = await playMatch(room, matchPlayers, config.goalsToWin, config.matchTimeMs);
            if (!result) {
                stop(room);
                return;
            }

            // Detener y mover perdedores a espectador
            try { room.stopGame(); } catch(e){}
            for (var i = 0; i < result.losers.length; i++) {
                var lid = result.losers[i];
                try { room.setPlayerTeam(lid, 0); } catch(e){}
                var idx = gameState.players.indexOf(lid);
                if (idx !== -1) gameState.players.splice(idx, 1);
                gameState.spectatorPool.push(lid);
            }

            // Si ganadores >1, repartir mitad al otro equipo para la siguiente ronda
            var winners = result.winners.slice();
            if (winners.length > 1) {
                // Si impar y hay espectador, traer uno aleatorio para balancear
                if ((winners.length % 2) === 1 && gameState.spectatorPool.length > 0) {
                    var rndIdx = Math.floor(Math.random() * gameState.spectatorPool.length);
                    var picked = gameState.spectatorPool.splice(rndIdx, 1)[0];
                    gameState.players.push(picked);
                    try { room.setPlayerTeam(picked, 1); } catch(e){}
                    winners.push(picked);
                }

                // dividir winners en dos mitades para la siguiente ronda
                var half = Math.floor(winners.length / 2);
                for (var j = 0; j < winners.length; j++) {
                    try { room.setPlayerTeam(winners[j], j < half ? 1 : 2); } catch(e){}
                }
                gameState.players = winners.slice();
            } else if (winners.length === 1) {
                // Solo queda 1 — dejar que el loop intente traer espectador para 1v1
                gameState.players = [winners[0]];
            } else {
                stop(room); return;
            }

            gameState.firstRound = false;
            var activePlayers = gameState.players.filter(function(id) { return !!room.getPlayer(id); });
            gameState.players = activePlayers;
            gameState.spectatorPool = gameState.spectatorPool.filter(function(id) { return !!room.getPlayer(id); });
            if (gameState.players.length > 1 && (gameState.players.length % 2) === 1 && gameState.spectatorPool.length > 0) {
                var rndIdx = Math.floor(Math.random() * gameState.spectatorPool.length);
                var picked = gameState.spectatorPool.splice(rndIdx, 1)[0];
                gameState.players.push(picked);
                try { room.setPlayerTeam(picked, 1); } catch(e){}
                room.sendAnnouncement('ℹ️ Se trajo un jugador de espectador para equilibrar equipos.', null, 0xFFFF00);
            }
            // Si sigue impar (no hay espectadores), mover uno a espectador
            if (gameState.players.length > 2 && (gameState.players.length % 2) === 1) {
                var moveIdx = Math.floor(Math.random() * gameState.players.length);
                var movedToSpec = gameState.players.splice(moveIdx, 1)[0];
                gameState.spectatorPool.push(movedToSpec);
                try { room.setPlayerTeam(movedToSpec, 0); } catch(e){}
            }
            // Si queda 1 y hay espectador, traerlo para continuar
            if (gameState.players.length === 1 && gameState.spectatorPool.length > 0) {
                var rndIdx2 = Math.floor(Math.random() * gameState.spectatorPool.length);
                var picked2 = gameState.spectatorPool.splice(rndIdx2, 1)[0];
                gameState.players.push(picked2);
                try { room.setPlayerTeam(picked2, 1); } catch(e){}
            }
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

// Juega un partido con los jugadores indicados; devuelve ganadores/losers (Promise como ultraball)
function playMatch(room, playerIds, goalsToWin, timeMs) {
    return new Promise(function(resolve) {
        var scores = { 1: 0, 2: 0 };
        var stopped = false;
        var prevOnGoal = room.onTeamGoal;

        // Asignar equipos ANTES de iniciar para que spawneen en posicion correcta
        try { room.stopGame(); } catch(e){}

        // Verificar jugadores validos antes de iniciar
        var validIds = [];
        for (var vi = 0; vi < playerIds.length; vi++) {
            if (room.getPlayer(playerIds[vi])) validIds.push(playerIds[vi]);
        }
        playerIds = validIds;
        if (playerIds.length < 2) { resolve(null); return; }
        // Si impar y hay espectadores, traer uno para equilibrar
        if ((playerIds.length % 2) === 1 && gameState.spectatorPool.length > 0) {
            for (var si = 0; si < gameState.spectatorPool.length; si++) {
                var sp = gameState.spectatorPool[si];
                if (room.getPlayer(sp)) {
                    gameState.spectatorPool.splice(si, 1);
                    playerIds.push(sp);
                    if (gameState.players.indexOf(sp) === -1) gameState.players.push(sp);
                    room.sendAnnouncement('ℹ️ Se trajo un jugador de espectador para equilibrar equipos.', null, 0xFFFF00);
                    break;
                }
            }
        }

        // Si sigue impar (no habia espectador disponible), mover uno a espectador
        if ((playerIds.length % 2) === 1) {
            var moveIdx = Math.floor(Math.random() * playerIds.length);
            var movedToSpec = playerIds.splice(moveIdx, 1)[0];
            gameState.spectatorPool.push(movedToSpec);
            try { room.setPlayerTeam(movedToSpec, 0); } catch(e){}
            var pIdx = gameState.players.indexOf(movedToSpec);
            if (pIdx !== -1) gameState.players.splice(pIdx, 1);
        }
        if (playerIds.length < 2) { resolve(null); return; }

        // Mover jugadores no participantes a espectador para evitar desbalance
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

        room.onTeamGoal = function(team) {
            if (stopped) return;
            if (team === 1 || team === 2) {
                scores[team]++;
                room.sendAnnouncement('🏈 TOUCHDOWN equipo ' + (team === 1 ? '🔴' : '🔵') + ' — ' + scores[1] + ' : ' + scores[2], null, 0x00FF00);
                if (scores[team] >= goalsToWin) {
                    stopped = true;
                    cleanupAndResolve(team);
                }
            }
        };

        var to = setTimeout(function() {
            if (stopped) return;
            stopped = true;
            if (scores[1] === scores[2]) {
                room.sendAnnouncement('\n⚡ Empate. Muerte Súbita: SIGUIENTE TOUCHDOWN GANA (sin límite)...', null, 0xFFFF00);
                stopped = false;
                room.onTeamGoal = function(team) {
                    if (stopped) return;
                    stopped = true;
                    room.sendAnnouncement('🏈 ¡TOUCHDOWN! Equipo ' + (team === 1 ? '🔴' : '🔵') + ' GANA en muerte súbita!', null, 0xFFD700, 'bold', 2);
                    cleanupAndResolve(team);
                };
                return;
            }
            var winnerTeam = (scores[1] > scores[2] ? 1 : 2);
            cleanupAndResolve(winnerTeam);
        }, timeMs);

        function cleanupAndResolve(team) {
            clearTimeout(to);
            try { room.onTeamGoal = prevOnGoal; } catch(e){}

            if (team === null) {
                resolve(null);
                return;
            }

            var winners = [];
            var losers = [];
            var half2 = Math.floor(playerIds.length / 2);
            for (var k = 0; k < playerIds.length; k++) {
                if (!room.getPlayer(playerIds[k])) continue;
                var teamOf = (k < half2) ? 1 : 2;
                if (teamOf === team) winners.push(playerIds[k]);
                else losers.push(playerIds[k]);
            }

            room.sendAnnouncement('\n🏁 Ronda fin. Ganó equipo ' + (team === 1 ? '🔴' : '🔵') + ' (' + scores[1] + ' : ' + scores[2] + ')', null, 0xFFD700);
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

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

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

function isActive() { return gameState.active; }

function lockTeamChanges() {
    try { if (typeof botState !== 'undefined') botState.teamLock = true; } catch(e){}
}
function unlockTeamChanges() {
    try { if (typeof botState !== 'undefined') botState.teamLock = false; } catch(e){}
}

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};
