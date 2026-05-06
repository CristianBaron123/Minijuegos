var mapData = null;

var gameState = {
    active: false,
    players: {},
    lastAliveCount: 0,
    checkInterval: null,
    callback: null,
    bounds: { minX: -600, maxX: 600, minY: -140, maxY: 140 }
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[CHARGE] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[CHARGE] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (players.length < 2) { room.sendAnnouncement('⚠️ Se necesitan al menos 2 jugadores para CHARGE', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = {};
    gameState.lastAliveCount = players.length;

    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, (i % 2 === 0) ? 1 : 2); } catch(e) {}
        gameState.players[players[i].id] = { name: players[i].name, alive: true };
    }

    room.sendAnnouncement(
        '⚡ CHARGE — ' + players.length + ' jugadores\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        '🎯 ¡Evita las bolas de tu color!\n' +
        '🔴 Rojos evitan bolas rojas | 🔵 Azules evitan bolas azules\n' +
        '🚫 Si sales del área, quedas eliminado\n' +
        '🏆 El último en pie gana todo el premio!\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        null, 0xFFD700, 'bold', 2
    );

    try { room.stopGame(); } catch(e) {}
    setTimeout(function() {
        try { room.startGame(); } catch(e) {}
        try { room.pauseGame(true); } catch(e) {}
        gameState.chatBlocked = true;

        room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
            '⚡ ¡Evita las bolas de tu mismo color!\n' +
            '🔴 Equipo rojo → evita bolas rojas\n' +
            '🔵 Equipo azul → evita bolas azules\n' +
            '🚫 Si sales del área del cuadro, quedas eliminado\n' +
            '🏆 El último en pie gana todo el premio!\n' +
            '⏳ Comienza en 5s...'
            , null, 0xFFFF00, 'bold', 2);

        setTimeout(function() {
            gameState.chatBlocked = false;
            try { room.pauseGame(false); } catch(e) {}
            gameState.checkInterval = setInterval(function() { checkPlayers(room); }, 100);
        }, 5000);
    }, 1500);
}

function checkPlayers(room) {
    if (!gameState.active) return;

    var alive = [];
    var aliveIds = Object.keys(gameState.players);
    for (var i = 0; i < aliveIds.length; i++) {
        var id = aliveIds[i];
        if (!gameState.players[id].alive) continue;

        var pid = parseInt(id);
        var pos = null;
        try { var pp = room.getPlayerDiscProperties(pid); if (pp) pos = { x: pp.x, y: pp.y }; } catch(e) {}

        if (pos) {
            if (pos.x < gameState.bounds.minX || pos.x > gameState.bounds.maxX ||
                pos.y < gameState.bounds.minY || pos.y > gameState.bounds.maxY) {
                eliminatePlayer(room, pid, 'salió del área');
                continue;
            }
        }
        alive.push(pid);
    }

    var aliveCount = alive.length;

    if (aliveCount <= 1) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
        gameState.active = false;

        if (aliveCount === 1) {
            var winnerId = alive[0];
            var winner = gameState.players[winnerId];
            room.sendAnnouncement('\n🏆⚡ ' + winner.name.toUpperCase() + ' GANA CHARGE! ⚡🏆', null, 0xFFD700, 'bold', 2);

            var all = room.getPlayerList().filter(function(p) { return p.id !== 0; });
            for (var j = 0; j < all.length; j++) {
                try { room.setPlayerTeam(all[j].id, 0); } catch(e) {}
            }
            try { room.setPlayerTeam(winnerId, 1); } catch(e) {}

            var cb = gameState.callback;
            gameState.callback = null;
            if (cb) { setTimeout(function() { cb({ id: winnerId, name: winner.name }); }, 3000); }
        } else {
            room.sendAnnouncement('🤝 Empate! Nadie sobrevivió.', null, 0xFF6600);
            var cb2 = gameState.callback;
            gameState.callback = null;
            if (cb2) cb2(null);
        }
    } else if (aliveCount < gameState.lastAliveCount && aliveCount > 1) {
        gameState.lastAliveCount = aliveCount;
    }
}

function eliminatePlayer(room, playerId, reason) {
    if (!gameState.players[playerId]) return;
    if (!gameState.players[playerId].alive) return;

    gameState.players[playerId].alive = false;
    var name = gameState.players[playerId].name;
    room.sendAnnouncement('💀 ' + name + ' eliminado (' + reason + ') — ' + getAliveCount() + ' restantes', null, 0xFF4444);
    try { room.setPlayerTeam(playerId, 0); } catch(e) {}
}

function getAliveCount() {
    var count = 0;
    for (var id in gameState.players) {
        if (gameState.players[id].alive) count++;
    }
    return count;
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = {};
    try { room.stopGame(); } catch(e) {}
}

function onPlayerLeave(room, player) {
    if (!gameState.active || !gameState.players[player.id]) return;
    eliminatePlayer(room, player.id, 'desconectó');
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var maxPerTeam = 15;
    var count = Math.min(players.length, maxPerTeam * 2);
    for (var k = 0; k < count; k++) {
        room.setPlayerTeam(players[k].id, (k % 2 === 0) ? 1 : 2);
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
