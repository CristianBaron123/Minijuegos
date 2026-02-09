// ============================================
// MINIJUEGO: ULTRABALL - Partido de goles con eliminación por rondas
// ============================================

var mapData = null;

var gameState = {
    active: false,
    firstRound: true,
    players: [], // lista de player ids activos en torneo
    spectatorPool: [],
    currentMatch: null,
    stopRequested: false,
    chatBlocked: false,
    callback: null
};

// Config
var config = {
    firstExplanationMs: 5000,
    matchTimeMs: 60000, // tiempo por partido (ajustable)
    goalsToWin: 2
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[ULTRABALL] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;
    gameState.stopRequested = false;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[ULTRABALL] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para ULTRABALL', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(p => p.id);
    gameState.spectatorPool = [];

    // Repartir equipos inicialmente
    shuffleTeams(room);

    // Anuncio inicial
    room.sendAnnouncement('⚽ ULTRABALL - Partido de goles. Primero a ' + config.goalsToWin + ' goles gana cada ronda.', null, 0x00BFFF, 'bold', 2);

    // Seguir el patrón de otros minijuegos: cargar mapa, asegurar pausa/instrucciones y luego iniciar torneo
    if (gameState.firstRound) {
        // Hacemos la secuencia de explicación de forma robusta y síncrona respecto a la sala
        try { room.stopGame(); } catch(e){}
        setTimeout(function() {
            try { room.startGame(); } catch(e){}
            try { room.pauseGame(true); } catch(e){}
            try { lockTeamChanges(); } catch(e) {}
            gameState.chatBlocked = true;

            room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
                '🔴 Equipo vs 🔵 Equipo. Marca ' + config.goalsToWin + ' goles para ganar la ronda.\n' +
                '⚠️ El mapa permite curvas; el control del balón puede ser impredecible.\n' +
                '⏱️ Si llega el tiempo, gana el equipo con más goles.\n' +
                '⏳ Comienza en 5s...'
            , null, 0xFFFF00, 'bold', 2);

            setTimeout(function() {
                try { unlockTeamChanges(); } catch(e) {}
                gameState.chatBlocked = false;
                try { room.pauseGame(false); } catch(e){}
                gameState.firstRound = false;
                runTournament(room);
            }, config.firstExplanationMs);
        }, 1500);
    } else {
        runTournament(room);
    }
        // Nota: este mapa tiene curvas y el control del balón puede ser inestable, juega con cuidado.
}

// Ejecuta las rondas hasta quedar 1v1 y enviar ganador a Lucky
function runTournament(room) {
    (async function loop() {
        while (!gameState.stopRequested) {
            // si quedan solo 1 o 0 jugadores, finalizar
            if (gameState.players.length <= 1) {
                var lone = gameState.players[0];
                if (lone && gameState.callback) {
                    var p = room.getPlayerList().find(x => x.id === lone);
                    gameState.callback({ id: p.id, name: p.name });
                }
                stop(room);
                return;
            }

            // Si queda 2 jugadores, jugar final 1v1
                    // Si hay 3 jugadores exactos: mover uno aleatorio a espectador y seguir al 1v1
                    if (gameState.players.length === 3) {
                        var rnd = Math.floor(Math.random() * gameState.players.length);
                        var moved = gameState.players.splice(rnd,1)[0];
                        gameState.spectatorPool.push(moved);
                        try { room.setPlayerTeam(moved, 0); } catch(e){}
                        room.sendAnnouncement('ℹ️ Se movió a espectador a un jugador para equilibrar (3 jugadores).', null, 0xFFFF00);
                    }
            if (gameState.players.length === 2) {
                var ids = gameState.players.slice();
                // Asignar equipos 1 vs 2
                try { room.setPlayerTeam(ids[0], 1); room.setPlayerTeam(ids[1], 2); } catch(e){}
                var result = await playMatch(room, ids, config.goalsToWin, config.matchTimeMs);
                if (result && result.winners && result.winners.length > 0) {
                    var winnerId = result.winners[0];
                    var p = room.getPlayerList().find(x => x.id === winnerId);
                    if (p) {
                        room.sendAnnouncement('\n🏆 ¡' + p.name.toUpperCase() + ' HA GANADO EL 1v1! 🏆', null, 0xFFD700, 'bold', 2);
                        setTimeout(function() {
                            if (gameState.callback) gameState.callback({ id: p.id, name: p.name });
                        }, 2000);
                    }
                }
                stop(room);
                return;
            }

            // Juego normal: jugar con equipos actuales
            var matchPlayers = gameState.players.slice();
            var result = await playMatch(room, matchPlayers, config.goalsToWin, config.matchTimeMs);
            if (!result) {
                // empate o fallo, terminar torneo
                stop(room);
                return;
            }

            // result: { team: 1|2, winners: [ids], losers: [ids] }
            // detener el juego momentáneamente y mover perdedores a espectador
            try { room.stopGame(); } catch(e){}
            for (var id of result.losers) {
                try { room.setPlayerTeam(id, 0); } catch(e){}
                // quitar de players y añadir a spectatorPool
                var idx = gameState.players.indexOf(id); if (idx !== -1) gameState.players.splice(idx,1);
                gameState.spectatorPool.push(id);
            }

            // Si ganadores >1, repartir mitad al otro equipo para la siguiente ronda
            var winners = result.winners.slice();
            if (winners.length > 1) {
                // Si impar y hay espectador, traer uno aleatorio para balancear
                if ((winners.length % 2) === 1 && gameState.spectatorPool.length > 0) {
                    var rndIdx = Math.floor(Math.random() * gameState.spectatorPool.length);
                    var picked = gameState.spectatorPool.splice(rndIdx,1)[0];
                    gameState.players.push(picked);
                    try { room.setPlayerTeam(picked, 1); } catch(e){}
                    winners.push(picked);
                }

                // dividir winners en dos mitades para la siguiente ronda
                var half = Math.floor(winners.length/2);
                // reasignar equipos según las mitades
                for (var i=0;i<winners.length;i++) {
                    var id = winners[i];
                    try { room.setPlayerTeam(id, i < half ? 1 : 2); } catch(e){}
                }
                // mantener gameState.players como los winners
                gameState.players = winners.slice();
            } else if (winners.length === 1) {
                // único ganador => final, enviar a Lucky
                var p = room.getPlayerList().find(x => x.id === winners[0]);
                if (p && gameState.callback) gameState.callback({ id: p.id, name: p.name });
                stop(room);
                return;
            } else {
                stop(room); return;
            }

            gameState.firstRound = false;
            // pequeña pausa antes de la siguiente ronda
            await new Promise(r => setTimeout(r, 2000));
        }
    })();
}

// Juega un partido con los jugadores indicados; devuelve ganadores/losers
function playMatch(room, playerIds, goalsToWin, timeMs) {
    return new Promise(function(resolve) {
        var scores = { 1:0, 2:0 };
        var stopped = false;
        var sdTo = null; // sudden-death timeout
        room.startGame();

        // Establecer equipos según posición en lista (mitad)
        var half = Math.floor(playerIds.length/2);
        for (var i=0;i<playerIds.length;i++) {
            try { room.setPlayerTeam(playerIds[i], i < half ? 1 : 2); } catch(e){}
        }

        // Handler de gol
        var prevOnGoal = room.onTeamGoal;
        room.onTeamGoal = function(team) {
            if (stopped) return;
            if (team === 1 || team === 2) {
                scores[team]++;
                room.sendAnnouncement('⚽ Gol del equipo ' + (team===1?'🔴':'🔵') + ' — ' + scores[1] + ' : ' + scores[2], null, 0x00FF00);
                if (scores[team] >= goalsToWin) {
                    stopped = true;
                    cleanupAndResolve(team);
                }
            }
        };

        // timeout
        var to = setTimeout(function() {
            if (stopped) return;
            stopped = true;
            // Si nadie anotó, considerar que no hubo resultado
            if (scores[1] === 0 && scores[2] === 0) {
                room.sendAnnouncement('\n⚠️ No hubo goles en el partido. Empate sin resultado.', null, 0xFF6600);
                cleanupAndResolve(null);
                return;
            }

            // Si está empate con goles, entrar a TIEMPO EXTRA de muerte súbita: SIGUIENTE GOL GANA (sin límite)
            if (scores[1] === scores[2]) {
                room.sendAnnouncement('\n⚡ Empate. Tiempo extra Muerte Súbita: SIGUIENTE GOL GANA (sin límite)...', null, 0xFFFF00);
                // sobrescribir onTeamGoal temporalmente para resolver al primer gol (sin timeout)
                room.onTeamGoal = function(team) {
                    if (stopped) return;
                    stopped = true;
                    cleanupAndResolve(team);
                };
                return;
            }

            // decidir por mayor score (si empate lógica anterior no llega aquí)
            var winnerTeam = (scores[1] > scores[2] ? 1 : 2);
            cleanupAndResolve(winnerTeam);
        }, timeMs);

        function cleanupAndResolve(team) {
            clearTimeout(to);
            // restaurar handler
            try { room.onTeamGoal = prevOnGoal; } catch(e){}

            // recopilar ids de ganadores/losers
            if (team === null) {
                // No hay ganador (por ejemplo, no se anotaron goles)
                resolve(null);
                return;
            }

            var winners = [];
            var losers = [];
            var half = Math.floor(playerIds.length/2);
            for (var i=0;i<playerIds.length;i++) {
                var id = playerIds[i];
                var teamOf = (i < half) ? 1 : 2;
                if (teamOf === team) winners.push(id); else losers.push(id);
            }

            room.sendAnnouncement('\n🏁 Ronda finalizada. Ganó el equipo ' + (team===1?'🔴':'🔵') + ' (' + scores[1] + ' : ' + scores[2] + ')', null, 0xFFD700);
            resolve({ team: team, winners: winners, losers: losers });
        }
    });
}

function stop(room) {
    gameState.active = false;
    gameState.stopRequested = true;
    gameState.players = [];
    gameState.spectatorPool = [];
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    var idx = gameState.players.indexOf(player.id);
    if (idx !== -1) gameState.players.splice(idx,1);
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

// Helpers
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, i < half ? 1 : 2); } catch(e){}
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
