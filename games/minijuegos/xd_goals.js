// ============================================
// MINIJUEGO: XD - Balón sin gravedad, primero a 3 goles
// Mismo sistema de eliminación por rondas que ULTRABALL
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

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0 && p.team !== 0; });
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para XD', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

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

    room.sendAnnouncement('😂 XD - Balón sin gravedad! Primero a ' + config.goalsToWin + ' goles gana.', null, 0x00BFFF, 'bold', 2);

    if (gameState.firstRound) {
        try { room.stopGame(); } catch(e){}
        setTimeout(function() {
            try { room.startGame(); } catch(e){}
            try { room.pauseGame(true); } catch(e){}
            gameState.chatBlocked = true;

            room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
                '😂 El balón NO tiene gravedad, siempre cae!\n' +
                '⚽ Primero a ' + config.goalsToWin + ' goles gana la ronda\n' +
                '🏆 Eliminación por rondas hasta quedar 1 ganador\n' +
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
            if (gameState.players.length <= 1) {
                var lone = gameState.players[0];
                if (lone && gameState.callback) {
                    var p = room.getPlayerList().find(function(x) { return x.id === lone; });
                    if (p) gameState.callback({ id: p.id, name: p.name });
                }
                stop(room);
                return;
            }

            if (gameState.players.length === 3) {
                var rnd = Math.floor(Math.random() * gameState.players.length);
                var moved = gameState.players.splice(rnd, 1)[0];
                gameState.spectatorPool.push(moved);
                try { room.setPlayerTeam(moved, 0); } catch(e){}
                room.sendAnnouncement('ℹ️ Se movió a un jugador a espectador para equilibrar.', null, 0xFFFF00);
            }

            if (gameState.players.length === 2) {
                var ids = gameState.players.slice();
                try { room.setPlayerTeam(ids[0], 1); room.setPlayerTeam(ids[1], 2); } catch(e){}
                var result = await playMatch(room, ids, config.goalsToWin, config.matchTimeMs);
                if (result && result.winners && result.winners.length > 0) {
                    var winnerId = result.winners[0];
                    var p = room.getPlayerList().find(function(x) { return x.id === winnerId; });
                    if (p) {
                        room.sendAnnouncement('\n🏆 ¡' + p.name.toUpperCase() + ' HA GANADO XD! 🏆', null, 0xFFD700, 'bold', 2);
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
            for (var i = 0; i < result.losers.length; i++) {
                var id = result.losers[i];
                try { room.setPlayerTeam(id, 0); } catch(e){}
                var idx = gameState.players.indexOf(id);
                if (idx !== -1) gameState.players.splice(idx, 1);
                gameState.spectatorPool.push(id);
            }

            var winners = result.winners.slice();
            if (winners.length > 1) {
                if ((winners.length % 2) === 1 && gameState.spectatorPool.length > 0) {
                    var rndIdx = Math.floor(Math.random() * gameState.spectatorPool.length);
                    var picked = gameState.spectatorPool.splice(rndIdx, 1)[0];
                    gameState.players.push(picked);
                    try { room.setPlayerTeam(picked, 1); } catch(e){}
                    winners.push(picked);
                }
                var half = Math.floor(winners.length / 2);
                for (var i = 0; i < winners.length; i++) {
                    try { room.setPlayerTeam(winners[i], i < half ? 1 : 2); } catch(e){}
                }
                gameState.players = winners.slice();
            } else if (winners.length === 1) {
                // Solo queda 1 — dejar que el loop intente traer espectador para 1v1
                gameState.players = [winners[0]];
            } else { stop(room); return; }

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

function playMatch(room, playerIds, goalsToWin, timeMs) {
    return new Promise(function(resolve) {
        var scores = { 1: 0, 2: 0 };
        var stopped = false;

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
                room.sendAnnouncement('\n⚡ Empate. Muerte Súbita!', null, 0xFFFF00);
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
            room.sendAnnouncement('\n🏁 Ronda finalizada. Ganó el equipo ' + (team === 1 ? '🔴' : '🔵') + ' (' + scores[1] + ' : ' + scores[2] + ')', null, 0xFFD700);
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
    // 2v1: si queda un equipo con mas jugadores, mover uno al spectatorPool
    if (gameState.active && gameState.players.length >= 2) {
        var _t1 = gameState.players.filter(function(id) { var p = room.getPlayer(id); return p && p.team === 1; });
        var _t2 = gameState.players.filter(function(id) { var p = room.getPlayer(id); return p && p.team === 2; });
        if (Math.abs(_t1.length - _t2.length) >= 2) {
            var _big = _t1.length > _t2.length ? _t1 : _t2;
            var _toSpec = _big[Math.floor(Math.random() * _big.length)];
            var _si = gameState.players.indexOf(_toSpec); if (_si !== -1) gameState.players.splice(_si, 1);
            gameState.spectatorPool.push(_toSpec);
            var _sp = room.getPlayer(_toSpec);
            try { room.setPlayerTeam(_toSpec, 0); } catch(e) {}
            room.sendAnnouncement('ℹ️ ' + (_sp ? _sp.name : '?') + ' pasa a espectadores (' + _t1.length + 'v' + _t2.length + ' detectado).', null, 0xFFFF00);
        }
    }
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
