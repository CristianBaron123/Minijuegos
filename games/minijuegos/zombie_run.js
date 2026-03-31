// ============================================
// MINIJUEGO: ZOMBIE RUN - Sobrevive 3 minutos sin ser convertido
// Azules = zombies, Rojos = supervivientes
// Si un zombie toca a un superviviente, se convierte en zombie
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],          // [{id, name, isZombie, isOriginalZombie}]
    checkInterval: null,
    chatBlocked: false,
    gameTimer: null,
    callback: null,
    timeLeft: 0,
    timeouts: []
};

var config = {
    survivalMs: 180000,    // 3 minutos
    touchDistance: 30,      // distancia de contacto (radio 15 + radio 15)
    checkMs: 100,           // intervalo de chequeo
    zombieCountThreshold: 8 // 8+ jugadores = 2 zombies, menos = 1
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[ZOMBIE_RUN] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[ZOMBIE_RUN] Error mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var allPlayers = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    var minPlayers = (typeof TEST_ONLY_GAMES !== 'undefined' && TEST_ONLY_GAMES) ? 1 : 3;
    if (allPlayers.length < minPlayers) { room.sendAnnouncement('No hay suficientes jugadores para ZOMBIE RUN (min 3)', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = [];
    gameState.timeLeft = config.survivalMs;

    // Mezclar jugadores
    for (var i = allPlayers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = allPlayers[i]; allPlayers[i] = allPlayers[j]; allPlayers[j] = tmp;
    }

    // Elegir zombies: 2 si hay 8+, 1 si menos
    var numZombies = allPlayers.length >= config.zombieCountThreshold ? 2 : 1;

    for (var k = 0; k < allPlayers.length; k++) {
        var isZombie = k < numZombies;
        gameState.players.push({
            id: allPlayers[k].id,
            name: allPlayers[k].name,
            isZombie: isZombie,
            isOriginalZombie: isZombie
        });
        // Zombies = equipo 2 (azul), Supervivientes = equipo 1 (rojo)
        try { room.setPlayerTeam(allPlayers[k].id, isZombie ? 2 : 1); } catch(e) {}
    }

    try { room.stopGame(); } catch(e) {}
    var t1 = setTimeout(function() {
        if (!gameState.active) return;
        try { room.startGame(); } catch(e) {}
        try { room.pauseGame(true); } catch(e) {}
        gameState.chatBlocked = true;

        var zombieNames = gameState.players.filter(function(p) { return p.isZombie; }).map(function(p) { return p.name; }).join(' y ');

        room.sendAnnouncement(
            '\n🧟 ZOMBIE RUN!\n' +
            '🔵 Zombie' + (numZombies > 1 ? 's' : '') + ': ' + zombieNames + '\n' +
            '🔴 Supervivientes: Aguanten 3 MINUTOS!\n' +
            '💀 Si un zombie te toca, te conviertes en zombie\n' +
            '🏆 Sobrevive para ganar!\n' +
            '⏳ Comienza en 10s...',
            null, 0x00FF00, 'bold', 2
        );

        // Mensaje especifico para zombies
        var zombieIds = gameState.players.filter(function(p) { return p.isZombie; });
        for (var zi = 0; zi < zombieIds.length; zi++) {
            room.sendAnnouncement(
                '🧟 Eres ZOMBIE! Tu objetivo: TOCAR a los supervivientes para convertirlos. Infecta a todos!',
                zombieIds[zi].id, 0x3399FF, 'bold'
            );
        }
        // Mensaje especifico para supervivientes
        var survivorIds = gameState.players.filter(function(p) { return !p.isZombie; });
        for (var si = 0; si < survivorIds.length; si++) {
            room.sendAnnouncement(
                '🔴 Eres SUPERVIVIENTE! Esquiva a los zombies durante 3 minutos para ganar!',
                survivorIds[si].id, 0xFF3333, 'bold'
            );
        }

        var t2 = setTimeout(function() {
            if (!gameState.active) return;
            gameState.chatBlocked = false;
            try { room.pauseGame(false); } catch(e) {}
            room.sendAnnouncement('🟢 CORRAN! La caceria comienza en 1:20...', null, 0x00FF00, 'bold', 2);

            // Esperar 80 segundos (1:20) para que la bola baje
            var t3 = setTimeout(function() {
                if (!gameState.active) return;
                room.sendAnnouncement('🧟 LA CACERIA COMIENZA AHORA! 3 minutos para sobrevivir!', null, 0xFF0000, 'bold', 2);

                // Chequeo de proximidad zombie vs superviviente
                gameState.checkInterval = setInterval(function() {
                    if (!gameState.active) return;
                    checkZombieTouch(room);
                }, config.checkMs);

                // Avisos de tiempo
                var w1 = setTimeout(function() {
                    if (!gameState.active) return;
                    room.sendAnnouncement('⏱️ Quedan 2 minutos!', null, 0xFFFF00, 'bold');
                }, 60000);
                gameState.timeouts.push(w1);

                var w2 = setTimeout(function() {
                    if (!gameState.active) return;
                    room.sendAnnouncement('⏱️ Queda 1 minuto!', null, 0xFFA500, 'bold');
                }, 120000);
                gameState.timeouts.push(w2);

                var w3 = setTimeout(function() {
                    if (!gameState.active) return;
                    room.sendAnnouncement('⏱️ 30 segundos!', null, 0xFF6600, 'bold');
                }, 150000);
                gameState.timeouts.push(w3);

                var w4 = setTimeout(function() {
                    if (!gameState.active) return;
                    room.sendAnnouncement('⏱️ 10 SEGUNDOS!', null, 0xFF0000, 'bold');
                }, 170000);
                gameState.timeouts.push(w4);

                // Timer de 3 minutos - supervivientes ganan
                gameState.gameTimer = setTimeout(function() {
                    if (!gameState.active) return;
                    survivorsWin(room);
                }, config.survivalMs);
            }, 80000);
            gameState.timeouts.push(t3);

        }, 10000);
        gameState.timeouts.push(t2);
    }, 1500);
    gameState.timeouts.push(t1);
}

function checkZombieTouch(room) {
    if (!gameState.active) return;

    var zombies = [];
    var survivors = [];
    for (var i = 0; i < gameState.players.length; i++) {
        var p = gameState.players[i];
        var player = room.getPlayer(p.id);
        if (!player || !player.position) continue;
        if (p.isZombie) {
            zombies.push({ data: p, pos: player.position });
        } else {
            survivors.push({ data: p, pos: player.position });
        }
    }

    var converted = [];
    for (var z = 0; z < zombies.length; z++) {
        for (var s = 0; s < survivors.length; s++) {
            var dx = zombies[z].pos.x - survivors[s].pos.x;
            var dy = zombies[z].pos.y - survivors[s].pos.y;
            var dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < config.touchDistance) {
                converted.push(survivors[s].data);
            }
        }
    }

    for (var c = 0; c < converted.length; c++) {
        convertToZombie(room, converted[c]);
    }
}

function convertToZombie(room, player) {
    if (player.isZombie) return;
    player.isZombie = true;

    try { room.setPlayerTeam(player.id, 2); } catch(e) {}

    var survivorsLeft = gameState.players.filter(function(p) { return !p.isZombie; }).length;
    room.sendAnnouncement('🧟 ' + player.name + ' fue convertido en ZOMBIE! (' + survivorsLeft + ' supervivientes)', null, 0xFF0000, 'bold');

    // Si ya no quedan supervivientes, ganan los zombies originales
    if (survivorsLeft === 0) {
        zombiesWin(room);
    }
}

function survivorsWin(room) {
    if (!gameState.active) return;
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }
    for (var t = 0; t < gameState.timeouts.length; t++) { clearTimeout(gameState.timeouts[t]); }
    gameState.timeouts = [];

    var survivors = gameState.players.filter(function(p) { return !p.isZombie; });

    if (survivors.length === 0) {
        zombiesWin(room);
        return;
    }

    var names = survivors.map(function(p) { return p.name; }).join(', ');
    room.sendAnnouncement(
        '\n⏰ SE ACABO EL TIEMPO!\n🏆 SUPERVIVIENTES GANAN: ' + names + '!',
        null, 0x00FF00, 'bold', 2
    );

    // Ganador aleatorio entre los supervivientes
    var winner = survivors[Math.floor(Math.random() * survivors.length)];
    room.sendAnnouncement('🎰 Ganador del Lucky: ' + winner.name, null, 0xFFD700, 'bold');

    var cb = gameState.callback;
    setTimeout(function() {
        try { room.stopGame(); } catch(e) {}
        if (cb) cb({ id: winner.id, name: winner.name });
    }, 3000);
}

function zombiesWin(room) {
    if (!gameState.active) return;
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }
    for (var t = 0; t < gameState.timeouts.length; t++) { clearTimeout(gameState.timeouts[t]); }
    gameState.timeouts = [];

    var origZombies = gameState.players.filter(function(p) { return p.isOriginalZombie; });
    var names = origZombies.map(function(p) { return p.name; }).join(' y ');

    room.sendAnnouncement(
        '\n🧟 TODOS FUERON CONVERTIDOS!\n💀 Gana el zombie original: ' + names,
        null, 0xFF0000, 'bold', 2
    );

    // Ganador aleatorio entre los zombies originales
    var winner = origZombies[Math.floor(Math.random() * origZombies.length)];

    var cb = gameState.callback;
    setTimeout(function() {
        try { room.stopGame(); } catch(e) {}
        if (cb) cb({ id: winner.id, name: winner.name });
    }, 3000);
}

function onPlayerJoin(room, player) {
    if (!gameState.active) return;
    // Nuevo jugador entra durante partida activa: se une como zombie
    gameState.players.push({
        id: player.id,
        name: player.name,
        isZombie: true,
        isOriginalZombie: false
    });
    try { room.setPlayerTeam(player.id, 2); } catch(e) {}
    room.sendAnnouncement('🧟 ' + player.name + ' se unio como ZOMBIE!', null, 0xFF0000, 'bold');
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;

    var p = null;
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].id === player.id) { p = gameState.players[i]; break; }
    }
    if (!p) return;

    // Quitar del array
    gameState.players.splice(gameState.players.indexOf(p), 1);
    room.sendAnnouncement('🚪 ' + p.name + ' se desconecto', null, 0xFF6600);

    var survivors = gameState.players.filter(function(x) { return !x.isZombie; });
    var zombies = gameState.players.filter(function(x) { return x.isZombie; });

    // Si no quedan zombies, los supervivientes ganan
    if (zombies.length === 0 && survivors.length > 0) {
        survivorsWin(room);
        return;
    }

    // Si no quedan supervivientes, zombies ganan
    if (survivors.length === 0 && zombies.length > 0) {
        zombiesWin(room);
        return;
    }

    // Si queda menos de 2 jugadores total, cancelar
    if (gameState.players.length < 2) {
        gameState.active = false;
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }
        var cb = gameState.callback;
        try { room.stopGame(); } catch(e) {}
        if (cb) cb(null);
    }
}

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    if (gameState.gameTimer) { clearTimeout(gameState.gameTimer); gameState.gameTimer = null; }
    for (var i = 0; i < gameState.timeouts.length; i++) { clearTimeout(gameState.timeouts[i]); }
    gameState.timeouts = [];
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.callback = null;
    try { room.stopGame(); } catch(e) {}
}

function isActive() { return gameState.active; }

module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerJoin: onPlayerJoin,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};
