// ============================================
// MINIJUEGO: DODGEBALL V2 - Equipos se queman empujando pelotas
// Torneo con rondas: supervivientes del equipo ganador avanzan
// ============================================

var mapData = null;

var gameState = {
    active: false,
    firstRound: true,
    players: [],
    spectatorPool: [],
    stopRequested: false,
    chatBlocked: false,
    callback: null,
    roundInterval: null,
    roundTimeout: null
};

var config = {
    firstExplanationMs: 5000,
    matchTimeMs: 90000,
    checkMs: 100,
    redZone: { minX: -432, maxX: 0, minY: -180, maxY: 180 },
    blueZone: { minX: 0, maxX: 432, minY: -180, maxY: 180 }
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[DODGEBALL_V2] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;
    gameState.stopRequested = false;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[DODGEBALL_V2] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para DODGEBALL V2', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(function(p) { return p.id; });
    gameState.spectatorPool = [];

    if (gameState.players.length > 2 && (gameState.players.length % 2) === 1) {
        var rndIdx = Math.floor(Math.random() * gameState.players.length);
        var movedId = gameState.players.splice(rndIdx, 1)[0];
        gameState.spectatorPool.push(movedId);
        try { room.setPlayerTeam(movedId, 0); } catch(e){}
        room.sendAnnouncement('ℹ️ Se movió a un jugador a espectador para equilibrar equipos (impar).', null, 0xFFFF00);
    }

    shuffleTeams(room);

    room.sendAnnouncement('🔴🔵 DODGEBALL V2 - ¡Quema al equipo rival!', null, 0x00BFFF, 'bold', 2);

    if (gameState.firstRound) {
        try { room.stopGame(); } catch(e){}
        setTimeout(function() {
            try { room.startGame(); } catch(e){}
            try { room.pauseGame(true); } catch(e){}
            gameState.chatBlocked = true;

            room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
                '🔴 vs 🔵 - Empuja las pelotas al otro lado!\n' +
                '💀 Si sales de tu zona, quedas eliminado\n' +
                '🏆 El equipo con supervivientes gana la ronda\n' +
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
                room.sendAnnouncement('ℹ️ Se movió a espectador a un jugador para equilibrar.', null, 0xFFFF00);
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
                        _chosenFinale.start(room, p1, p2, function(winner) {
                            if (winner && gameState.callback) gameState.callback(winner);
                            else if (gameState.callback) gameState.callback(null);
                            stop(room);
                        });
                        return;
                    }
                }

                try { room.setPlayerTeam(ids[0], 1); room.setPlayerTeam(ids[1], 2); } catch(e){}
                var result = await playRound(room, ids, config.matchTimeMs);
                if (result && result.winners && result.winners.length > 0) {
                    var winnerId = result.winners[0];
                    var p = room.getPlayerList().find(function(x) { return x.id === winnerId; });
                    if (p) {
                        room.sendAnnouncement('\n🏆 ¡' + p.name.toUpperCase() + ' HA GANADO DODGEBALL V2! 🏆', null, 0xFFD700, 'bold', 2);
                        setTimeout(function() {
                            if (gameState.callback) gameState.callback({ id: p.id, name: p.name });
                        }, 2000);
                    }
                }
                stop(room);
                return;
            }

            var matchPlayers = gameState.players.slice();
            var result = await playRound(room, matchPlayers, config.matchTimeMs);
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

function playRound(room, playerIds, timeMs) {
    return new Promise(function(resolve) {
        var stopped = false;
        var eliminated = {};
        var hasBeenInBounds = {};

        try { room.stopGame(); } catch(e){}

        // Validar jugadores
        var validIds = [];
        for (var vi = 0; vi < playerIds.length; vi++) {
            if (room.getPlayer(playerIds[vi])) validIds.push(playerIds[vi]);
        }
        playerIds = validIds;
        if (playerIds.length < 2) { resolve(null); return; }

        // Manejar impar
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

        // Asignar equipos
        var half = Math.floor(playerIds.length / 2);
        var redTeam = [];
        var blueTeam = [];
        for (var i = 0; i < playerIds.length; i++) {
            if (i < half) {
                try { room.setPlayerTeam(playerIds[i], 1); } catch(e){}
                redTeam.push(playerIds[i]);
            } else {
                try { room.setPlayerTeam(playerIds[i], 2); } catch(e){}
                blueTeam.push(playerIds[i]);
            }
        }

        room.startGame();

        // Check posiciones cada 100ms
        var checkInterval = setInterval(function() {
            if (stopped) return;

            var redAlive = 0;
            var blueAlive = 0;

            for (var ri = 0; ri < redTeam.length; ri++) {
                var rid = redTeam[ri];
                if (eliminated[rid]) continue;
                var rp = room.getPlayer(rid);
                if (!rp) { eliminated[rid] = true; continue; }
                var rpos = rp.position;
                if (!rpos) { redAlive++; continue; }

                if (rpos.x < config.redZone.minX || rpos.x > config.redZone.maxX || rpos.y < config.redZone.minY || rpos.y > config.redZone.maxY) {
                    if (!hasBeenInBounds[rid]) { redAlive++; continue; }
                    eliminated[rid] = true;
                    room.sendAnnouncement('💀 ' + rp.name + ' eliminado!', null, 0xFF6347);
                } else {
                    hasBeenInBounds[rid] = true;
                    redAlive++;
                }
            }

            for (var bi = 0; bi < blueTeam.length; bi++) {
                var bid = blueTeam[bi];
                if (eliminated[bid]) continue;
                var bp = room.getPlayer(bid);
                if (!bp) { eliminated[bid] = true; continue; }
                var bpos = bp.position;
                if (!bpos) { blueAlive++; continue; }

                if (bpos.x < config.blueZone.minX || bpos.x > config.blueZone.maxX || bpos.y < config.blueZone.minY || bpos.y > config.blueZone.maxY) {
                    if (!hasBeenInBounds[bid]) { blueAlive++; continue; }
                    eliminated[bid] = true;
                    room.sendAnnouncement('💀 ' + bp.name + ' eliminado!', null, 0xFF6347);
                } else {
                    hasBeenInBounds[bid] = true;
                    blueAlive++;
                }
            }

            if (redAlive === 0 && blueAlive > 0) {
                stopped = true;
                clearInterval(checkInterval);
                clearTimeout(to);
                gameState.roundInterval = null;
                gameState.roundTimeout = null;
                finishRound(2);
            } else if (blueAlive === 0 && redAlive > 0) {
                stopped = true;
                clearInterval(checkInterval);
                clearTimeout(to);
                gameState.roundInterval = null;
                gameState.roundTimeout = null;
                finishRound(1);
            } else if (redAlive === 0 && blueAlive === 0) {
                stopped = true;
                clearInterval(checkInterval);
                clearTimeout(to);
                gameState.roundInterval = null;
                gameState.roundTimeout = null;
                resolve(null);
            }
        }, config.checkMs);

        gameState.roundInterval = checkInterval;

        // Timeout
        var to = setTimeout(function() {
            if (stopped) return;
            // Contar supervivientes
            var redAlive = 0, blueAlive = 0;
            for (var ri = 0; ri < redTeam.length; ri++) {
                if (!eliminated[redTeam[ri]] && room.getPlayer(redTeam[ri])) redAlive++;
            }
            for (var bi = 0; bi < blueTeam.length; bi++) {
                if (!eliminated[blueTeam[bi]] && room.getPlayer(blueTeam[bi])) blueAlive++;
            }

            if (redAlive === blueAlive) {
                room.sendAnnouncement('⚡ Empate! Muerte Súbita: siguiente eliminado pierde!', null, 0xFFFF00, 'bold');
                gameState.roundTimeout = null;
                return;
            }

            stopped = true;
            clearInterval(checkInterval);
            gameState.roundInterval = null;
            gameState.roundTimeout = null;
            var winnerTeam = (redAlive > blueAlive) ? 1 : 2;
            finishRound(winnerTeam);
        }, timeMs);

        gameState.roundTimeout = to;

        function finishRound(team) {
            var winners = [];
            var losers = [];

            if (team === 1) {
                for (var ri = 0; ri < redTeam.length; ri++) {
                    if (!eliminated[redTeam[ri]] && room.getPlayer(redTeam[ri])) winners.push(redTeam[ri]);
                    else losers.push(redTeam[ri]);
                }
                for (var bi = 0; bi < blueTeam.length; bi++) {
                    losers.push(blueTeam[bi]);
                }
            } else {
                for (var bi = 0; bi < blueTeam.length; bi++) {
                    if (!eliminated[blueTeam[bi]] && room.getPlayer(blueTeam[bi])) winners.push(blueTeam[bi]);
                    else losers.push(blueTeam[bi]);
                }
                for (var ri = 0; ri < redTeam.length; ri++) {
                    losers.push(redTeam[ri]);
                }
            }

            room.sendAnnouncement('🏁 Ronda finalizada. Ganó equipo ' + (team === 1 ? '🔴' : '🔵') + ' (' + winners.length + ' supervivientes)', null, 0xFFD700);
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
    if (gameState.roundInterval) { clearInterval(gameState.roundInterval); gameState.roundInterval = null; }
    if (gameState.roundTimeout) { clearTimeout(gameState.roundTimeout); gameState.roundTimeout = null; }
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
