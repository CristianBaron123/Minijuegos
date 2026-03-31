// ============================================
// MINIJUEGO: NUMBER CHAIRS - Eliminacion progresiva
// Cada ronda carga el mapa segun jugadores restantes
// v2 = 1 silla (final), v3 = 2 sillas, ..., v21 = 20 sillas
// ============================================

var allMaps = {}; // { 2: mapDataString, 3: mapDataString, ..., 21: mapDataString }

// Coordenadas de los circulos (sillas) de cada version del mapa
var chairPositions = {
    2:  [{x:4, y:157}],
    3:  [{x:-67, y:24}, {x:69, y:19}],
    4:  [{x:-95, y:-6}, {x:81.1, y:43.1}, {x:81.9, y:-46.1}],
    5:  [{x:-164, y:98}, {x:-152.9, y:49.3}, {x:36, y:143}, {x:37, y:63}],
    6:  [{x:-71, y:12}, {x:-32, y:-141}, {x:-31, y:-30}, {x:41, y:129}, {x:81, y:17}],
    7:  [{x:-93.9, y:153.2}, {x:-55, y:1}, {x:-53, y:-118}, {x:-50, y:-165}, {x:81, y:152}, {x:81.1, y:47}],
    8:  [{x:-92, y:-117}, {x:-71.7, y:155.6}, {x:-38.7, y:64.6}, {x:-5.7, y:-30.4}, {x:19.4, y:-116}, {x:70.2, y:-110.5}, {x:73.3, y:-157.3}],
    9:  [{x:-102.1, y:24}, {x:-102, y:-22}, {x:-101.1, y:-175}, {x:-101, y:175}, {x:88.9, y:-176}, {x:91.9, y:25}, {x:93, y:-21}, {x:94, y:176}],
    10: [{x:-92, y:-146}, {x:-92, y:-39}, {x:-48, y:-105}, {x:45, y:-107}, {x:46.8, y:128.2}, {x:46.8, y:4.2}, {x:47.8, y:173.2}, {x:48.8, y:66.2}, {x:85, y:-143}],
    11: [{x:-218, y:156}, {x:-182.6, y:-98.3}, {x:-144.9, y:-171.6}, {x:-140.8, y:-126}, {x:-98.6, y:114.7}, {x:-60.8, y:156.1}, {x:39.8, y:-182.2}, {x:41, y:154.9}, {x:199.1, y:-180}, {x:200.1, y:155}],
    12: [{x:-198, y:146}, {x:-162.6, y:-108.3}, {x:-124.9, y:-181.6}, {x:-120.8, y:-136}, {x:-78.6, y:104.7}, {x:-40.8, y:146.1}, {x:36, y:146}, {x:72.4, y:104.7}, {x:109.1, y:-181.6}, {x:113.2, y:-136}, {x:193.2, y:146.1}],
    13: [{x:-198, y:146}, {x:-161.6, y:102.7}, {x:-124.9, y:-181.6}, {x:-120.8, y:-136}, {x:-78.6, y:104.7}, {x:-40.8, y:146.1}, {x:37, y:-10}, {x:73.9, y:106}, {x:74.9, y:31}, {x:130.3, y:-57.9}, {x:131.3, y:-151.9}, {x:173, y:-15}],
    14: [{x:-206, y:172}, {x:-169.6, y:128.7}, {x:-132.9, y:-155.6}, {x:-128.8, y:-110}, {x:-86.6, y:130.7}, {x:-48.8, y:172.1}, {x:23, y:-16}, {x:155.2, y:-60.9}, {x:155.3, y:31.1}, {x:156.2, y:-141.9}, {x:159.2, y:129.1}, {x:197.5, y:33.1}, {x:198, y:-56.1}],
    15: [{x:-212, y:152}, {x:-175.6, y:108.7}, {x:-174.8, y:-105.1}, {x:-138.9, y:-175.6}, {x:-134.8, y:-130}, {x:-92.6, y:110.7}, {x:-54.8, y:152.1}, {x:9.4, y:71.4}, {x:18.8, y:30.1}, {x:63.2, y:34.1}, {x:107.1, y:115.2}, {x:146.9, y:109.5}, {x:147.8, y:41.7}, {x:187.1, y:36.2}],
    16: [{x:-204, y:164}, {x:-167.6, y:120.7}, {x:-166.8, y:-93.1}, {x:-130.9, y:-163.6}, {x:-126.8, y:-118}, {x:-84.6, y:122.7}, {x:-46.8, y:164.1}, {x:35, y:6}, {x:70, y:-192}, {x:74, y:-147}, {x:75, y:-36}, {x:147, y:123}, {x:148, y:54}, {x:150, y:168}, {x:187, y:11}],
    17: [{x:-204, y:164}, {x:-167.6, y:120.7}, {x:-166.8, y:-93.1}, {x:-130.9, y:-163.6}, {x:-126.8, y:-118}, {x:-84.6, y:122.7}, {x:-46.8, y:164.1}, {x:20.1, y:159.2}, {x:59, y:7}, {x:59.1, y:119.2}, {x:60, y:-52}, {x:61, y:-112}, {x:64, y:-159}, {x:156.1, y:121.2}, {x:195, y:158}, {x:195.1, y:53}],
    18: [{x:-204, y:164}, {x:-167.8, y:23.1}, {x:-167.6, y:120.7}, {x:-166.8, y:-93.1}, {x:-130.9, y:-163.6}, {x:-126.8, y:-118}, {x:-86, y:22}, {x:-85, y:-78}, {x:-84.6, y:122.7}, {x:-46.8, y:164.1}, {x:14, y:-143}, {x:34.3, y:129.6}, {x:67.3, y:38.6}, {x:100.3, y:-56.4}, {x:125.4, y:-142}, {x:176.2, y:-136.5}, {x:179.3, y:-183.3}],
    19: [{x:-220, y:158}, {x:-183.8, y:17.1}, {x:-183.6, y:114.7}, {x:-182.8, y:-99.1}, {x:-146.9, y:-169.6}, {x:-142.8, y:-124}, {x:-100.6, y:116.7}, {x:-62.8, y:158.1}, {x:-6.1, y:6}, {x:-6, y:-40}, {x:-5.1, y:-193}, {x:-5, y:157}, {x:90, y:-113}, {x:90.9, y:80}, {x:184.9, y:-194}, {x:187.9, y:7}, {x:189, y:-39}, {x:190, y:158}],
    20: [{x:-220, y:158}, {x:-183.8, y:17.1}, {x:-183.6, y:114.7}, {x:-182.8, y:-99.1}, {x:-146.9, y:-169.6}, {x:-142.8, y:-124}, {x:-102, y:4}, {x:-102, y:-103}, {x:-100.6, y:116.7}, {x:-62.8, y:158.1}, {x:14, y:-166}, {x:14, y:-59}, {x:58, y:-125}, {x:151, y:-127}, {x:152.8, y:108.2}, {x:152.8, y:-15.8}, {x:153.8, y:153.2}, {x:154.8, y:46.2}, {x:191, y:-163}],
    21: [{x:-187, y:26}, {x:-152.1, y:184}, {x:-150.1, y:142}, {x:-150.1, y:103}, {x:-149.1, y:62}, {x:-93.7, y:-21.9}, {x:-93.7, y:-67.9}, {x:-92.7, y:-115.9}, {x:-92.7, y:-157.9}, {x:-51, y:21}, {x:-11, y:-86}, {x:27.8, y:-156.2}, {x:29, y:180.9}, {x:69, y:-115}, {x:69, y:139}, {x:105, y:13}, {x:146, y:-115}, {x:149, y:140}, {x:187.1, y:-154}, {x:188.1, y:181}]
};

var gameState = {
    active: false,
    players: [],        // [{id, name}] jugadores vivos
    eliminated: [],     // [{id, name}] eliminados (espectadores)
    round: 0,
    chatBlocked: false,
    checkInterval: null,
    roundTimeout: null,
    timers: {},         // {playerId: ms acumulado dentro de silla}
    occupiedChairs: {}, // {chairIndex: playerId} sillas ocupadas
    callback: null,
    stopRequested: false,
    warningTimeouts: [],  // timeouts de avisos de tiempo
    currentNumChairs: 0   // sillas del mapa actual
};

var config = {
    firstExplanationMs: 5000,
    roundTimeMs: 60000,      // 60s por ronda para encontrar silla
    chairRadius: 30,
    tolerance: 12,
    requiredMs: 1500,        // 1.5s para asegurar silla
    checkIntervalMs: 100,
    maxVersion: 21           // mapa maximo disponible
};

function start(room, onGameEnd) {
    gameState.callback = onGameEnd || null;
    gameState.stopRequested = false;

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para NUMBER CHAIRS', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(function(p) { return { id: p.id, name: p.name }; });
    gameState.eliminated = [];
    gameState.round = 0;
    gameState.timers = {};
    gameState.occupiedChairs = {};

    // Determinar version inicial: jugadores + 1 (porq el mapa vN tiene N-1 sillas)
    // Si hay 10 jugadores, mapa v11 (10 sillas, se elimina 1)
    var neededVersion = players.length + 1;
    if (neededVersion > config.maxVersion) neededVersion = config.maxVersion;

    var mapKey = neededVersion;
    if (!allMaps[mapKey]) {
        // Buscar el mapa mas cercano inferior
        while (mapKey > 2 && !allMaps[mapKey]) mapKey--;
        if (!allMaps[mapKey]) {
            room.sendAnnouncement('⚠️ No hay mapas de NumberChairs disponibles', null, 0xFF6600);
            if (onGameEnd) onGameEnd(null);
            gameState.active = false;
            return;
        }
    }

    try { room.setCustomStadium(allMaps[mapKey]); } catch(e) {
        console.error('[NUMBERCHAIRS] Error cargando mapa v' + mapKey, e.message);
        if (onGameEnd) onGameEnd(null);
        gameState.active = false;
        return;
    }

    shuffleTeams(room);

    room.sendAnnouncement('🔢 NUMBER CHAIRS - Entra a una silla y quedate 1.5s para asegurarla!', null, 0x00BFFF, 'bold', 2);

    try { room.stopGame(); } catch(e){}
    setTimeout(function() {
        if (!gameState.active) return;
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        var numChairs = chairPositions[mapKey] ? chairPositions[mapKey].length : (mapKey - 1);
        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🪑 Hay ' + numChairs + ' sillas para ' + gameState.players.length + ' jugadores\n' +
            '🏃 Entra a un circulo y quedate 1.5s para asegurar tu silla\n' +
            '❌ Los que no consigan silla seran ELIMINADOS\n' +
            '🏆 Ultimo jugador en pie GANA!\n' +
            '⏳ Comienza en 5s...'
        , null, 0xFFFF00, 'bold', 2);

        setTimeout(function() {
            if (!gameState.active) return;
            gameState.chatBlocked = false;
            try { room.pauseGame(false); } catch(e){}
            startRound(room, mapKey);
        }, config.firstExplanationMs);
    }, 1500);
}

function startRound(room, mapVersion) {
    if (!gameState.active || gameState.stopRequested) return;

    // Limpiar timers de la ronda anterior
    for (var wi = 0; wi < gameState.warningTimeouts.length; wi++) {
        clearTimeout(gameState.warningTimeouts[wi]);
    }
    gameState.warningTimeouts = [];
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.roundTimeout) { clearTimeout(gameState.roundTimeout); gameState.roundTimeout = null; }

    gameState.round++;

    // Limpiar jugadores desconectados
    gameState.players = gameState.players.filter(function(p) { return !!room.getPlayer(p.id); });

    if (gameState.players.length <= 1) {
        finishGame(room);
        return;
    }

    // Cargar mapa de esta ronda
    // El mapa a usar: necesitamos (jugadores) sillas, o sea version = jugadores + 1
    // Pero queremos eliminar 1, asi que necesitamos (jugadores - 1) sillas = version jugadores
    var targetVersion = gameState.players.length;
    if (targetVersion > config.maxVersion) targetVersion = config.maxVersion;
    if (targetVersion < 2) targetVersion = 2;

    // Verificar que el mapa existe
    var actualVersion = targetVersion;
    while (actualVersion > 2 && !allMaps[actualVersion]) actualVersion--;
    if (!allMaps[actualVersion]) { finishGame(room); return; }

    var chairs = chairPositions[actualVersion];
    if (!chairs) { finishGame(room); return; }

    // Cargar nuevo mapa si cambio de version
    try { room.stopGame(); } catch(e){}
    try { room.setCustomStadium(allMaps[actualVersion]); } catch(e) {
        console.error('[NUMBERCHAIRS] Error cargando mapa v' + actualVersion);
        finishGame(room);
        return;
    }

    // Poner jugadores en equipos, eliminados a espectador
    for (var ei = 0; ei < gameState.eliminated.length; ei++) {
        try { room.setPlayerTeam(gameState.eliminated[ei].id, 0); } catch(e){}
    }
    shuffleTeams(room);

    try { room.startGame(); } catch(e){}

    gameState.timers = {};
    gameState.occupiedChairs = {};

    var numChairs = chairs.length;
    gameState.currentNumChairs = numChairs;
    var numPlayers = gameState.players.length;
    var toEliminate = numPlayers - numChairs;
    if (toEliminate < 1) toEliminate = 1;

    room.sendAnnouncement(
        '🔔 RONDA ' + gameState.round + ' — ' + numChairs + ' sillas para ' + numPlayers + ' jugadores! (' + toEliminate + ' se eliminan)',
        null, 0x00BFFF, 'bold', 2
    );

    // Grace period de 3s antes de empezar a detectar posiciones
    if (gameState.checkInterval) clearInterval(gameState.checkInterval);
    setTimeout(function() {
        if (!gameState.active) return;
        gameState.timers = {};
        gameState.occupiedChairs = {};
        room.sendAnnouncement('🟢 Busquen una silla!', null, 0x00FF00, 'bold', 2);
        gameState.checkInterval = setInterval(function() {
            checkPlayersInChairs(room, chairs, numChairs);
        }, config.checkIntervalMs);
    }, 3000);

    // Avisos de tiempo (se guardan para limpiar entre rondas)
    gameState.warningTimeouts.push(setTimeout(function() {
        if (!gameState.active) return;
        room.sendAnnouncement('⏰ Quedan 30 segundos!', null, 0xFFFF00, 'bold');
    }, 3000 + config.roundTimeMs - 30000));

    gameState.warningTimeouts.push(setTimeout(function() {
        if (!gameState.active) return;
        room.sendAnnouncement('⏰ Quedan 15 segundos!', null, 0xFF6600, 'bold');
    }, 3000 + config.roundTimeMs - 15000));

    gameState.warningTimeouts.push(setTimeout(function() {
        if (!gameState.active) return;
        room.sendAnnouncement('⏰ Quedan 5 segundos!', null, 0xFF0000, 'bold');
    }, 3000 + config.roundTimeMs - 5000));

    // Timeout de la ronda (60s + 3s grace)
    if (gameState.roundTimeout) clearTimeout(gameState.roundTimeout);
    gameState.roundTimeout = setTimeout(function() {
        if (!gameState.active) return;
        endRound(room, chairs, numChairs);
    }, config.roundTimeMs + 3000);
}

function checkPlayersInChairs(room, chairs, numChairs) {
    if (!gameState.active) return;
    var playersList = room.getPlayerList().filter(function(p) { return p.id !== 0 && p.team !== 0; });

    for (var pi = 0; pi < playersList.length; pi++) {
        var p = playersList[pi];
        var ps = gameState.players.find(function(x) { return x.id === p.id; });
        if (!ps) continue;
        var pos = p.position;
        if (!pos) continue;

        var inAnyChair = -1;
        for (var ci = 0; ci < chairs.length; ci++) {
            var dx = pos.x - chairs[ci].x;
            var dy = pos.y - chairs[ci].y;
            var dist2 = dx * dx + dy * dy;
            var maxR = config.chairRadius + config.tolerance;
            if (dist2 <= maxR * maxR) {
                inAnyChair = ci;
                break;
            }
        }

        if (inAnyChair >= 0) {
            // Esta dentro de una silla
            if (!gameState.timers[p.id]) gameState.timers[p.id] = { chair: inAnyChair, time: 0 };
            if (gameState.timers[p.id].chair === inAnyChair) {
                gameState.timers[p.id].time += config.checkIntervalMs;
            } else {
                // Cambio de silla, resetear
                gameState.timers[p.id] = { chair: inAnyChair, time: config.checkIntervalMs };
            }

            // Aseguro silla si llevo suficiente tiempo Y no esta ocupada por otro
            if (gameState.timers[p.id].time >= config.requiredMs) {
                var currentOccupant = gameState.occupiedChairs[inAnyChair];
                if (!currentOccupant || currentOccupant === p.id) {
                    if (!currentOccupant) {
                        gameState.occupiedChairs[inAnyChair] = p.id;
                        room.sendAnnouncement('🪑 ' + ps.name + ' aseguro una silla!', null, 0x00FF00);
                    }
                }
            }
        } else {
            // Fuera de cualquier silla
            // Si tenia una silla asegurada y salio, la pierde
            if (gameState.timers[p.id]) {
                var oldChair = gameState.timers[p.id].chair;
                if (gameState.occupiedChairs[oldChair] === p.id) {
                    delete gameState.occupiedChairs[oldChair];
                }
            }
            gameState.timers[p.id] = null;
        }
    }

    // Verificar si todas las sillas estan ocupadas
    var occupiedCount = Object.keys(gameState.occupiedChairs).length;
    if (occupiedCount >= numChairs) {
        // Todas las sillas tomadas, terminar ronda
        endRound(room, chairs, numChairs);
    }
}

function endRound(room, chairs, numChairs) {
    if (!gameState.active) return;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.roundTimeout) { clearTimeout(gameState.roundTimeout); gameState.roundTimeout = null; }

    // Determinar quienes tienen silla asegurada
    var safe = {};
    for (var chairIdx in gameState.occupiedChairs) {
        var pid = gameState.occupiedChairs[chairIdx];
        safe[pid] = true;
    }

    // Los que no tienen silla se eliminan
    var toRemove = [];
    for (var i = 0; i < gameState.players.length; i++) {
        if (!safe[gameState.players[i].id]) {
            toRemove.push(gameState.players[i]);
        }
    }

    // Si nadie fue eliminado (nadie aseguro silla a tiempo), eliminar random
    if (toRemove.length === 0) {
        var rndIdx = Math.floor(Math.random() * gameState.players.length);
        toRemove.push(gameState.players[rndIdx]);
    }

    // Si todos aseguraron silla pero hay mas jugadores que sillas, eliminar los que aseguraron ultimo
    // (ya cubierto por el check de occupiedChairs)

    var eliminatedNames = [];
    for (var r = 0; r < toRemove.length; r++) {
        eliminatedNames.push(toRemove[r].name);
        gameState.eliminated.push(toRemove[r]);
        try { room.setPlayerTeam(toRemove[r].id, 0); } catch(e){}
        // Remover de players
        for (var pi = 0; pi < gameState.players.length; pi++) {
            if (gameState.players[pi].id === toRemove[r].id) {
                gameState.players.splice(pi, 1);
                break;
            }
        }
    }

    room.sendAnnouncement('❌ ELIMINADOS: ' + eliminatedNames.join(', ') + ' — Quedan ' + gameState.players.length + ' jugadores', null, 0xFF4500, 'bold');

    // Limpiar desconectados
    gameState.players = gameState.players.filter(function(p) { return !!room.getPlayer(p.id); });

    if (gameState.players.length <= 1) {
        finishGame(room);
        return;
    }

    // Siguiente ronda despues de pausa
    setTimeout(function() {
        if (!gameState.active || gameState.stopRequested) return;
        startRound(room, 0); // mapVersion se calcula dentro de startRound
    }, 3000);
}

function finishGame(room) {
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.roundTimeout) { clearTimeout(gameState.roundTimeout); gameState.roundTimeout = null; }

    if (gameState.players.length === 1) {
        var winner = gameState.players[0];
        room.sendAnnouncement('\n🏆 ' + winner.name.toUpperCase() + ' HA GANADO NUMBER CHAIRS! 🏆\n🪑 Sobrevivio ' + gameState.round + ' rondas!', null, 0xFFD700, 'bold', 2);
        var cb = gameState.callback;
        gameState.callback = null;
        setTimeout(function() {
            stop(room);
            if (cb) cb({ id: winner.id, name: winner.name });
        }, 3000);
    } else {
        var cb = gameState.callback;
        gameState.callback = null;
        stop(room);
        if (cb) cb(null);
    }
}

function stop(room) {
    gameState.active = false;
    gameState.stopRequested = true;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.roundTimeout) { clearTimeout(gameState.roundTimeout); gameState.roundTimeout = null; }
    for (var wi = 0; wi < gameState.warningTimeouts.length; wi++) {
        clearTimeout(gameState.warningTimeouts[wi]);
    }
    gameState.warningTimeouts = [];
    gameState.players = [];
    gameState.eliminated = [];
    gameState.timers = {};
    gameState.occupiedChairs = {};
    gameState.chatBlocked = false;
    gameState.round = 0;
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;

    var idx = -1;
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].id === player.id) { idx = i; break; }
    }
    if (idx !== -1) {
        gameState.players.splice(idx, 1);
        room.sendAnnouncement('❌ ' + player.name + ' salio de la partida. Quedan ' + gameState.players.length + ' jugadores', null, 0xFF6600);
    }

    // Tambien remover de eliminados
    for (var ei = 0; ei < gameState.eliminated.length; ei++) {
        if (gameState.eliminated[ei].id === player.id) {
            gameState.eliminated.splice(ei, 1);
            break;
        }
    }

    // Liberar silla si tenia una
    for (var ci in gameState.occupiedChairs) {
        if (gameState.occupiedChairs[ci] === player.id) {
            delete gameState.occupiedChairs[ci];
        }
    }

    // Limpiar timer
    if (gameState.timers[player.id]) {
        delete gameState.timers[player.id];
    }

    if (gameState.players.length <= 1) {
        finishGame(room);
    } else if (gameState.players.length === 0) {
        stop(room);
        if (gameState.callback) { var cb = gameState.callback; gameState.callback = null; cb(null); }
    } else {
        // Recalcular: si ahora todos los jugadores caben en las sillas, saltar a siguiente ronda
        if (gameState.players.length <= gameState.currentNumChairs) {
            // Todos caben, no eliminar a nadie, avanzar ronda
            if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
            if (gameState.roundTimeout) { clearTimeout(gameState.roundTimeout); gameState.roundTimeout = null; }
            for (var wi = 0; wi < gameState.warningTimeouts.length; wi++) {
                clearTimeout(gameState.warningTimeouts[wi]);
            }
            gameState.warningTimeouts = [];
            room.sendAnnouncement('ℹ️ Un jugador salio. Todos caben en las sillas! Siguiente ronda...', null, 0xFFFF00);
            setTimeout(function() {
                if (!gameState.active || gameState.stopRequested) return;
                startRound(room, 0);
            }, 3000);
        }
    }
}

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

function shuffleTeams(room) {
    var players = gameState.players.slice();
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
    setMapData: function(jsonString) {
        // Se llama una vez con el mapa v2 por compatibilidad
        allMaps[2] = jsonString;
    },
    setAllMaps: function(maps) {
        // maps = { 2: string, 3: string, ..., 21: string }
        allMaps = maps;
    }
};
