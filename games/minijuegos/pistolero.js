// ============================================
// MINIJUEGO: PISTOLERO - Juego de disparo por turnos
// Un jugador aleatorio recibe el arma, elige a quién disparar.
// 80% de acertar (elimina), 20% sin balas (falla).
// Últimos 2 van a final 1v1 (Air Hockey o Dominic Survivor).
// ============================================

var mapData = null;
var _room = null;

var gameState = {
    active: false,
    phase: null,        // 'setup', 'shoot', 'between', 'finale'
    players: [],        // [{id, name, number, alive}]
    shooterId: null,
    phaseTimer: null,
    timeouts: [],
    activePlayers: {},
    onGameEnd: null
};

var config = {
    minPlayers: 4,
    shootTimeMs: 10000,
    hitChance: 0.80,
    setupMs: 5000
};

// ============================================
// HELPERS
// ============================================
function getAlivePlayers() {
    return gameState.players.filter(function(p) { return p.alive; });
}

function findPlayerById(id) {
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].id === id) return gameState.players[i];
    }
    return null;
}

function findPlayerByNumber(num) {
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].number === num) return gameState.players[i];
    }
    return null;
}

function clearAllTimeouts() {
    if (gameState.phaseTimer) { clearTimeout(gameState.phaseTimer); gameState.phaseTimer = null; }
    for (var i = 0; i < gameState.timeouts.length; i++) {
        clearTimeout(gameState.timeouts[i]);
    }
    gameState.timeouts = [];
}

function pickRandomAlive(excludeIds) {
    var candidates = getAlivePlayers().filter(function(p) {
        return excludeIds.indexOf(p.id) === -1;
    });
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
}

// ============================================
// START
// ============================================
function start(room, onGameEnd) {
    if (gameState.active) return;
    _room = room;

    // Excluir jugadores que fueron enviados a spec (AFK excluidos por el sistema global)
    var allPlayers = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (allPlayers.length < config.minPlayers) {
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.onGameEnd = onGameEnd;
    gameState.timeouts = [];
    gameState.activePlayers = {};
    gameState.phase = 'setup';
    gameState.shooterId = null;

    try {
        if (mapData) room.setCustomStadium(mapData);
    } catch(e) { console.error('PISTOLERO: error cargando mapa', e && e.message); }

    // Shuffle players
    for (var i = allPlayers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = allPlayers[i]; allPlayers[i] = allPlayers[j]; allPlayers[j] = tmp;
    }

    // Assign alternating teams
    for (var k = 0; k < allPlayers.length; k++) {
        try { room.setPlayerTeam(allPlayers[k].id, (k % 2 === 0) ? 1 : 2); } catch(e) {}
    }

    // Assign numbers
    gameState.players = [];
    for (var n = 0; n < allPlayers.length; n++) {
        gameState.players.push({
            id: allPlayers[n].id,
            name: allPlayers[n].name,
            number: n + 1,
            alive: true
        });
        gameState.activePlayers[allPlayers[n].id] = true;
    }

    room.startGame();

    room.sendAnnouncement(
        '\n🔫 MINIJUEGO: PISTOLERO\n👥 Jugadores: ' + allPlayers.length +
        '\n🎯 Un arma, un disparo por turno. 80% de acertar.',
        null, 0xFF4500, 'bold', 2
    );

    var listParts = [];
    for (var l = 0; l < gameState.players.length; l++) {
        listParts.push(gameState.players[l].number + '.' + gameState.players[l].name);
    }
    room.sendAnnouncement('📋 ' + listParts.join(' | '), null, 0x00BFFF);

    room.sendAnnouncement(
        '📋 REGLAS: Cada turno, un jugador recibe el arma y dispara a otro.\n' +
        '🎯 80% probabilidad de ELIMINAR, 20% de FALLAR.\n' +
        '⚔️ Los últimos 2 jugadores van a un 1v1 final!\n' +
        '⏱️ Comienza en 5 segundos...',
        null, 0xFFFF00, 'bold'
    );

    var t = setTimeout(function() {
        if (!gameState.active) return;
        var firstShooter = pickRandomAlive([]);
        if (!firstShooter) { endGame(null); return; }
        startShootPhase(room, firstShooter.id);
    }, config.setupMs);
    gameState.timeouts.push(t);
}

// ============================================
// SHOOT PHASE
// ============================================
function startShootPhase(room, shooterId) {
    if (!gameState.active) return;

    var shooter = findPlayerById(shooterId);
    if (!shooter || !shooter.alive) {
        var newShooter = pickRandomAlive([]);
        if (!newShooter) { endGame(null); return; }
        shooter = newShooter;
    }

    gameState.phase = 'shoot';
    gameState.shooterId = shooter.id;

    var targets = getAlivePlayers().filter(function(p) { return p.id !== shooter.id; });

    room.sendAnnouncement(
        '\n🔫 ' + shooter.name + ' tiene el arma! Tiene 10s para elegir a quién disparar',
        null, 0xFF4500, 'bold', 2
    );

    var targetParts = [];
    for (var i = 0; i < targets.length; i++) {
        targetParts.push(targets[i].number + '.' + targets[i].name);
    }
    room.sendAnnouncement('🎯 ' + targetParts.join(' | '), null, 0x00BFFF);

    room.sendAnnouncement(
        '🔫 Escribe el NÚMERO del jugador al que quieres disparar!',
        shooter.id, 0xFF0000, 'bold'
    );

    gameState.phaseTimer = setTimeout(function() {
        if (!gameState.active || gameState.phase !== 'shoot') return;
        var currentTargets = getAlivePlayers().filter(function(p) { return p.id !== gameState.shooterId; });
        if (currentTargets.length === 0) { endGame(null); return; }
        var randomTarget = currentTargets[Math.floor(Math.random() * currentTargets.length)];
        room.sendAnnouncement('⏰ No eligió a tiempo. Disparo aleatorio...', null, 0xFF6600);
        resolveShot(room, randomTarget);
    }, config.shootTimeMs);
    gameState.timeouts.push(gameState.phaseTimer);
}

// ============================================
// PROCESS CHAT
// ============================================
function processShootChoice(room, player, message) {
    if (gameState.phase !== 'shoot' || player.id !== gameState.shooterId) return;

    var num = parseInt(message.trim());
    if (isNaN(num)) return;

    var target = findPlayerByNumber(num);
    if (!target || !target.alive || target.id === gameState.shooterId) {
        room.sendAnnouncement('⚠️ Número inválido. Elige un jugador vivo.', player.id, 0xFF6600);
        return;
    }

    if (gameState.phaseTimer) {
        clearTimeout(gameState.phaseTimer);
        gameState.phaseTimer = null;
    }

    resolveShot(room, target);
}

// ============================================
// RESOLVE SHOT
// ============================================
function resolveShot(room, target) {
    if (!gameState.active) return;
    gameState.phase = 'between';

    var shooter = findPlayerById(gameState.shooterId);
    if (!shooter) { endGame(null); return; }

    var hit = Math.random() < config.hitChance;

    if (hit) {
        target.alive = false;
        room.sendAnnouncement(
            '\n💀 ' + shooter.name + ' disparó a ' + target.name + ' y lo ELIMINÓ!',
            null, 0xFF0000, 'bold', 2
        );
        try { room.setPlayerTeam(target.id, 0); } catch(e) {}
    } else {
        room.sendAnnouncement(
            '\n💨 ' + shooter.name + ' disparó a ' + target.name + ' pero NO TENÍA BALAS!',
            null, 0x00FF00, 'bold', 2
        );

        // Ricochet: 30% chance on miss
        if (Math.random() < 0.30) {
            var ricochetCandidates = getAlivePlayers().filter(function(p) {
                return p.id !== shooter.id && p.id !== target.id;
            });
            if (ricochetCandidates.length > 0) {
                var ricochetTarget = ricochetCandidates[Math.floor(Math.random() * ricochetCandidates.length)];
                ricochetTarget.alive = false;
                room.sendAnnouncement(
                    '🔄 La bala rebotó y le dio a ' + ricochetTarget.name + '! ELIMINADO!',
                    null, 0xFF6600, 'bold', 2
                );
                try { room.setPlayerTeam(ricochetTarget.id, 0); } catch(e) {}
            }
        }
    }

    var alive = getAlivePlayers();
    if (alive.length <= 1) {
        if (alive.length === 1) {
            endGame({ id: alive[0].id, name: alive[0].name });
        } else {
            endGame(null);
        }
        return;
    }

    // Últimos 2 → 1v1 final (Air Hockey / Dominic Survivor)
    if (alive.length === 2) {
        startFinale(_room, alive[0], alive[1]);
        return;
    }

    // Next shooter: random alive, not same shooter, not target
    var excludeIds = [shooter.id];
    if (target.alive) excludeIds.push(target.id);
    var nextShooter = pickRandomAlive(excludeIds);
    if (!nextShooter) nextShooter = pickRandomAlive([shooter.id]);
    if (!nextShooter) {
        endGame({ id: shooter.id, name: shooter.name });
        return;
    }

    room.sendAnnouncement('💬 Pueden hablar... Siguiente turno en 5s', null, 0xAAAAAA);

    var t = setTimeout(function() {
        if (!gameState.active) return;
        startShootPhase(room, nextShooter.id);
    }, 5000);
    gameState.timeouts.push(t);
}

// ============================================
// 1v1 FINALE
// ============================================
function startFinale(room, player1data, player2data) {
    gameState.phase = 'finale';

    room.sendAnnouncement(
        '\n⚔️ FINAL 1v1: ' + player1data.name + ' vs ' + player2data.name + '!',
        null, 0xFFD700, 'bold', 2
    );

    var p1 = _room.getPlayer(player1data.id);
    var p2 = _room.getPlayer(player2data.id);
    if (!p1 || !p2) {
        if (p1) { endGame({ id: p1.id, name: p1.name }); }
        else if (p2) { endGame({ id: p2.id, name: p2.name }); }
        else { endGame(null); }
        return;
    }

    var finaleGames = [];
    if (typeof DOMINIC_SURVIVOR !== 'undefined') finaleGames.push(DOMINIC_SURVIVOR);
    if (typeof AIR_HOCKEY !== 'undefined') finaleGames.push(AIR_HOCKEY);

    if (finaleGames.length === 0) {
        var coin = Math.random() < 0.5 ? p1 : p2;
        endGame({ id: coin.id, name: coin.name });
        return;
    }

    var chosenFinale = finaleGames[Math.floor(Math.random() * finaleGames.length)];

    var t = setTimeout(function() {
        if (!gameState.active) return;
        try { _room.stopGame(); } catch(e) {}

        chosenFinale.start(_room, p1, p2, function(winner) {
            if (winner) {
                endGame(winner);
            } else {
                endGame(null);
            }
        });
    }, 2000);
    gameState.timeouts.push(t);
}

// ============================================
// END GAME
// ============================================
function endGame(winner) {
    gameState.phase = null;
    clearAllTimeouts();

    var callback = gameState.onGameEnd;
    gameState.onGameEnd = null;
    gameState.active = false;

    if (winner) {
        _room.sendAnnouncement(
            '\n🏆 ' + winner.name + ' GANA PISTOLERO!',
            null, 0xFFD700, 'bold', 2
        );
    }

    setTimeout(function() {
        try { _room.stopGame(); } catch(e) {}
        if (callback) callback(winner);
    }, 3000);
}

// ============================================
// CHAT HANDLER
// ============================================
function onPlayerChat(player, message) {
    if (!gameState.active) return true;

    if (gameState.phase === 'setup') return false;

    if (gameState.phase === 'shoot') {
        if (player.id === gameState.shooterId && gameState.activePlayers[player.id]) {
            processShootChoice(_room, player, message);
        }
        return false;
    }

    if (gameState.phase === 'finale') return true;

    return true;
}

// ============================================
// PLAYER LEAVE
// ============================================
function onPlayerLeave(room, player) {
    if (!gameState.active) return;

    var p = findPlayerById(player.id);
    if (!p || !p.alive) return;

    p.alive = false;
    room.sendAnnouncement('🚪 ' + p.name + ' se desconectó', null, 0xFF6600);

    var alive = getAlivePlayers();

    if (gameState.phase === 'setup') {
        if (alive.length < config.minPlayers) {
            room.sendAnnouncement('❌ No hay suficientes jugadores. Juego cancelado.', null, 0xFF0000, 'bold', 2);
            clearAllTimeouts();
            gameState.phase = null;
            gameState.active = false;
            var cb = gameState.onGameEnd;
            gameState.onGameEnd = null;
            try { room.stopGame(); } catch(e) {}
            if (cb) cb(null);
            return;
        }
    }

    if (alive.length <= 1) {
        if (alive.length === 1) {
            endGame({ id: alive[0].id, name: alive[0].name });
        } else {
            endGame(null);
        }
        return;
    }

    // Si el shooter se desconectó, pasar arma a otro
    if (gameState.phase === 'shoot' && player.id === gameState.shooterId) {
        if (gameState.phaseTimer) { clearTimeout(gameState.phaseTimer); gameState.phaseTimer = null; }
        var nextShooter = pickRandomAlive([]);
        if (nextShooter) {
            room.sendAnnouncement('🔫 El tirador se fue! El arma pasa a ' + nextShooter.name, null, 0xFF6600, 'bold');
            var t = setTimeout(function() {
                if (!gameState.active) return;
                startShootPhase(room, nextShooter.id);
            }, 2000);
            gameState.timeouts.push(t);
        }
    }
}

// ============================================
// STOP / UTILS
// ============================================
function stop(room) {
    clearAllTimeouts();
    gameState.active = false;
    gameState.phase = null;
    gameState.players = [];
    gameState.activePlayers = {};
    gameState.shooterId = null;
    gameState.onGameEnd = null;
    try { room.stopGame(); } catch(e) {}
}

function setMapData(m) { mapData = m; }

function isActive() { return gameState.active; }

module.exports = {
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: setMapData,
    isActive: isActive
};
