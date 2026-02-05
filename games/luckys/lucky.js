// ============================================
// MÓDULO: LUCKY MAP
// ============================================
// Mapa de la suerte con 15 colores diferentes
// El ganador de LALALA cae en un color aleatorio

var LUCKY = (function() {
    // Variables globales para mapas (se pasan desde bot.js)
    var mapLuck = null;
    var mapLuckDios = null;
    var mapLuckHell = null;
    
    // Configuración de colores y sus posiciones
    var colorZones = [
        { name: 'NARANJA', color: 'FF8C00', x: -130, minX: -150, maxX: -110, effect: 'ban_current' },
        { name: 'BLANCO', color: 'FFFFFF', x: -90, minX: -110, maxX: -70, effect: 'load_luck_dios' },
        { name: 'MAGENTA', color: 'FF00FF', x: -50, minX: -70, maxX: -30, effect: 'spectator_next' },
        { name: 'AMARILLO', color: 'FFFF00', x: -10, minX: -30, maxX: 10, effect: 'kick_current' },
        { name: 'AZUL', color: '0000FF', x: 30, minX: 10, maxX: 50, effect: 'protection' },
        { name: 'VERDE', color: '4BE608', x: 70, minX: 50, maxX: 90, effect: 'choose_kick' },
        { name: 'ROJO', color: 'FF0000', x: 110, minX: 90, maxX: 130, effect: 'choose_admin' },
        { name: 'ROJO OSCURO', color: '8B0000', x: 150, minX: 130, maxX: 170, effect: 'receive_admin' },
        { name: 'DORADO', color: 'D2AB0B', x: 190, minX: 170, maxX: 210, effect: 'choose_ban_1min' },
        { name: 'CELESTE', color: '93C9FF', x: 230, minX: 210, maxX: 250, effect: 'repeat_roulette' },
        { name: 'MORADO', color: '800180', x: 270, minX: 250, maxX: 290, effect: 'choose_spectator_next' },
        { name: 'ROSA', color: 'FFC0CB', x: 310, minX: 290, maxX: 330, effect: 'gay_message' },
        { name: 'VIOLETA', color: '7400FF', x: 350, minX: 330, maxX: 370, effect: 'choose_pass_roulette' },
        { name: 'NEGRO', color: '000000', x: 390, minX: 370, maxX: 410, effect: 'load_luck_hell' },
        { name: 'CIAN', color: '00FFFF', x: 430, minX: 410, maxX: 450, effect: 'choose_dios_player' }
    ];
    
    var gameState = {
        active: false,
        winner: null,
        checkInterval: null,
        globalTimeout: null,
        startTime: 0,
        colorDetected: false,
        onGameEnd: null,
        detectionBuffer: [],  // Buffer para confirmar detecciones
        lastDetectedZone: null,
        callbacks: {
            onTempAdmin: null,
            onSpectatorNext: null,
            onBanTemp: null
        },
        // Sistema de selección
        selectionActive: false,
        explanationPhase: false,
        selectionEffect: null,
        selectionTimeout: null,
        selectionReminderTimeout: null,
        playerList: [],  // Lista de jugadores disponibles para selección
        room: null,  // Guardar referencia a room
        chatBlocked: false // Bloqueo de chat global
    };
    
    var config = {
        detectionY: 320,  // Y donde están los discos de colores (más profundo = más preciso)
        detectionDelay: 2000,  // Esperar 2s antes de empezar a detectar
        stopDelay: 5000,  // Detener el mapa 5s después de detectar el color
        confirmationCount: 3,  // Número de detecciones consecutivas para confirmar
        selectionTimeout: 10000,  // 10 segundos para escoger
        selectionReminder: 5000,  // Recordatorio a los 5 segundos
        maxGameTime: 60000  // 60 segundos máximo por Lucky
    };
    
    // Detectar en qué color cayó la bola
    function detectColor(room) {
        if (!gameState.active || gameState.colorDetected) return;
        
        var ballPos = room.getBallPosition();
        if (!ballPos) return;
        
        // Verificar si la bola está en la zona de colores (más profundo = más preciso)
        if (ballPos.y > config.detectionY) {
            var detectedZone = null;
            
            // Buscar en qué zona de color está la bola
            for (var i = 0; i < colorZones.length; i++) {
                var zone = colorZones[i];
                // Detectar con un margen más centrado
                var centerMargin = 5; // Margen de 5px desde los bordes
                if (ballPos.x >= (zone.minX + centerMargin) && ballPos.x <= (zone.maxX - centerMargin)) {
                    detectedZone = zone;
                    break;
                }
            }
            
            if (detectedZone) {
                // Verificar si es el mismo color que las últimas detecciones
                if (gameState.lastDetectedZone && gameState.lastDetectedZone.name === detectedZone.name) {
                    gameState.detectionBuffer.push(detectedZone);
                } else {
                    // Nuevo color detectado, resetear buffer
                    gameState.detectionBuffer = [detectedZone];
                    gameState.lastDetectedZone = detectedZone;
                }
                
                // Confirmar solo si se detectó el mismo color varias veces consecutivas
                if (gameState.detectionBuffer.length >= config.confirmationCount) {
                    gameState.colorDetected = true;
                    
                    console.log("🎯 Color confirmado: " + detectedZone.name + " en X=" + ballPos.x.toFixed(0) + " Y=" + ballPos.y.toFixed(0));
                    
                    // Ejecutar el efecto del color (sin anuncio de color)
                    executeEffect(room, detectedZone);
                }
            } else {
                // Si no detecta ningún color, resetear buffer
                gameState.detectionBuffer = [];
                gameState.lastDetectedZone = null;
            }
        } else {
            // Si la bola no está en la zona de detección, resetear buffer
            gameState.detectionBuffer = [];
            gameState.lastDetectedZone = null;
        }
    }
    
    // Sistema de selección de jugadores
    function startSelection(room, effectType, effectData) {
        gameState.selectionActive = true;
        gameState.explanationPhase = true;
        gameState.chatBlocked = true;
        gameState.selectionEffect = { type: effectType, data: effectData };
        
        var players = room.getPlayerList().filter(function(p) {
            return p.id !== 0 && p.id !== gameState.winner.id;
        });
        
        if (players.length === 0) {
            room.sendAnnouncement("⚠️ No hay otros jugadores para seleccionar", null, 0xFF6600, "bold");
            finishEffect(room);
            return;
        }
        
        // Guardar lista de jugadores para referencia
        gameState.playerList = players;
        
        // PAUSAR EL JUEGO durante la selección
        room.pauseGame(true);
        
        // Mover al ganador a espectador para que no haya 2 en rojo
        room.setPlayerTeam(gameState.winner.id, 0);
        
        // Determinar el propósito de la selección
        var purpose = "";
        switch(effectType) {
            case 'choose_kick':
                purpose = "para KICKEAR";
                break;
            case 'choose_admin':
                purpose = "para dar ADMIN";
                break;
            case 'choose_ban_1min':
                purpose = "para BANEAR por 1 minuto";
                break;
            case 'choose_spectator_next':
                purpose = "para ESPECTADOR en el próximo juego";
                break;
            case 'choose_pass_roulette':
                purpose = "para PASARLE LA RULETA";
                break;
            case 'choose_dios_player':
                purpose = "para jugar LUCK DIOS";
                break;
            default:
                purpose = "para seleccionar";
        }
        
        // Mostrar lista de jugadores EN HORIZONTAL
        var playerList = "\n📋 JUGADORES: ";
        var playerListParts = [];
        players.forEach(function(p, i) {
            playerListParts.push((i + 1) + "." + p.name);
        });
        playerList += playerListParts.join("  |  ");
        playerList += "\n\n📖 " + gameState.winner.name + ", escribe el NÚMERO " + purpose;
        playerList += "\n⏳ Espera 5 segundos para la explicación...";
        
        room.sendAnnouncement(
            playerList,
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        // Fase de explicación: 5 segundos donde nadie puede escribir
        setTimeout(function() {
            // Termina la explicación, empieza el timeout de selección
            gameState.explanationPhase = false;
            gameState.chatBlocked = false;
            // Despausar el juego después de la explicación
            room.pauseGame(false);
            room.sendAnnouncement(
                "⏱️ ¡AHORA! Escribe el NÚMERO (10 segundos)",
                null,
                0x00FF00,
                "bold",
                2
            );
            // Recordatorio a los 5 segundos
            gameState.selectionReminderTimeout = setTimeout(function() {
                if (gameState.selectionActive) {
                    room.sendAnnouncement(
                        "⏰ ¡5 SEGUNDOS RESTANTES! Escribe el NÚMERO",
                        gameState.winner.id,
                        0xFFFF00,
                        "bold"
                    );
                }
            }, 5000);
            // Timeout de 10 segundos - selección aleatoria
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
        }, 5000); // 5 segundos de explicación
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
        // Reanudar el juego
        if (gameState.room) {
            gameState.room.pauseGame(false);
        }
    }
    
    function handleSelectionInput(room, message) {
        if (!gameState.selectionActive || gameState.explanationPhase) return;
        
        // Selección solo por número (1, 2, 3, etc)
        var selectedNumber = parseInt(message.trim());
        
        if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > gameState.playerList.length) {
            room.sendAnnouncement(
                "❌ Número inválido. Escribe un número del 1 al " + gameState.playerList.length,
                gameState.winner.id,
                0xFF0000
            );
            return;
        }
        
        // Obtener jugador por índice (restamos 1 porque el usuario escribe 1-based)
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
        
        switch(effect.type) {
            case 'choose_kick':
                room.sendAnnouncement(
                    "⚡ " + targetPlayer.name + " ha sido KICKEADO por " + gameState.winner.name,
                    null,
                    0x4BE608,
                    "bold",
                    2
                );
                setTimeout(function() {
                    room.kickPlayer(targetPlayer.id, "Kickeado por " + gameState.winner.name, false);
                }, 2000);
                break;
                
            case 'choose_admin':
                room.sendAnnouncement(
                    "👑 " + targetPlayer.name + " recibe ADMIN temporal (otorgado por " + gameState.winner.name + ")",
                    null,
                    0xFF0000,
                    "bold",
                    2
                );
                room.sendAnnouncement("⚠️ Admin temporal: NO puedes kickear, banear ni cambiar mapas", targetPlayer.id, 0xFFFF00, "bold");
                // Dar permisos de admin visible
                room.setPlayerAdmin(targetPlayer.id, true);
                if (gameState.callbacks.onTempAdmin) {
                    gameState.callbacks.onTempAdmin(targetPlayer.id);
                }
                break;
                
            case 'choose_ban_1min':
                room.sendAnnouncement(
                    "⚔️ " + targetPlayer.name + " ha sido BANEADO por 1 MINUTO (por " + gameState.winner.name + ")",
                    null,
                    0xD2AB0B,
                    "bold",
                    2
                );
                if (gameState.callbacks.onBanTemp) {
                    gameState.callbacks.onBanTemp(targetPlayer.id, 60);
                }
                break;
                
            case 'choose_spectator_next':
                room.sendAnnouncement(
                    "👁️ " + targetPlayer.name + " será ESPECTADOR en el próximo minijuego (elegido por " + gameState.winner.name + ")",
                    null,
                    0x800180,
                    "bold",
                    2
                );
                if (gameState.callbacks.onSpectatorNext) {
                    gameState.callbacks.onSpectatorNext(targetPlayer.id);
                }
                break;
                
            case 'choose_pass_roulette':
                room.sendAnnouncement(
                    "🔀 " + gameState.winner.name + " le pasa la ruleta a " + targetPlayer.name,
                    null,
                    0x7400FF,
                    "bold",
                    2
                );
                setTimeout(function() {
                    room.stopGame();
                    room.setCustomStadium(mapLuck);
                    room.startGame();
                    room.setPlayerTeam(targetPlayer.id, 1);
                    // Cambiar el ganador por el nuevo jugador
                    gameState.winner = targetPlayer;
                    gameState.colorDetected = false;
                    gameState.detectionBuffer = [];
                    gameState.lastDetectedZone = null;
                    
                    // Reiniciar detección con timeout completo
                    setTimeout(function() {
                        if (gameState.active) {
                            gameState.checkInterval = setInterval(function() {
                                detectColor(room);
                            }, 100);
                        }
                    }, config.detectionDelay);
                }, 3000);
                return; // No llamar finishEffect aún
                
            case 'choose_dios_player':
                room.sendAnnouncement(
                    "⭐ " + targetPlayer.name + " tirará la RULETA DE DIOS (elegido por " + gameState.winner.name + ")",
                    null,
                    0x00FFFF,
                    "bold",
                    2
                );
                setTimeout(function() {
                    stop(room); // Detener Lucky normal
                    room.stopGame();
                    room.setCustomStadium(mapLuckDios);
                    room.startGame();
                    
                    setTimeout(function() {
                        room.setPlayerTeam(targetPlayer.id, 1);
                        
                        // Iniciar Lucky DIOS
                        if (typeof LUCKY_DIOS !== 'undefined' && LUCKY_DIOS.start) {
                            LUCKY_DIOS.start(room, targetPlayer, gameState.callbacks);
                        }
                    }, 100);
                }, 3000);
                return; // No llamar finishEffect todavía
        }
        
        finishEffect(room);
    }
    
    // Ejecutar el efecto del color detectado
    function executeEffect(room, zone) {
        var effect = zone.effect;
        var winner = gameState.winner;
        
        console.log("⚡ Ejecutando efecto: " + effect);
        
        switch(effect) {
            case 'ban_current':
                // NARANJA: Ban al que está en ruleta
                room.sendAnnouncement("💥 " + winner.name + " ha sido BANEADO!", null, 0xFF8C00, "bold", 2);
                room.kickPlayer(winner.id, "Baneado por caer en NARANJA", true);
                finishEffect(room);
                break;
                
            case 'load_luck_dios':
                // BLANCO: Cargar ruleta de dios
                room.sendAnnouncement("✨ Cargando RULETA DE DIOS...", null, 0xFFFFFF, "bold", 2);
                setTimeout(function() {
                    stop(room); // Detener Lucky normal
                    room.stopGame();
                    room.setCustomStadium(mapLuckDios);
                    room.startGame();
                    
                    setTimeout(function() {
                        room.setPlayerTeam(winner.id, 1);
                        
                        // Iniciar Lucky DIOS
                        if (typeof LUCKY_DIOS !== 'undefined' && LUCKY_DIOS.start) {
                            LUCKY_DIOS.start(room, winner, gameState.callbacks);
                        }
                    }, 100);
                }, 3000);
                break;
                
            case 'spectator_next':
                // MAGENTA: No puede jugar siguiente minijuego
                room.sendAnnouncement("👻 " + winner.name + " será ESPECTADOR en el siguiente minijuego!", null, 0xFF00FF, "bold", 2);
                if (gameState.callbacks.onSpectatorNext) {
                    gameState.callbacks.onSpectatorNext(winner.id);
                }
                finishEffect(room);
                break;
                
            case 'kick_current':
                // AMARILLO: Kickeado
                room.sendAnnouncement("⚡ " + winner.name + " ha sido KICKEADO!", null, 0xFFFF00, "bold", 2);
                setTimeout(function() {
                    room.kickPlayer(winner.id, "Kickeado por caer en AMARILLO", false);
                    finishEffect(room);
                }, 2000);
                break;
                
            case 'protection':
                // AZUL: Protección
                room.sendAnnouncement("🛡️ " + winner.name + " ¡SALVADO POR EL CONDÓN! 🛡️", null, 0x0000FF, "bold", 2);
                finishEffect(room);
                break;
                
            case 'choose_kick':
                // VERDE: Escoger a quien kickear
                room.sendAnnouncement("🎯 " + winner.name + " debe ESCOGER A QUIEN KICKEAR", null, 0x4BE608, "bold", 2);
                startSelection(room, 'choose_kick');
                break;
                
            case 'choose_admin':
                // ROJO: Escoger admin
                room.sendAnnouncement("👑 " + winner.name + " debe ESCOGER UN ADMIN", null, 0xFF0000, "bold", 2);
                startSelection(room, 'choose_admin');
                break;
                
            case 'receive_admin':
                // ROJO OSCURO: Recibe admin
                room.sendAnnouncement("👑 " + winner.name + " recibe ADMIN temporal!", null, 0x8B0000, "bold", 2);
                room.sendAnnouncement("⚠️ Admin temporal: NO puedes kickear, banear ni cambiar mapas", winner.id, 0xFFFF00, "bold");
                // Dar permisos de admin visible
                room.setPlayerAdmin(winner.id, true);
                if (gameState.callbacks.onTempAdmin) {
                    gameState.callbacks.onTempAdmin(winner.id);
                }
                finishEffect(room);
                break;
                
            case 'choose_ban_1min':
                // DORADO: Escoger a quien banear por 1 minuto
                room.sendAnnouncement("⚔️ " + winner.name + " debe ESCOGER A QUIEN BANEAR por 1 minuto", null, 0xD2AB0B, "bold", 2);
                startSelection(room, 'choose_ban_1min');
                break;
                
            case 'repeat_roulette':
                // CELESTE: Repite lanzamiento
                room.sendAnnouncement("🔄 " + winner.name + " REPITE la ruleta!", null, 0x93C9FF, "bold", 2);
                setTimeout(function() {
                    room.stopGame();
                    room.setCustomStadium(mapLuck);
                    room.startGame();
                    room.setPlayerTeam(winner.id, 1);
                    
                    // Reiniciar Lucky completamente
                    gameState.colorDetected = false;
                    gameState.detectionBuffer = [];
                    gameState.lastDetectedZone = null;
                    gameState.startTime = Date.now(); // RESETEAR TIEMPO para timeout global
                    
                    // Cancelar timeout global anterior si existe
                    if (gameState.globalTimeout) {
                        clearTimeout(gameState.globalTimeout);
                    }
                    
                    // Nuevo timeout global
                    gameState.globalTimeout = setTimeout(function() {
                        if (gameState.active && !gameState.colorDetected) {
                            console.log("⏰ Lucky: Timeout global alcanzado en repeat_roulette");
                            room.sendAnnouncement("⏰ Tiempo agotado en Lucky - Continuando...", null, 0xFF6600, "bold");
                            finishEffect(room);
                        }
                    }, config.maxGameTime);
                    
                    // Reiniciar detección con timeout completo
                    setTimeout(function() {
                        if (gameState.active) {
                            gameState.checkInterval = setInterval(function() {
                                detectColor(room);
                            }, 100);
                        }
                    }, config.detectionDelay);
                }, 3000);
                break;
                
            case 'choose_spectator_next':
                // MORADO: Escoge quien no puede jugar próximo minijuego
                room.sendAnnouncement("👁️ " + winner.name + " debe ESCOGER QUIEN SERÁ ESPECTADOR", null, 0x800180, "bold", 2);
                startSelection(room, 'choose_spectator_next');
                break;
                
            case 'gay_message':
                // ROSA: Mensaje gay
                room.sendAnnouncement("🌈 " + winner.name + " ES GAY 🌈", null, 0xFFC0CB, "bold", 2);
                finishEffect(room);
                break;
                
            case 'choose_pass_roulette':
                // VIOLETA: Escoge a quien le pasa la ruleta
                room.sendAnnouncement("🔀 " + winner.name + " debe ESCOGER A QUIEN LE PASA LA RULETA", null, 0x7400FF, "bold", 2);
                startSelection(room, 'choose_pass_roulette');
                break;
                
            case 'load_luck_hell':
                // NEGRO: Cargar ruleta de hell
                room.sendAnnouncement("💀 Cargando RULETA DEL INFIERNO...", null, 0x000000, "bold", 2);
                setTimeout(function() {
                    stop(room); // Detener Lucky normal
                    room.stopGame();
                    room.setCustomStadium(mapLuckHell);
                    room.startGame();
                    room.setPlayerTeam(winner.id, 1);
                    
                    // Iniciar Lucky HELL
                    if (typeof LUCKY_HELL !== 'undefined') {
                        LUCKY_HELL.start(room, winner, gameState.onGameEnd, {
                            onBanTemp: gameState.callbacks.onBanTemp
                        });
                    } else {
                        // Si no existe el módulo, terminar después de 30s
                        setTimeout(function() {
                            if (gameState.onGameEnd) {
                                gameState.onGameEnd();
                            }
                        }, 30000);
                    }
                }, 3000);
                break;
                
            case 'choose_dios_player':
                // CIAN: Escoge a alguien para que tire ruleta de dios
                room.sendAnnouncement("⭐ " + winner.name + " debe ESCOGER QUIEN TIRA LA RULETA DE DIOS", null, 0x00FFFF, "bold", 2);
                startSelection(room, 'choose_dios_player');
                break;
                
            default:
                finishEffect(room);
        }
    }
    
    function finishEffect(room) {
        // Detener el mapa después de ejecutar el efecto
        setTimeout(function() {
            if (gameState.active) {
                room.sendAnnouncement(
                    "⏸️ Mapa Lucky finalizado" + "\n" + "⏱️ Próximo minijuego en 3 segundos...",
                    null,
                    0xFFFF00,
                    "bold"
                );
                
                setTimeout(function() {
                    stop(room);
                }, 3000);
            }
        }, config.stopDelay);
    }
    
    function start(room, winner, onGameEnd, callbacks) {
        gameState.active = true;
        gameState.winner = winner;
        gameState.colorDetected = false;
        gameState.startTime = Date.now();
        gameState.onGameEnd = onGameEnd;
        gameState.detectionBuffer = [];
        gameState.lastDetectedZone = null;
        gameState.callbacks = callbacks || {};
        gameState.room = room;  // Guardar referencia
        
        console.log("🍀 Iniciando Lucky Map para: " + winner.name);
        
        // Timeout global: 60 segundos máximo
        gameState.globalTimeout = setTimeout(function() {
            if (gameState.active) {
                room.sendAnnouncement(
                    "⏱️ Tiempo agotado en Lucky! (60 segundos)",
                    null,
                    0xFF6600,
                    "bold",
                    2
                );
                stop(room);
                if (gameState.onGameEnd) {
                    gameState.onGameEnd();
                }
            }
        }, config.maxGameTime);
        
        // Esperar un poco antes de empezar a detectar (dar tiempo a que caiga)
        setTimeout(function() {
            if (gameState.active) {
                gameState.checkInterval = setInterval(function() {
                    detectColor(room);
                }, 100);
            }
        }, config.detectionDelay);
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
        
        room.stopGame();
        console.log("🛑 Lucky Map detenido");
        
        // Llamar al callback para continuar con el siguiente minijuego
        if (gameState.onGameEnd) {
            var callback = gameState.onGameEnd;
            gameState.onGameEnd = null;
            callback();
        }
    }
    
    function isActive() {
        return gameState.active;
    }
    
    function onPlayerChat(player, message) {
        // Bloquear chat para todos durante la explicación de selección
        if (gameState.chatBlocked) return false;
        return true;
    }
    
    function setMaps(luck, dios, hell) {
        mapLuck = luck;
        mapLuckDios = dios;
        mapLuckHell = hell;
    }
    
    return {
        config: config,
        colorZones: colorZones,
        start: start,
        stop: stop,
        isActive: isActive,
        onPlayerChat: onPlayerChat,
        setMaps: setMaps
    };
})();
