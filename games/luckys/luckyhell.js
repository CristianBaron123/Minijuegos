// ============================================
// MÓDULO: LUCKY HELL MAP
// ============================================
// Mapa del infierno con 3 efectos mortales

var LUCKY_HELL = (function() {
    // Variables globales
    var mapLuckHell = null;
    
    // Configuración de colores y sus posiciones en las curvas (Y > 300)
    // Las curvas están distribuidas horizontalmente, alternando colores
    var colorZones = [
        // BAN (32FF - azul/cian) - Zonas en X donde está este color
        { name: 'BAN', color: '32FF', effect: 'ban_1min', minX: 40, maxX: 140, minY: 300 },
        { name: 'BAN', color: '32FF', effect: 'ban_1min', minX: 240, maxX: 340, minY: 300 },
        
        // PASS (FF3E - verde/rojo) - Zonas en X donde está este color
        { name: 'PASS', color: 'FF3E', effect: 'pass_hell', minX: 140, maxX: 240, minY: 300 },
        { name: 'PASS', color: 'FF3E', effect: 'pass_hell', minX: 340, maxX: 410, minY: 300 },
        
        // CLOSE ROOM (8B0000 - rojo oscuro) - Zona en X donde está este color
        { name: 'CLOSE ROOM', color: '8B0000', effect: 'close_room', minX: -20, maxX: 40, minY: 300 }
    ];
    
    var gameState = {
        active: false,
        winner: null,
        checkInterval: null,
        globalTimeout: null,
        detectionBuffer: [],
        lastDetectedZone: null,
        colorDetected: false,
        confirmationTime: 0,
        selectionActive: false,
        explanationPhase: false,
        selectionEffect: null,
        selectionTimeout: null,
        selectionReminderTimeout: null,
        playerList: [],
        room: null,
        callbacks: {
            onBanTemp: null,
            onGameEnd: null
        }
    };
    
    var config = {
        confirmationTime: 3000,  // 3 segundos para confirmar el color
        detectionInterval: 100,  // Revisar cada 100ms
        selectionTimeout: 10000,
        selectionReminder: 5000,
        maxGameTime: 60000  // 60 segundos máximo
    };
    
    // Detectar en qué color cayó la bola (en las curvas del fondo)
    function detectColor(room) {
        if (!gameState.active || gameState.colorDetected) return;
        
        var ballPos = room.getBallPosition();
        if (!ballPos) return;
        
        // Solo detectar cuando la bola está en la zona de las curvas (Y > 300)
        if (ballPos.y < 300) {
            // Resetear si sale de la zona
            gameState.lastDetectedZone = null;
            gameState.confirmationTime = 0;
            return;
        }
        
        var detectedZone = null;
        
        // Buscar en qué zona de color está la bola según su posición X e Y
        for (var i = 0; i < colorZones.length; i++) {
            var zone = colorZones[i];
            if (ballPos.x >= zone.minX && ballPos.x <= zone.maxX && ballPos.y >= zone.minY) {
                detectedZone = zone;
                break;
            }
        }
        
        if (detectedZone) {
            var currentTime = Date.now();
            
            // Si es la misma zona que antes, verificar tiempo
            if (gameState.lastDetectedZone === detectedZone.name) {
                if (currentTime - gameState.confirmationTime >= config.confirmationTime) {
                    // Confirmado! Estuvo 3 segundos en el mismo color
                    gameState.colorDetected = true;
                    console.log("🔥 Lucky Hell - Color confirmado: " + detectedZone.name + " en X=" + ballPos.x.toFixed(0) + " Y=" + ballPos.y.toFixed(0));
                    executeEffect(room, detectedZone);
                }
            } else {
                // Nueva zona detectada, reiniciar timer
                gameState.lastDetectedZone = detectedZone.name;
                gameState.confirmationTime = currentTime;
                console.log("🔥 Detectando zona: " + detectedZone.name + " (esperando 3s)");
            }
        } else {
            // No está en ninguna zona específica, resetear
            if (gameState.lastDetectedZone !== null) {
                console.log("🔥 Bola salió de la zona, reseteando");
            }
            gameState.lastDetectedZone = null;
            gameState.confirmationTime = 0;
        }
    }
    
    // Ejecutar el efecto del color
    function executeEffect(room, zone) {
        var winner = gameState.winner;
        
        // Detener la detección
        if (gameState.checkInterval) {
            clearInterval(gameState.checkInterval);
            gameState.checkInterval = null;
        }
        
        switch(zone.effect) {
            case 'pass_hell':
                // PASS: Escoger a otro para tirar en Lucky Hell
                room.sendAnnouncement(
                    "🔄 " + winner.name + " debe PASAR LA RULETA DEL INFIERNO",
                    null,
                    zone.color === 'FFFF00' ? 0xFFFF00 : 0x00FF00,
                    "bold",
                    2
                );
                startSelection(room, 'pass_hell');
                break;
                
            case 'ban_1min':
                // BAN: Banear por 1 minuto
                room.sendAnnouncement(
                    "⚔️ " + winner.name + " ha sido BANEADO por 1 MINUTO!",
                    null,
                    0x0000FF,
                    "bold",
                    2
                );
                if (gameState.callbacks.onBanTemp) {
                    gameState.callbacks.onBanTemp(winner.id, 60);
                }
                finishEffect(room);
                break;
                
            case 'close_room':
                // CLOSE ROOM: Kickear a todos
                room.sendAnnouncement(
                    "\n💀 LUCKY HELL - CLOSE ROOM 💀\n\n🔥 ¡TODOS SERÁN EXPULSADOS! 🔥\n",
                    null,
                    0xFF0000,
                    "bold",
                    2
                );
                setTimeout(function() {
                    var allPlayers = room.getPlayerList().filter(function(p) { return p.id !== 0; });
                    allPlayers.forEach(function(p) {
                        room.kickPlayer(p.id, "Lucky Hell - Close Room", false);
                    });
                    finishEffect(room);
                }, 3000);
                break;
        }
    }
    
    // Sistema de selección (para PASS)
    function startSelection(room, effectType) {
        gameState.selectionActive = true;
        gameState.explanationPhase = true;
        gameState.selectionEffect = { type: effectType };
        
        var players = room.getPlayerList().filter(function(p) {
            return p.id !== 0 && p.id !== gameState.winner.id;
        });
        
        if (players.length === 0) {
            room.sendAnnouncement("⚠️ No hay otros jugadores", null, 0xFF6600, "bold");
            finishEffect(room);
            return;
        }
        
        gameState.playerList = players;
        room.pauseGame(true);
        room.setPlayerTeam(gameState.winner.id, 0);
        
        var playerList = "\n📋 JUGADORES: ";
        var playerListParts = [];
        players.forEach(function(p, i) {
            playerListParts.push((i + 1) + "." + p.name);
        });
        playerList += playerListParts.join("  |  ");
        playerList += "\n\n📖 " + gameState.winner.name + ", escribe el NÚMERO para PASARLE LA RULETA DEL INFIERNO";
        playerList += "\n⏳ Espera 5 segundos...";
        
        room.sendAnnouncement(playerList, null, 0xFFFF00, "bold", 2);
        
        setTimeout(function() {
            gameState.explanationPhase = false;
            room.pauseGame(false);
            
            room.sendAnnouncement(
                "⏱️ ¡AHORA! Escribe el NÚMERO (10 segundos)",
                null,
                0x00FF00,
                "bold",
                2
            );
            
            gameState.selectionReminderTimeout = setTimeout(function() {
                if (gameState.selectionActive) {
                    room.sendAnnouncement(
                        "⏰ ¡5 SEGUNDOS RESTANTES!",
                        gameState.winner.id,
                        0xFFFF00,
                        "bold"
                    );
                }
            }, 5000);
            
            gameState.selectionTimeout = setTimeout(function() {
                if (gameState.selectionActive) {
                    var randomPlayer = gameState.playerList[Math.floor(Math.random() * gameState.playerList.length)];
                    room.sendAnnouncement(
                        "⏱️ Tiempo agotado - Selección ALEATORIA: " + randomPlayer.name,
                        null,
                        0xFF6600,
                        "bold"
                    );
                    executeSelectionEffect(room, randomPlayer);
                }
            }, 10000);
        }, 5000);
    }
    
    function cancelSelection() {
        gameState.selectionActive = false;
        gameState.explanationPhase = false;
        gameState.playerList = [];
        if (gameState.selectionTimeout) {
            clearTimeout(gameState.selectionTimeout);
            gameState.selectionTimeout = null;
        }
        if (gameState.selectionReminderTimeout) {
            clearTimeout(gameState.selectionReminderTimeout);
            gameState.selectionReminderTimeout = null;
        }
        if (gameState.room) {
            gameState.room.pauseGame(false);
        }
    }
    
    function handleSelectionInput(room, message) {
        if (!gameState.selectionActive || gameState.explanationPhase) return;
        
        var selectedNumber = parseInt(message.trim());
        
        if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > gameState.playerList.length) {
            room.sendAnnouncement(
                "❌ Número inválido. Escribe del 1 al " + gameState.playerList.length,
                gameState.winner.id,
                0xFF0000
            );
            return;
        }
        
        var selectedPlayer = gameState.playerList[selectedNumber - 1];
        
        if (selectedPlayer) {
            room.sendAnnouncement(
                "✅ " + gameState.winner.name + " seleccionó a " + selectedPlayer.name,
                null,
                0x00FF00,
                "bold"
            );
            cancelSelection();
            executeSelectionEffect(room, selectedPlayer);
        }
    }
    
    function executeSelectionEffect(room, targetPlayer) {
        var effect = gameState.selectionEffect;
        
        if (effect.type === 'pass_hell') {
            room.sendAnnouncement(
                "🔄 " + gameState.winner.name + " le pasa la ruleta a " + targetPlayer.name,
                null,
                0xFFFF00,
                "bold",
                2
            );
            setTimeout(function() {
                // Limpiar timeout anterior
                if (gameState.globalTimeout) {
                    clearTimeout(gameState.globalTimeout);
                    gameState.globalTimeout = null;
                }
                
                room.stopGame();
                room.setCustomStadium(mapLuckHell);
                room.startGame();
                room.setPlayerTeam(targetPlayer.id, 1);
                
                gameState.winner = targetPlayer;
                gameState.colorDetected = false;
                gameState.lastDetectedZone = null;
                gameState.confirmationTime = 0;
                
                // Reiniciar timeout global de 60 segundos
                gameState.globalTimeout = setTimeout(function() {
                    if (gameState.active) {
                        room.sendAnnouncement(
                            "⏱️ Tiempo agotado en Lucky Hell! (60 segundos)",
                            null,
                            0xFF6600,
                            "bold",
                            2
                        );
                        stop(room);
                        if (gameState.callbacks.onGameEnd) {
                            gameState.callbacks.onGameEnd();
                        }
                    }
                }, config.maxGameTime);
                
                setTimeout(function() {
                    if (gameState.active) {
                        gameState.checkInterval = setInterval(function() {
                            detectColor(room);
                        }, config.detectionInterval);
                    }
                }, 2000);
            }, 3000);
            return;
        }
    }
    
    function finishEffect(room) {
        setTimeout(function() {
            stop(room);
            if (gameState.callbacks.onGameEnd) {
                gameState.callbacks.onGameEnd();
            }
        }, 5000);
    }
    
    function onPlayerChat(player, message) {
        // DESHABILITADO: Permitir todo el chat para pruebas
        return true;
    }
    
    function start(room, winner, onGameEnd, callbacks) {
        gameState.active = true;
        gameState.winner = winner;
        gameState.room = room;
        gameState.colorDetected = false;
        gameState.lastDetectedZone = null;
        gameState.confirmationTime = 0;
        gameState.callbacks = callbacks || {};
        
        if (onGameEnd) {
            gameState.callbacks.onGameEnd = onGameEnd;
        }
        
        console.log("🔥 Lucky Hell iniciado - Ganador: " + winner.name);
        
        // Timeout global: 60 segundos máximo
        gameState.globalTimeout = setTimeout(function() {
            if (gameState.active) {
                room.sendAnnouncement(
                    "⏱️ Tiempo agotado en Lucky Hell! (60 segundos)",
                    null,
                    0xFF6600,
                    "bold",
                    2
                );
                stop(room);
                if (gameState.callbacks.onGameEnd) {
                    gameState.callbacks.onGameEnd();
                }
            }
        }, config.maxGameTime);
        
        setTimeout(function() {
            gameState.checkInterval = setInterval(function() {
                detectColor(room);
            }, config.detectionInterval);
        }, 2000);
    }
    
    function stop(room) {
        gameState.active = false;
        
        if (gameState.checkInterval) {
            clearInterval(gameState.checkInterval);
            gameState.checkInterval = null;
        }
        
        if (gameState.globalTimeout) {
            clearTimeout(gameState.globalTimeout);
            gameState.globalTimeout = null;
        }
        
        cancelSelection();
        console.log("🔥 Lucky Hell detenido");
    }
    
    function isActive() {
        return gameState.active;
    }
    
    function setMap(hell) {
        mapLuckHell = hell;
    }
    
    return {
        start: start,
        stop: stop,
        isActive: isActive,
        onPlayerChat: onPlayerChat,
        setMap: setMap,
        colorZones: colorZones  // Exportar para poder ajustarlos
    };
})();
