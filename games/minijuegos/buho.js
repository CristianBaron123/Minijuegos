// ============================================
// MINIJUEGO: BUHO - Todos contra Todos
// 1 vida por jugador. 2-16 jugadores.
// Cada jugador defiende su portería.
// ============================================

var buhoData = null; // { maps: { "2": "...", ..., "CAMPEON": "..." }, goalCenters: { "2": [{x,y},...], ... } }

var gameState = {
    active: false,
    players: {},         // { id: { name, auth, goalIndex, alive } }
    goalCenters: [],     // centros de goals del mapa actual
    currentMapSize: 0,
    lastBallPos: null,
    callback: null,
    shrinkTimeout: null,
    championTimeout: null
};

// ──────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────

// Quita centros de portería repetidos (el mapa de 16 trae 17 porterías y dos están en el mismo punto:
// dos jugadores quedaban apilados y el segundo no se podía eliminar)
function dedupeCenters(list) {
    var out = [];
    for (var i = 0; i < list.length; i++) {
        var dup = false;
        for (var j = 0; j < out.length; j++) {
            if (Math.abs(out[j].x - list[i].x) < 10 && Math.abs(out[j].y - list[i].y) < 10) { dup = true; break; }
        }
        if (!dup) out.push(list[i]);
    }
    return out;
}

function loadMapForPlayers(room, n) {
    var maps = buhoData.maps;
    var key = n.toString();
    if (!maps[key]) {
        for (var k = n; k >= 2; k--) {
            if (maps[k.toString()]) { key = k.toString(); break; }
        }
    }
    if (!maps[key]) return false;
    try {
        room.setCustomStadium(maps[key]);
        gameState.currentMapSize = parseInt(key);
        gameState.goalCenters = buhoData.goalCenters[key] || [];
        if (gameState.goalCenters.length === 0) {
            try {
                var mapParsed = null;
                if (typeof maps[key] === 'string') {
                    mapParsed = JSON.parse(maps[key]);
                } else if (typeof maps[key] === 'object' && maps[key] !== null) {
                    mapParsed = maps[key];
                    console.log('[BUHO] Fallback: maps[' + key + '] es objeto, no string');
                }
                if (mapParsed && mapParsed.goals && mapParsed.goals.length > 0) {
                    gameState.goalCenters = mapParsed.goals.map(function(g) {
                        return { x: Math.round((g.p0[0] + g.p1[0]) / 2), y: Math.round((g.p0[1] + g.p1[1]) / 2) };
                    });
                    console.log('[BUHO] Fallback: calculated ' + gameState.goalCenters.length + ' goalCenters from map JSON for key=' + key);
                } else {
                    console.warn('[BUHO] Fallback: mapParsed.goals vacio o no existe para key=' + key + ' mapType=' + typeof maps[key]);
                }
            } catch(e2) {
                console.error('[BUHO] Fallback goalCenter parse failed for key=' + key + ': ' + e2.message + ' mapType=' + typeof maps[key]);
            }
        }
        gameState.goalCenters = dedupeCenters(gameState.goalCenters);
        console.log('[BUHO] loadMap: key=' + key + ' goalCenters=' + gameState.goalCenters.length + ' mapType=' + typeof maps[key]);
        return true;
    } catch(e) {
        console.error('[BUHO] Error cargando mapa ' + key + '-MAN: ' + e.message);
        return false;
    }
}

function getAlivePlayers() {
    var result = [];
    for (var id in gameState.players) {
        if (gameState.players[id].alive) result.push(parseInt(id));
    }
    return result;
}

// Los mapas de BUHO ya ubican a cada jugador pegado a su portería (un punto de aparición por portería,
// a 3-11 unidades de su centro). Cada jugador defiende la portería MÁS CERCANA a donde apareció y NO se
// lo mueve: antes se asignaba por orden de ID y se teletransportaba a todos, así que en un 1v1 los dos
// terminaban cambiados de lugar. Solo se acomoda a quien aparezca lejos de toda portería libre.
var NEAR_SPAWN = 90;

function playerPos(room, id) {
    try { var pl = room.getPlayer(id); if (pl && pl.position) return { x: pl.position.x, y: pl.position.y }; } catch(e) {}
    try { var dp = room.getPlayerDiscProperties(id); if (dp && dp.x != null) return { x: dp.x, y: dp.y }; } catch(e) {}
    return null;
}

function assignGoals(room) {
    var alive = getAlivePlayers();
    var goals = gameState.goalCenters;
    if (goals.length === 0 || alive.length === 0) return;

    for (var ri = 0; ri < alive.length; ri++) {
        gameState.players[alive[ri]].goalIndex = -1;
    }

    var pos = {};
    var allKnown = true;
    for (var a = 0; a < alive.length; a++) {
        pos[alive[a]] = playerPos(room, alive[a]);
        if (!pos[alive[a]]) allKnown = false;
    }

    var moved = 0;
    if (allKnown) {
        // Pares (jugador, portería) por distancia: se asigna primero lo más cercano
        var pairs = [];
        for (var pi = 0; pi < alive.length; pi++) {
            for (var gi = 0; gi < goals.length; gi++) {
                pairs.push({ id: alive[pi], gi: gi, d: Math.sqrt(Math.pow(pos[alive[pi]].x - goals[gi].x, 2) + Math.pow(pos[alive[pi]].y - goals[gi].y, 2)) });
            }
        }
        pairs.sort(function(x, y) { return x.d - y.d; });
        var takenGoal = {};
        var chosen = {};
        for (var k = 0; k < pairs.length; k++) {
            var pr = pairs[k];
            if (chosen[pr.id] === undefined && takenGoal[pr.gi] === undefined) {
                chosen[pr.id] = pr;
                takenGoal[pr.gi] = true;
            }
        }
        for (var m = 0; m < alive.length; m++) {
            var sel = chosen[alive[m]];
            if (!sel) continue;
            gameState.players[alive[m]].goalIndex = sel.gi;
            if (sel.d > NEAR_SPAWN) {
                try { room.setPlayerDiscProperties(alive[m], { x: Math.round(goals[sel.gi].x * 0.9), y: Math.round(goals[sel.gi].y * 0.9), xspeed: 0, yspeed: 0 }); moved++; } catch(e) {}
            }
        }
    } else {
        // Sin posiciones disponibles: asignación por orden y se ubica a cada uno en su portería
        for (var i = 0; i < alive.length; i++) {
            var goalIdx = i % goals.length;
            gameState.players[alive[i]].goalIndex = goalIdx;
            try {
                room.setPlayerDiscProperties(alive[i], { x: Math.round(goals[goalIdx].x * 0.7), y: Math.round(goals[goalIdx].y * 0.7), xspeed: 0, yspeed: 0 });
                moved++;
            } catch(e) {}
        }
    }

    room.sendAnnouncement('🎯 ' + alive.length + ' jugadores asignados a sus porterías', null, 0x00FFFF);
}

function checkRemaining(room) {
    if (!gameState.active) return;
    var alive = getAlivePlayers();

    if (alive.length <= 1) {
        gameState.active = false;
        var winnerId = alive.length === 1 ? alive[0] : null;

        if (gameState.shrinkTimeout) { clearTimeout(gameState.shrinkTimeout); gameState.shrinkTimeout = null; }
        if (gameState.championTimeout) { clearTimeout(gameState.championTimeout); gameState.championTimeout = null; }

        if (winnerId) {
            var winner = gameState.players[winnerId];
            winner.id = winnerId;
            room.sendAnnouncement('\n🏆🦉 ' + winner.name.toUpperCase() + ' GANA BUHO! 🦉🏆', null, 0xFFD700, 'bold', 2);
            try { room.setPlayerAvatar(winnerId, null); } catch(e) {}

            // Mapa campeón
            if (buhoData.maps['CAMPEON']) {
                try { room.stopGame(); } catch(e) {}
                try { room.setCustomStadium(buhoData.maps['CAMPEON']); } catch(e) {}
                // Los eliminados salen a espectador: el mapa campeón es solo del ganador
                var allChamp = room.getPlayerList().filter(function(p) { return p.id !== 0 && p.id !== winnerId; });
                for (var c = 0; c < allChamp.length; c++) { try { room.setPlayerTeam(allChamp[c].id, 0); } catch(e) {} }
                try { room.setPlayerTeam(winnerId, 1); } catch(e) {}
                try { room.startGame(); } catch(e) {}
            }

            gameState.championTimeout = setTimeout(function() {
                try { room.stopGame(); } catch(e) {}
                var all = room.getPlayerList().filter(function(p) { return p.id !== 0; });
                for (var i = 0; i < all.length; i++) {
                    try { room.setPlayerTeam(all[i].id, 0); } catch(e) {}
                    try { room.setPlayerAvatar(all[i].id, null); } catch(e) {}
                }
                if (gameState.callback) gameState.callback(winner);
            }, 4000);

        } else {
            room.sendAnnouncement('🦉 Empate! No hay ganador.', null, 0xFF6600);
            try { room.stopGame(); } catch(e) {}
            var allDraw = room.getPlayerList().filter(function(p) { return p.id !== 0; });
            for (var d = 0; d < allDraw.length; d++) {
                try { room.setPlayerTeam(allDraw[d].id, 0); } catch(e) {}
                try { room.setPlayerAvatar(allDraw[d].id, null); } catch(e) {}
            }
            if (gameState.callback) gameState.callback(null);
        }

    } else if (alive.length < gameState.currentMapSize) {
        // Reducir mapa (una sola vez: si ya hay una reducción en curso, esa usa los vivos del momento)
        if (gameState.shrinkTimeout) return;
        try { room.stopGame(); } catch(e) {}

        gameState.shrinkTimeout = setTimeout(function() {
            gameState.shrinkTimeout = null;
            if (!gameState.active) return;
            var aliveNow = getAlivePlayers();
            if (aliveNow.length <= 1) { checkRemaining(room); return; }
            var newSize = Math.min(aliveNow.length, 16);
            if (!loadMapForPlayers(room, newSize)) return;

            // Mover eliminados a spec, reasignar equipos a los vivos
            for (var id in gameState.players) {
                if (!gameState.players[id].alive) {
                    try { room.setPlayerTeam(parseInt(id), 0); } catch(e) {}
                }
            }
            var aliveList = getAlivePlayers();
            for (var j = 0; j < aliveList.length; j++) {
                try { room.setPlayerTeam(aliveList[j], (j % 2 === 0) ? 1 : 2); } catch(e) {}
            }

            room.sendAnnouncement('⚡ ' + aliveList.length + ' jugadores restantes! Defiende donde apareces', null, 0xFFFF00, 'bold', 2);
            try { room.startGame(); } catch(e) {}
            try { room.pauseGame(true); } catch(e) {}
            setTimeout(function() {
                assignGoals(room);
                try { room.pauseGame(false); } catch(e) {}
            }, 1500);
        }, 1500);
    }
}

// ──────────────────────────────────────────
// API del módulo
// ──────────────────────────────────────────

function start(room, onGameEnd) {
    if (!buhoData) {
        console.error('[BUHO] buhoData no inyectado.');
        if (typeof reportBug === 'function') reportBug('BUHO.start', 'buhoData es null — no se inyectaron mapas/goals');
        if (onGameEnd) onGameEnd(null);
        return;
    }
    var _gcKeys = Object.keys(buhoData.goalCenters || {});
    var _gcEmpty = _gcKeys.filter(function(k) { return !buhoData.goalCenters[k] || buhoData.goalCenters[k].length === 0; });
    if (_gcEmpty.length > 0) {
        console.log('[BUHO] WARNING: goalCenters vacios para keys: ' + _gcEmpty.join(','));
    }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) {
        room.sendAnnouncement('⚠️ Se necesitan al menos 2 jugadores para Buho', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }
    if (players.length > 16) {
        room.sendAnnouncement('⚠️ Buho es para máximo 16 jugadores', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = {};
    gameState.lastBallPos = null;
    gameState.callback = onGameEnd || null;
    gameState.shrinkTimeout = null;
    gameState.championTimeout = null;

    // Distribuir equipos y registrar jugadores
    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, (i % 2 === 0) ? 1 : 2); } catch(e) {}
        gameState.players[players[i].id] = {
            name: players[i].name,
            auth: players[i].auth || null,
            goalIndex: -1,
            alive: true
        };
        try { room.setPlayerAvatar(players[i].id, null); } catch(e) {}
    }

    var mapSize = Math.min(players.length, 16);
    if (!loadMapForPlayers(room, mapSize)) {
        room.sendAnnouncement('❌ Error cargando mapa Buho', null, 0xFF0000);
        gameState.active = false;
        if (onGameEnd) onGameEnd(null);
        return;
    }

    room.sendAnnouncement(
        '🦉 BUHO — ' + players.length + ' jugadores\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        '🎯 Defiende la cancha donde apareces\n' +
        '💀 1 sola vida — si meten gol en tu cancha, quedas eliminado\n' +
        '🏆 El último en pie gana!\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        null, 0xFFD700, 'bold', 2
    );

    try { room.startGame(); } catch(e) {}
    try { room.pauseGame(true); } catch(e) {}

    setTimeout(function() {
        assignGoals(room);
        room.sendAnnouncement('🎯 Defiende la cancha donde apareciste!', null, 0x00FFFF, 'bold', 2);
        setTimeout(function() {
            try { room.pauseGame(false); } catch(e) {}
        }, 3000);
    }, 1500);
}

function stop(room) {
    gameState.active = false;
    if (gameState.shrinkTimeout) { clearTimeout(gameState.shrinkTimeout); gameState.shrinkTimeout = null; }
    if (gameState.championTimeout) { clearTimeout(gameState.championTimeout); gameState.championTimeout = null; }
    var all = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    for (var i = 0; i < all.length; i++) {
        try { room.setPlayerAvatar(all[i].id, null); } catch(e) {}
    }
    gameState.players = {};
    try { room.stopGame(); } catch(e) {}
}

function onTeamGoal(room, team) {
    if (!gameState.active) return;

    // Intentar obtener posición actual de la bola (más preciso), fallback a lastBallPos
    var ballPos = null;
    try {
        var bp = room.getDiscProperties(0);
        if (bp) ballPos = { x: bp.x, y: bp.y };
    } catch(e) {}
    if (!ballPos) ballPos = gameState.lastBallPos;
    if (!ballPos) {
        console.log('[BUHO] onTeamGoal: sin posición de bola');
        return;
    }

    // Encontrar goal más cercano a la posición de la bola
    var closest = -1;
    var minDist = 999999;
    for (var i = 0; i < gameState.goalCenters.length; i++) {
        var dx = ballPos.x - gameState.goalCenters[i].x;
        var dy = ballPos.y - gameState.goalCenters[i].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) { minDist = dist; closest = i; }
    }
    if (closest === -1) {
        console.log('[BUHO] onTeamGoal: no se encontró goal cercano. goalCenters=' + gameState.goalCenters.length);
        if (typeof reportBug === 'function') reportBug('BUHO.onTeamGoal', 'goalCenters=' + gameState.goalCenters.length + ' ballPos=' + JSON.stringify(ballPos) + ' currentMapSize=' + gameState.currentMapSize + ' active=' + gameState.active);
        return;
    }

    // Encontrar dueño de esa portería
    var ownerId = null;
    for (var id in gameState.players) {
        if (gameState.players[id].goalIndex === closest && gameState.players[id].alive) {
            ownerId = parseInt(id);
            break;
        }
    }
    if (ownerId === null) {
        console.log('[BUHO] onTeamGoal: goal ' + closest + ' sin dueño vivo. goalIndex de jugadores:');
        for (var id2 in gameState.players) {
            console.log('  ' + id2 + ': goalIndex=' + gameState.players[id2].goalIndex + ' alive=' + gameState.players[id2].alive);
        }
        return;
    }

    var p = gameState.players[ownerId];
    p.alive = false;
    room.sendAnnouncement('☠️ ' + p.name + ' ELIMINADO!', null, 0xFF0000, 'bold', 2);
    try { room.setPlayerAvatar(ownerId, '💀'); } catch(e) {}

    setTimeout(function() { checkRemaining(room); }, 1000);
}

function onGameTick(room) {
    if (!gameState.active) return;
    try {
        var bp = room.getDiscProperties(0);
        if (bp) gameState.lastBallPos = { x: bp.x, y: bp.y };
    } catch(e) {}
}

function onPositionsReset(room) {
    if (!gameState.active) return;
    setTimeout(function() { assignGoals(room); }, 200);
}

function onPlayerLeave(room, player) {
    if (!gameState.active || !gameState.players[player.id]) return;
    gameState.players[player.id].alive = false;
    delete gameState.players[player.id];
    room.sendAnnouncement('❌ ' + player.name + ' salió de Buho', null, 0xFF6600);
    checkRemaining(room);
}

function onPlayerChat(player, message) { return true; }
function isActive() { return gameState.active; }
function getStats() { return {}; }

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    getStats: getStats,
    onTeamGoal: onTeamGoal,
    onGameTick: onGameTick,
    onPositionsReset: onPositionsReset,
    setMapData: function(data) { buhoData = data; }
};
