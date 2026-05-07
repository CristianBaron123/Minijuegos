// ============================================
// MINIJUEGO: WAR OF CONQUEST
// Goles basados en el mapa. Primero a 3 goles o más en 90s gana.
// Eliminación por rondas hasta quedar 1 ganador → Lucky.
// Out-of-bounds: si todos salen del campo → reinicio + marcador conservado.
// En TEST_MODE: solo 1 partido directo (sin torneo).
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
    matchTimeMs: 90000,
    goalsToWin: 3,
    oobBoundsX: 650,
    oobBoundsY: 190
};

function isOutOfBounds(pos) {
    if (!pos) return true;
    return Math.abs(pos.x) > config.oobBoundsX || Math.abs(pos.y) > config.oobBoundsY;
}

function isTestMode() {
    return typeof TEST_ONLY_GAMES !== 'undefined' && TEST_ONLY_GAMES && TEST_ONLY_GAMES.length > 0;
}

function start(room, onGameEnd) {
    if (!mapData) { console.error('[WAR_CONQUEST] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;
    gameState.stopRequested = false;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[WAR_CONQUEST] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) { room.sendAnnouncement('⚠️ Se necesitan al menos 2 jugadores para War of Conquest', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

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

    room.sendAnnouncement(
        '⚔️ WAR OF CONQUEST!\n' +
        '🔴 Evita que el rival golpee tu balón!\n' +
        '🎯 Usa tus bolas de color para sacar a los rivales.\n' +
        '⚠️ No toques las bolas del equipo contrario.\n' +
        '⏱️ Primero a ' + config.goalsToWin + ' goles o más en 90s gana.',
        null, 0xFF4500, 'bold', 2
    );

    if (gameState.firstRound) {
        try { room.stopGame(); } catch(e){}
        setTimeout(function() {
            try { room.startGame(); } catch(e){}
            try { room.pauseGame(true); } catch(e){}
            shuffleTeams(room);
            try { botState.chatBlocked = true; } catch(e){}

            room.sendAnnouncement(
                '\n📋 INSTRUCCIONES:\n' +
                '🔵 Defiende tu balón — si el rival lo golpea cuenta como gol!\n' +
                '🎯 Lanza las bolas de TU color al rival para eliminarlo.\n' +
                '⚠️ Si tocas una bola del rival, quedas eliminado.\n' +
                '⏱️ Comienza en 5s...',
                null, 0xFFFF00, 'bold', 2
            );

            setTimeout(function() {
                try { botState.chatBlocked = false; } catch(e){}
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
        // En modo test: solo 1 partido directo
        if (isTestMode()) {
            var ids = gameState.players.slice();
            if (ids.length > 2) {
                var half = Math.floor(ids.length / 2);
                for (var i = 0; i < ids.length; i++) {
                    try { room.setPlayerTeam(ids[i], i < half ? 1 : 2); } catch(e){}
                }
            } else {
                try { room.setPlayerTeam(ids[0], 1); room.setPlayerTeam(ids[1], 2); } catch(e){}
            }
            var result = await playMatch(room, ids, config.goalsToWin, config.matchTimeMs);
            if (result && result.winners && result.winners.length > 0) {
                var winnerId = result.winners[0];
                var p = room.getPlayerList().find(function(x) { return x.id === winnerId; });
                if (p) {
                    room.sendAnnouncement('\n🏆 ¡' + p.name.toUpperCase() + ' HA GANADO WAR OF CONQUEST! 🏆', null, 0xFFD700, 'bold', 2);
                    setTimeout(function() { if (gameState.callback) gameState.callback({ id: p.id, name: p.name }); }, 2000);
                } else {
                    if (gameState.callback) gameState.callback(null);
                }
            } else {
                if (gameState.callback) gameState.callback(null);
            }
            stop(room);
            return;
        }

        while (!gameState.stopRequested) {
            // Limpiar desconectados
            gameState.players = gameState.players.filter(function(id) { return !!room.getPlayer(id); });
            gameState.spectatorPool = gameState.spectatorPool.filter(function(id) { return !!room.getPlayer(id); });

            var totalAvailable = gameState.players.length + gameState.spectatorPool.length;
            if (totalAvailable <= 1) {
                var allIds = gameState.players.concat(gameState.spectatorPool);
                if (allIds.length === 1) {
                    var wp = room.getPlayer(allIds[0]);
                    if (wp && gameState.callback) { var cb = gameState.callback; gameState.callback = null; stop(room); cb({ id: wp.id, name: wp.name }); }
                    else { stop(room); }
                } else { var cb = gameState.callback; gameState.callback = null; stop(room); if (cb) cb(null); }
                return;
            }

            // Jugar partido
            var matchPlayers = gameState.players.slice();
            var result = await playMatch(room, matchPlayers, config.goalsToWin, config.matchTimeMs);
            if (!result) { stop(room); return; }

            try { room.stopGame(); } catch(e){}

            // Perdedores → espectadores
            for (var i = 0; i < result.losers.length; i++) {
                var id = result.losers[i];
                try { room.setPlayerTeam(id, 0); } catch(e){}
                var idx = gameState.players.indexOf(id);
                if (idx !== -1) gameState.players.splice(idx, 1);
                gameState.spectatorPool.push(id);
            }

            // Mitad de ganadores rota a espectadores
            var winners = result.winners.slice();
            var keepCount = Math.ceil(winners.length / 2);
            for (var i = keepCount; i < winners.length; i++) {
                try { room.setPlayerTeam(winners[i], 0); } catch(e){}
                var idx = gameState.players.indexOf(winners[i]);
                if (idx !== -1) gameState.players.splice(idx, 1);
                gameState.spectatorPool.push(winners[i]);
            }
            winners = winners.slice(0, keepCount);

            if (gameState.players.length <= 1) {
                if (gameState.players.length === 1) {
                    var wp = room.getPlayer(gameState.players[0]);
                    if (wp && gameState.callback) { var cb = gameState.callback; gameState.callback = null; stop(room); cb({ id: wp.id, name: wp.name }); }
                    else { stop(room); }
                } else {
                    var cb = gameState.callback; gameState.callback = null; stop(room); if (cb) cb(null);
                }
                return;
            }

            var team1 = winners.slice();
            var team2 = [];
            for (var i = 0; i < team1.length; i++) {
                try { room.setPlayerTeam(team1[i], 1); } catch(e){}
            }

            gameState.spectatorPool = gameState.spectatorPool.filter(function(id) { return !!room.getPlayer(id); });

            // Rellenar equipo 1 desde espectadores
            while (team1.length < team2.length && gameState.spectatorPool.length > 0) {
                var rndIdx = Math.floor(Math.random() * gameState.spectatorPool.length);
                var picked = gameState.spectatorPool.splice(rndIdx, 1)[0];
                if (!room.getPlayer(picked)) continue;
                team1.push(picked);
                if (gameState.players.indexOf(picked) === -1) gameState.players.push(picked);
                try { room.setPlayerTeam(picked, 1); } catch(e){}
            }

            // Construir equipo 2 desde espectadores
            while (team2.length < team1.length && gameState.spectatorPool.length > 0) {
                var rndIdx = Math.floor(Math.random() * gameState.spectatorPool.length);
                var picked = gameState.spectatorPool.splice(rndIdx, 1)[0];
                if (!room.getPlayer(picked)) continue;
                team2.push(picked);
                if (gameState.players.indexOf(picked) === -1) gameState.players.push(picked);
                try { room.setPlayerTeam(picked, 2); } catch(e){}
            }

            // Balance: si un equipo tiene más que el otro, mover espectador al menor
            while (team1.length > team2.length && gameState.spectatorPool.length > 0) {
                var rndIdx = Math.floor(Math.random() * gameState.spectatorPool.length);
                var picked = gameState.spectatorPool.splice(rndIdx, 1)[0];
                if (!room.getPlayer(picked)) continue;
                team2.push(picked);
                if (gameState.players.indexOf(picked) === -1) gameState.players.push(picked);
                try { room.setPlayerTeam(picked, 2); } catch(e){}
            }
            while (team2.length > team1.length && gameState.spectatorPool.length > 0) {
                var rndIdx = Math.floor(Math.random() * gameState.spectatorPool.length);
                var picked = gameState.spectatorPool.splice(rndIdx, 1)[0];
                if (!room.getPlayer(picked)) continue;
                team1.push(picked);
                if (gameState.players.indexOf(picked) === -1) gameState.players.push(picked);
                try { room.setPlayerTeam(picked, 1); } catch(e){}
            }

            gameState.players = team1.concat(team2).filter(function(id) { return !!room.getPlayer(id); });
            gameState.firstRound = false;

            if (gameState.players.length < 2) {
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
        var oobConsecutive = 0;

        try { room.stopGame(); } catch(e){}

        var validIds = [];
        for (var vi = 0; vi < playerIds.length; vi++) {
            if (room.getPlayer(playerIds[vi])) validIds.push(playerIds[vi]);
        }
        playerIds = validIds;
        if (playerIds.length < 2) { resolve(null); return; }

        // No limitar cantidad de jugadores, usar todos los disponibles

        if ((playerIds.length % 2) === 1 && gameState.spectatorPool.length > 0) {
            for (var si = 0; si < gameState.spectatorPool.length; si++) {
                var sp = gameState.spectatorPool[si];
                if (room.getPlayer(sp) && playerIds.length < maxPlayers) {
                    gameState.spectatorPool.splice(si, 1);
                    playerIds.push(sp);
                    if (gameState.players.indexOf(sp) === -1) gameState.players.push(sp);
                    room.sendAnnouncement('ℹ️ Se trajo un jugador de espectador para equilibrar equipos.', null, 0xFFFF00);
                    break;
                }
            }
        }
        if ((playerIds.length % 2) === 1) {
            var moveIdx = Math.floor(Math.random() * playerIds.length);
            var movedToSpec = playerIds.splice(moveIdx, 1)[0];
            gameState.spectatorPool.push(movedToSpec);
            try { room.setPlayerTeam(movedToSpec, 0); } catch(e){}
            var pIdx = gameState.players.indexOf(movedToSpec);
            if (pIdx !== -1) gameState.players.splice(pIdx, 1);
        }
        if (playerIds.length < 2) { resolve(null); return; }

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
        try { room.startGame(); } catch(e){}

        function hookGoal() {
            var prevOnGoal = room.onTeamGoal;
            room.onTeamGoal = function(team) {
                if (stopped) return;
                if (team === 1 || team === 2) {
                    scores[team]++;
                    room.sendAnnouncement('⚽ Gol del equipo ' + (team === 1 ? '🔴' : '🔵') + ' — ' + scores[1] + ' : ' + scores[2], null, 0x00FF00);
                    if (scores[team] >= goalsToWin) { stopped = true; clearInterval(oobInterval); cleanupAndResolve(team); }
                }
            };
            return prevOnGoal;
        }

        var prevOnGoal = hookGoal();

        // Out-of-bounds detection: si todos los jugadores activos están OOB → reiniciar mapa
        var oobReloading = false;
        var oobInterval = setInterval(function() {
            if (stopped || !gameState.active) { clearInterval(oobInterval); return; }
            if (oobReloading) { return; } // cooldown durante recarga
            var activePlayers = playerIds.filter(function(id) {
                var p = room.getPlayer(id);
                return p && p.team !== 0;
            });
            if (activePlayers.length === 0) { oobConsecutive = 0; return; }
            var allOob = activePlayers.every(function(id) {
                var p = room.getPlayer(id);
                return !p || !p.position || isOutOfBounds(p.position);
            });
            if (allOob) {
                oobConsecutive++;
                if (oobConsecutive >= 4) { // 4 × 500ms = 2s todos fuera
                    oobConsecutive = 0;
                    oobReloading = true;
                    room.sendAnnouncement('⚠️ ¡Todos fuera del campo! Reiniciando... Marcador conservado (' + scores[1] + ':' + scores[2] + ')', null, 0xFF6600, 'bold');
                    try { room.stopGame(); } catch(e){}
                    setTimeout(function() {
                        if (stopped) { oobReloading = false; return; }
                        try { room.setCustomStadium(mapData); } catch(e){}
                        setTimeout(function() {
                            if (stopped) { oobReloading = false; return; }
                            try { room.startGame(); } catch(e){}
                            hookGoal();
                            setTimeout(function() { oobReloading = false; }, 3000); // 3s cooldown tras spawn
                        }, 500);
                    }, 1000);
                }
            } else {
                oobConsecutive = 0;
            }
        }, 500);

        var to = setTimeout(function() {
            if (stopped) return;
            if (gameState.stopRequested) { clearInterval(oobInterval); resolve(null); return; }
            stopped = true;
            clearInterval(oobInterval);
            if (scores[1] === scores[2]) {
                room.sendAnnouncement('\n⚡ Empate. ¡Muerte Súbita!', null, 0xFFFF00);
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
            clearInterval(oobInterval);
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
    try { botState.chatBlocked = false; } catch(e){}
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    var idx = gameState.players.indexOf(player.id);
    if (idx !== -1) gameState.players.splice(idx, 1);
    var idx2 = gameState.spectatorPool.indexOf(player.id);
    if (idx2 !== -1) gameState.spectatorPool.splice(idx2, 1);
    if (gameState.active && gameState.players.length >= 2) {
        var _t1 = gameState.players.filter(function(id) { var p = room.getPlayer(id); return p && p.team === 1; });
        var _t2 = gameState.players.filter(function(id) { var p = room.getPlayer(id); return p && p.team === 2; });
        if (Math.abs(_t1.length - _t2.length) >= 2) {
            var _big = _t1.length > _t2.length ? _t1 : _t2;
            var _toSpec = _big[Math.floor(Math.random() * _big.length)];
            var _si = gameState.players.indexOf(_toSpec); if (_si !== -1) gameState.players.splice(_si, 1);
            gameState.spectatorPool.push(_toSpec);
            var _sp = room.getPlayer(_toSpec);
            try { room.setPlayerTeam(_toSpec, 0); } catch(e){}
            room.sendAnnouncement('ℹ️ ' + (_sp ? _sp.name : '?') + ' pasa a espectadores por desbalance.', null, 0xFFFF00);
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

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    setMapData: function(jsonString) { mapData = jsonString; }
};
