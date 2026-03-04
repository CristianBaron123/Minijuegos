// ============================================
// MINIJUEGO: GYM - Entra a los recuadros
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
    chatBlocked: false,
    gameStartTime: null
};

// Configuración
const config = {
    minPlayers: 2,
    // Zonas de respawn cuando tocan las bolas negras
    // Coordenadas exactas del mapa
    
    // Zona arriba: y <= -200, x entre -420 y 420
    respawnTopY: -200,
    respawnTopMinX: -420,
    respawnTopMaxX: 420,
    
    // Zona izquierda: x <= -420, y entre -200 y 200
    respawnLeftX: -420,
    respawnLeftMinY: -200,
    respawnLeftMaxY: 200,
    
    // Zona derecha: x >= 420, y entre -200 y 200
    respawnRightX: 420,
    respawnRightMinY: -200,
    respawnRightMaxY: 200,
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('🎮 GYM - Iniciando juego...');
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
    gameState.gameStartTime = null;
    
    room.sendAnnouncement(
        "🎮 GYM - ¡ENTRA A LOS RECUADROS! 🎮\n" +
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
            "⚠️ Entra a los recuadros para evitar las bolas negras\n" +
            "⚫ Si una bola negra te toca, serás eliminado\n" +
            "🔵 NO TOQUES LO AZUL!\n" +
            "💨 Cuidado: te deslizas muy rápido\n" +
            "🏆 El último jugador en pie gana!\n\n" +
            "⏱️ El juego comenzará en 5 segundos...",
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        setTimeout(() => {
            room.pauseGame(false);
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement(
                "🟢 ¡COMIENZA!",
                null,
                0x00FF00,
                "bold",
                2
            );

            // Iniciar verificación INMEDIATAMENTE cuando empieza el juego
            gameState.checkInterval = setInterval(() => checkPlayers(room, onGameEnd), 100);
        }, 5000);
    }, 1500);
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

        // Detectar si llegó a la zona de respawn arriba
        // y < -200 (más arriba de -200), x entre -420 y 420
        if (pos.y < config.respawnTopY && 
            pos.x >= config.respawnTopMinX && 
            pos.x <= config.respawnTopMaxX) {
            eliminated = true;
            reason = "fue tocado por una bola negra (arriba)";
            console.log("⚫ " + p.name + " tocado - respawn arriba - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
        }
        
        // Detectar si llegó a la zona de respawn izquierda
        // x < -420 (más a la izquierda de -420), y entre -200 y 200
        if (!eliminated && 
            pos.x < config.respawnLeftX && 
            pos.y >= config.respawnLeftMinY && 
            pos.y <= config.respawnLeftMaxY) {
            eliminated = true;
            reason = "fue tocado por una bola negra (izquierda)";
            console.log("⚫ " + p.name + " tocado - respawn izquierda - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
        }
        
        // Detectar si llegó a la zona de respawn derecha
        // x > 420 (más a la derecha de 420), y entre -200 y 200
        if (!eliminated && 
            pos.x > config.respawnRightX && 
            pos.y >= config.respawnRightMinY && 
            pos.y <= config.respawnRightMaxY) {
            eliminated = true;
            reason = "fue tocado por una bola negra (derecha)";
            console.log("⚫ " + p.name + " tocado - respawn derecha - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
        }

            // Detectar si llegó a la esquina superior-izquierda (fuera por la "L")
            // x < -420 y y < -200
            if (!eliminated && pos.x < config.respawnLeftX && pos.y < config.respawnTopY) {
                eliminated = true;
                reason = "fue tocado por una bola negra (esquina superior-izquierda)";
                console.log("⚫ " + p.name + " tocado - esquina superior-izquierda - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
            }

            // Detectar si llegó a la esquina superior-derecha (fuera por la "L" derecha)
            // x > 420 y y < -200
            if (!eliminated && pos.x > config.respawnRightX && pos.y < config.respawnTopY) {
                eliminated = true;
                reason = "fue tocado por una bola negra (esquina superior-derecha)";
                console.log("⚫ " + p.name + " tocado - esquina superior-derecha - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
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
        "\n🏆 ¡" + winner.name.toUpperCase() + " HA GANADO GYM! 🏆\n🎯 Ultimo jugador en pie!\n",
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
