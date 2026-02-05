// ============================================
// MINIJUEGO: LALALA - Esquiva las bolas
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
    fallY: 220,        // Y > 220 = cayó
    ballHitY: -230     // Y < -230 = golpeado por bolas
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('🎮 LALALA - Iniciando juego...');
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
        "🎮 LALALA - ESQUIVA LAS BOLAS 🎮\n" +
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
            "⚠️ Evita caer de la plataforma del medio\n" +
            "🔵 Esquiva las bolas azules que se mueven\n" +
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
        
        // Detectar si fue golpeado por las bolas (teleportado muy arriba)
        if (pos.y < config.ballHitY) {
            eliminated = true;
            reason = "fue tocado por las bolas";
            console.log("💥 " + p.name + " tocó las bolas - Y: " + pos.y.toFixed(0));
        }
        
        // Detectar caída
        if (pos.y > config.fallY) {
            eliminated = true;
            reason = "cayó";
            console.log("💀 " + p.name + " cayó - Y: " + pos.y.toFixed(0));
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
        room.sendAnnouncement("❌ No hay ganador - todos cayeron", null, 0xFF0000);
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
    }
}

function onPlayerChat(player) {
    if (gameState.chatBlocked) {
        return false;
    }
    return true;
}

// ============================================
// EXPORTAR
// ============================================
module.exports = {
    config,
    start,
    stop,
    onPlayerLeave,
    onPlayerChat,
    isActive: () => gameState.active
};
