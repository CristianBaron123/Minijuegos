// ============================================
// MINIJUEGO: METEORS SURVIVAL - Esquiva los meteoritos
// ============================================

// NOTA: El mapa será inyectado por bot.js
// No se carga aquí para evitar problemas con fs en el contexto del navegador
// ⚠️ IMPORTANTE: mapData debe ser una STRING JSON, no un objeto JavaScript
// Haxball's room.setCustomStadium() requiere string JSON
let mapData = null; // Será inyectado desde bot.js como string JSON

// Estado del juego
let gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false
};

// Configuración
const config = {
    minPlayers: 2,
    outOfBoundsDistance: 350  // Si |X| > 350 o |Y| > 350 = fuera del mapa
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('☄️ METEORS - Iniciando juego...');
    console.log('📊 Jugadores:', room.getPlayerList().filter(p => p.id !== 0).length);
    
    room.setCustomStadium(mapData);
    console.log('✅ Mapa cargado');
    
    // Revolver y asignar equipos
    shuffleTeams(room);
    console.log('✅ Equipos asignados');
    
    gameState.active = true;
    gameState.players = room.getPlayerList().filter(p => p.id !== 0);
    gameState.eliminated = [];
    
    // Mover a espectador a los jugadores que deben estar en spectator
    botState.spectatorNext.forEach(function(playerId) {
        var player = room.getPlayer(playerId);
        if (player) {
            room.setPlayerTeam(playerId, 0);
            room.sendAnnouncement(
                "👻 " + player.name + " debe esperar este minijuego",
                null,
                0xFF6600,
                "bold"
            );
        }
    });
    // Limpiar la lista después de aplicar
    botState.spectatorNext = [];
    
    room.sendAnnouncement(
        "🎮 METEORS SURVIVAL 🎮\n" +
        "👥 Jugadores: " + gameState.players.length,
        null,
        0x8B4513,
        "bold",
        2
    );
    
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "☄️ Esquiva los meteoritos negros que se mueven\n" +
            "⚠️ Puedes tocarlos a veces, pero cuidado!\n" +
            "🚫 Si te empujan fuera del área, quedas ELIMINADO\n" +
            "🏆 El último jugador dentro del área gana!\n\n" +
            "⏱️ El juego comenzará en 5 segundos...",
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        setTimeout(() => {
            room.pauseGame(false);
            gameState.chatBlocked = false;
            room.sendAnnouncement(
                "🟢 ¡COMIENZA!",
                null,
                0x00FF00,
                "bold",
                2
            );
        }, 5000);
    }, 1500);
    
    // Esperar 8 segundos antes de empezar a verificar
    setTimeout(() => {
        gameState.checkInterval = setInterval(() => checkPlayers(room, onGameEnd), 100);
    }, 8500);
}

// ============================================
// VERIFICAR JUGADORES
// ============================================
function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;
    
    const alivePlayers = [];
    
    gameState.players.forEach(p => {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;
        
        const player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement("❌ " + p.name + " se desconectó", null, 0xFF6600);
            return;
        }
        
        const pos = player.position;
        if (!pos) return;
        
        // Verificar si está fuera de los límites
        const outOfBounds = Math.abs(pos.x) > config.outOfBoundsDistance || 
                           Math.abs(pos.y) > config.outOfBoundsDistance;
        
        if (outOfBounds && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            room.setPlayerTeam(p.id, 0);
            
            const remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                "☄️ " + p.name + " fue expulsado fuera del área! (" + remaining + " restantes)",
                null,
                0xFF6600
            );
        } else if (!outOfBounds) {
            alivePlayers.push(p);
        }
    });
    
    // Verificar condiciones de victoria
    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement("❌ No hay ganador - todos fueron expulsados", null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    room.sendAnnouncement(
        "\n🏆 ¡¡¡" + winner.name.toUpperCase() + " HA GANADO!!! 🏆\n",
        null,
        0xFFD700,
        "bold",
        2
    );
    
    setTimeout(() => {
        if (onGameEnd) {
            onGameEnd(winner);
        }
    }, 3000);
}

// ============================================
// REVOLVER Y ASIGNAR EQUIPOS
// ============================================
function shuffleTeams(room) {
    const players = room.getPlayerList().filter(p => p.id !== 0);
    
    // Algoritmo de Fisher-Yates para revolver array
    for (let i = players.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [players[i], players[j]] = [players[j], players[i]];
    }
    
    // Dividir en dos equipos
    const halfPoint = Math.floor(players.length / 2);
    
    players.forEach((player, index) => {
        if (index < halfPoint) {
            room.setPlayerTeam(player.id, 1);  // Equipo rojo
        } else {
            room.setPlayerTeam(player.id, 2);  // Equipo azul
        }
    });
}

// ============================================
// DETENER JUEGO
// ============================================
function stop(room) {
    gameState.active = false;
    
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    gameState.players = [];
    gameState.eliminated = [];
    
    room.stopGame();
}

// ============================================
// EVENTOS
// ============================================
function onPlayerLeave(room, player) {
    if (gameState.active && gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
    }
}

function onPlayerChat(player) {
    if (gameState.chatBlocked) {
        return false;
    }
    return true;
}

function isActive() {
    return gameState.active;
}

// ============================================
// EXPORTAR
// ============================================
module.exports = {
    config: config,
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    isActive: isActive
};
