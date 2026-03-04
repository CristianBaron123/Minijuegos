// LUCKY_HELL - Ruleta del INFIERNO (simplificada)
const LUCKY_HELL = (function() {
    var map = null;
    var gameState = {
        active: false,
        currentPlayer: null,
        room: null,
        onGameEnd: null,
        callbacks: {},
        checkInterval: null,
        globalTimeout: null,
        detection: { zone: null, startTs: 0 },
        selection: { active: false, explanation: false, effect: null, timeout: null, reminderTimeout: null, playerList: [] }
    };

    var config = {
        detectionDelay: 1000,
        checkIntervalMs: 100,
        confirmationTime: 3000,
        maxGameTime: 60000,
        selectionTimeout: 10000,
        selectionReminder: 5000
    };

    // Zonas (curvas) - según coordenadas que enviaste
    // AZUL => ban 1min, VERDE => pasar, ROJO => cerrar sala
    var zones = [];

    // Ban (AZUL) -- 8 tramos
    var banCoords = [
        {a:[-7.38,338.96], b:[16.25,338.47]},
        {a:[41.25,338.47], b:[66.25,338.47]},
        {a:[91.25,338.47], b:[116.25,338.47]},
        {a:[141.25,338.47], b:[166.25,338.47]},
        {a:[211,338.47], b:[236,338.47]},
        {a:[261,338.47], b:[286,338.47]},
        {a:[311,338.47], b:[336,338.47]},
        {a:[361,338.47], b:[386,338.47]}
    ];

    banCoords.forEach(function(c,i){
        zones.push({
            name: 'BAN_'+(i+1),
            color: '0000FF',
            minX: Math.min(c.a[0], c.b[0]),
            maxX: Math.max(c.a[0], c.b[0]),
            minY: Math.min(c.a[1], c.b[1]),
            maxY: Math.max(c.a[1], c.b[1]),
            effect: 'ban_current',
            detectionType: 'curve',
            confirmationTime: config.confirmationTime
        });
    });

    // Pass (VERDE) -- 8 tramos (intercalados)
    var passCoords = [
        {a:[16.25,338.47], b:[41.25,338.47]},
        {a:[66.25,338.47], b:[91.25,338.47]},
        {a:[116.25,338.47], b:[141.25,338.47]},
        {a:[166.25,338.47], b:[211,338.47]},
        {a:[236,338.47], b:[261,338.47]},
        {a:[286,338.47], b:[311,338.47]},
        {a:[336,338.47], b:[361,338.47]},
        {a:[386,338.47], b:[408.49,338.47]}
    ];

    passCoords.forEach(function(c,i){
        zones.push({
            name: 'PASS_'+(i+1),
            color: '00FF00',
            minX: Math.min(c.a[0], c.b[0]),
            maxX: Math.max(c.a[0], c.b[0]),
            minY: Math.min(c.a[1], c.b[1]),
            maxY: Math.max(c.a[1], c.b[1]),
            effect: 'pass_hell',
            detectionType: 'curve',
            confirmationTime: config.confirmationTime
        });
    });

    // Close room (ROJO) - A(166.25,338.47) B(191.25,338.47)
    zones.push({
        name: 'CLOSE_ROOM',
        color: 'FF0000',
        minX: 166.25,
        maxX: 191.25,
        minY: 338.47,
        maxY: 338.47,
        effect: 'close_room',
        detectionType: 'curve',
        confirmationTime: config.confirmationTime
    });

    // Helper: in curve zone if x in range and y >= minY (ball below curve)
    function inZone(ball, z) {
        if (!ball) return false;
        return ball.x >= z.minX && ball.x <= z.maxX && ball.y >= (z.minY || 0);
    }

    function resetDetection() {
        gameState.detection.zone = null;
        gameState.detection.startTs = 0;
    }

    function detectLoop() {
        // no procesar nuevas detecciones mientras hay una selección activa
        if (gameState.selection && gameState.selection.active) return;
        if (!gameState.active || !gameState.room) return;
        var ball = gameState.room.getBallPosition();
        if (!ball) return;

        var found = null;
        for (var i=0;i<zones.length;i++){
            if (inZone(ball, zones[i])) { found = zones[i]; break; }
        }

        var now = Date.now();
        if (found) {
            if (!gameState.detection.zone || gameState.detection.zone.name !== found.name) {
                gameState.detection.zone = found;
                gameState.detection.startTs = now;
            } else {
                var elapsed = now - gameState.detection.startTs;
                var needed = found.confirmationTime || config.confirmationTime;
                if (elapsed >= needed) {
                    resetDetection();
                    executeEffect(gameState.room, found);
                }
            }
        } else {
            resetDetection();
        }
    }

    // Selection (for pass)
    function startSelection(room, effectType, effectData) {
        // evitar iniciar selección si ya hay una en curso
        if (gameState.selection && gameState.selection.active) return;
        try { lockTeamChanges(); } catch(e) {}
        gameState.selection.active = true;
        gameState.selection.explanation = true;
        gameState.selection.effect = { type: effectType, data: effectData };
        gameState.selection.playerList = room.getPlayerList().filter(function(p){
            if (p.id === 0) return false;
            if (gameState.currentPlayer && p.id === gameState.currentPlayer.id) return false;
            if (gameState.callbacks && gameState.callbacks.isAfk && gameState.callbacks.isAfk(p.id)) return false;
            return true;
        });

        if (gameState.selection.playerList.length === 0) {
            room.sendAnnouncement('⚠️ No hay otros jugadores para seleccionar', null, 0xFF6600, 'bold');
            finishEffect(room);
            return;
        }

        room.pauseGame(true);
        if (gameState.currentPlayer) try { room.setPlayerTeam(gameState.currentPlayer.id, 0); } catch(e){}

        var parts = [];
        gameState.selection.playerList.forEach(function(p,i){ parts.push((i+1)+'.'+p.name); });
        var txt = '\n📋 JUGADORES: ' + parts.join('  |  ') + '\n\n📖 ' + (gameState.currentPlayer?gameState.currentPlayer.name:'GANADOR') + ', escribe el NÚMERO para PASAR';
        txt += '\n⏳ Espera 3 segundos para la explicación...';
        room.sendAnnouncement(txt, null, 0x00FF00, 'bold', 2);

        setTimeout(function(){
            gameState.selection.explanation = false;
            room.pauseGame(false);
            room.sendAnnouncement('⏱️ ¡AHORA! Escribe el NÚMERO ('+(config.selectionTimeout/1000)+'s)', null, 0x00FF00, 'bold', 2);

            gameState.selection.reminderTimeout = setTimeout(function(){
                if (gameState.selection.active) room.sendAnnouncement('⏰ ¡5 SEGUNDOS RESTANTES! Escribe el NÚMERO', (gameState.currentPlayer?gameState.currentPlayer.id:null), 0xFFFF00, 'bold');
            }, config.selectionReminder);

            gameState.selection.timeout = setTimeout(function(){
                if (gameState.selection.active) {
                    var r = gameState.selection.playerList[Math.floor(Math.random()*gameState.selection.playerList.length)];
                    room.sendAnnouncement('⏱️ Tiempo agotado - Selección ALEATORIA: '+r.name, null, 0xFF6600, 'bold');
                    cancelSelection();
                    executeSelectionEffect(room, r);
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
        if (gameState.room) {
            try { unlockTeamChanges(); gameState.room.pauseGame(false); if (gameState.currentPlayer) gameState.room.setPlayerTeam(gameState.currentPlayer.id,1); } catch(e){}
        }
    }

    function handleSelectionInput(room, message) {
        if (!gameState.selection.active || gameState.selection.explanation) return;
        var n = parseInt(message.trim());
        if (isNaN(n) || n < 1 || n > gameState.selection.playerList.length) {
            room.sendAnnouncement('❌ Número inválido. Escribe un número del 1 al '+gameState.selection.playerList.length, (gameState.currentPlayer?gameState.currentPlayer.id:null), 0xFF0000);
            return;
        }
        var sel = gameState.selection.playerList[n-1];
        if (sel) {
            room.sendAnnouncement('✅ '+(gameState.currentPlayer?gameState.currentPlayer.name:'Se eligió')+' seleccionó a '+sel.name, null, 0x00FF00, 'bold');
            cancelSelection();
            executeSelectionEffect(room, sel);
        }
    }

    function executeSelectionEffect(room, target) {
        // Asegurar que la selección quede cancelada antes de ejecutar el efecto
        try { cancelSelection(); } catch(e){}
        var eff = gameState.selection.effect;
        if (!eff) { finishEffect(room); return; }
        switch(eff.type) {
            case 'pass_hell':
                if (gameState.callbacks && gameState.callbacks.onLuckyPass && gameState.currentPlayer) gameState.callbacks.onLuckyPass(gameState.currentPlayer.id, target.id);
                room.sendAnnouncement('🔀 '+(gameState.currentPlayer?gameState.currentPlayer.name:'Jugador')+' le pasa LUCKY HELL a '+target.name, null, 0x00FF00, 'bold', 2);
                setTimeout(function(){
                    // Detener y recargar mapa, mover equipos: current -> espectador, target -> rojo
                    try { room.stopGame(); } catch(e){}
                    try { room.setCustomStadium(map); } catch(e){}
                    try { room.startGame(); } catch(e){}

                    if (gameState.currentPlayer) {
                        try { room.setPlayerTeam(gameState.currentPlayer.id, 0); } catch(e){}
                    }
                    try { room.setPlayerTeam(target.id, 1); } catch(e){}

                    gameState.currentPlayer = target;

                    // Reset detection/timers
                    resetDetection();
                    if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }
                    gameState.globalTimeout = setTimeout(function(){ if (gameState.active) { room.sendAnnouncement('⏱️ Tiempo agotado en Lucky HELL!', null, 0xFF6600, 'bold'); stop(room); if (gameState.onGameEnd) gameState.onGameEnd(); } }, config.maxGameTime);
                    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
                    setTimeout(function(){ if (gameState.active) gameState.checkInterval = setInterval(detectLoop, config.checkIntervalMs); }, config.detectionDelay);
                },800);
                break;
            default:
                finishEffect(room);
        }
    }

    function executeEffect(room, zone) {
        // Detener deteccion inmediatamente para evitar doble-trigger
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

        var player = gameState.currentPlayer;
        switch(zone.effect) {
            case 'ban_current':
                if (!player) { finishEffect(room); return; }
                if (gameState.callbacks && gameState.callbacks.isProtected && gameState.callbacks.isProtected(player.id)) {
                    room.sendAnnouncement('🛡️ '+player.name+' está PROTEGIDO! Ban cancelado', null, 0x0000FF, 'bold', 2);
                    finishEffect(room); return;
                }
                room.sendAnnouncement('⚔️ '+player.name+' ha sido BANEADO por 1 MINUTO (Lucky HELL)', null, 0x0000FF, 'bold', 2);
                if (gameState.callbacks && gameState.callbacks.onBanTemp) gameState.callbacks.onBanTemp(player.id, 60);
                finishEffect(room);
                break;

            case 'pass_hell':
                if (!player) { finishEffect(room); return; }
                room.sendAnnouncement('🔀 '+player.name+' cayó en zona VERDE: puede PASAR la RULETA', null, 0x00FF00, 'bold', 2);
                startSelection(room, 'pass_hell');
                break;

            case 'close_room':
                room.sendAnnouncement('🔴 Lucky HELL: Se cerrará la sala. Se kickeará a todos...', null, 0xFF0000, 'bold', 3);
                setTimeout(function(){
                    var pls = room.getPlayerList();
                    pls.forEach(function(p){
                        if (p && p.id !== 0) {
                            var _pAuth = (typeof botState !== 'undefined' && botState.authMap) ? botState.authMap[p.id] : null;
                            if (_pAuth && typeof botState !== 'undefined') botState.kickedByGame[_pAuth] = true;
                            try { room.kickPlayer(p.id, 'Has sido kickeado por cierre de Lucky HELL', false); } catch(e){}
                        }
                    });
                    finishEffect(room);
                }, 2500);
                break;

            default:
                finishEffect(room);
        }
    }

    function finishEffect(room) {
        setTimeout(function(){
            if (!gameState.active) return;
            room.sendAnnouncement('⏸️ Lucky HELL finalizado\n⏱️ Próximo minijuego en 3 segundos...', null, 0xFFFF00, 'bold');
            setTimeout(function(){ stop(room); }, 3000);
        }, 1500);
    }

    function start(room, player, onGameEnd, callbacks) {
        gameState.active = true;
        gameState.room = room;
        gameState.currentPlayer = player;
        gameState.onGameEnd = onGameEnd;
        gameState.callbacks = callbacks || {};

        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }

        room.sendAnnouncement('🔥 Iniciando LUCKY HELL para '+player.name, null, 0x9E9E9E, 'bold');
        // asegurar que el jugador quede en equipo ROJO (1)
        try { room.setPlayerTeam(player.id, 1); } catch(e) {}

        gameState.globalTimeout = setTimeout(function(){ if (gameState.active) { room.sendAnnouncement('⏱️ Tiempo agotado en Lucky HELL!', null, 0xFF6600, 'bold'); stop(room); if (gameState.onGameEnd) gameState.onGameEnd(); } }, config.maxGameTime);

        setTimeout(function(){ if (!gameState.active) return; if (gameState.checkInterval) clearInterval(gameState.checkInterval); gameState.checkInterval = setInterval(detectLoop, config.checkIntervalMs); }, config.detectionDelay);
    }

    function stop(room, suppressCallback) {
        gameState.active = false;
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }
        cancelSelection();
        try { room.stopGame(); } catch(e){}
        if (!suppressCallback && gameState.onGameEnd) { var cb = gameState.onGameEnd; gameState.onGameEnd = null; try { cb(); } catch(e){ console.error('[LUCKY_HELL] onGameEnd callback error', e); } }
        gameState.room = null; gameState.currentPlayer = null; resetDetection();
    }

    function isActive() { return gameState.active; }

    function onPlayerChat(player, message) {
        if (!gameState.active) return true;
        if (gameState.selection.active) {
            if (gameState.selection.explanation) return false;
            if (gameState.currentPlayer && player.id === gameState.currentPlayer.id) {
                handleSelectionInput(gameState.room, message);
            } else {
                if (gameState.room) gameState.room.sendAnnouncement('⛔ Solo el jugador con la ruleta puede elegir el número', player.id, 0xFF6600);
            }
            return false;
        }
        return true;
    }

    function setMap(m) { map = m; }

    function getCurrentPlayer() { return gameState.currentPlayer; }

    function onPlayerLeave(player) {
        try {
            if (!gameState.active || !player) return;
            if (gameState.currentPlayer && player.id === gameState.currentPlayer.id) {
                if (gameState.room) {
                    gameState.room.sendAnnouncement('⚠️ El jugador (' + player.name + ') salió. Finalizando Lucky HELL.', null, 0xFF6600, 'bold');
                }
                try { cancelSelection(); } catch(e){}
                stop(gameState.room);
                return;
            }
            if (gameState.selection && gameState.selection.playerList) {
                gameState.selection.playerList = gameState.selection.playerList.filter(function(p){ return p.id !== player.id; });
            }
        } catch(e) { console.error('[LUCKY_HELL] onPlayerLeave error', e); }
    }

    return { start: start, stop: stop, isActive: isActive, onPlayerChat: onPlayerChat, onPlayerLeave: onPlayerLeave, getCurrentPlayer: getCurrentPlayer, setMap: setMap, config: config, zones: zones };
})();
