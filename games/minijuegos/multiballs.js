// ============================================
// MULTIBALLS SURVIVAL - EVITA LOS BORDES
// ============================================

// NOTA: El mapa será inyectado por bot.js
// No se carga aquí para evitar problemas con fs en el contexto del navegador
// ⚠️ IMPORTANTE: mapData debe ser una STRING JSON, no un objeto JavaScript
// Haxball's room.setCustomStadium() requiere string JSON
let mapData = null; // Será inyectado desde bot.js como string JSON

const fs = require('fs');
const path = require('path');

// Estado del juego
const gameState = {
    active: false,
    paused: false,
    players: new Map(),
    checkInterval: null,
    callback: null,
    explanationPhase: false,
    chatBlocked: false
};

// Configuración
const config = {
    // Bordes del área de juego (interior gray walls)
    minX: -417.5,
    maxX: 417.5,
    minY: -197.5,
    maxY: 197.5,
    
    // Tolerancia para evitar eliminación prematura
    tolerance: 5,
    
    checkIntervalMs: 100,
    countdownSeconds: 10,
    explanationDuration: 8000,
    winnerAnnouncementDelay: 2000
};

// Ajustar límites con tolerancia (más estrictos)
const adjustedLimits = {
    minX: config.minX + config.tolerance,  // -412.5
    maxX: config.maxX - config.tolerance,  // 412.5
    minY: config.minY + config.tolerance,  // -192.5
    maxY: config.maxY - config.tolerance   // 192.5
};

function isActive() {
    return gameState.active;
}

function start(room, callback) {
    if (gameState.active) {
        console.log('[MULTIBALLS] Ya está activo');
        return;
    }

    console.log('🎮 MULTIBALLS - Iniciando juego...');
    console.log('📊 Jugadores:', room.getPlayerList().filter(p => p.id !== 0).length);
    
    // Cargar mapa
    try {
        console.log('🗺️ Cargando mapa..., tipo:', typeof mapData);
        if (!mapData) {
            console.error('❌ mapData es null o undefined!');
            return;
        }
        
        room.setCustomStadium(mapData);
        console.log('✅ Mapa cargado');
    } catch (e) {
        console.error('❌ Error al cargar mapa:', e.message);
        return;
    }
    
    // Revolver y asignar equipos
    try {
        shuffleTeams(room);
        console.log('✅ Equipos asignados');
    } catch (e) {
        console.error('❌ Error al asignar equipos:', e.message);
        return;
    }

    gameState.active = true;
    gameState.paused = true;
    gameState.callback = callback;
    gameState.players.clear();
    gameState.explanationPhase = true;

    // Obtener jugadores actuales (excluyendo ID 0)
    const playerList = room.getPlayerList().filter(p => p.id !== 0);
    
    playerList.forEach(player => {
        gameState.players.set(player.id, {
            id: player.id,
            name: player.name,
            alive: true
        });
    });

    console.log(`[MULTIBALLS] ${gameState.players.size} jugadores registrados`);

    if (gameState.players.size < 2) {
        room.sendAnnouncement('⚠️ Se necesitan al menos 2 jugadores para MULTIBALLS', null, 0xFF6347, 'bold', 2);
        stop(room);
        return;
    }
    
    room.sendAnnouncement(
        "🎮 MULTIBALLS - EVITA LOS BORDES 🎮\n" +
        "👥 Jugadores: " + gameState.players.size,
        null,
        0x00BFFF,
        "bold",
        2
    );

    // Iniciar juego y pausar
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        // Explicación
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "⚠️ Empuja la bola del medio para que rebote\n" +
            "🔵 Las bolas grises te empujarán\n" +
            "🚫 NO TOQUES LOS BORDES GRISES\n" +
            "🏆 Si tocas un borde: ¡ELIMINADO!\n\n" +
            "⏱️ El juego comenzará en 5 segundos...",
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        setTimeout(() => {
            gameState.explanationPhase = false;
            gameState.chatBlocked = false;
            room.pauseGame(false);
            room.sendAnnouncement(
                "🟢 ¡COMIENZA!",
                null,
                0x00FF00,
                "bold",
                2
            );
            unpause(room);
        }, 5000);
    }, 1500);
}

function unpause(room) {
    if (!gameState.active) return;

    gameState.paused = false;

    console.log('[MULTIBALLS] Juego reanudado, iniciando verificación');

    // Esperar un momento antes de comenzar las verificaciones
    setTimeout(() => {
        if (gameState.active && !gameState.paused) {
            startChecking(room);
        }
    }, 500);
}

function startChecking(room) {
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
    }

    gameState.checkInterval = setInterval(() => {
        if (!gameState.active || gameState.paused || gameState.explanationPhase) return;
        checkPlayers(room);
    }, config.checkIntervalMs);

    console.log('[MULTIBALLS] Verificación de jugadores iniciada');
}

function checkPlayers(room) {
    const playerList = room.getPlayerList().filter(p => p.id !== 0);
    
    playerList.forEach(player => {
        const playerData = gameState.players.get(player.id);
        if (!playerData || !playerData.alive) return;

        const pos = player.position;
        if (!pos) return;

        // Verificar si tocó los bordes (fuera del área permitida)
        const touchedBorder = 
            pos.x <= adjustedLimits.minX ||
            pos.x >= adjustedLimits.maxX ||
            pos.y <= adjustedLimits.minY ||
            pos.y >= adjustedLimits.maxY;

        if (touchedBorder) {
            eliminatePlayer(room, player);
        }
    });

    // Verificar ganador
    const alivePlayers = Array.from(gameState.players.values()).filter(p => p.alive);
    
    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0]);
    } else if (alivePlayers.length === 0) {
        room.sendAnnouncement('⚠️ No hay ganador en MULTIBALLS', null, 0xFF6347, 'bold', 2);
        stop(room);
    }
}

function eliminatePlayer(room, player) {
    const playerData = gameState.players.get(player.id);
    if (!playerData || !playerData.alive) return;

    playerData.alive = false;
    // Pasar a espectador
    room.setPlayerTeam(player.id, 0);
    const alivePlayers = Array.from(gameState.players.values()).filter(p => p.alive);
    room.sendAnnouncement(
        `💀 ${player.name} tocó los bordes y ha sido eliminado! (${alivePlayers.length} restantes)`,
        null,
        0xFF6347,
        'bold',
        2
    );
    console.log(`[MULTIBALLS] ${player.name} eliminado (${alivePlayers.length} restantes)`);
}

function declareWinner(room, winner) {
    if (!gameState.active) return;

    console.log(`[MULTIBALLS] Ganador: ${winner.name}`);

    // Pausar verificaciones
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }

    room.sendAnnouncement('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', null, 0xFFD700, 'bold', 2);
    room.sendAnnouncement(`🏆 ¡${winner.name} ha ganado MULTIBALLS! 🏆`, null, 0xFFD700, 'bold', 2);
    room.sendAnnouncement('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', null, 0xFFD700, 'bold', 2);

    setTimeout(() => {
        const winnerObject = { id: winner.id, name: winner.name };
        const callback = gameState.callback;
        stop(room);
        
        if (callback) {
            callback(winnerObject);
        }
    }, config.winnerAnnouncementDelay);
}

function stop(room) {
    if (!gameState.active) return;

    console.log('[MULTIBALLS] Deteniendo juego');

    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }

    gameState.active = false;
    gameState.paused = false;
    gameState.players.clear();
    gameState.explanationPhase = false;

    const callback = gameState.callback;
    gameState.callback = null;

    if (callback) {
        callback(null);
    }
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;

    const playerData = gameState.players.get(player.id);
    if (!playerData) return;

    console.log(`[MULTIBALLS] Jugador salió: ${player.name}`);
    
    playerData.alive = false;

    const alivePlayers = Array.from(gameState.players.values()).filter(p => p.alive);

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0]);
    } else if (alivePlayers.length === 0) {
        room.sendAnnouncement('⚠️ No quedan jugadores en MULTIBALLS', null, 0xFF6347, 'bold', 2);
        stop(room);
    }
}

function onPlayerChat(player) {
    // Permitir chat cuando no está activo
    if (!gameState.active) return true;
    
    // Bloquear chat durante explicación
    if (gameState.chatBlocked) {
        return false;
    }
    
    return true;
}

// ============================================
// UTILIDADES
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    
    // Revolver array
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    
    // Asignar equipos
    var halfPoint = Math.floor(players.length / 2);
    
    for (var i = 0; i < players.length; i++) {
        if (i < halfPoint) {
            room.setPlayerTeam(players[i].id, 1);
        } else {
            room.setPlayerTeam(players[i].id, 2);
        }
    }
}

module.exports = {
    isActive,
    start,
    stop,
    onPlayerLeave,
    onPlayerChat
};
