// LUCKY_DIOS - Ruleta "Dios" basada en tu snippet
const LUCKY_DIOS = (function() {
    var mapLuckDios = null;
    var mapLuckNormal = null;
    var gameState = {
        active: false,
        currentPlayer: null, // jugador que tira
        room: null,
        onGameEnd: null,
        callbacks: {},
        checkInterval: null,
        globalTimeout: null,
        detection: {
            zone: null,
            startTs: 0
        },
        selection: {
            active: false,
            explanation: false,
            effect: null,
            timeout: null,
            reminderTimeout: null,
            playerList: []
        },
        kickCounters: {} // map playerId -> remaining kicks (si quieres persistir)
    };

    var config = {
        detectionDelay: 1000,
        checkIntervalMs: 100,
        maxGameTime: 60000,
        selectionTimeout: 10000,
        selectionReminder: 5000,
        defaultConfirmation: 3000
    };

    const colorZones = [
        {
            name: 'ROJO',
            color: 'FF1100',
            minX: 20.8,
            maxX: 55.76,
            minY: 350,
            maxY: 376.5,
            effect: 'receive_money_10k',
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
            effect: 'choose_money_10k',
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
            effect: 'receive_money_10k',
            needsSelection: false,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'VERDE_AMARILLO',
            color: 'CE004',
            minX: 140,
            maxX: 520,
            minY: 300,
            maxY: 1000,
            effect: 'pass_dios',
            needsSelection: true,
            confirmationTime: 3000,
            detectionType: 'curve'
        }
    ];

    // Helpers
    function inZone(ball, zone) {
        if (!ball) return false;
        // platform: strict rectangle
        if (zone.detectionType === 'platform') {
            return ball.x >= zone.minX && ball.x <= zone.maxX && ball.y >= zone.minY && ball.y <= zone.maxY;
        }
        // curve: allow if ball is below minY (under curve) and x within range
        if (zone.detectionType === 'curve') {
            return ball.x >= zone.minX && ball.x <= zone.maxX && ball.y >= zone.minY;
        }
        // fallback rectangle
        return ball.x >= zone.minX && ball.x <= zone.maxX && ball.y >= zone.minY && ball.y <= zone.maxY;
    }

    function resetDetection() {
        gameState.detection.zone = null;
        gameState.detection.startTs = 0;
    }

    // Detección periódica con confirmación por tiempo
    function detectLoop() {
        // no procesar nuevas detecciones mientras hay una selección activa
        if (gameState.selection && gameState.selection.active) return;
        if (!gameState.active) return;
        var room = gameState.room;
        if (!room) return;
        var ball = room.getBallPosition();
        if (!ball) return;

        var found = null;
        for (var i = 0; i < colorZones.length; i++) {
            var z = colorZones[i];
            if (inZone(ball, z)) {
                found = z;
                break;
            }
        }

        var now = Date.now();
        if (found) {
            if (!gameState.detection.zone || gameState.detection.zone.name !== found.name) {
                // nueva detección
                gameState.detection.zone = found;
                gameState.detection.startTs = now;
            } else {
                var elapsed = now - gameState.detection.startTs;
                var needed = found.confirmationTime || config.defaultConfirmation;
                if (elapsed >= needed) {
                    // confirmar y ejecutar efecto
                    // reset para evitar re-ejecución inmediata
                    resetDetection();
                    executeEffect(room, found);
                }
            }
        } else {
            resetDetection();
        }
    }

    // Selección de jugadores (misma UX que Lucky)
    function startSelection(room, effectType, effectData) {
        // evitar iniciar selección si ya hay una en curso
        if (gameState.selection && gameState.selection.active) return;
        gameState.selection.active = true;
        gameState.selection.explanation = true;
        gameState.selection.effect = { type: effectType, data: effectData };
        gameState.selection.playerList = room.getPlayerList().filter(function(p) {
            if (p.id === 0) return false;
            if (gameState.currentPlayer && p.id === gameState.currentPlayer.id) return false;
            // Excluir jugadores AFK
            if (gameState.callbacks.isAfk && gameState.callbacks.isAfk(p.id)) return false;
            return true;
        });

        if (gameState.selection.playerList.length === 0) {
            room.sendAnnouncement("⚠️ No hay otros jugadores para seleccionar", null, 0xFF6600, "bold");
            finishEffect(room);
            return;
        }

        // Pausar juego durante explicación y mover currentPlayer a espectador para evitar solapamientos
        room.pauseGame(true);
        try { lockTeamChanges(); } catch(e) {}
        if (gameState.currentPlayer) {
            try { room.setPlayerTeam(gameState.currentPlayer.id, 0); } catch(e) {}
        }

        var purpose = "";
        switch(effectType) {
            case 'choose_ban_1min': purpose = "para BANEAR por 1 minuto"; break;
            case 'choose_money_10k': purpose = "para dar $10.000"; break;
            case 'give_lucky_normal': purpose = "para recibir LUCKY NORMAL"; break;
            case 'pass_dios': purpose = "para recibir la RULETA DIOS"; break;
            default: purpose = "para seleccionar";
        }

        var playerListStr = "\n📋 JUGADORES: ";
        var parts = [];
        gameState.selection.playerList.forEach(function(p,i){ parts.push((i+1)+"."+p.name); });
        playerListStr += parts.join("  |  ");
        playerListStr += "\n\n📖 " + (gameState.currentPlayer ? gameState.currentPlayer.name : "GANADOR") + ", escribe el NÚMERO " + purpose;
        playerListStr += "\n⏳ Espera 3 segundos para la explicación...";

        room.sendAnnouncement(playerListStr, null, 0xFFFF00, "bold", 2);

        setTimeout(function() {
            gameState.selection.explanation = false;
            room.pauseGame(false);
            room.sendAnnouncement("⏱️ ¡AHORA! Escribe el NÚMERO (" + (config.selectionTimeout/1000) + " segundos)", null, 0x00FF00, "bold", 2);

            gameState.selection.reminderTimeout = setTimeout(function() {
                if (gameState.selection.active) {
                    room.sendAnnouncement("⏰ ¡5 SEGUNDOS RESTANTES! Escribe el NÚMERO", (gameState.currentPlayer ? gameState.currentPlayer.id : null), 0xFFFF00, "bold");
                }
            }, config.selectionReminder);

            gameState.selection.timeout = setTimeout(function() {
                if (gameState.selection.active) {
                    var randomPlayer = gameState.selection.playerList[Math.floor(Math.random()*gameState.selection.playerList.length)];
                    room.sendAnnouncement("⏱️ Tiempo agotado - Selección ALEATORIA: " + randomPlayer.name, null, 0xFF6600, "bold");
                    cancelSelection();
                    executeSelectionEffect(room, randomPlayer);
                }
            }, config.selectionTimeout);
        }, 3000);
    }

    function cancelSelection() {
        gameState.selection.active = false;
        gameState.selection.explanation = false;
        gameState.selection.playerList = [];
        if (gameState.selection.timeout) { clearTimeout(gameState.selection.timeout); gameState.selection.timeout = null; }
        if (gameState.selection.reminderTimeout) { clearTimeout(gameState.selection.reminderTimeout); gameState.selection.reminderTimeout = null; }
        // reanudar juego y restaurar equipo del currentPlayer si existe
        if (gameState.room) {
            try {
                try { unlockTeamChanges(); } catch(e) {}
                gameState.room.pauseGame(false);
                if (gameState.currentPlayer) {
                    gameState.room.setPlayerTeam(gameState.currentPlayer.id, 1);
                }
            } catch (e) {}
        }
    }

    function handleSelectionInput(room, message) {
        if (!gameState.selection.active || gameState.selection.explanation) return;
        var selectedNumber = parseInt(message.trim());
        if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > gameState.selection.playerList.length) {
            room.sendAnnouncement("❌ Número inválido. Escribe un número del 1 al " + gameState.selection.playerList.length, (gameState.currentPlayer ? gameState.currentPlayer.id : null), 0xFF0000);
            return;
        }
        var selectedPlayer = gameState.selection.playerList[selectedNumber - 1];
        if (selectedPlayer) {
            room.sendAnnouncement("✅ " + (gameState.currentPlayer ? gameState.currentPlayer.name : "Se eligió") + " seleccionó a " + selectedPlayer.name, null, 0x00FF00, "bold");
            cancelSelection();
            executeSelectionEffect(room, selectedPlayer);
        }
    }

    function executeSelectionEffect(room, targetPlayer) {
        var effect = gameState.selection.effect;
        if (!effect) {
            finishEffect(room);
            return;
        }

        switch(effect.type) {
            case 'choose_ban_1min':
                if (gameState.callbacks && gameState.callbacks.isProtected && gameState.callbacks.isProtected(targetPlayer.id)) {
                    room.sendAnnouncement("🛡️ " + targetPlayer.name + " está PROTEGIDO! Ban cancelado", null, 0x0000FF, "bold", 2);
                    finishEffect(room); break;
                }
                room.sendAnnouncement("⚔️ " + targetPlayer.name + " ha sido BANEADO por 1 MINUTO (elegido por " + gameState.currentPlayer.name + ")", null, 0xD2AB0B, "bold", 2);
                if (gameState.callbacks.onBanTemp) gameState.callbacks.onBanTemp(targetPlayer.id, 60);
                finishEffect(room);
                break;

            case 'choose_money_10k':
                room.sendAnnouncement("💰 " + targetPlayer.name + " recibe $10.000 (otorgado por " + gameState.currentPlayer.name + ")", null, 0xFF0000, "bold", 2);
                if (gameState.callbacks.onReceiveMoney) {
                    gameState.callbacks.onReceiveMoney(targetPlayer.id, targetPlayer.name, 10000);
                }
                finishEffect(room);
                break;

            case 'give_lucky_normal':
                if (gameState.callbacks.onLuckyPass) gameState.callbacks.onLuckyPass(gameState.currentPlayer.id, targetPlayer.id);
                room.sendAnnouncement("🎯 " + targetPlayer.name + " recibirá LUCKY NORMAL (elegido por " + gameState.currentPlayer.name + ")", null, 0x2A505E, "bold", 2);
                // Guardar callbacks antes de stop (stop limpia state)
                var savedOnGameEnd = gameState.onGameEnd;
                var savedCallbacks = gameState.callbacks;
                setTimeout(function() {
                    // Invocar lucky normal (LUCKY) si existe
                    stop(room, true);
                    try {
                        room.stopGame();
                        if (typeof LUCKY !== 'undefined' && LUCKY.start) {
                            var stadium = mapLuckNormal || mapLuckDios || null;
                            if (stadium) room.setCustomStadium(stadium);
                            room.startGame();

                            // Mover al jugador elegido a equipo rojo
                            setTimeout(function() {
                                try { room.setPlayerTeam(targetPlayer.id, 1); } catch(e){}
                                // Mover a todos los demas a espectador
                                var allPlayers = room.getPlayerList().filter(function(p) { return p.id !== 0; });
                                allPlayers.forEach(function(p) {
                                    if (p.id !== targetPlayer.id) {
                                        try { room.setPlayerTeam(p.id, 0); } catch(e){}
                                    }
                                });
                                // Iniciar Lucky normal para el jugador elegido
                                LUCKY.start(room, targetPlayer, savedOnGameEnd, savedCallbacks);
                            }, 100);
                        } else {
                            if (savedOnGameEnd) savedOnGameEnd();
                        }
                    } catch(e) { if (savedOnGameEnd) savedOnGameEnd(); }
                }, 1000);
                break;

            case 'pass_dios':
                if (gameState.callbacks.onLuckyPass) gameState.callbacks.onLuckyPass(gameState.currentPlayer.id, targetPlayer.id);
                room.sendAnnouncement("🔀 " + gameState.currentPlayer.name + " le pasa la RULETA DIOS a " + targetPlayer.name, null, 0xCE004, "bold", 2);
                setTimeout(function() {
                    // Detener y recargar mapa
                    try { room.stopGame(); } catch(e){}
                    try { room.setCustomStadium(mapLuckDios); } catch(e){}

                    // PRIMERO: poner receptor en Red (para que Red nunca quede vacío)
                    try { room.setPlayerTeam(targetPlayer.id, 1); } catch(e){}

                    // Mover TODOS los demás a espectador
                    var allPlayers = room.getPlayerList().filter(function(p) { return p.id !== 0 && p.id !== targetPlayer.id; });
                    allPlayers.forEach(function(p) {
                        try { room.setPlayerTeam(p.id, 0); } catch(e){}
                    });

                    // Iniciar juego con PABLO en Red
                    try { room.startGame(); } catch(e){}

                    // actualizar currentPlayer
                    gameState.currentPlayer = targetPlayer;

                    // Reset timers and detection
                    resetDetection();
                    if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }
                    gameState.globalTimeout = setTimeout(function() {
                        if (gameState.active) {
                            room.sendAnnouncement("⏱️ Tiempo agotado en Lucky DIOS!", null, 0xFF6600, "bold");
                            stop(room);
                            if (gameState.onGameEnd) gameState.onGameEnd();
                        }
                    }, config.maxGameTime);
                    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
                    setTimeout(function() {
                        if (gameState.active) {
                            gameState.checkInterval = setInterval(detectLoop, config.checkIntervalMs);
                        }
                    }, config.detectionDelay);
                }, 800);
                break;

            default:
                finishEffect(room);
        }
    }

    // Obtener auth de un jugador (usar authMap de botState si está disponible)
    function getPlayerAuth(player) {
        if (player.auth) return player.auth;
        if (typeof botState !== 'undefined' && botState.authMap && botState.authMap[player.id]) {
            return botState.authMap[player.id];
        }
        return null;
    }

    // Función para ejecutar el siguiente kick del ciclo de 10 kicks
    // NO depende de gameState.active — los kicks persisten entre juegos
    function doNextKick(room, auth) {
        var counter = gameState.kickCounters[auth];
        if (!counter || counter.remaining <= 0) {
            room.sendAnnouncement("✅ " + (counter ? counter.name : "Jugador") + " ya recibió todos los kicks.", null, 0xFF6600, "bold");
            delete gameState.kickCounters[auth];
            return;
        }
        // Buscar jugador actual por su currentPid (puede cambiar tras rejoin)
        var p = room.getPlayer(counter.currentPid);
        if (!p) {
            counter.waiting = true;
            room.sendAnnouncement("ℹ️ " + counter.name + " fue kickeado. Quedan " + counter.remaining + " kicks. Esperando que vuelva...", null, 0xFF6600);
            return;
        }
        room.sendAnnouncement("⚠️ Kick " + (11 - counter.remaining) + "/10 a " + p.name + " (" + counter.remaining + " restantes)", null, 0x67290A, "bold");
        counter.remaining--;
        counter.waiting = true;
        if (typeof botState !== 'undefined' && auth) botState.kickedByGame[auth] = true;
        try { room.kickPlayer(counter.currentPid, "Kick por caer en MARRÓN (" + (counter.remaining) + " restantes)", false); } catch(e) {}
    }

    // Cuando un jugador entra, verificar si tiene kicks pendientes (buscar por auth)
    // NO depende de gameState.active — los kicks persisten entre juegos
    function onPlayerJoin(room, player) {
        var playerAuth = getPlayerAuth(player);
        if (!playerAuth) return;
        var counter = gameState.kickCounters[playerAuth];
        if (counter && counter.waiting && counter.remaining > 0) {
            counter.waiting = false;
            counter.currentPid = player.id; // Actualizar ID (cambia tras rejoin)
            setTimeout(function() {
                doNextKick(room, playerAuth);
            }, 1500);
        } else if (counter && counter.remaining <= 0) {
            room.sendAnnouncement("✅ " + player.name + " ya recibió todos los kicks.", null, 0xFF6600, "bold");
            delete gameState.kickCounters[playerAuth];
        }
    }

    // Ejecutar efectos no selectivos
    function executeEffect(room, zone) {
        // Detener deteccion inmediatamente para evitar doble-trigger
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

        var effect = zone.effect;
        var player = gameState.currentPlayer;

        room.sendAnnouncement("🎯 Color confirmado: " + zone.name + " (" + zone.color + ")", null, 0xFFFFFF, "bold");

        switch(effect) {
            case 'receive_money_10k':
                room.sendAnnouncement("💰 " + player.name + " recibe $10.000!", null, 0xFF1100, "bold", 2);
                if (gameState.callbacks.onReceiveMoney) {
                    gameState.callbacks.onReceiveMoney(player.id, player.name, 10000);
                }
                finishEffect(room);
                break;

            case 'choose_ban_1min':
                room.sendAnnouncement("⚔️ " + player.name + " cayó en MAGENTA: debe ESCOGER a quien BANEAR", null, 0xEC08EC, "bold", 2);
                startSelection(room, 'choose_ban_1min');
                break;

            case 'give_lucky_normal':
                // GRIS: Skip - salta al siguiente minijuego
                room.sendAnnouncement("⏭️ " + player.name + " cayó en GRIS: SKIP!", null, 0x2A505E, "bold", 2);
                finishEffect(room);
                break;

            case 'choose_money_10k':
                room.sendAnnouncement("💰 " + player.name + " cayó en AZUL: debe ESCOGER a quien dar $10.000", null, 0x1B4BED, "bold", 2);
                startSelection(room, 'choose_money_10k');
                break;

            case 'protection':
                room.sendAnnouncement("🛡️ " + player.name + " ¡SALVADO POR EL CONDÓN! 🛡️\n🛡️ Tiene protección para el próximo Lucky!", null, 0xED7006, "bold", 2);
                if (gameState.callbacks.onProtection) gameState.callbacks.onProtection(player.id);
                finishEffect(room);
                break;

            case 'kick_10_times':
                room.sendAnnouncement("🔨 " + player.name + " ha caído en MARRÓN: recibirá 10 KICKS", null, 0x67290A, "bold", 2);
                var kickAuth = getPlayerAuth(player);
                if (kickAuth) {
                    gameState.kickCounters[kickAuth] = { remaining: 10, name: player.name, currentPid: player.id, waiting: false };
                    // Primer kick — al ser kickeado, onPlayerLeave terminará Lucky DIOS
                    // y los minijuegos continuarán. Los kicks restantes se ejecutan en onPlayerJoin.
                    doNextKick(room, kickAuth);
                } else {
                    room.sendAnnouncement("⚠️ No se pudo identificar al jugador para los kicks", null, 0xFF6600);
                    finishEffect(room);
                }
                break;

            case 'pass_dios':
                // VERDE_AMARILLO: Skip - salta al siguiente minijuego
                room.sendAnnouncement("⏭️ " + player.name + " cayó en SKIP!", null, 0xCE004, "bold", 2);
                finishEffect(room);
                break;

            default:
                finishEffect(room);
        }
    }

    function finishEffect(room) {
        // Esperar un poco y continuar (no detener la ruleta DIOS automáticamente si la intención es seguir)
        setTimeout(function() {
            if (!gameState.active) return;
            room.sendAnnouncement("⏸️ Lucky DIOS finalizado\n⏱️ Próximo minijuego en 3 segundos...", null, 0xFFFF00, "bold");
            setTimeout(function() {
                stop(room);
            }, 3000);
        }, 1500);
    }

    function start(room, player, onGameEnd, callbacks) {
        gameState.active = true;
        gameState.room = room;
        gameState.currentPlayer = player;
        gameState.onGameEnd = onGameEnd;
        gameState.callbacks = callbacks || {};

        // limpiar posibles intervalos previos
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }

        room.sendAnnouncement("✨ Iniciando LUCKY DIOS para " + player.name, null, 0xAC6FF3, "bold");
        // Asegurar que el jugador que tira quede en equipo ROJO (1)
        try { room.setPlayerTeam(player.id, 1); } catch(e) {}
        // Timeout global
        gameState.globalTimeout = setTimeout(function() {
            if (!gameState.active) return;
            room.sendAnnouncement("⏱️ Tiempo agotado en Lucky DIOS!", null, 0xFF6600, "bold");
            stop(room);
            if (gameState.onGameEnd) gameState.onGameEnd();
        }, config.maxGameTime);

        // iniciar detección después de delay
        setTimeout(function() {
            if (!gameState.active) return;
            // asegurar único interval
            if (gameState.checkInterval) clearInterval(gameState.checkInterval);
            gameState.checkInterval = setInterval(detectLoop, config.checkIntervalMs);
        }, config.detectionDelay);
    }

    function stop(room, suppressCallback) {
        gameState.active = false;

        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }

        // limpiar selección si activa
        cancelSelection();
        // NO limpiar kickCounters — persisten entre juegos para completar los 10 kicks

        try { room.stopGame(); } catch(e){}

        if (!suppressCallback && gameState.onGameEnd) {
            var cb = gameState.onGameEnd;
            gameState.onGameEnd = null;
            try { cb(); } catch(e) { console.error('[LUCKY_DIOS] onGameEnd callback error', e); }
        }
        // reset state
        gameState.room = null;
        gameState.currentPlayer = null;
    }

    function isActive() { return gameState.active; }

    // Manejo de chat para selecciones: solo permitir que currentPlayer escriba durante selección
    function onPlayerChat(player, message) {
        if (!gameState.active) return true;
        if (gameState.selection.active) {
            if (gameState.selection.explanation) return false; // bloquear todo
            if (gameState.currentPlayer && player.id === gameState.currentPlayer.id) {
                handleSelectionInput(gameState.room, message);
            } else {
                if (gameState.room) gameState.room.sendAnnouncement("⛔ Solo el jugador con la ruleta puede elegir el número", player.id, 0xFF6600);
            }
            return false;
        }
        return true;
    }

    function setMap(map) { mapLuckDios = map; }

    function setMaps(diosMap, normalMap) {
        mapLuckDios = diosMap;
        mapLuckNormal = normalMap;
    }

    function getCurrentPlayer() { return gameState.currentPlayer; }

    function onPlayerLeave(player) {
        try {
            if (!gameState.active || !player) return;
            if (gameState.currentPlayer && player.id === gameState.currentPlayer.id) {
                if (gameState.room) {
                    gameState.room.sendAnnouncement('⚠️ El jugador (' + player.name + ') salió. Finalizando Lucky DIOS.', null, 0xFF6600, 'bold');
                }
                try { cancelSelection(); } catch(e){}
                stop(gameState.room);
                return;
            }
            // Remover de playerList si estaba en selección
            if (gameState.selection && gameState.selection.playerList) {
                gameState.selection.playerList = gameState.selection.playerList.filter(function(p){ return p.id !== player.id; });
            }
        } catch(e) { console.error('[LUCKY_DIOS] onPlayerLeave error', e); }
    }

    return {
        start: start,
        stop: stop,
        isActive: isActive,
        onPlayerChat: onPlayerChat,
        onPlayerJoin: onPlayerJoin,
        onPlayerLeave: onPlayerLeave,
        getCurrentPlayer: getCurrentPlayer,
        setMap: setMap,
        setMaps: setMaps,
        config: config,
        zones: colorZones
    };
})();