// Lucky DIOS Module - 7 color zones with god-tier effects
const LUCKY_DIOS = (function() {
    const colorZones = [
        {
            name: 'ROJO',
            color: 'FF1100',
            minX: 20.8,
            maxX: 55.76,
            minY: 350,
            maxY: 376.5,
            effect: 'receive_admin',
            needsSelection: false,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'MAGENTA',
            color: 'EC08EC',
            minX: 92.27,
            maxX: 127.23,
            minY: 350,
            maxY: 375.5,
            effect: 'choose_ban_1min',
            needsSelection: true,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'GRIS',
            color: '2A505E',
            minX: 166.86,
            maxX: 201.82,
            minY: 350,
            maxY: 375.5,
            effect: 'give_lucky_normal',
            needsSelection: true,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'AZUL',
            color: '1B4BED',
            minX: 245.42,
            maxX: 280.38,
            minY: 350,
            maxY: 376.5,
            effect: 'choose_admin',
            needsSelection: true,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'NARANJA',
            color: 'ED7006',
            minX: 317.44,
            maxX: 352.40,
            minY: 350,
            maxY: 377.5,
            effect: 'protection',
            needsSelection: false,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'MARRON',
            color: '67290A',
            minX: 389.45,
            maxX: 424.42,
            minY: 350,
            maxY: 377.5,
            effect: 'kick_10_times',
            needsSelection: false,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'SEGUNDO_ROJO',
            color: 'FF1100',
            minX: 454.6,
            maxX: 489.5,
            minY: 350,
            maxY: 378.5,
            effect: 'receive_admin',
            needsSelection: false,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'VERDE_AMARILLO',
            color: 'CE004',
            minX: 140,
            maxX: 520,
            minY: 300,  // Ampliado desde 440 hasta 300 para cubrir más zona debajo de la curva
            effect: 'pass_dios',
            needsSelection: true,
            confirmationTime: 3000,
            detectionType: 'curve'
        }
    ];

    const gameState = {
        active: false,
        winner: null,
        checkInterval: null,
        globalTimeout: null,
        detectionBuffer: [],
        confirmationStartTime: null,
        currentZone: null,
        selectionActive: false,
        explanationPhase: false,
        selectionEffect: null,
        selectionTimeout: null,
        selectionReminderTimeout: null,
        playerList: [],
        kickCounters: {}, // Para trackear kicks restantes por jugador
        effectExecuted: false, // Flag para evitar ejecuciones múltiples
        room: null,
        callbacks: null
    };

    const config = {
        detectionInterval: 100,
        selectionTimeout: 10000,
        selectionReminder: 5000,
        maxGameTime: 60000
    };

    let mapLuckDios = null;
    let mapLuckNormal = null;

    function setMaps(diosMap, normalMap) {
        mapLuckDios = diosMap;
        mapLuckNormal = normalMap;
    }

    function detectColor(ballPosition) {
        const { x, y } = ballPosition;
        
        // Buscar la zona de color según el tipo de detección
        for (const zone of colorZones) {
            if (zone.detectionType === 'platform') {
                // Plataformas: verificar rango completo (minY y maxY)
                if (x >= zone.minX && x <= zone.maxX && 
                    y >= zone.minY && y <= zone.maxY) {
                    return zone;
                }
            } else if (zone.detectionType === 'curve') {
                // Curva: solo verificar que esté por encima de minY (como antes)
                if (x >= zone.minX && x <= zone.maxX && y >= zone.minY) {
                    return zone;
                }
            }
        }
        
        return null;
    }

    function executeEffect(zone, room) {
        if (!gameState.winner) return;

        const effect = zone.effect;

        switch(effect) {
            case 'receive_admin':
                room.setPlayerAdmin(gameState.winner.id, true);
                room.sendAnnouncement(`🔴 ${gameState.winner.name} obtuvo ADMIN!`, null, 0xFF1100, 'bold', 2);
                
                if (gameState.callbacks && gameState.callbacks.onTempAdmin) {
                    gameState.callbacks.onTempAdmin(gameState.winner.id);
                }
                
                setTimeout(() => {
                    stop(room);
                }, 2000);
                break;

            case 'protection':
                room.sendAnnouncement(`🛡️ ${gameState.winner.name} ¡SALVADO POR EL CONDÓN! 🛡️`, null, 0xED7006, 'bold', 2);
                setTimeout(() => {
                    stop(room);
                }, 2000);
                break;

            case 'pass_dios':
                startSelection(zone, room, 'Pasarás Lucky DIOS a otra persona. Escribe el número del jugador:');
                break;

            case 'give_lucky_normal':
                startSelection(zone, room, 'Darás Lucky NORMAL a otra persona. Escribe el número del jugador:');
                break;

            case 'kick_10_times':
                const playerId = gameState.winner.id;
                if (!gameState.kickCounters[playerId]) {
                    gameState.kickCounters[playerId] = 10;
                }
                
                const kicksRemaining = gameState.kickCounters[playerId];
                room.sendAnnouncement(`🟤 ${gameState.winner.name} será kickeado! Le quedan ${kicksRemaining} kicks.`, null, 0x67290A, 'bold', 2);
                
                setTimeout(() => {
                    room.kickPlayer(playerId, 'Kick automático por Lucky DIOS', false);
                    gameState.kickCounters[playerId]--;
                    
                    if (gameState.kickCounters[playerId] <= 0) {
                        delete gameState.kickCounters[playerId];
                        room.sendAnnouncement(`${gameState.winner.name} completó sus 10 kicks.`, null, 0x67290A, 'normal', 1);
                    }
                }, 1000);
                
                stop(room);
                break;

            case 'choose_ban_1min':
                startSelection(zone, room, 'Escoge a quién BANEAR por 1 minuto. Escribe el número del jugador:');
                break;

            case 'choose_admin':
                startSelection(zone, room, 'Escoge a quién dar ADMIN. Escribe el número del jugador:');
                break;

            default:
                room.sendAnnouncement(`Efecto desconocido: ${effect}`, null, 0xFFFFFF, 'normal', 1);
                setTimeout(() => stop(room), 2000);
        }
    }

    function startSelection(zone, room, message) {
        if (gameState.selectionActive) return;

        gameState.selectionActive = true;
        gameState.selectionEffect = zone.effect;
        gameState.explanationPhase = true;

        // Obtener jugadores (excluir bot y ganador)
        const players = room.getPlayerList().filter(p => p.id !== 0 && p.id !== gameState.winner.id);
        
        if (players.length === 0) {
            room.sendAnnouncement("⚠️ No hay otros jugadores disponibles", null, 0xFF6600, "bold");
            setTimeout(() => stop(room), 2000);
            return;
        }

        gameState.playerList = players;

        // Pausar juego
        room.pauseGame(true);

        // Mover ganador a espectadores
        room.setPlayerTeam(gameState.winner.id, 0);

        // Construir mensaje con lista
        let playerListMsg = "\n📋 JUGADORES DISPONIBLES:\n";
        const playerNames = [];
        players.forEach((p, i) => {
            playerNames.push((i + 1) + "." + p.name);
        });
        playerListMsg += playerNames.join("  |  ");
        playerListMsg += "\n\n📖 " + message;
        playerListMsg += "\n⏳ Espera 5 segundos...";

        room.sendAnnouncement(playerListMsg, null, 0xFFFF00, "bold", 2);

        // Fase de explicación (5 segundos)
        setTimeout(() => {
            gameState.explanationPhase = false;
            room.pauseGame(false);
            
            room.sendAnnouncement(
                "✍️ " + gameState.winner.name + ", ESCRIBE EL NÚMERO (1-" + players.length + ")",
                null,
                0xFFFF00,
                "bold",
                2
            );

            // Recordatorio a los 5 segundos
            gameState.selectionReminderTimeout = setTimeout(() => {
                if (gameState.selectionActive) {
                    room.sendAnnouncement(
                        "⏰ ¡5 SEGUNDOS RESTANTES! Escribe el NÚMERO",
                        gameState.winner.id,
                        0xFFFF00,
                        "bold"
                    );
                }
            }, 5000);

            // Timeout de 10 segundos
            gameState.selectionTimeout = setTimeout(() => {
                if (gameState.selectionActive) {
                    room.sendAnnouncement("⏱️ Tiempo agotado! No escogiste a nadie.", null, 0xFF0000, "bold", 2);
                    gameState.selectionActive = false;
                    gameState.explanationPhase = false;
                    gameState.selectionEffect = null;
                    gameState.playerList = [];
                    stop(room);
                }
            }, 10000);
        }, 5000);
    }

    function handleSelectionInput(player, message, room) {
        if (!gameState.selectionActive || player.id !== gameState.winner.id) {
            return false;
        }

        // Durante fase de explicación, bloquear
        if (gameState.explanationPhase) {
            return true;
        }

        // Parsear número
        const num = parseInt(message.trim());
        if (isNaN(num) || num < 1 || num > gameState.playerList.length) {
            room.sendAnnouncement(`Número inválido. Escribe entre 1 y ${gameState.playerList.length}.`, player.id, 0xFF0000, 'normal', 1);
            return true;
        }

        const selectedPlayer = gameState.playerList[num - 1];
        
        // Cancelar timeout
        if (gameState.selectionTimeout) {
            clearTimeout(gameState.selectionTimeout);
            gameState.selectionTimeout = null;
        }

        // Ejecutar efecto de selección
        executeSelectionEffect(selectedPlayer, room);
        
        return true;
    }

    function executeSelectionEffect(selectedPlayer, room) {
        gameState.selectionActive = false;
        gameState.explanationPhase = false;
        room.pauseGame(false);

        switch(gameState.selectionEffect) {
            case 'pass_dios':
                room.sendAnnouncement(`🔄 ${gameState.winner.name} pasa Lucky DIOS a ${selectedPlayer.name}!`, null, 0x0CE004, 'bold', 2);
                
                setTimeout(() => {
                    // Mover ganador actual a espectadores
                    room.setPlayerTeam(gameState.winner.id, 0);
                    
                    // Guardar callbacks antes de stop
                    const savedCallbacks = gameState.callbacks;
                    
                    // Detener Lucky DIOS actual
                    stop(room);
                    
                    // Reiniciar mapa
                    room.stopGame();
                    room.setCustomStadium(mapLuckDios);
                    room.startGame();
                    
                    setTimeout(() => {
                        // Mover nuevo jugador al rojo
                        room.setPlayerTeam(selectedPlayer.id, 1);
                        
                        // Iniciar Lucky DIOS con nuevo jugador
                        setTimeout(() => {
                            start(room, selectedPlayer, savedCallbacks);
                        }, 500);
                    }, 1000);
                }, 2000);
                return; // No llamar a finishEffect
                break;

            case 'give_lucky_normal':
                room.sendAnnouncement(`${gameState.winner.name} dio Lucky NORMAL a ${selectedPlayer.name}!`, null, 0x2A505E, 'bold', 2);
                
                // Detener Lucky DIOS
                stop(room);
                
                // Cargar Lucky Normal (Map 2)
                setTimeout(() => {
                    if (mapLuckNormal) {
                        room.stopGame();
                        room.setDefaultStadium(mapLuckNormal);
                        room.startGame();
                        
                        setTimeout(() => {
                            room.setPlayerTeam(selectedPlayer.id, 1);
                            
                            // Iniciar Lucky normal (el módulo LUCKY)
                            if (typeof LUCKY !== 'undefined' && LUCKY.start) {
                                LUCKY.start(room, selectedPlayer, gameState.callbacks);
                            }
                        }, 100);
                    }
                }, 2000);
                break;

            case 'choose_ban_1min':
                room.sendAnnouncement(`${gameState.winner.name} escogió BANEAR a ${selectedPlayer.name} por 1 minuto!`, null, 0xEC08EC, 'bold', 2);
                
                setTimeout(() => {
                    if (gameState.callbacks && gameState.callbacks.onBanTemp) {
                        gameState.callbacks.onBanTemp(selectedPlayer.id, 60);
                    }
                    
                    // Detener y continuar al siguiente minijuego
                    stop(room);
                }, 1000);
                break;

            case 'choose_admin':
                room.sendAnnouncement(`${gameState.winner.name} escogió dar ADMIN a ${selectedPlayer.name}!`, null, 0x1B4BED, 'bold', 2);
                
                setTimeout(() => {
                    room.setPlayerAdmin(selectedPlayer.id, true);
                    
                    if (gameState.callbacks && gameState.callbacks.onTempAdmin) {
                        gameState.callbacks.onTempAdmin(selectedPlayer.id);
                    }
                    
                    // Detener y continuar al siguiente minijuego
                    stop(room);
                }, 1000);
                break;
        }

        gameState.selectionEffect = null;
        gameState.playerList = [];
    }

    function start(room, winner, callbacks) {
        if (gameState.active) return;

        gameState.active = true;
        gameState.winner = winner;
        gameState.room = room;
        gameState.callbacks = callbacks;
        gameState.detectionBuffer = [];
        gameState.confirmationStartTime = null;
        gameState.currentZone = null;
        gameState.effectExecuted = false;

        room.sendAnnouncement(`🌟 LUCKY DIOS activado para ${winner.name}! 🌟`, null, 0xFFD700, 'bold', 2);

        // Timeout global: 60 segundos máximo
        gameState.globalTimeout = setTimeout(() => {
            if (gameState.active) {
                room.sendAnnouncement(
                    `⏱️ Tiempo agotado en Lucky DIOS! (60 segundos)`,
                    null,
                    0xFF6600,
                    'bold',
                    2
                );
                stop(room);
            }
        }, config.maxGameTime);

        gameState.checkInterval = setInterval(() => {
            const ball = room.getDiscProperties(0);
            if (!ball) return;

            // Si ya se ejecutó un efecto, no continuar detectando
            if (gameState.effectExecuted) {
                clearInterval(gameState.checkInterval);
                gameState.checkInterval = null;
                return;
            }

            const detectedZone = detectColor(ball);

            if (detectedZone) {
                // Sistema de confirmación por tiempo (3 segundos)
                if (!gameState.currentZone || gameState.currentZone.name !== detectedZone.name) {
                    // Nueva zona detectada - iniciar contador
                    gameState.currentZone = detectedZone;
                    gameState.confirmationStartTime = Date.now();
                } else {
                    // Misma zona - verificar si ya pasaron 3 segundos
                    const timeInZone = Date.now() - gameState.confirmationStartTime;
                    if (timeInZone >= detectedZone.confirmationTime && !gameState.effectExecuted) {
                        gameState.effectExecuted = true;
                        clearInterval(gameState.checkInterval);
                        gameState.checkInterval = null;
                        executeEffect(detectedZone, room);
                    }
                }
            } else {
                // Fuera de zona - resetear
                gameState.currentZone = null;
                gameState.confirmationStartTime = null;
            }
        }, config.detectionInterval);
    }

    function stop(room) {
        var endCb = gameState.callbacks && gameState.callbacks.onGameEnd ? gameState.callbacks.onGameEnd : null;

        if (gameState.checkInterval) {
            clearInterval(gameState.checkInterval);
            gameState.checkInterval = null;
        }

        if (gameState.globalTimeout) {
            clearTimeout(gameState.globalTimeout);
            gameState.globalTimeout = null;
        }

        if (gameState.selectionTimeout) {
            clearTimeout(gameState.selectionTimeout);
            gameState.selectionTimeout = null;
        }

        if (gameState.selectionReminderTimeout) {
            clearTimeout(gameState.selectionReminderTimeout);
            gameState.selectionReminderTimeout = null;
        }

        if (gameState.selectionActive) {
            room.pauseGame(false);
        }

        gameState.active = false;
        gameState.winner = null;
        gameState.detectionBuffer = [];
        gameState.confirmationStartTime = null;
        gameState.currentZone = null;
        gameState.selectionActive = false;
        gameState.explanationPhase = false;
        gameState.selectionEffect = null;
        gameState.playerList = [];
        gameState.effectExecuted = false;
        gameState.room = null;
        // Guardar y limpiar callbacks antes de llamar
        gameState.callbacks = null;

        // Llamar callback de fin si existe (continuar con siguiente minijuego)
        if (endCb && typeof endCb === 'function') {
            try { endCb(); } catch(e) { console.error('[LUCKY_DIOS] error calling onGameEnd callback', e); }
        }
    }

    function isActive() {
        return gameState.active;
    }

    function onPlayerChat(player, message) {
        // Bloquear chat durante la explicación de la selección
        if (gameState.explanationPhase) return false;

        // Si hay una selección activa, dejar que el ganador escriba el número
        if (gameState.selectionActive) {
            var handled = handleSelectionInput(player, message, gameState.room);
            if (handled) return false; // Si lo manejamos, bloquear el chat público
        }

        return true;
    }

    // API pública
    return {
        start: start,
        stop: stop,
        isActive: isActive,
        onPlayerChat: onPlayerChat,
        setMaps: setMaps
    };
})();
