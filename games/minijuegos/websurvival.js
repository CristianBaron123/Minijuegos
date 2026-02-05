// ============================================
// MINIJUEGO: WEB SURVIVAL - Aguanta en la telaraña
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
    // Zona de respawn izquierda: x = -500, desde y = -522 hasta y = 500
    respawnLeftX: -500,
    respawnLeftMinY: -522,
    respawnLeftMaxY: 500,
    // Zona de respawn arriba: y = -525, desde x = -15000 hasta x = 1000
    respawnTopY: -525,
    respawnTopMinX: -15000,
    respawnTopMaxX: 1000
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('🎮 WEB SURVIVAL - Iniciando juego...');
    console.log('📊 Jugadores:', room.getPlayerList().filter(p => p.id !== 0).length);
    
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
    gameState.players = room.getPlayerList().filter(p => p.id !== 0);
    gameState.eliminated = [];
    
    room.sendAnnouncement(
        "🎮 WEB SURVIVAL - ¡AGUANTA EN LA TELARAÑA! 🎮\n" +
        "👥 Jugadores: " + gameState.players.length,
        null,
        0x00BFFF,
        "bold",
        2
    );
    
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "⚠️ Aguanta en la telaraña central\n" +
            "🕷️ NO toques las arañas ni los bordes\n" +
            "❌ Si te mandan fuera y reapareces, quedas ELIMINADO\n" +
            "🏆 El último jugador que sobreviva gana!\n\n" +
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
        
        // Detectar si llegó a la zona de respawn izquierda
        // x < -500 (más a la izquierda de -500), desde y = -522 hasta y = 500
        if (pos.x < config.respawnLeftX && 
            pos.y >= config.respawnLeftMinY && 
            pos.y <= config.respawnLeftMaxY) {
            eliminated = true;
            reason = "fue mandado fuera de la telaraña (izquierda)";
            console.log("💀 " + p.name + " llegó al respawn izquierdo - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
        }
        
        // Detectar si llegó a la zona de respawn arriba
        // y < -525 (más arriba de -525), desde x = -15000 hasta x = 1000
        if (!eliminated && 
            pos.y < config.respawnTopY && 
            pos.x >= config.respawnTopMinX && 
            pos.x <= config.respawnTopMaxX) {
            eliminated = true;
            reason = "fue mandado fuera de la telaraña (arriba)";
            console.log("💀 " + p.name + " llegó al respawn superior - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
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
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    room.sendAnnouncement(
        "\n🏆 ¡" + winner.name.toUpperCase() + " HA GANADO! 🏆\n",
        null,
        0xFFD700,
        "bold",
        2
    );
    
    // Notificar al bot principal que hay un ganador
    setTimeout(() => {
        if (onGameEnd) {
            onGameEnd(winner);
        }
    }, 3000);
}

// ============================================
// REVOLVER EQUIPOS
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
        
        var remaining = gameState.players.length - gameState.eliminated.length;
        room.sendAnnouncement(
            "❌ " + player.name + " se fue (" + remaining + " restantes)",
            null,
            0xFF6600
        );
    }
}

function onPlayerChat(room, player, message) {
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
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerChat: onPlayerChat,
    onPlayerLeave: onPlayerLeave
};
