// ============================================
// MINIJUEGO: COPS AND ROBBERS - Policias vs Ladrones
// Azul = Policia, Rojo = Ladrones
// Casual: no usa Lucky, equipo ganador recibe $1000
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    eliminatedRobbers: [],
    outOfBoundsRobbers: [],
    checkInterval: null,
    chatBlocked: false,
    gameStartTime: null,
    gameTimer: null,
    timeWarnings: {},
    callback: null,
    grayBallPos: null,
    hasBeenInBounds: {}
};

var config = {
    minPlayers: 4,
    checkMs: 100,
    explanationMs: 5000,
    gameDurationMs: 180000,
    bounds: { minX: -757.5, maxX: 657.5, minY: -517.5, maxY: 517.5 },
    catchDistance: 30,
    robberCollisionDistance: 30
};

function getDistance(pos1, pos2) {
    var dx = pos1.x - pos2.x;
    var dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function isOutOfBounds(pos) {
    return pos.x < config.bounds.minX || pos.x > config.bounds.maxX ||
           pos.y < config.bounds.minY || pos.y > config.bounds.maxY;
}

function findGrayBallPosition() {
    if (!mapData) return null;
    try {
        var parsed = (typeof mapData === 'string') ? JSON.parse(mapData) : mapData;
        if (parsed.discs) {
            for (var i = 0; i < parsed.discs.length; i++) {
                var disc = parsed.discs[i];
                if (disc.color && disc.pos) {
                    var color = disc.color.toString(16).toLowerCase();
                    if (color === '808080' || color === '999999' || color === 'c0c0c0' ||
                        color === 'a9a9a9' || color === 'bebebe' || color === 'b0b0b0' ||
                        color === 'cccccc' || color === 'd3d3d3' || color === 'dcdcdc') {
                        return { x: disc.pos[0], y: disc.pos[1], discIndex: i + 1 };
                    }
                }
            }
        }
    } catch(e) {}
    return null;
}

function start(room, onGameEnd) {
    if (!mapData) { console.error('[COPS_ROBBERS] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[COPS_ROBBERS] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ Se necesitan al menos 4 jugadores para COPS & ROBBERS', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.eliminatedRobbers = [];
    gameState.outOfBoundsRobbers = [];
    gameState.hasBeenInBounds = {};
    gameState.callback = onGameEnd || null;
    gameState.timeWarnings = {};

    gameState.grayBallPos = findGrayBallPosition();

    assignTeams(room, players);

    room.sendAnnouncement(
        '🚔 COPS & ROBBERS - POLICIAS vs LADRONES\n👥 Jugadores: ' + players.length,
        null, 0x00BFFF, 'bold', 2
    );

    setTimeout(function() {
        try { room.startGame(); } catch(e){}
        try { room.pauseGame(true); } catch(e){}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📋 INSTRUCCIONES:\n' +
            '🔵 AZUL = POLICIA: Toca a los ladrones para atraparlos!\n' +
            '🔴 ROJO = LADRONES: Sobrevive 3 minutos para ganar!\n' +
            (gameState.grayBallPos ? '⚪ Toca la BOLA GRIS para revivir a tus companeros ladrones!\n' : '') +
            '🏆 Si la policia atrapa a todos los ladrones, GANA la policia\n' +
            '🏆 Si quedan ladrones al acabar el tiempo, GANAN los ladrones\n\n' +
            '⏱️ Comienza en 5s...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            try { room.pauseGame(false); } catch(e){}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ¡COMIENZA COPS & ROBBERS! (3:00)', null, 0x00FF00, 'bold', 2);

            gameState.checkInterval = setInterval(function() { checkPlayers(room); }, config.checkMs);

            gameState.gameTimer = setTimeout(function() {
                if (!gameState.active) return;
                var aliveRobbers = getAliveRobbers(room);
                if (aliveRobbers.length > 0) {
                    endGame(room, 1, 'LADRONES');
                } else {
                    endGame(room, 2, 'POLICIA');
                }
            }, config.gameDurationMs);
        }, config.explanationMs);
    }, 1500);
}

function assignTeams(room, players) {
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }

    var halfRobbers = Math.ceil(players.length / 2);

    gameState.players = [];
    for (var i = 0; i < players.length; i++) {
        var team = (i < halfRobbers) ? 1 : 2;
        var role = (team === 1) ? 'robber' : 'cop';
        try { room.setPlayerTeam(players[i].id, team); } catch(e){}
        gameState.players.push({ id: players[i].id, name: players[i].name, team: team, role: role });
    }

    var robberCount = gameState.players.filter(function(p) { return p.role === 'robber'; }).length;
    var copCount = gameState.players.filter(function(p) { return p.role === 'cop'; }).length;
    room.sendAnnouncement('🔴 Ladrones: ' + robberCount + ' | 🔵 Policias: ' + copCount, null, 0xFFFFFF);
}

function getAliveRobbers(room) {
    return gameState.players.filter(function(p) {
        if (p.role !== 'robber') return false;
        if (gameState.eliminatedRobbers.indexOf(p.id) !== -1) return false;
        // Si AFK lo movió a espectador, marcarlo como eliminado
        var current = room.getPlayer(p.id);
        if (!current || current.team === 0) {
            if (gameState.eliminatedRobbers.indexOf(p.id) === -1) gameState.eliminatedRobbers.push(p.id);
            return false;
        }
        return true;
    });
}

function getAliveCops(room) {
    return gameState.players.filter(function(p) {
        if (p.role !== 'cop') return false;
        var current = room.getPlayer(p.id);
        return current && current.team !== 0;
    });
}

function checkPlayers(room) {
    if (!gameState.active) return;

    var elapsed = Date.now() - gameState.gameStartTime;
    var remaining = config.gameDurationMs - elapsed;

    if (remaining <= 120000 && !gameState.timeWarnings['2min']) {
        gameState.timeWarnings['2min'] = true;
        room.sendAnnouncement('⏱️ Quedan 2 MINUTOS!', null, 0xFFFF00, 'bold', 2);
    }
    if (remaining <= 60000 && !gameState.timeWarnings['1min']) {
        gameState.timeWarnings['1min'] = true;
        room.sendAnnouncement('⏱️ Queda 1 MINUTO!', null, 0xFFFF00, 'bold', 2);
    }
    if (remaining <= 30000 && !gameState.timeWarnings['30s']) {
        gameState.timeWarnings['30s'] = true;
        room.sendAnnouncement('⏱️ Quedan 30 SEGUNDOS!', null, 0xFF6600, 'bold', 2);
    }
    if (remaining <= 10000 && !gameState.timeWarnings['10s']) {
        gameState.timeWarnings['10s'] = true;
        room.sendAnnouncement('⏱️ ¡10 SEGUNDOS!', null, 0xFF0000, 'bold', 2);
    }

    var aliveRobbers = getAliveRobbers(room);
    var cops = getAliveCops(room);

    var robberPositions = [];
    for (var i = 0; i < aliveRobbers.length; i++) {
        var rPlayer = room.getPlayer(aliveRobbers[i].id);
        if (!rPlayer || !rPlayer.position) continue;
        robberPositions.push({ id: aliveRobbers[i].id, name: aliveRobbers[i].name, pos: rPlayer.position });
    }

    var copPositions = [];
    for (var i = 0; i < cops.length; i++) {
        var cPlayer = room.getPlayer(cops[i].id);
        if (!cPlayer || !cPlayer.position) continue;
        copPositions.push({ id: cops[i].id, name: cops[i].name, pos: cPlayer.position });
    }

    var newlyEliminated = [];

    // Policia atrapa ladron: lo teleporta fuera del area (eliminado)
    for (var r = 0; r < robberPositions.length; r++) {
        if (newlyEliminated.indexOf(robberPositions[r].id) !== -1) continue;
        for (var c = 0; c < copPositions.length; c++) {
            if (getDistance(robberPositions[r].pos, copPositions[c].pos) < config.catchDistance) {
                newlyEliminated.push(robberPositions[r].id);
                try { room.setPlayerDiscProperties(robberPositions[r].id, { x: 0, y: config.bounds.maxY + 200, xspeed: 0, yspeed: 0 }); } catch(e){}
                room.sendAnnouncement('🚔 ' + copPositions[c].name + ' ATRAPO a ' + robberPositions[r].name + '!', null, 0x3399FF);
                break;
            }
        }
    }

    // El mapa tiene planes (paredes) que contienen a los jugadores por equipo
    // No se necesita deteccion de fuera del area
    // Aplicar eliminaciones (solo trackear, NO mover a espectadores)
    for (var i = 0; i < newlyEliminated.length; i++) {
        if (gameState.eliminatedRobbers.indexOf(newlyEliminated[i]) === -1) {
            gameState.eliminatedRobbers.push(newlyEliminated[i]);
        }
    }

    // Revivir ladrones con bola gris
    if (gameState.grayBallPos) {
        var grayDiscPos = null;
        try {
            var discProps = room.getDiscProperties(gameState.grayBallPos.discIndex);
            if (discProps) {
                grayDiscPos = { x: discProps.x, y: discProps.y };
            }
        } catch(e) {}

        if (grayDiscPos) {
            for (var r = 0; r < robberPositions.length; r++) {
                if (newlyEliminated.indexOf(robberPositions[r].id) !== -1) continue;
                if (getDistance(robberPositions[r].pos, grayDiscPos) < 40) {
                    if (gameState.eliminatedRobbers.length > 0) {
                        var revivedCount = gameState.eliminatedRobbers.length;
                        gameState.eliminatedRobbers = [];
                        gameState.outOfBoundsRobbers = [];
                        room.sendAnnouncement('⚪ ' + robberPositions[r].name + ' toco la bola gris! Ladrones REVIVIDOS! (' + revivedCount + ')', null, 0x00FF00, 'bold', 2);
                    }
                    break;
                }
            }
        }
    }

    // Verificar si todos los ladrones fueron eliminados
    var aliveAfter = getAliveRobbers(room);
    if (newlyEliminated.length > 0) {
        room.sendAnnouncement('🔴 Ladrones restantes: ' + aliveAfter.length, null, 0xFF6600);
    }

    if (aliveAfter.length === 0) {
        endGame(room, 2, 'POLICIA');
    }
}

function endGame(room, winningTeam, teamName) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }

    var emoji = (winningTeam === 2) ? '🔵🚔' : '🔴🏃';
    room.sendAnnouncement(
        '\n🏆 ' + emoji + ' ¡EQUIPO ' + teamName + ' GANA COPS & ROBBERS! ' + emoji + ' 🏆',
        null, 0xFFD700, 'bold', 2
    );

    setTimeout(function() {
        try { room.stopGame(); } catch(e){}
        if (gameState.callback) {
            gameState.callback({ winningTeam: winningTeam, teamName: teamName });
        }
    }, 2000);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }
    gameState.players = [];
    gameState.eliminatedRobbers = [];
    gameState.outOfBoundsRobbers = [];
    gameState.chatBlocked = false;
    gameState.timeWarnings = {};
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    var p = gameState.players.find(function(x) { return x.id === player.id; });
    if (p && p.role === 'robber') {
        // Quitar de outOfBoundsRobbers si estaba ahi
        var oobIdx = gameState.outOfBoundsRobbers.indexOf(player.id);
        if (oobIdx !== -1) gameState.outOfBoundsRobbers.splice(oobIdx, 1);
        // Agregar a eliminados permanentes
        if (gameState.eliminatedRobbers.indexOf(player.id) === -1) {
            gameState.eliminatedRobbers.push(player.id);
        }
        var aliveRobbers = getAliveRobbers(room);
        room.sendAnnouncement('❌ Ladron ' + player.name + ' se fue. Ladrones restantes: ' + aliveRobbers.length, null, 0xFF6600);
        if (aliveRobbers.length === 0) {
            endGame(room, 2, 'POLICIA');
        }
    }
}

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

function getStats() { return {}; }

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    getStats: getStats,
    setMapData: function(jsonString) { mapData = jsonString; }
};
