// ============================================
// MINIJUEGO: SURVIVAL ROOM - Evita los bordes
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
    outOfBoundsDistance: 320  // Si X o Y > 320 = fuera del mapa
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('🔴 SURVIVAL - Iniciando juego...');
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
        "🎮 SURVIVAL ROOM 🎮\n" +
        "👥 Jugadores: " + gameState.players.length,
        null,
        0xFF0000,
        "bold",
        2
    );
    
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "⚠️ Evita tocar los bordes negros\n" +
            "🔴 Los discos negros te empujarán fuera del mapa\n" +
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
    
    var alivePlayers = [];
    
    gameState.players.forEach(p => {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;
        
        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement("❌ " + p.name + " se desconectó", null, 0xFF6600);
            return;
        }
        
        var pos = player.position;
        if (!pos) return;
        
        var eliminated = false;
        var reason = "";
        
        // Detectar si salió del área (empujado por los discos negros)
        if (Math.abs(pos.x) > config.outOfBoundsDistance || Math.abs(pos.y) > config.outOfBoundsDistance) {
            eliminated = true;
            reason = "salió del área";
            console.log("💀 " + p.name + " salió del área - X: " + pos.x.toFixed(0) + ", Y: " + pos.y.toFixed(0));
        }
        
        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            room.setPlayerTeam(p.id, 0);
            
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                "❌ " + p.name + " " + reason + "! (" + remaining + " restantes)",
                null,
                0xFF6600
            );
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });
    
    // Verificar ganador
    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement("❌ No hay ganador - todos fueron eliminados", null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner, onGameEnd) {
    if (!gameState.active) return;
    
    stop(room);
    
    room.sendAnnouncement(
        "\n🏆 ¡" + winner.name.toUpperCase() + " HA GANADO! 🏆\n",
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
// DETENER JUEGO
// ============================================
function stop(room) {
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    gameState.active = false;
    gameState.players = [];
    gameState.eliminated = [];
    gameState.chatBlocked = false;
}

// ============================================
// REVOLVER EQUIPOS
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    
    // Mover todos a espectadores primero
    players.forEach(p => room.setPlayerTeam(p.id, 0));
    
    // Revolver array
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    
    // Asignar equipos alternados
    players.forEach((p, index) => {
        var team = (index % 2 === 0) ? 1 : 2;
        room.setPlayerTeam(p.id, team);
    });
}

// ============================================
// VERIFICAR SI ESTÁ ACTIVO
// ============================================
function isActive() {
    return gameState.active;
}

// ============================================
// CHAT HANDLER
// ============================================
function onPlayerChat(player) {
    if (gameState.chatBlocked) {
        return false;
    }
    return true;
}

// ============================================
// PLAYER LEAVE HANDLER
// ============================================
function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    
    if (gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
    }
}

// ============================================
// EXPORTS
// ============================================
module.exports = {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerChat: onPlayerChat,
    onPlayerLeave: onPlayerLeave
};
