// ============================================
// MINIJUEGO: IMPOSTOR - Estilo Among Us / Werewolf
// 1 impostor (<8 jugadores) o 2 impostores (8+)
// Roles inocentes: Medico, Vidente, Guardaespaldas, Sacerdote, Carcelero, Bufon, Cupido, Bruja, Cazador
// Roles impostor: Impostor Vidente (1 de los 2 impostores cuando hay 8+)
// Rol neutral: Piromano (11+) - empapar/incendiar, inmune a impostores, gana solo
// ============================================

var mapData = null;
var _room = null;

var gameState = {
    active: false,
    phase: null,        // 'setup', 'kill', 'discussion', 'voting', 'result'
    players: [],        // [{id, name, number, role, alive}]
    impostorIds: [],    // array de IDs de impostores
    medicoId: null,     // ID del medico
    videnteId: null,    // ID del vidente
    bodyguardId: null,  // ID del guardaespaldas
    bodyguardHits: 0,   // golpes recibidos (muere al 2do)
    sacerdoteId: null,  // ID del sacerdote
    jailerId: null,     // ID del carcelero
    jailedPlayerId: null, // ID del jugador encarcelado esta noche
    pendingJail: null,  // numero elegido durante discusion para encarcelar
    jailerBulletUsed: false, // bala unica del carcelero (true = ya la uso)
    jailerKilledThisNight: false, // si el carcelero mato al preso esta noche
    protectedPlayerId: null, // ID del jugador protegido por medico esta noche
    guardedPlayerId: null,   // ID del jugador protegido por guardaespaldas esta noche
    pendingProtect: null,    // eleccion del medico esta noche (target number)
    pendingGuard: null,      // eleccion del guardaespaldas esta noche (target number)
    pendingHolyWater: null,  // eleccion del sacerdote esta noche (target number)
    pendingVision: null,     // eleccion del vidente esta noche (target number)
    videnteActed: false,     // si el vidente ya actuo esta noche
    bufonId: null,           // ID del bufon
    impostorVidenteId: null, // ID del impostor vidente (sub-rol de impostor)
    pendingImpostorVision: null, // eleccion del impostor vidente esta noche
    impostorVidenteActed: false, // si el impostor vidente ya investigo esta noche
    cupidoId: null,          // ID del cupido
    linkedPair: [],          // [id1, id2] jugadores vinculados
    cupidoChoice1: null,     // primer jugador elegido por cupido
    brujaId: null,           // ID de la bruja
    brujaLifeUsed: false,    // pocion de vida usada
    brujaDeathUsed: false,   // pocion de muerte usada
    pendingBrujaLife: null,  // target number pocion vida esta noche
    pendingBrujaDeath: null, // target number pocion muerte esta noche
    brujaProtectedId: null,  // ID protegido por bruja esta noche
    cazadorId: null,         // ID del cazador
    cazadorShot: false,      // si el cazador ya uso su disparo
    cazadorDying: false,     // si el cazador esta en fase de disparo
    cazadorCallback: null,   // callback despues del disparo del cazador
    cazadorTarget: null,     // numero del objetivo elegido por el cazador (persistente entre noches)
    piromanoId: null,        // ID del piromano
    dousedPlayers: [],       // array de IDs empapados con gasolina
    piromanoDouseTargets: [], // targets elegidos esta noche para empapar
    piromanoAction: null,    // 'douse' o 'ignite' - accion elegida esta noche
    round: 0,
    votes: {},          // {voterId: targetNumber}
    pendingKills: {},   // {impostorId: targetNumber}
    phaseTimer: null,
    timeouts: [],
    activePlayers: {},  // {playerId: true}
    savedTeams: {},     // {playerId: teamId}
    onGameEnd: null
};

var config = {
    minPlayers: 4,
    setupMs: 15000,      // 5s reglas + 10s para leer roles
    killMs: 20000,       // 20s para que los impostores/medico/vidente elijan
    discussionMs: 45000, // 45s discusion
    votingMs: 15000      // 15s votacion
};

var filteredWords = ['impostor', 'inocente', 'asesino', 'killer', 'soy el imp', 'yo soy el', 'mi rol es', 'soy imp', 'medico', 'vidente', 'soy med', 'soy vid', 'guardaespaldas', 'soy guard', 'bodyguard', 'sacerdote', 'soy sac', 'padre', 'carcelero', 'soy car', 'jailer', 'bufon', 'bufo', 'soy buf', 'imp vidente', 'cupido', 'soy cup', 'bruja', 'soy bru', 'cazador', 'soy caz', 'clarividente', 'soy clar', 'medium', 'nino flor', 'ninoflor', 'soy nino', 'embrujado', 'soy embru'];

// ============================================
// HELPERS
// ============================================
function getAlivePlayers() {
    return gameState.players.filter(function(p) { return p.alive; });
}

function getAliveImpostors() {
    return gameState.players.filter(function(p) { return p.alive && p.role === 'impostor'; });
}

function isImpostor(playerId) {
    return gameState.impostorIds.indexOf(playerId) !== -1;
}

function isInnocentTeam(role) {
    return role === 'inocente' || role === 'medico' || role === 'vidente' || role === 'guardaespaldas' || role === 'sacerdote' || role === 'carcelero' || role === 'bufon' || role === 'cupido' || role === 'bruja' || role === 'cazador' || role === 'clarividente' || role === 'ninoflor' || role === 'embrujado';
}

function findPlayerById(id) {
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].id === id) return gameState.players[i];
    }
    return null;
}

function findPlayerByNumber(num) {
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].number === num) return gameState.players[i];
    }
    return null;
}

function clearAllTimeouts() {
    if (gameState.phaseTimer) { clearTimeout(gameState.phaseTimer); gameState.phaseTimer = null; }
    for (var i = 0; i < gameState.timeouts.length; i++) {
        clearTimeout(gameState.timeouts[i]);
    }
    gameState.timeouts = [];
}

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    if (gameState.active) return;
    _room = room;

    var allPlayers = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    if (allPlayers.length < config.minPlayers) {
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.onGameEnd = onGameEnd;
    gameState.round = 0;
    gameState.votes = {};
    gameState.timeouts = [];
    gameState.activePlayers = {};
    gameState.savedTeams = {};
    gameState.pendingKills = {};
    gameState.phase = 'setup';
    gameState.medicoId = null;
    gameState.videnteId = null;
    gameState.bodyguardId = null;
    gameState.bodyguardHits = 0;
    gameState.sacerdoteId = null;
    gameState.jailerId = null;
    gameState.jailedPlayerId = null;
    gameState.pendingJail = null;
    gameState.jailerBulletUsed = false;
    gameState.jailerKilledThisNight = false;
    gameState.protectedPlayerId = null;
    gameState.guardedPlayerId = null;
    gameState.pendingProtect = null;
    gameState.pendingGuard = null;
    gameState.pendingHolyWater = null;
    gameState.pendingVision = null;
    gameState.videnteActed = false;
    gameState.bufonId = null;
    gameState.impostorVidenteId = null;
    gameState.pendingImpostorVision = null;
    gameState.impostorVidenteActed = false;
    gameState.cupidoId = null;
    gameState.linkedPair = [];
    gameState.cupidoChoice1 = null;
    gameState.brujaId = null;
    gameState.brujaLifeUsed = false;
    gameState.brujaDeathUsed = false;
    gameState.pendingBrujaLife = null;
    gameState.pendingBrujaDeath = null;
    gameState.brujaProtectedId = null;
    gameState.cazadorId = null;
    gameState.cazadorShot = false;
    gameState.cazadorDying = false;
    gameState.cazadorCallback = null;
    gameState.cazadorTarget = null;
    gameState.clarividenteId = null;
    gameState.clarividenteReviveUsed = false;
    gameState.pendingRevive = null;
    gameState.ninoFlorId = null;
    gameState.ninoFlorUsed = false;
    gameState.ninoFlorActivated = false;
    gameState.embrujadoId = null;
    gameState.embrujadoConverted = false;
    gameState.piromanoId = null;
    gameState.dousedPlayers = [];
    gameState.piromanoDouseTargets = [];
    gameState.piromanoAction = null;

    // Cargar mapa
    try {
        if (mapData) room.setCustomStadium(mapData);
    } catch(e) { console.error('IMPOSTOR: error cargando mapa', e && e.message); }

    // Mezclar jugadores
    for (var i = allPlayers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = allPlayers[i]; allPlayers[i] = allPlayers[j]; allPlayers[j] = tmp;
    }

    // Asignar equipos alternados
    for (var k = 0; k < allPlayers.length; k++) {
        try { room.setPlayerTeam(allPlayers[k].id, (k % 2 === 0) ? 1 : 2); } catch(e) {}
    }

    // Elegir impostores: 3 si 14+, 2 si 8+, 1 si menos
    var numImpostors = allPlayers.length >= 14 ? 3 : (allPlayers.length >= 8 ? 2 : 1);
    gameState.impostorIds = [];

    // Elegir indices para impostores
    var usedIndices = [];
    while (usedIndices.length < numImpostors) {
        var idx = Math.floor(Math.random() * allPlayers.length);
        if (usedIndices.indexOf(idx) === -1) {
            usedIndices.push(idx);
        }
    }

    // Elegir indices para roles especiales (no impostor)
    var medicoIdx = -1;
    var videnteIdx = -1;
    var bodyguardIdx = -1;
    var sacerdoteIdx = -1;
    var jailerIdx = -1;
    var innocentIndices = [];
    for (var ii = 0; ii < allPlayers.length; ii++) {
        if (usedIndices.indexOf(ii) === -1) innocentIndices.push(ii);
    }
    // Mezclar inocentes
    for (var si = innocentIndices.length - 1; si > 0; si--) {
        var sj = Math.floor(Math.random() * (si + 1));
        var stmp = innocentIndices[si]; innocentIndices[si] = innocentIndices[sj]; innocentIndices[sj] = stmp;
    }
    // Escalar roles segun cantidad de jugadores:
    // 4-5: Medico, Vidente
    // 6: +Guardaespaldas
    // 7: +Bufon
    // 8-9: +Sacerdote, +Cupido (+Impostor Vidente)
    // 10-11: +Carcelero, +Bruja
    // 12+: +Cazador
    var bufonIdx = -1;
    var cupidoIdx = -1;
    var brujaIdx = -1;
    var cazadorIdx = -1;
    var totalPlayers = allPlayers.length;
    var ri = 0; // role index
    if (totalPlayers >= 4 && innocentIndices.length > ri) { medicoIdx = innocentIndices[ri++]; }
    if (totalPlayers >= 4 && innocentIndices.length > ri) { videnteIdx = innocentIndices[ri++]; }
    if (totalPlayers >= 6 && innocentIndices.length > ri) { bodyguardIdx = innocentIndices[ri++]; }
    if (totalPlayers >= 8 && innocentIndices.length > ri) { sacerdoteIdx = innocentIndices[ri++]; }
    if (totalPlayers >= 10 && innocentIndices.length > ri) { jailerIdx = innocentIndices[ri++]; }
    if (totalPlayers >= 7 && innocentIndices.length > ri) { bufonIdx = innocentIndices[ri++]; }
    if (totalPlayers >= 8 && innocentIndices.length > ri) { cupidoIdx = innocentIndices[ri++]; }
    if (totalPlayers >= 10 && innocentIndices.length > ri) { brujaIdx = innocentIndices[ri++]; }
    if (totalPlayers >= 12 && innocentIndices.length > ri) { cazadorIdx = innocentIndices[ri++]; }
    var piromanoIdx = -1;
    if (totalPlayers >= 11 && innocentIndices.length > ri) { piromanoIdx = innocentIndices[ri++]; }
    var embrujadoIdx = -1;
    var ninoFlorIdx = -1;
    var clarividenteIdx = -1;
    if (totalPlayers >= 12 && innocentIndices.length > ri) { embrujadoIdx = innocentIndices[ri++]; }
    if (totalPlayers >= 13 && innocentIndices.length > ri) { ninoFlorIdx = innocentIndices[ri++]; }
    if (totalPlayers >= 14 && innocentIndices.length > ri) { clarividenteIdx = innocentIndices[ri++]; }

    // Asignar numeros y roles
    gameState.players = [];
    for (var n = 0; n < allPlayers.length; n++) {
        var role;
        if (usedIndices.indexOf(n) !== -1) {
            role = 'impostor';
            gameState.impostorIds.push(allPlayers[n].id);
        } else if (n === medicoIdx) {
            role = 'medico';
            gameState.medicoId = allPlayers[n].id;
        } else if (n === videnteIdx) {
            role = 'vidente';
            gameState.videnteId = allPlayers[n].id;
        } else if (n === bodyguardIdx) {
            role = 'guardaespaldas';
            gameState.bodyguardId = allPlayers[n].id;
        } else if (n === sacerdoteIdx) {
            role = 'sacerdote';
            gameState.sacerdoteId = allPlayers[n].id;
        } else if (n === jailerIdx) {
            role = 'carcelero';
            gameState.jailerId = allPlayers[n].id;
        } else if (n === bufonIdx) {
            role = 'bufon';
            gameState.bufonId = allPlayers[n].id;
        } else if (n === cupidoIdx) {
            role = 'cupido';
            gameState.cupidoId = allPlayers[n].id;
        } else if (n === brujaIdx) {
            role = 'bruja';
            gameState.brujaId = allPlayers[n].id;
        } else if (n === cazadorIdx) {
            role = 'cazador';
            gameState.cazadorId = allPlayers[n].id;
        } else if (n === piromanoIdx) {
            role = 'piromano';
            gameState.piromanoId = allPlayers[n].id;
        } else if (n === embrujadoIdx) {
            role = 'embrujado';
            gameState.embrujadoId = allPlayers[n].id;
        } else if (n === ninoFlorIdx) {
            role = 'ninoflor';
            gameState.ninoFlorId = allPlayers[n].id;
        } else if (n === clarividenteIdx) {
            role = 'clarividente';
            gameState.clarividenteId = allPlayers[n].id;
        } else {
            role = 'inocente';
        }
        gameState.players.push({
            id: allPlayers[n].id,
            name: allPlayers[n].name,
            number: n + 1,
            role: role,
            alive: true
        });
        gameState.activePlayers[allPlayers[n].id] = true;
    }

    // Si hay 2+ impostores, uno se convierte en Impostor Vidente
    if (gameState.impostorIds.length >= 2) {
        gameState.impostorVidenteId = gameState.impostorIds[Math.floor(Math.random() * gameState.impostorIds.length)];
    }

    room.startGame();
    try { room.pauseGame(true); } catch(e) {}

    // Anuncio principal con reglas
    var impText = numImpostors >= 2 ? ('Hay ' + numImpostors + ' impostores entre ustedes...') : 'Hay un impostor entre ustedes...';
    var rulesText = numImpostors >= 2
        ? '📋 REGLAS: Los impostores matan de noche. De dia, discutan y voten.\n🏆 Si eliminan a TODOS los impostores, ganan los inocentes!'
        : '📋 REGLAS: El impostor mata de noche. De dia, discutan y voten.\n🏆 Si eliminan al impostor, ganan los inocentes!';
    room.sendAnnouncement('\n🔪 MINIJUEGO: IMPOSTOR\n👥 Jugadores: ' + allPlayers.length + '\n🎭 ' + impText + '\n' + rulesText, null, 0xFF0000, 'bold', 2);

    // Despues de 5 segundos, enviar roles privados
    var tRoles = setTimeout(function() {
        if (!gameState.active) return;

        // Enviar roles privados
        for (var r = 0; r < gameState.players.length; r++) {
            var pl = gameState.players[r];
            if (pl.role === 'impostor') {
                if (numImpostors >= 2) {
                    var companions = [];
                    for (var c = 0; c < gameState.players.length; c++) {
                        if (gameState.players[c].role === 'impostor' && gameState.players[c].id !== pl.id) {
                            companions.push(gameState.players[c].name);
                        }
                    }
                    var compMsg = companions.length > 0 ? ('\n🤝 Compañero(s): ' + companions.join(', ')) : '';
                    var chatHint = '\n💬 De noche puedes chatear con tus compañeros (escribe texto, no numeros).';
                    if (pl.id === gameState.impostorVidenteId) {
                        room.sendAnnouncement('🔪🔮 Eres IMPOSTOR VIDENTE!\nPuedes investigar el rol de 1 jugador cada noche con !ver [numero].\nEscribe sin #. Ej: !ver 3\nSi eres el ultimo impostor, pierdes esta habilidad.\nEscribe !renunciar para abandonar tu habilidad y ser impostor normal.' + compMsg + chatHint, pl.id, 0xFF00AA, 'bold', 2);
                    } else {
                        room.sendAnnouncement('🔪 Eres IMPOSTOR! Elimina a todos sin ser descubierto.' + compMsg + chatHint, pl.id, 0xFF0000, 'bold', 2);
                    }
                } else {
                    room.sendAnnouncement('🔪 Eres el IMPOSTOR! Elimina a todos sin ser descubierto.', pl.id, 0xFF0000, 'bold', 2);
                }
            } else if (pl.role === 'medico') {
                room.sendAnnouncement('🏥 Eres el MEDICO! Cada noche puedes proteger a 1 jugador.\nA ese jugador no se le podra matar esa noche.\nEscribe solo el numero del jugador (sin #). Ej: 3', pl.id, 0x00FFAA, 'bold', 2);
            } else if (pl.role === 'vidente') {
                room.sendAnnouncement('🔮 Eres el VIDENTE! Cada noche puedes ver el rol de 1 jugador.\nEscribe solo el numero del jugador (sin #). Ej: 3', pl.id, 0xAA00FF, 'bold', 2);
            } else if (pl.role === 'guardaespaldas') {
                room.sendAnnouncement('🛡️ Eres el GUARDAESPALDAS! Cada noche puedes proteger a 1 jugador.\nSi lo atacan, te atacan a ti en su lugar. Sobrevives al 1er ataque, mueres al 2do.\nTe proteges a ti mismo por defecto si no eliges.\nEscribe solo el numero del jugador (sin #). Ej: 3', pl.id, 0x4488FF, 'bold', 2);
            } else if (pl.role === 'sacerdote') {
                room.sendAnnouncement('⛪ Eres el SACERDOTE! Cada noche puedes arrojar agua bendita a 1 jugador.\nSi es IMPOSTOR, el muere. Si NO es impostor, TU mueres.\nEs opcional - si no escribes nada, no pasa nada.\nEscribe solo el numero del jugador (sin #). Ej: 3', pl.id, 0xFFFFAA, 'bold', 2);
            } else if (pl.role === 'carcelero') {
                room.sendAnnouncement('🔒 Eres el CARCELERO! Durante el dia escribe !jail [numero] para encarcelar a alguien.\nDe noche: el preso no puede usar habilidades ni ser atacado.\nPuedes hablar con el preso de forma anonima.\nEscribe !matar para usar tu UNICA bala y matarlo.', pl.id, 0x888888, 'bold', 2);
            } else if (pl.role === 'bufon') {
                room.sendAnnouncement('🃏 Eres el BUFON! Tu objetivo es que te VOTEN para eliminarte.\nSi la aldea te elimina por votacion, TU GANAS!\nHazte sospechoso sin ser obvio...', pl.id, 0xFF8800, 'bold', 2);
            } else if (pl.role === 'cupido') {
                room.sendAnnouncement('💘 Eres CUPIDO! En la primera noche vincula a 2 jugadores.\nSi uno muere, el otro tambien!\nEscribe 2 numeros (uno por uno, sin #). Ej: 3', pl.id, 0xFF69B4, 'bold', 2);
            } else if (pl.role === 'bruja') {
                room.sendAnnouncement('🧪 Eres la BRUJA! Tienes 2 pociones (1 uso cada una):\n💚 !vida [numero] - Salvar a un jugador\n💀 !muerte [numero] - Matar a un jugador\nEscribe sin #. Ej: !muerte 3\nUsalas sabiamente, solo puedes usar cada una UNA vez!', pl.id, 0x9900FF, 'bold', 2);
            } else if (pl.role === 'cazador') {
                room.sendAnnouncement('🏹 Eres el CAZADOR! Cuando mueras, te llevas a alguien contigo.\nCada noche puedes elegir tu objetivo con !apuntar [numero].\nEscribe sin #. Ej: !apuntar 3\nPuedes cambiarlo cada noche. Si no eliges, sera aleatorio.', pl.id, 0x8B4513, 'bold', 2);
            } else if (pl.role === 'clarividente') {
                room.sendAnnouncement('👁️ Eres el CLARIVIDENTE! Durante la noche puedes leer mensajes de los muertos.\nUna vez por partida puedes revivir a un jugador muerto con !revivir [numero].\nEscribe sin #. Ej: !revivir 3\nUsalo sabiamente!', pl.id, 0x00CED1, 'bold', 2);
            } else if (pl.role === 'piromano') {
                room.sendAnnouncement('🔥 Eres el PIROMANO! Rol independiente.\nCada noche puedes:\n🛢️ !empapar [numero] - Empapar a 2 jugadores con gasolina (puedes elegir 2 por noche)\n🔥 !incendiar - Quemar a TODOS los empapados (los mata, atraviesa protecciones)\nLos impostores NO pueden matarte.\n🏆 Ganas si eres el ULTIMO jugador vivo.\nEscribe sin #. Ej: !empapar 3', pl.id, 0xFF4500, 'bold', 2);
            } else if (pl.role === 'ninoflor') {
                room.sendAnnouncement('🌸 Eres el NINO FLOR! Puedes salvar a alguien del linchamiento UNA vez.\nDurante la votacion, escribe !salvar para cancelar la eliminacion.\nSolo puedes usarlo 1 vez en toda la partida!', pl.id, 0xFF99CC, 'bold', 2);
            } else if (pl.role === 'embrujado') {
                room.sendAnnouncement('🌑 Eres el EMBRUJADO! Pareces un inocente normal...\nPero si los impostores intentan matarte, te CONVIERTES en impostor!\nNadie lo sabe, ni siquiera los impostores.', pl.id, 0x666666, 'bold', 2);
            } else {
                room.sendAnnouncement('😇 Eres INOCENTE. Encuentra al impostor y vota para eliminarlo.', pl.id, 0x00FF00, 'bold', 2);
            }
        }

        // Mostrar lista numerada
        var listParts = [];
        for (var l = 0; l < gameState.players.length; l++) {
            listParts.push(gameState.players[l].number + '.' + gameState.players[l].name);
        }
        room.sendAnnouncement('📋 ' + listParts.join(' | '), null, 0x00BFFF);
        room.sendAnnouncement('⏱️ La noche comienza en 10 segundos... LEE TU ROL!', null, 0xFFFF00, 'bold');
    }, 5000);
    gameState.timeouts.push(tRoles);

    // Iniciar primera fase de kill (5s reglas + 10s roles = 15s total)
    var t = setTimeout(function() {
        if (!gameState.active) return;
        startKillPhase(room);
    }, 15000);
    gameState.timeouts.push(t);
}

// ============================================
// FASE DE KILL (NOCHE)
// ============================================
function startKillPhase(room) {
    if (!gameState.active) return;
    gameState.phase = 'kill';
    gameState.round++;
    gameState.pendingKills = {};
    gameState.pendingProtect = null;
    gameState.pendingGuard = null;
    gameState.pendingHolyWater = null;
    gameState.pendingVision = null;
    gameState.videnteActed = false;
    gameState.jailerKilledThisNight = false;
    gameState.pendingImpostorVision = null;
    gameState.impostorVidenteActed = false;
    gameState.pendingBrujaLife = null;
    gameState.pendingBrujaDeath = null;
    gameState.brujaProtectedId = null;

    // Activar encarcelamiento desde la eleccion del dia
    gameState.jailedPlayerId = null;
    if (gameState.pendingJail !== null) {
        var jailTarget = findPlayerByNumber(gameState.pendingJail);
        if (jailTarget && jailTarget.alive) {
            gameState.jailedPlayerId = jailTarget.id;
        }
        gameState.pendingJail = null;
    }

    // Guardar equipos y mover todos los vivos a spectator PRIMERO
    var alivePlayers = getAlivePlayers();
    for (var i = 0; i < alivePlayers.length; i++) {
        var p = alivePlayers[i];
        var player = room.getPlayer(p.id);
        if (player) {
            gameState.savedTeams[p.id] = player.team;
            try { room.setPlayerTeam(p.id, 0); } catch(e) {}
        }
    }

    // Esperar a que se procesen los "moved to Spectators" antes de mostrar mensajes
    setTimeout(function() {
        if (!gameState.active || gameState.phase !== 'kill') return;

    room.sendAnnouncement('\n🌙 RONDA ' + gameState.round + ' - ES DE NOCHE...\nLos roles nocturnos eligen sus acciones...', null, 0x4444FF, 'bold', 2);

    // Mostrar lista de jugadores vivos a todos
    var nightListParts = [];
    for (var nl = 0; nl < alivePlayers.length; nl++) {
        nightListParts.push(alivePlayers[nl].number + '.' + alivePlayers[nl].name);
    }
    room.sendAnnouncement('📋 Jugadores vivos: ' + nightListParts.join(' | ') + '\n⚠️ Escribe SOLO el numero (sin #). Ej: 3', null, 0x00BFFF);

    // Recordar rol a cada jugador vivo
    for (var ri = 0; ri < alivePlayers.length; ri++) {
        var rp = alivePlayers[ri];
        var roleReminder = null;
        if (gameState.impostorVidenteId && rp.id === gameState.impostorVidenteId) {
            roleReminder = '🔪🔮 Tu rol: IMPOSTOR VIDENTE — Elige victima y usa !ver [num] para investigar';
        } else if (gameState.impostorIds && gameState.impostorIds.indexOf(rp.id) !== -1) {
            roleReminder = '🔪 Tu rol: IMPOSTOR — Elige a quien matar';
        } else if (rp.id === gameState.medicoId) {
            roleReminder = '🏥 Tu rol: MEDICO — Protege a 1 jugador';
        } else if (rp.id === gameState.bodyguardId) {
            roleReminder = '🛡️ Tu rol: GUARDAESPALDAS — Protege a 1 jugador';
        } else if (rp.id === gameState.videnteId) {
            roleReminder = '🔮 Tu rol: VIDENTE — Investiga a 1 jugador';
        } else if (rp.id === gameState.sacerdoteId) {
            roleReminder = '⛪ Tu rol: SACERDOTE — Arroja agua bendita a 1 jugador';
        } else if (rp.id === gameState.jailerId) {
            roleReminder = '🔒 Tu rol: CARCELERO — Tu prisionero ya fue elegido de dia';
        } else if (rp.id === gameState.ninoFlorId) {
            roleReminder = '🌸 Tu rol: NINO FLOR — Puedes usar !salvar durante la votacion';
        } else if (rp.id === gameState.piromanoId) {
            var dousedCount = gameState.dousedPlayers ? gameState.dousedPlayers.length : 0;
            roleReminder = '🔥 Tu rol: PIROMANO — !empapar [num] o !incendiar (' + dousedCount + ' empapados)';
        } else if (rp.id === gameState.bufonId) {
            roleReminder = '🤡 Tu rol: BUFON — Ganas si logras que te eliminen en la votacion';
        } else if (rp.id === gameState.cupidoId) {
            roleReminder = '💘 Tu rol: CUPIDO — Uniste a 2 jugadores, si uno muere el otro tambien';
        } else if (rp.id === gameState.cazadorId) {
            roleReminder = '🏹 Tu rol: CAZADOR — Si mueres, te llevas a alguien contigo';
        } else if (rp.id === gameState.clarividenteId) {
            roleReminder = '🔮 Tu rol: CLARIVIDENTE — Ves el rol del ultimo eliminado';
        } else if (rp.id === gameState.embrujadoId) {
            roleReminder = '👻 Tu rol: EMBRUJADO — Si el vidente te investiga, muere';
        } else if (rp.id === gameState.brujaId) {
            roleReminder = '🧙 Tu rol: BRUJA — Usa !vida o !muerte esta noche';
        } else {
            roleReminder = '👤 Tu rol: INOCENTE — Sobrevive y vota bien de dia';
        }
        if (roleReminder) {
            room.sendAnnouncement(roleReminder, rp.id, 0xAAAAAA);
        }
    }

    // Notificar encarcelamiento
    if (gameState.jailedPlayerId) {
        var jailedP = findPlayerById(gameState.jailedPlayerId);
        if (jailedP) {
            room.sendAnnouncement('🔒 Has sido ENCARCELADO esta noche. No puedes usar habilidades ni ser atacado.\nPuedes hablar con el carcelero de forma anonima.', gameState.jailedPlayerId, 0x888888, 'bold', 2);
            room.sendAnnouncement('🔒 ' + jailedP.name + ' esta en tu celda. Escribe para hablar anonimamente.' + (gameState.jailerBulletUsed ? '' : '\n🔫 Escribe !matar para usar tu bala.'), gameState.jailerId, 0x888888, 'bold', 2);
        }
    }

    // Enviar opciones a cada impostor vivo
    var aliveImpostors = getAliveImpostors();
    var aliveNonImpostors = alivePlayers.filter(function(p) { return p.role !== 'impostor'; });

    var killParts = [];
    for (var m = 0; m < aliveNonImpostors.length; m++) {
        killParts.push(aliveNonImpostors[m].number + '.' + aliveNonImpostors[m].name);
    }
    var killMsg = '🔪 Elige tu victima (escribe el numero):\n' + killParts.join(' | ');
    for (var imp = 0; imp < aliveImpostors.length; imp++) {
        if (aliveImpostors[imp].id === gameState.jailedPlayerId) {
            room.sendAnnouncement('🔒 Estas encarcelado. No puedes matar esta noche.', aliveImpostors[imp].id, 0x888888, 'bold');
            // Marcar kill como "skip" para que no bloquee el timer
            gameState.pendingKills[aliveImpostors[imp].id] = -1;
            continue;
        }
        room.sendAnnouncement(killMsg, aliveImpostors[imp].id, 0xFF0000, 'bold', 2);
    }

    // Enviar opciones al medico (si esta vivo y no encarcelado)
    var medicoPlayer = gameState.medicoId ? findPlayerById(gameState.medicoId) : null;
    if (medicoPlayer && medicoPlayer.alive && gameState.medicoId !== gameState.jailedPlayerId) {
        var protectTargets = alivePlayers.filter(function(p) { return p.id !== gameState.medicoId; });
        var protectParts = [];
        for (var pm = 0; pm < protectTargets.length; pm++) {
            protectParts.push(protectTargets[pm].number + '.' + protectTargets[pm].name);
        }
        var protectMsg = '🏥 Elige a quien proteger (escribe el numero):\n' + protectParts.join(' | ');
        room.sendAnnouncement(protectMsg, gameState.medicoId, 0x00FFAA, 'bold', 2);
    }

    // Enviar opciones al guardaespaldas (si esta vivo y no encarcelado)
    var bodyguardPlayer = gameState.bodyguardId ? findPlayerById(gameState.bodyguardId) : null;
    if (bodyguardPlayer && bodyguardPlayer.alive && gameState.bodyguardId !== gameState.jailedPlayerId) {
        var guardTargets = alivePlayers.filter(function(p) { return p.id !== gameState.bodyguardId; });
        var guardParts = [];
        for (var gm = 0; gm < guardTargets.length; gm++) {
            guardParts.push(guardTargets[gm].number + '.' + guardTargets[gm].name);
        }
        var hitsInfo = gameState.bodyguardHits === 0 ? '(2 vidas)' : '(1 vida - herido)';
        var guardMsg = '🛡️ Elige a quien proteger ' + hitsInfo + ':\n' + guardParts.join(' | ') + '\n(Si no eliges, te proteges a ti mismo)';
        room.sendAnnouncement(guardMsg, gameState.bodyguardId, 0x4488FF, 'bold', 2);
    }

    // Enviar opciones al sacerdote (si esta vivo y no encarcelado)
    var sacerdotePlayer = gameState.sacerdoteId ? findPlayerById(gameState.sacerdoteId) : null;
    if (sacerdotePlayer && sacerdotePlayer.alive && gameState.sacerdoteId !== gameState.jailedPlayerId) {
        var holyTargets = alivePlayers.filter(function(p) { return p.id !== gameState.sacerdoteId; });
        var holyParts = [];
        for (var hm = 0; hm < holyTargets.length; hm++) {
            holyParts.push(holyTargets[hm].number + '.' + holyTargets[hm].name);
        }
        var holyMsg = '⛪ Elige a quien arrojar agua bendita (escribe el numero):\n' + holyParts.join(' | ') + '\n(Si no eliges, no usas tu poder esta noche)';
        room.sendAnnouncement(holyMsg, gameState.sacerdoteId, 0xFFFFCC, 'bold', 2);
    }

    // Enviar opciones al vidente (si esta vivo y no encarcelado)
    var videntePlayer = gameState.videnteId ? findPlayerById(gameState.videnteId) : null;
    if (videntePlayer && videntePlayer.alive && gameState.videnteId !== gameState.jailedPlayerId) {
        var visionTargets = alivePlayers.filter(function(p) { return p.id !== gameState.videnteId; });
        var visionParts = [];
        for (var vm = 0; vm < visionTargets.length; vm++) {
            visionParts.push(visionTargets[vm].number + '.' + visionTargets[vm].name);
        }
        var visionMsg = '🔮 Elige a quien investigar (escribe el numero):\n' + visionParts.join(' | ');
        room.sendAnnouncement(visionMsg, gameState.videnteId, 0xAA00FF, 'bold', 2);
    }

    // Enviar opciones de investigacion al impostor vidente (si vivo, no ultimo impostor, y no encarcelado)
    if (gameState.impostorVidenteId) {
        var ivPlayer = findPlayerById(gameState.impostorVidenteId);
        var aliveImps = getAliveImpostors();
        if (ivPlayer && ivPlayer.alive && aliveImps.length > 1 && gameState.impostorVidenteId !== gameState.jailedPlayerId) {
            var ivTargets = alivePlayers.filter(function(p) { return p.id !== gameState.impostorVidenteId && p.role !== 'impostor'; });
            var ivParts = [];
            for (var iv = 0; iv < ivTargets.length; iv++) {
                ivParts.push(ivTargets[iv].number + '.' + ivTargets[iv].name);
            }
            room.sendAnnouncement('🔮 Puedes investigar un jugador esta noche.\nEscribe !ver [numero]:\n' + ivParts.join(' | '), gameState.impostorVidenteId, 0xFF00AA, 'bold');
        }
    }

    // Cupido: solo primera noche, elige 2 jugadores para vincular
    if (gameState.cupidoId && gameState.round === 1) {
        var cupidoP = findPlayerById(gameState.cupidoId);
        if (cupidoP && cupidoP.alive && gameState.cupidoId !== gameState.jailedPlayerId) {
            var cupidoTargets = alivePlayers;
            var cupidoParts = [];
            for (var cp = 0; cp < cupidoTargets.length; cp++) {
                cupidoParts.push(cupidoTargets[cp].number + '.' + cupidoTargets[cp].name);
            }
            room.sendAnnouncement('💘 Elige 2 jugadores para vincular (escribe un numero, luego otro):\n' + cupidoParts.join(' | '), gameState.cupidoId, 0xFF69B4, 'bold', 2);
        }
    }

    // Bruja: opciones de pociones
    if (gameState.brujaId) {
        var brujaP = findPlayerById(gameState.brujaId);
        if (brujaP && brujaP.alive && gameState.brujaId !== gameState.jailedPlayerId) {
            var brujaMsg = '🧪 Tus pociones disponibles:';
            if (!gameState.brujaLifeUsed) brujaMsg += '\n💚 !vida [numero] - Salvar a alguien';
            if (!gameState.brujaDeathUsed) brujaMsg += '\n💀 !muerte [numero] - Matar a alguien';
            if (gameState.brujaLifeUsed && gameState.brujaDeathUsed) {
                brujaMsg += '\n(Ya usaste ambas pociones)';
            } else {
                var brujaTargets = alivePlayers.filter(function(p) { return p.id !== gameState.brujaId; });
                var brujaParts = [];
                for (var bp = 0; bp < brujaTargets.length; bp++) {
                    brujaParts.push(brujaTargets[bp].number + '.' + brujaTargets[bp].name);
                }
                brujaMsg += '\n' + brujaParts.join(' | ');
            }
            room.sendAnnouncement(brujaMsg, gameState.brujaId, 0x9900FF, 'bold', 2);
        }
    }

    // Cazador: puede elegir/cambiar su objetivo cada noche
    var cazadorPlayer = gameState.cazadorId ? findPlayerById(gameState.cazadorId) : null;
    if (cazadorPlayer && cazadorPlayer.alive && gameState.cazadorId !== gameState.jailedPlayerId) {
        var cazTargets = alivePlayers.filter(function(p) { return p.id !== gameState.cazadorId; });
        var cazParts = [];
        for (var cz = 0; cz < cazTargets.length; cz++) {
            cazParts.push(cazTargets[cz].number + '.' + cazTargets[cz].name);
        }
        var currentTarget = gameState.cazadorTarget ? findPlayerByNumber(gameState.cazadorTarget) : null;
        var currentMsg = currentTarget && currentTarget.alive ? ('\n🎯 Objetivo actual: ' + currentTarget.name) : '';
        room.sendAnnouncement('🏹 Elige a quien dispararas si mueres (escribe !apuntar [numero]):\n' + cazParts.join(' | ') + currentMsg + '\n(Puedes cambiarlo cada noche)', gameState.cazadorId, 0x8B4513, 'bold', 2);
    }

    // Piromano: opciones de empapar o incendiar
    if (gameState.piromanoId) {
        var piromanoP = findPlayerById(gameState.piromanoId);
        if (piromanoP && piromanoP.alive && gameState.piromanoId !== gameState.jailedPlayerId) {
            var piroTargets = alivePlayers.filter(function(p) { return p.id !== gameState.piromanoId; });
            var piroParts = [];
            for (var pi = 0; pi < piroTargets.length; pi++) {
                var isDoused = gameState.dousedPlayers.indexOf(piroTargets[pi].id) !== -1;
                piroParts.push(piroTargets[pi].number + '.' + piroTargets[pi].name + (isDoused ? ' 🛢️' : ''));
            }
            var piroMsg = '🔥 PIROMANO - Elige tu accion:\n🛢️ !empapar [numero] - Empapar a un jugador (puedes elegir 2 por noche)\n🔥 !incendiar - Quemar a TODOS los empapados\n';
            piroMsg += 'Empapados actuales: ' + (gameState.dousedPlayers.length > 0 ? gameState.dousedPlayers.length + ' jugadores (marcados con 🛢️)' : 'ninguno');
            piroMsg += '\n' + piroParts.join(' | ');
            room.sendAnnouncement(piroMsg, gameState.piromanoId, 0xFF4500, 'bold', 2);
            gameState.piromanoAction = null;
            gameState.piromanoDouseTargets = [];
        }
    }

    }, 500); // fin del setTimeout de mensajes

    // Timer: si no eligen en 20s, kills aleatorios, medico/vidente pierden turno
    gameState.phaseTimer = setTimeout(function() {
        if (!gameState.active || gameState.phase !== 'kill') return;

        var currentAliveImpostors = getAliveImpostors();
        var currentAliveNonImpostors = getAlivePlayers().filter(function(p) { return p.role !== 'impostor'; });

        for (var i = 0; i < currentAliveImpostors.length; i++) {
            var impId = currentAliveImpostors[i].id;
            if (gameState.pendingKills[impId] === undefined && currentAliveNonImpostors.length > 0) {
                var randomTarget = currentAliveNonImpostors[Math.floor(Math.random() * currentAliveNonImpostors.length)];
                gameState.pendingKills[impId] = randomTarget.number;
                room.sendAnnouncement('⏰ No elegiste a tiempo. Victima aleatoria...', impId, 0xFF6600);
            }
        }

        resolveNightActions(room);
    }, config.killMs);
    gameState.timeouts.push(gameState.phaseTimer);
}

function checkAllNightActionsReady() {
    var aliveImpostors = getAliveImpostors();
    for (var i = 0; i < aliveImpostors.length; i++) {
        if (gameState.pendingKills[aliveImpostors[i].id] === undefined) return false;
    }
    return true;
}

function processKillChoice(room, player, message) {
    if (gameState.phase !== 'kill' || !isImpostor(player.id)) return;

    if (gameState.pendingKills[player.id] !== undefined) {
        room.sendAnnouncement('⚠️ Ya elegiste tu victima.', player.id, 0xFF6600);
        return;
    }

    var num = parseInt(message.trim());
    if (isNaN(num)) return;

    var target = findPlayerByNumber(num);
    if (!target || !target.alive || target.role === 'impostor') {
        room.sendAnnouncement('⚠️ Numero invalido. Elige un jugador vivo.', player.id, 0xFF6600);
        return;
    }

    gameState.pendingKills[player.id] = num;
    room.sendAnnouncement('✅ Elegiste a ' + target.name + ' (#' + num + ')', player.id, 0xFF0000);

    if (checkAllNightActionsReady()) {
        if (gameState.phaseTimer) {
            clearTimeout(gameState.phaseTimer);
            gameState.phaseTimer = null;
        }
        var t = setTimeout(function() {
            if (!gameState.active) return;
            resolveNightActions(room);
        }, 2000);
        gameState.timeouts.push(t);
    }
}

function processProtectChoice(room, player, message) {
    if (gameState.phase !== 'kill' || player.id !== gameState.medicoId) return;
    if (gameState.pendingProtect !== null) {
        room.sendAnnouncement('⚠️ Ya elegiste a quien proteger.', player.id, 0xFF6600);
        return;
    }

    var num = parseInt(message.trim());
    if (isNaN(num)) return;

    var target = findPlayerByNumber(num);
    if (!target || !target.alive || target.id === gameState.medicoId) {
        room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
        return;
    }

    gameState.pendingProtect = num;
    room.sendAnnouncement('🏥 Protegeras a ' + target.name + ' (#' + num + ')', player.id, 0x00FFAA);
}

function processGuardChoice(room, player, message) {
    if (gameState.phase !== 'kill' || player.id !== gameState.bodyguardId) return;
    if (gameState.pendingGuard !== null) {
        room.sendAnnouncement('⚠️ Ya elegiste a quien proteger.', player.id, 0xFF6600);
        return;
    }

    var num = parseInt(message.trim());
    if (isNaN(num)) return;

    var target = findPlayerByNumber(num);
    if (!target || !target.alive) {
        room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
        return;
    }

    gameState.pendingGuard = num;
    if (target.id === gameState.bodyguardId) {
        room.sendAnnouncement('🛡️ Te protegeras a ti mismo esta noche.', player.id, 0x4488FF);
    } else {
        room.sendAnnouncement('🛡️ Protegeras a ' + target.name + ' (#' + num + ') - Si lo atacan, te atacan a ti.', player.id, 0x4488FF);
    }
}

function processJailChat(room, player, message) {
    if (gameState.phase !== 'kill' || !gameState.jailedPlayerId) return;

    // Carcelero habla al preso
    if (player.id === gameState.jailerId) {
        var lower = message.toLowerCase().trim();
        // Comando !matar
        if (lower === '!matar') {
            processJailerKill(room, player);
            return;
        }
        room.sendAnnouncement('🔒 Carcelero: ' + message, gameState.jailedPlayerId, 0x888888);
        room.sendAnnouncement('🔒 Tu: ' + message, gameState.jailerId, 0x666666);
        return;
    }

    // Preso habla al carcelero
    if (player.id === gameState.jailedPlayerId) {
        room.sendAnnouncement('🔒 Prisionero: ' + message, gameState.jailerId, 0x888888);
        room.sendAnnouncement('🔒 Tu: ' + message, gameState.jailedPlayerId, 0x666666);
        return;
    }
}

function processJailerKill(room, player) {
    if (player.id !== gameState.jailerId || !gameState.jailedPlayerId) return;
    if (gameState.jailerBulletUsed) {
        room.sendAnnouncement('⚠️ Ya usaste tu unica bala.', player.id, 0xFF6600);
        return;
    }
    if (gameState.jailerKilledThisNight) {
        room.sendAnnouncement('⚠️ Ya mataste al preso esta noche.', player.id, 0xFF6600);
        return;
    }

    var jailedP = findPlayerById(gameState.jailedPlayerId);
    if (!jailedP || !jailedP.alive) {
        room.sendAnnouncement('⚠️ El preso ya no esta disponible.', player.id, 0xFF6600);
        return;
    }

    gameState.jailerBulletUsed = true;
    gameState.jailerKilledThisNight = true;
    jailedP.alive = false;
    try { room.setPlayerTeam(jailedP.id, 0); } catch(e) {}
    room.sendAnnouncement('🔫 Has ejecutado a ' + jailedP.name + '!', gameState.jailerId, 0xFF0000, 'bold');
    room.sendAnnouncement('🔫 El carcelero te ha ejecutado!', gameState.jailedPlayerId, 0xFF0000, 'bold');
}

function processSacerdoteChoice(room, player, message) {
    if (gameState.phase !== 'kill' || player.id !== gameState.sacerdoteId) return;
    if (gameState.pendingHolyWater !== null) {
        room.sendAnnouncement('⚠️ Ya elegiste a quien arrojar agua bendita.', player.id, 0xFF6600);
        return;
    }

    var num = parseInt(message.trim());
    if (isNaN(num)) return;

    var target = findPlayerByNumber(num);
    if (!target || !target.alive || target.id === gameState.sacerdoteId) {
        room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
        return;
    }

    gameState.pendingHolyWater = num;
    room.sendAnnouncement('⛪ Arrojaras agua bendita a ' + target.name + ' (#' + num + ')', player.id, 0xFFFFCC);
}

function processVisionChoice(room, player, message) {
    if (gameState.phase !== 'kill' || player.id !== gameState.videnteId) return;
    if (gameState.videnteActed) {
        room.sendAnnouncement('⚠️ Ya investigaste a alguien esta noche.', player.id, 0xFF6600);
        return;
    }

    var num = parseInt(message.trim());
    if (isNaN(num)) return;

    var target = findPlayerByNumber(num);
    if (!target || !target.alive || target.id === gameState.videnteId) {
        room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
        return;
    }

    gameState.videnteActed = true;
    gameState.pendingVision = num;

    // Revelar rol inmediatamente al vidente
    var roleLabel;
    if (target.role === 'impostor') {
        roleLabel = '🔪 IMPOSTOR';
    } else {
        roleLabel = '😇 INOCENTE';
    }

    room.sendAnnouncement('🔮 ' + target.name + ' es: ' + roleLabel, player.id, 0xAA00FF, 'bold', 2);
}

function processImpostorVision(room, player, numStr) {
    if (gameState.phase !== 'kill' || player.id !== gameState.impostorVidenteId) return;
    if (gameState.impostorVidenteActed) {
        room.sendAnnouncement('⚠️ Ya investigaste a alguien esta noche.', player.id, 0xFF6600);
        return;
    }
    // Si es el ultimo impostor, pierde la habilidad
    if (getAliveImpostors().length <= 1) {
        room.sendAnnouncement('⚠️ Eres el ultimo impostor, perdiste tu habilidad de investigar.', player.id, 0xFF6600);
        return;
    }

    var num = parseInt(numStr);
    if (isNaN(num)) {
        room.sendAnnouncement('⚠️ Usa: !ver [numero]. Ej: !ver 3', player.id, 0xFF6600);
        return;
    }

    var target = findPlayerByNumber(num);
    if (!target || !target.alive || target.id === player.id || target.role === 'impostor') {
        room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
        return;
    }

    gameState.impostorVidenteActed = true;
    gameState.pendingImpostorVision = num;

    // Revelar rol completo al impostor vidente
    var roleLabel;
    if (target.role === 'medico') { roleLabel = '🏥 MEDICO'; }
    else if (target.role === 'vidente') { roleLabel = '🔮 VIDENTE'; }
    else if (target.role === 'guardaespaldas') { roleLabel = '🛡️ GUARDAESPALDAS'; }
    else if (target.role === 'sacerdote') { roleLabel = '⛪ SACERDOTE'; }
    else if (target.role === 'carcelero') { roleLabel = '🔒 CARCELERO'; }
    else if (target.role === 'bufon') { roleLabel = '🃏 BUFON'; }
    else { roleLabel = '😇 INOCENTE'; }

    room.sendAnnouncement('🔮 ' + target.name + ' es: ' + roleLabel, player.id, 0xFF00AA, 'bold', 2);
}

// ============================================
// CUPIDO - VINCULAR 2 JUGADORES
// ============================================
function processCupidoChoice(room, player, message) {
    if (gameState.phase !== 'kill' || player.id !== gameState.cupidoId) return;
    if (gameState.round !== 1) return;
    if (gameState.linkedPair.length === 2) {
        room.sendAnnouncement('⚠️ Ya vinculaste a 2 jugadores.', player.id, 0xFF6600);
        return;
    }

    var num = parseInt(message.trim());
    if (isNaN(num)) return;

    var target = findPlayerByNumber(num);
    if (!target || !target.alive) {
        room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
        return;
    }

    if (gameState.cupidoChoice1 === null) {
        gameState.cupidoChoice1 = target.id;
        room.sendAnnouncement('💘 Primer vinculado: ' + target.name + '. Ahora elige al segundo.', player.id, 0xFF69B4);
    } else {
        if (target.id === gameState.cupidoChoice1) {
            room.sendAnnouncement('⚠️ No puedes vincular al mismo jugador dos veces.', player.id, 0xFF6600);
            return;
        }
        gameState.linkedPair = [gameState.cupidoChoice1, target.id];
        var first = findPlayerById(gameState.cupidoChoice1);
        room.sendAnnouncement('💘 Vinculaste a ' + (first ? first.name : '?') + ' y ' + target.name + '!', player.id, 0xFF69B4, 'bold');
        room.sendAnnouncement('💘 Cupido te ha vinculado con alguien. Si uno muere, el otro tambien!', gameState.cupidoChoice1, 0xFF69B4, 'bold', 2);
        room.sendAnnouncement('💘 Cupido te ha vinculado con alguien. Si uno muere, el otro tambien!', target.id, 0xFF69B4, 'bold', 2);
    }
}

function handleCupidoLink(room, deadPlayerId) {
    if (gameState.linkedPair.length !== 2) return;
    var idx = gameState.linkedPair.indexOf(deadPlayerId);
    if (idx === -1) return;

    var partnerId = gameState.linkedPair[idx === 0 ? 1 : 0];
    var partner = findPlayerById(partnerId);
    if (partner && partner.alive) {
        partner.alive = false;
        try { room.setPlayerTeam(partnerId, 0); } catch(e) {}
        room.sendAnnouncement('💔 ' + partner.name + ' estaba vinculado y murio de corazon roto!', null, 0xFF69B4, 'bold', 2);
    }
}

// ============================================
// BRUJA - POCIONES
// ============================================
function processBrujaLifeChoice(room, player, numStr) {
    if (gameState.phase !== 'kill' || player.id !== gameState.brujaId) return;
    if (gameState.brujaLifeUsed) {
        room.sendAnnouncement('⚠️ Ya usaste tu pocion de vida.', player.id, 0xFF6600);
        return;
    }
    if (gameState.pendingBrujaLife !== null) {
        room.sendAnnouncement('⚠️ Ya elegiste a quien salvar esta noche.', player.id, 0xFF6600);
        return;
    }

    var num = parseInt(numStr);
    if (isNaN(num)) {
        room.sendAnnouncement('⚠️ Usa: !vida [numero]. Ej: !vida 3', player.id, 0xFF6600);
        return;
    }

    var target = findPlayerByNumber(num);
    if (!target || !target.alive || target.id === gameState.brujaId) {
        room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
        return;
    }

    gameState.pendingBrujaLife = num;
    room.sendAnnouncement('💚 Usaras tu pocion de vida en ' + target.name + ' esta noche.', player.id, 0x00FF00);
}

function processBrujaDeathChoice(room, player, numStr) {
    if (gameState.phase !== 'kill' || player.id !== gameState.brujaId) return;
    if (gameState.brujaDeathUsed) {
        room.sendAnnouncement('⚠️ Ya usaste tu pocion de muerte.', player.id, 0xFF6600);
        return;
    }
    if (gameState.pendingBrujaDeath !== null) {
        room.sendAnnouncement('⚠️ Ya elegiste a quien envenenar esta noche.', player.id, 0xFF6600);
        return;
    }

    var num = parseInt(numStr);
    if (isNaN(num)) {
        room.sendAnnouncement('⚠️ Usa: !muerte [numero]. Ej: !muerte 3', player.id, 0xFF6600);
        return;
    }

    var target = findPlayerByNumber(num);
    if (!target || !target.alive || target.id === gameState.brujaId) {
        room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
        return;
    }

    gameState.pendingBrujaDeath = num;
    room.sendAnnouncement('💀 Enveneraras a ' + target.name + ' esta noche.', player.id, 0xFF0000);
}

// ============================================
// CAZADOR - DISPARO AL MORIR
// ============================================
function startCazadorShot(room, callback) {
    gameState.cazadorDying = true;
    gameState.cazadorCallback = callback;

    var alive = getAlivePlayers();

    // Si el cazador ya habia elegido un objetivo valido, disparar automaticamente
    if (gameState.cazadorTarget !== null) {
        var preTarget = findPlayerByNumber(gameState.cazadorTarget);
        if (preTarget && preTarget.alive) {
            room.sendAnnouncement('🏹 EL CAZADOR HA CAIDO! Ya tenia su objetivo elegido...', null, 0xFF8800, 'bold', 2);
            var t = setTimeout(function() {
                if (!gameState.active) return;
                executeCazadorShot(room, preTarget);
                gameState.cazadorDying = false;
                if (gameState.cazadorCallback) {
                    var cb = gameState.cazadorCallback;
                    gameState.cazadorCallback = null;
                    var t2 = setTimeout(function() {
                        if (!gameState.active) return;
                        if (checkWinCondition(room)) return;
                        cb();
                    }, 2000);
                    gameState.timeouts.push(t2);
                }
            }, 1500);
            gameState.timeouts.push(t);
            return;
        }
    }

    // Si no tenia objetivo, disparo aleatorio inmediato
    room.sendAnnouncement('🏹 EL CAZADOR HA CAIDO! No tenia objetivo elegido... disparo aleatorio!', null, 0xFF8800, 'bold', 2);
    if (alive.length > 0) {
        var randomTarget = alive[Math.floor(Math.random() * alive.length)];
        var t3 = setTimeout(function() {
            if (!gameState.active) return;
            executeCazadorShot(room, randomTarget);
            gameState.cazadorDying = false;
            if (gameState.cazadorCallback) {
                var cb2 = gameState.cazadorCallback;
                gameState.cazadorCallback = null;
                var t4 = setTimeout(function() {
                    if (!gameState.active) return;
                    if (checkWinCondition(room)) return;
                    cb2();
                }, 2000);
                gameState.timeouts.push(t4);
            }
        }, 1500);
        gameState.timeouts.push(t3);
    } else {
        gameState.cazadorDying = false;
        if (callback) callback();
    }
}

function executeCazadorShot(room, target) {
    gameState.cazadorShot = true;
    target.alive = false;
    try { room.setPlayerTeam(target.id, 0); } catch(e) {}
    room.sendAnnouncement('🏹💥 El cazador se llevo a ' + target.name + '!', null, 0xFF4400, 'bold', 2);
    handleCupidoLink(room, target.id);
}

function processCazadorShot(room, player, message) {
    if (!gameState.cazadorDying || player.id !== gameState.cazadorId) return false;
    if (gameState.cazadorShot) return false;

    var num = parseInt(message.trim());
    if (isNaN(num)) return true; // bloquear mensaje pero no procesar

    var target = findPlayerByNumber(num);
    if (!target || !target.alive) {
        room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
        return true;
    }

    executeCazadorShot(room, target);
    gameState.cazadorDying = false;

    // Limpiar timer y llamar callback
    if (gameState.cazadorCallback) {
        var cb = gameState.cazadorCallback;
        gameState.cazadorCallback = null;
        var t = setTimeout(function() {
            if (!gameState.active) return;
            if (checkWinCondition(room)) return;
            cb();
        }, 2000);
        gameState.timeouts.push(t);
    }
    return true;
}

// Funcion helper: despues de muertes, manejar cupido link y cazador
function proceedAfterDeaths(room, killedIds, nextFn) {
    // Aplicar cupido links
    for (var deadId in killedIds) {
        handleCupidoLink(room, parseInt(deadId));
    }
    // Revisar si cupido link mato a alguien mas y agregarlo
    // (handleCupidoLink ya actualiza alive, no necesitamos tracking adicional)

    if (checkWinCondition(room)) return;

    // Verificar si el cazador murio
    var cazP = gameState.cazadorId ? findPlayerById(gameState.cazadorId) : null;
    if (cazP && !cazP.alive && !gameState.cazadorShot) {
        startCazadorShot(room, function() {
            if (checkWinCondition(room)) return;
            nextFn();
        });
    } else {
        nextFn();
    }
}

// ============================================
// RESOLVER ACCIONES NOCTURNAS
// ============================================
function resolveNightActions(room) {
    if (!gameState.active) return;

    // 1. Aplicar proteccion del medico (solo esta noche)
    gameState.protectedPlayerId = null;
    if (gameState.pendingProtect !== null) {
        var protectedTarget = findPlayerByNumber(gameState.pendingProtect);
        if (protectedTarget && protectedTarget.alive) {
            gameState.protectedPlayerId = protectedTarget.id;
            room.sendAnnouncement('🏥 Has protegido a ' + protectedTarget.name + ' esta noche.', gameState.medicoId, 0x00FFAA);
        }
    }

    // 2. Aplicar guardaespaldas (por defecto se protege a si mismo)
    gameState.guardedPlayerId = null;
    var bodyguardP = gameState.bodyguardId ? findPlayerById(gameState.bodyguardId) : null;
    if (bodyguardP && bodyguardP.alive) {
        if (gameState.pendingGuard !== null) {
            var guardedTarget = findPlayerByNumber(gameState.pendingGuard);
            if (guardedTarget && guardedTarget.alive) {
                gameState.guardedPlayerId = guardedTarget.id;
            } else {
                gameState.guardedPlayerId = gameState.bodyguardId; // default: a si mismo
            }
        } else {
            gameState.guardedPlayerId = gameState.bodyguardId; // default: a si mismo
        }
    }

    // 3. Resolver agua bendita del sacerdote
    if (gameState.pendingHolyWater !== null) {
        var sacerdoteP = findPlayerById(gameState.sacerdoteId);
        var holyTarget = findPlayerByNumber(gameState.pendingHolyWater);
        if (sacerdoteP && sacerdoteP.alive && holyTarget && holyTarget.alive) {
            if (holyTarget.role === 'impostor') {
                // Acierto: el impostor muere
                holyTarget.alive = false;
                try { room.setPlayerTeam(holyTarget.id, 0); } catch(e) {}
                room.sendAnnouncement('⛪💀 El agua bendita purifico a ' + holyTarget.name + '! ERA IMPOSTOR!', null, 0x00FF00, 'bold', 2);
            } else {
                // Fallo: el sacerdote muere
                sacerdoteP.alive = false;
                try { room.setPlayerTeam(sacerdoteP.id, 0); } catch(e) {}
                room.sendAnnouncement('⛪💀 El sacerdote arrojo agua bendita a ' + holyTarget.name + '... pero era inocente. El sacerdote murio!', null, 0xFF0000, 'bold', 2);
            }
        }
    }
    gameState.pendingHolyWater = null;

    // Verificar condicion de victoria despues del agua bendita
    if (checkWinCondition(room)) return;

    // 4. Aplicar proteccion de bruja (pocion de vida)
    gameState.brujaProtectedId = null;
    if (gameState.pendingBrujaLife !== null) {
        var brujaLifeTarget = findPlayerByNumber(gameState.pendingBrujaLife);
        if (brujaLifeTarget && brujaLifeTarget.alive) {
            gameState.brujaProtectedId = brujaLifeTarget.id;
            room.sendAnnouncement('💚 Tu pocion de vida protege a ' + brujaLifeTarget.name + ' esta noche.', gameState.brujaId, 0x00FF00);
        }
        gameState.brujaLifeUsed = true;
    }

    // 5. Ejecutar kills (verificando protecciones)
    var killedNames = [];
    var killedIds = {};

    // Agregar muerte del preso ejecutado por carcelero
    if (gameState.jailerKilledThisNight && gameState.jailedPlayerId) {
        var executedP = findPlayerById(gameState.jailedPlayerId);
        if (executedP && !executedP.alive) {
            killedNames.push(executedP.name);
            killedIds[executedP.id] = true;
        }
    }

    for (var impId in gameState.pendingKills) {
        var targetNum = gameState.pendingKills[impId];
        if (targetNum === -1) continue;
        var victim = findPlayerByNumber(targetNum);
        if (victim && victim.alive && !killedIds[victim.id]) {
            if (victim.id === gameState.jailedPlayerId) continue;
            // Piromano: los impostores no pueden matarlo
            if (victim.id === gameState.piromanoId) {
                room.sendAnnouncement('🔥 Intentaron matar al piromano... pero es inmune!', null, 0xFF4500);
                continue;
            }
            // Check proteccion medico
            if (victim.id === gameState.protectedPlayerId) {
                room.sendAnnouncement('🏥 Tu proteccion salvo a ' + victim.name + '!', gameState.medicoId, 0x00FFAA);
                continue;
            }
            // Check proteccion bruja (pocion de vida)
            if (victim.id === gameState.brujaProtectedId) {
                room.sendAnnouncement('💚 Tu pocion de vida salvo a ' + victim.name + '!', gameState.brujaId, 0x00FF00);
                continue;
            }
            // Check proteccion guardaespaldas
            if (victim.id === gameState.guardedPlayerId && bodyguardP && bodyguardP.alive && !killedIds[gameState.bodyguardId]) {
                gameState.bodyguardHits++;
                if (gameState.bodyguardHits >= 2) {
                    bodyguardP.alive = false;
                    killedIds[gameState.bodyguardId] = true;
                    killedNames.push(bodyguardP.name);
                    try { room.setPlayerTeam(gameState.bodyguardId, 0); } catch(e) {}
                    room.sendAnnouncement('🛡️ El guardaespaldas recibio el golpe protegiendo a ' + victim.name + '... y no sobrevivio!', null, 0x4488FF, 'bold');
                } else {
                    room.sendAnnouncement('🛡️ El guardaespaldas recibio el golpe protegiendo a ' + victim.name + '! Sobrevivio... pero esta herido.', null, 0x4488FF, 'bold');
                }
                continue;
            }
            if (victim.id === gameState.bodyguardId && bodyguardP && bodyguardP.alive) {
                gameState.bodyguardHits++;
                if (gameState.bodyguardHits >= 2) {
                    victim.alive = false;
                    killedIds[victim.id] = true;
                    killedNames.push(victim.name);
                    try { room.setPlayerTeam(victim.id, 0); } catch(e) {}
                } else {
                    room.sendAnnouncement('🛡️ Intentaron matarte pero eres fuerte! Sobreviviste... por ahora.', gameState.bodyguardId, 0x4488FF, 'bold');
                }
                continue;
            }
            // Check embrujado: se convierte en impostor en vez de morir
            if (victim.id === gameState.embrujadoId && !gameState.embrujadoConverted) {
                gameState.embrujadoConverted = true;
                victim.role = 'impostor';
                gameState.impostorIds.push(victim.id);
                room.sendAnnouncement('🌑 Intentaron matarte... pero la maldicion te convirtio en IMPOSTOR!', victim.id, 0xFF0000, 'bold', 2);
                // Los impostores se enteran
                for (var ei = 0; ei < gameState.impostorIds.length; ei++) {
                    if (gameState.impostorIds[ei] !== victim.id) {
                        room.sendAnnouncement('🌑 ' + victim.name + ' era el EMBRUJADO! Ahora es su compañero impostor.', gameState.impostorIds[ei], 0xFF0000, 'bold');
                    }
                }
                continue;
            }
            victim.alive = false;
            killedIds[victim.id] = true;
            killedNames.push(victim.name);
            try { room.setPlayerTeam(victim.id, 0); } catch(e) {}
        }
    }

    // 6. Aplicar pocion de muerte de la bruja
    if (gameState.pendingBrujaDeath !== null) {
        var brujaDeathTarget = findPlayerByNumber(gameState.pendingBrujaDeath);
        if (brujaDeathTarget && brujaDeathTarget.alive && !killedIds[brujaDeathTarget.id]) {
            brujaDeathTarget.alive = false;
            killedIds[brujaDeathTarget.id] = true;
            killedNames.push(brujaDeathTarget.name);
            try { room.setPlayerTeam(brujaDeathTarget.id, 0); } catch(e) {}
        }
        gameState.brujaDeathUsed = true;
    }

    // 7. Piromano: empapar o incendiar
    if (gameState.piromanoId) {
        var piromanoP2 = findPlayerById(gameState.piromanoId);
        if (piromanoP2 && piromanoP2.alive) {
            if (gameState.piromanoAction === 'douse') {
                // Empapar a los targets elegidos
                for (var dt = 0; dt < gameState.piromanoDouseTargets.length; dt++) {
                    var douseId = gameState.piromanoDouseTargets[dt];
                    if (gameState.dousedPlayers.indexOf(douseId) === -1) {
                        var douseP = findPlayerById(douseId);
                        if (douseP && douseP.alive) {
                            gameState.dousedPlayers.push(douseId);
                        }
                    }
                }
                if (gameState.piromanoDouseTargets.length > 0) {
                    room.sendAnnouncement('🛢️ Has empapado a ' + gameState.piromanoDouseTargets.length + ' jugador(es). Total empapados: ' + gameState.dousedPlayers.length, gameState.piromanoId, 0xFF4500);
                }
            } else if (gameState.piromanoAction === 'ignite' && gameState.dousedPlayers.length > 0) {
                // Incendiar a todos los empapados - atraviesa TODAS las protecciones
                var burnedNames = [];
                for (var bi = 0; bi < gameState.dousedPlayers.length; bi++) {
                    var burnP = findPlayerById(gameState.dousedPlayers[bi]);
                    if (burnP && burnP.alive && !killedIds[burnP.id]) {
                        burnP.alive = false;
                        killedIds[burnP.id] = true;
                        killedNames.push(burnP.name);
                        burnedNames.push(burnP.name);
                        try { room.setPlayerTeam(burnP.id, 0); } catch(e) {}
                    }
                }
                if (burnedNames.length > 0) {
                    room.sendAnnouncement('🔥🔥🔥 EL PIROMANO INCENDIA! ' + burnedNames.join(', ') + ' arden en llamas!', null, 0xFF4500, 'bold', 2);
                }
                gameState.dousedPlayers = [];
            }
        }
        gameState.piromanoDouseTargets = [];
        gameState.piromanoAction = null;
    }

    // 8. Clarividente revive a un jugador muerto
    if (gameState.pendingRevive !== null) {
        var reviveTarget = findPlayerById(gameState.pendingRevive);
        if (reviveTarget && !reviveTarget.alive) {
            reviveTarget.alive = true;
            var revTeam = gameState.savedTeams[reviveTarget.id] || 1;
            try { room.setPlayerTeam(reviveTarget.id, revTeam); } catch(e) {}
            room.sendAnnouncement('👁️ ' + reviveTarget.name + ' ha sido REVIVIDO por el clarividente!', null, 0x00CED1, 'bold', 2);
            // Quitar de killedNames si estaba ahi (murio esta misma noche y fue revivido)
            var rnIdx = killedNames.indexOf(reviveTarget.name);
            if (rnIdx !== -1) killedNames.splice(rnIdx, 1);
            delete killedIds[reviveTarget.id];
        }
        gameState.pendingRevive = null;
    }

    // Limpiar protecciones
    gameState.protectedPlayerId = null;
    gameState.guardedPlayerId = null;
    gameState.brujaProtectedId = null;
    gameState.jailedPlayerId = null;

    // Usar proceedAfterDeaths para manejar cupido links y cazador
    proceedAfterDeaths(room, killedIds, function() {
        startDiscussionPhase(room, killedNames);
    });
}

// ============================================
// FASE DE DISCUSION
// ============================================
function startDiscussionPhase(room, killedNames) {
    if (!gameState.active) return;
    gameState.phase = 'discussion';

    // Verificar condicion de victoria despues del kill
    if (checkWinCondition(room)) return;

    // Primero mover jugadores vivos de vuelta a sus equipos
    var alivePlayers = getAlivePlayers();
    for (var i = 0; i < alivePlayers.length; i++) {
        var p = alivePlayers[i];
        var team = gameState.savedTeams[p.id] || 1;
        try { room.setPlayerTeam(p.id, team); } catch(e) {}
    }

    try { room.pauseGame(false); } catch(e) {}

    // Teleportar cada jugador a su celda para que no queden apilados
    var _cellSpawns = [[259,27],[225,130],[153,210],[54,254],[-54,254],[-153,210],[-225,130],[-259,27],[-247,-80],[-193,-174],[-106,-238],[0,-260],[106,-238],[193,-174],[247,-80],[247,80],[193,174],[106,238],[0,260],[-106,238],[-193,174],[-247,80],[-259,-27],[-225,-130],[-153,-210],[-54,-254],[54,-254],[153,-210],[225,-130],[259,-27]];
    setTimeout(function() {
        var alive = getAlivePlayers();
        for (var ci = 0; ci < alive.length && ci < _cellSpawns.length; ci++) {
            try { room.setPlayerDiscProperties(alive[ci].id, { x: _cellSpawns[ci][0], y: _cellSpawns[ci][1], xspeed: 0, yspeed: 0 }); } catch(e) {}
        }
    }, 200);

    // Esperar a que se procesen los movimientos de equipo, luego mostrar mensajes
    setTimeout(function() {
        if (killedNames && killedNames.length > 0) {
            if (killedNames.length === 1) {
                room.sendAnnouncement('\n☠️ ' + killedNames[0] + ' fue eliminado durante la noche!', null, 0xFF0000, 'bold', 2);
            } else {
                room.sendAnnouncement('\n☠️ ' + killedNames.join(' y ') + ' fueron eliminados durante la noche!', null, 0xFF0000, 'bold', 2);
            }
        } else {
            room.sendAnnouncement('\n🌙 Nadie fue eliminado esta noche...', null, 0x4444FF, 'bold');
        }

        room.sendAnnouncement('\n☀️ ES DE DIA - DISCUSION (30 segundos)\n💬 Discutan quien es el impostor!\n⚠️ No puedes decir directamente tu rol.', null, 0xFFFF00, 'bold', 2);
    }, 500);

    // Aviso a los 15s
    var halfWarn = setTimeout(function() {
        if (!gameState.active || gameState.phase !== 'discussion') return;
        room.sendAnnouncement('⏱️ Quedan 15 segundos de discusion...', null, 0xFFA500, 'bold');
    }, 15000);
    gameState.timeouts.push(halfWarn);

    // Aviso a los 20s
    var tenWarn = setTimeout(function() {
        if (!gameState.active || gameState.phase !== 'discussion') return;
        room.sendAnnouncement('⏱️ 10 segundos para la votacion!', null, 0xFF6600, 'bold');
    }, 20000);
    gameState.timeouts.push(tenWarn);

    // Pasar a votacion
    gameState.phaseTimer = setTimeout(function() {
        if (!gameState.active || gameState.phase !== 'discussion') return;
        startVotingPhase(room);
    }, config.discussionMs);
    gameState.timeouts.push(gameState.phaseTimer);
}

// ============================================
// FASE DE VOTACION
// ============================================
function startVotingPhase(room) {
    if (!gameState.active) return;
    gameState.phase = 'voting';
    gameState.votes = {};

    try { room.pauseGame(true); } catch(e) {}

    var alivePlayers = getAlivePlayers();
    var voteParts = [];
    for (var i = 0; i < alivePlayers.length; i++) {
        voteParts.push(alivePlayers[i].number + '.' + alivePlayers[i].name);
    }
    room.sendAnnouncement('🗳️ VOTACION! Escribe solo el numero del sospechoso, sin # (' + (config.votingMs / 1000) + 's):\n' + voteParts.join(' | '), null, 0xFFFF00, 'bold', 2);

    gameState.phaseTimer = setTimeout(function() {
        if (!gameState.active || gameState.phase !== 'voting') return;
        resolveVotes(room);
    }, config.votingMs);
    gameState.timeouts.push(gameState.phaseTimer);
}

function processVote(room, player, message) {
    if (gameState.phase !== 'voting') return;

    var voterPlayer = findPlayerById(player.id);
    if (!voterPlayer || !voterPlayer.alive) return;

    if (gameState.votes[player.id] !== undefined) {
        room.sendAnnouncement('⚠️ Ya votaste.', player.id, 0xFF6600);
        return;
    }

    var num = parseInt(message.trim());
    if (isNaN(num)) return;

    var target = findPlayerByNumber(num);
    if (!target || !target.alive) {
        room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
        return;
    }

    gameState.votes[player.id] = num;
    room.sendAnnouncement('✋ ' + voterPlayer.name + ' voto por ' + target.name, null, 0xFFFF00, 'bold');

    checkAllVoted(room);
}

function checkAllVoted(room) {
    if (gameState.phase !== 'voting' || !gameState.active) return;

    var alivePlayers = getAlivePlayers();
    var allVoted = true;
    for (var i = 0; i < alivePlayers.length; i++) {
        if (gameState.votes[alivePlayers[i].id] === undefined) {
            allVoted = false;
            break;
        }
    }

    if (allVoted) {
        if (gameState.phaseTimer) {
            clearTimeout(gameState.phaseTimer);
            gameState.phaseTimer = null;
        }
        var t = setTimeout(function() {
            if (!gameState.active) return;
            resolveVotes(room);
        }, 2000);
        gameState.timeouts.push(t);
    }
}

// ============================================
// RESOLVER VOTOS
// ============================================
function resolveVotes(room) {
    if (!gameState.active) return;

    var voteCounts = {};
    var alivePlayers = getAlivePlayers();

    for (var voterId in gameState.votes) {
        var voter = findPlayerById(parseInt(voterId));
        if (!voter || !voter.alive) continue;

        var targetNum = gameState.votes[voterId];
        var target = findPlayerByNumber(targetNum);
        if (!target || !target.alive) continue;

        voteCounts[targetNum] = (voteCounts[targetNum] || 0) + 1;
    }

    var summaryMsg = '\n📊 RESULTADO DE VOTACION:\n';
    for (var s = 0; s < alivePlayers.length; s++) {
        var votes = voteCounts[alivePlayers[s].number] || 0;
        summaryMsg += alivePlayers[s].name + ': ' + votes + ' voto(s)\n';
    }
    room.sendAnnouncement(summaryMsg, null, 0x00BFFF);

    var maxVotes = 0;
    var maxTargets = [];
    for (var num in voteCounts) {
        if (voteCounts[num] > maxVotes) {
            maxVotes = voteCounts[num];
            maxTargets = [parseInt(num)];
        } else if (voteCounts[num] === maxVotes) {
            maxTargets.push(parseInt(num));
        }
    }

    if (maxVotes === 0 || maxTargets.length > 1) {
        room.sendAnnouncement('⚖️ EMPATE! Nadie fue eliminado. Continua el juego...', null, 0xFFFF00, 'bold', 2);
        gameState.phase = 'result';

        var t = setTimeout(function() {
            if (!gameState.active) return;
            startKillPhase(room);
        }, 4000);
        gameState.timeouts.push(t);
        return;
    }

    var eliminatedNum = maxTargets[0];
    var eliminated = findPlayerByNumber(eliminatedNum);

    // Nino Flor cancela el linchamiento
    if (gameState.ninoFlorActivated && eliminated) {
        gameState.ninoFlorActivated = false;
        room.sendAnnouncement('🌸 ' + eliminated.name + ' iba a ser eliminado... pero el NINO FLOR lo salvo!', null, 0xFF99CC, 'bold', 2);
        gameState.phase = 'result';
        var tFlor = setTimeout(function() {
            if (!gameState.active) return;
            startKillPhase(room);
        }, 5000);
        gameState.timeouts.push(tFlor);
        return;
    }
    gameState.ninoFlorActivated = false;

    if (eliminated) {
        eliminated.alive = false;
        try { room.setPlayerTeam(eliminated.id, 0); } catch(e) {}

        // Si tenia proteccion, quitarla (la votacion no se bloquea con proteccion)
        if (eliminated.id === gameState.protectedPlayerId) {
            gameState.protectedPlayerId = null;
        }

        // Check si el eliminado es el Bufon - el Bufon gana!
        if (eliminated.role === 'bufon') {
            room.sendAnnouncement('\n⚖️ ' + eliminated.name + ' fue eliminado por votacion!\n🃏 ERA EL BUFON! Su objetivo era ser eliminado por votacion!\n🏆 EL BUFON GANA!', null, 0xFF8800, 'bold', 2);
            endGame(room, 'bufon');
            return;
        }

        var roleNames = {
            'impostor': '🔪 ERA IMPOSTOR!',
            'inocente': '😇 Era INOCENTE...',
            'medico': '🏥 Era MEDICO...',
            'vidente': '🔮 Era VIDENTE...',
            'guardaespaldas': '🛡️ Era GUARDAESPALDAS...',
            'sacerdote': '⛪ Era SACERDOTE...',
            'carcelero': '🔒 Era CARCELERO...',
            'cupido': '💘 Era CUPIDO...',
            'bruja': '🧙 Era BRUJA...',
            'cazador': '🏹 Era CAZADOR...',
            'clarividente': '🔮 Era CLARIVIDENTE...',
            'ninoflor': '🌸 Era NIÑO FLOR...',
            'embrujado': '👻 Era EMBRUJADO...',
            'piromano': '🔥 Era PIROMANO!'
        };
        var roleText = roleNames[eliminated.role] || ('❓ Era ' + eliminated.role.toUpperCase());
        var roleColor = eliminated.role === 'impostor' || eliminated.role === 'piromano' ? 0x00FF00 : 0xFF0000;
        room.sendAnnouncement('\n⚖️ ' + eliminated.name + ' fue eliminado por votacion!\n' + roleText, null, roleColor, 'bold', 2);

        // Manejar cupido link y cazador despues de la eliminacion por voto
        var voteKilledIds = {};
        voteKilledIds[eliminated.id] = true;
        gameState.phase = 'result';
        proceedAfterDeaths(room, voteKilledIds, function() {
            var t2 = setTimeout(function() {
                if (!gameState.active) return;
                startKillPhase(room);
            }, 5000);
            gameState.timeouts.push(t2);
        });
        return;
    }

    gameState.phase = 'result';

    var t2 = setTimeout(function() {
        if (!gameState.active) return;
        startKillPhase(room);
    }, 5000);
    gameState.timeouts.push(t2);
}

// ============================================
// CONDICIONES DE VICTORIA
// ============================================
function checkWinCondition(room) {
    var alivePlayers = getAlivePlayers();
    var aliveImpostors = getAliveImpostors();
    var piromanoAlive = gameState.piromanoId ? (function() { var p = findPlayerById(gameState.piromanoId); return p && p.alive; })() : false;

    // Piromano gana si es el unico vivo
    if (piromanoAlive && alivePlayers.length === 1) {
        endGame(room, 'piromano');
        return true;
    }

    // Contar inocentes (sin piromano)
    var aliveInocentes = alivePlayers.filter(function(p) {
        return p.role !== 'impostor' && p.id !== gameState.piromanoId;
    }).length;

    // Inocentes ganan si todos los impostores muertos Y piromano muerto
    if (aliveImpostors.length === 0 && !piromanoAlive) {
        endGame(room, 'inocentes');
        return true;
    }

    // Impostores ganan si inocentes <= 1 Y piromano muerto
    if (aliveInocentes <= 1 && aliveImpostors.length > 0 && !piromanoAlive) {
        endGame(room, 'impostor');
        return true;
    }

    // Si solo quedan impostores y piromano (sin inocentes), impostores ganan
    // (el piromano no puede ganar solo contra impostores sin incendiar)
    if (aliveInocentes === 0 && aliveImpostors.length > 0 && piromanoAlive) {
        endGame(room, 'impostor');
        return true;
    }

    return false;
}

// ============================================
// FIN DEL JUEGO
// ============================================
function endGame(room, winner) {
    gameState.phase = null;
    gameState.active = false;
    clearAllTimeouts();

    var callback = gameState.onGameEnd;
    gameState.onGameEnd = null;

    var impostors = [];
    var inocentesVivos = [];
    for (var i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].role === 'impostor') impostors.push(gameState.players[i]);
        if (isInnocentTeam(gameState.players[i].role) && gameState.players[i].alive) {
            inocentesVivos.push(gameState.players[i]);
        }
    }

    if (winner === 'piromano') {
        var piromanoP = findPlayerById(gameState.piromanoId);
        var piromanoName = piromanoP ? piromanoP.name : 'Piromano';
        var impNames = impostors.map(function(p) { return p.name; }).join(' y ');
        room.sendAnnouncement('\n🔥🔥🔥 EL PIROMANO GANA!\n🔥 ' + piromanoName + ' incendio todo a su paso!\n🔪 Los impostores eran: ' + (impNames || 'ninguno'), null, 0xFF4500, 'bold', 2);
        setTimeout(function() {
            try { room.stopGame(); } catch(e) {}
            if (callback) {
                callback({
                    type: 'piromano_win',
                    piromanoId: gameState.piromanoId,
                    piromanoName: piromanoName
                });
            }
        }, 4000);
        return;
    }

    if (winner === 'bufon') {
        var bufonP = findPlayerById(gameState.bufonId);
        var bufonName = bufonP ? bufonP.name : 'Bufon';
        setTimeout(function() {
            try { room.stopGame(); } catch(e) {}
            if (callback) {
                callback({
                    type: 'bufon_win',
                    bufonId: gameState.bufonId,
                    bufonName: bufonName
                });
            }
        }, 4000);
        return;
    }

    if (impostors.length === 0) {
        try { room.stopGame(); } catch(e) {}
        if (callback) callback(null);
        return;
    }

    var impostorNames = impostors.map(function(p) { return p.name; }).join(' y ');

    if (winner === 'inocentes') {
        var impText = impostors.length === 2
            ? '🔪 Los impostores eran ' + impostorNames
            : '🔪 El impostor era ' + impostorNames;
        room.sendAnnouncement('\n🎉 LOS INOCENTES GANAN!\n' + impText + '\n💰 Cada inocente vivo gana $2.000', null, 0x00FF00, 'bold', 2);

        var inocenteIds = [];
        var inocenteNames = [];
        for (var j = 0; j < inocentesVivos.length; j++) {
            inocenteIds.push(inocentesVivos[j].id);
            inocenteNames.push(inocentesVivos[j].name);
        }

        setTimeout(function() {
            try { room.stopGame(); } catch(e) {}
            if (callback) {
                callback({
                    type: 'inocentes_win',
                    inocenteIds: inocenteIds,
                    inocenteNames: inocenteNames,
                    impostorIds: impostors.map(function(p) { return p.id; }),
                    impostorNames: impostors.map(function(p) { return p.name; })
                });
            }
        }, 4000);
    } else {
        var impWinText = impostors.length === 2
            ? '🎭 Eran ' + impostorNames + ' todo este tiempo!'
            : '🎭 Era ' + impostorNames + ' todo este tiempo!';
        var prizeText = impostors.length === 2
            ? '💰 Cada impostor gana $5.000'
            : '💰 ' + impostorNames + ' gana $10.000';
        room.sendAnnouncement('\n🔪 LOS IMPOSTORES GANAN!\n' + impWinText + '\n' + prizeText, null, 0xFF0000, 'bold', 2);

        setTimeout(function() {
            try { room.stopGame(); } catch(e) {}
            if (callback) {
                callback({
                    type: 'impostor_win',
                    impostorIds: impostors.map(function(p) { return p.id; }),
                    impostorNames: impostors.map(function(p) { return p.name; })
                });
            }
        }, 4000);
    }
}

// ============================================
// CHAT HANDLER
// ============================================
function onPlayerChat(player, message) {
    if (!gameState.active) return true;

    // Cazador muriendo - prioridad maxima (cualquier fase)
    if (gameState.cazadorDying && player.id === gameState.cazadorId) {
        processCazadorShot(_room, player, message);
        return false;
    }

    // SETUP: bloquear todo
    if (gameState.phase === 'setup') return false;

    // Comandos de roles: interceptar en cualquier fase para que no se filtren al chat publico
    var cmdLower = message.toLowerCase().trim();
    var roleCommands = ['!muerte', '!vida', '!apuntar', '!revivir', '!matar', '!ver', '!renunciar', '!empapar', '!incendiar'];
    var isRoleCmd = false;
    for (var rc = 0; rc < roleCommands.length; rc++) {
        if (cmdLower.indexOf(roleCommands[rc]) === 0) { isRoleCmd = true; break; }
    }
    if (isRoleCmd && gameState.phase !== 'kill') {
        _room.sendAnnouncement('⚠️ Solo puedes usar comandos de rol durante la NOCHE.', player.id, 0xFF6600);
        return false;
    }

    // KILL: impostores, medico, vidente, carcelero, preso escriben
    if (gameState.phase === 'kill') {
        // Carcelero y preso chatean entre si
        if (gameState.jailedPlayerId && (player.id === gameState.jailerId || player.id === gameState.jailedPlayerId)) {
            var chatP = findPlayerById(player.id);
            if (chatP && chatP.alive) {
                processJailChat(_room, player, message);
            }
        } else if (isImpostor(player.id) && gameState.activePlayers[player.id]) {
            var impP = findPlayerById(player.id);
            if (impP && impP.alive) {
                var msgTrim = message.trim();
                var msgLower = msgTrim.toLowerCase();
                // Comando !renunciar del impostor vidente
                if (msgLower === '!renunciar' && player.id === gameState.impostorVidenteId) {
                    gameState.impostorVidenteId = null;
                    _room.sendAnnouncement('🔮❌ Has renunciado a tu habilidad de investigar. Ahora eres un impostor normal.', player.id, 0xFF6600, 'bold');
                // Comando !ver del impostor vidente
                } else if (msgLower.indexOf('!ver') === 0 && player.id === gameState.impostorVidenteId) {
                    processImpostorVision(_room, player, msgTrim.substring(4).trim());
                } else if (!isNaN(parseInt(msgTrim))) {
                    // Es un numero: kill choice
                    processKillChoice(_room, player, message);
                } else {
                    // Chat privado entre impostores
                    var otherImps = getAliveImpostors().filter(function(p) { return p.id !== player.id; });
                    for (var oi = 0; oi < otherImps.length; oi++) {
                        _room.sendAnnouncement('🔪 ' + impP.name + ': ' + message, otherImps[oi].id, 0xFF4444);
                    }
                    _room.sendAnnouncement('🔪 Tu: ' + message, player.id, 0xCC3333);
                }
            }
        } else if (player.id === gameState.medicoId && gameState.activePlayers[player.id]) {
            var medicoP = findPlayerById(player.id);
            if (medicoP && medicoP.alive) {
                processProtectChoice(_room, player, message);
            }
        } else if (player.id === gameState.bodyguardId && gameState.activePlayers[player.id]) {
            var bodyguardP = findPlayerById(player.id);
            if (bodyguardP && bodyguardP.alive) {
                processGuardChoice(_room, player, message);
            }
        } else if (player.id === gameState.sacerdoteId && gameState.activePlayers[player.id]) {
            var sacerdoteP = findPlayerById(player.id);
            if (sacerdoteP && sacerdoteP.alive) {
                processSacerdoteChoice(_room, player, message);
            }
        } else if (player.id === gameState.videnteId && gameState.activePlayers[player.id]) {
            var videnteP = findPlayerById(player.id);
            if (videnteP && videnteP.alive) {
                processVisionChoice(_room, player, message);
            }
        } else if (player.id === gameState.cupidoId && gameState.activePlayers[player.id] && gameState.round === 1) {
            var cupidoP = findPlayerById(player.id);
            if (cupidoP && cupidoP.alive) {
                processCupidoChoice(_room, player, message);
            }
        } else if (player.id === gameState.brujaId && gameState.activePlayers[player.id]) {
            var brujaP2 = findPlayerById(player.id);
            if (brujaP2 && brujaP2.alive) {
                var brujaLower = message.toLowerCase().trim();
                if (brujaLower.indexOf('!vida') === 0) {
                    processBrujaLifeChoice(_room, player, brujaLower.substring(5).trim());
                } else if (brujaLower.indexOf('!muerte') === 0) {
                    processBrujaDeathChoice(_room, player, brujaLower.substring(7).trim());
                }
            }
        // Cazador: !apuntar durante la noche
        } else if (player.id === gameState.cazadorId && gameState.activePlayers[player.id]) {
            var cazP = findPlayerById(player.id);
            if (cazP && cazP.alive) {
                var cazLower = message.toLowerCase().trim();
                if (cazLower.indexOf('!apuntar') === 0) {
                    var cazNum = parseInt(cazLower.substring(8).trim());
                    if (isNaN(cazNum)) {
                        _room.sendAnnouncement('⚠️ Usa: !apuntar [numero]', player.id, 0xFF6600);
                    } else {
                        var cazTarget = findPlayerByNumber(cazNum);
                        if (!cazTarget || !cazTarget.alive || cazTarget.id === player.id) {
                            _room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
                        } else {
                            gameState.cazadorTarget = cazNum;
                            _room.sendAnnouncement('🏹🎯 Apuntando a ' + cazTarget.name + '. Si mueres, le dispararas automaticamente.', player.id, 0x8B4513, 'bold');
                        }
                    }
                }
            }
        // Piromano: !empapar y !incendiar durante la noche
        } else if (player.id === gameState.piromanoId && gameState.activePlayers[player.id]) {
            var piroP = findPlayerById(player.id);
            if (piroP && piroP.alive) {
                var piroLower = message.toLowerCase().trim();
                if (piroLower.indexOf('!empapar') === 0) {
                    if (gameState.piromanoAction === 'ignite') {
                        _room.sendAnnouncement('⚠️ Ya elegiste INCENDIAR esta noche. No puedes empapar.', player.id, 0xFF6600);
                    } else if (gameState.piromanoDouseTargets.length >= 2) {
                        _room.sendAnnouncement('⚠️ Ya empapaste a 2 jugadores esta noche.', player.id, 0xFF6600);
                    } else {
                        var piroNum = parseInt(piroLower.substring(8).trim());
                        if (isNaN(piroNum)) {
                            _room.sendAnnouncement('⚠️ Usa: !empapar [numero]. Ej: !empapar 3', player.id, 0xFF6600);
                        } else {
                            var piroTarget = findPlayerByNumber(piroNum);
                            if (!piroTarget || !piroTarget.alive || piroTarget.id === player.id) {
                                _room.sendAnnouncement('⚠️ Numero invalido.', player.id, 0xFF6600);
                            } else if (gameState.dousedPlayers.indexOf(piroTarget.id) !== -1) {
                                _room.sendAnnouncement('⚠️ ' + piroTarget.name + ' ya esta empapado.', player.id, 0xFF6600);
                            } else if (gameState.piromanoDouseTargets.indexOf(piroTarget.id) !== -1) {
                                _room.sendAnnouncement('⚠️ Ya elegiste empapar a ' + piroTarget.name + ' esta noche.', player.id, 0xFF6600);
                            } else {
                                gameState.piromanoAction = 'douse';
                                gameState.piromanoDouseTargets.push(piroTarget.id);
                                _room.sendAnnouncement('🛢️ Empaparas a ' + piroTarget.name + ' con gasolina. (' + gameState.piromanoDouseTargets.length + '/2)', player.id, 0xFF4500, 'bold');
                            }
                        }
                    }
                } else if (piroLower === '!incendiar') {
                    if (gameState.piromanoAction === 'douse') {
                        _room.sendAnnouncement('⚠️ Ya elegiste EMPAPAR esta noche. No puedes incendiar.', player.id, 0xFF6600);
                    } else if (gameState.dousedPlayers.length === 0) {
                        _room.sendAnnouncement('⚠️ No hay jugadores empapados para incendiar.', player.id, 0xFF6600);
                    } else {
                        gameState.piromanoAction = 'ignite';
                        var dousedNames = [];
                        for (var dn = 0; dn < gameState.dousedPlayers.length; dn++) {
                            var dp = findPlayerById(gameState.dousedPlayers[dn]);
                            if (dp && dp.alive) dousedNames.push(dp.name);
                        }
                        _room.sendAnnouncement('🔥 INCENDIARAS a ' + dousedNames.length + ' jugadores: ' + dousedNames.join(', '), player.id, 0xFF4500, 'bold');
                    }
                }
            }
        // Clarividente: !revivir durante la noche
        } else if (player.id === gameState.clarividenteId && gameState.activePlayers[player.id]) {
            var clavP = findPlayerById(player.id);
            if (clavP && clavP.alive) {
                var clavLower = message.toLowerCase().trim();
                if (clavLower.indexOf('!revivir') === 0) {
                    if (gameState.clarividenteReviveUsed) {
                        _room.sendAnnouncement('⚠️ Ya usaste tu poder de revivir.', player.id, 0xFF6600);
                    } else {
                        var revNum = parseInt(clavLower.substring(8).trim());
                        if (isNaN(revNum)) {
                            _room.sendAnnouncement('⚠️ Usa: !revivir [numero]', player.id, 0xFF6600);
                        } else {
                            var revTarget = findPlayerByNumber(revNum);
                            if (!revTarget || revTarget.alive) {
                                _room.sendAnnouncement('⚠️ Numero invalido o el jugador esta vivo.', player.id, 0xFF6600);
                            } else {
                                gameState.clarividenteReviveUsed = true;
                                gameState.pendingRevive = revTarget.id;
                                _room.sendAnnouncement('👁️ Reviviras a ' + revTarget.name + ' al final de la noche.', player.id, 0x00CED1, 'bold');
                            }
                        }
                    }
                }
            }
        }

        // Muertos hablan al clarividente durante la noche
        if (gameState.clarividenteId) {
            var deadP = findPlayerById(player.id);
            if (deadP && !deadP.alive && gameState.activePlayers[player.id]) {
                var clavAlive = findPlayerById(gameState.clarividenteId);
                if (clavAlive && clavAlive.alive) {
                    _room.sendAnnouncement('💀 [Muerto] ' + deadP.name + ': ' + message, gameState.clarividenteId, 0x00CED1);
                    _room.sendAnnouncement('💀 Tu mensaje fue enviado al clarividente.', player.id, 0x00CED1);
                }
            }
        }

        return false;
    }

    // VOTING: solo jugadores vivos votan
    if (gameState.phase === 'voting') {
        // Nino Flor: !salvar durante votacion
        if (player.id === gameState.ninoFlorId && !gameState.ninoFlorUsed && message.toLowerCase().trim() === '!salvar') {
            var nfp = findPlayerById(player.id);
            if (nfp && nfp.alive) {
                gameState.ninoFlorUsed = true;
                gameState.ninoFlorActivated = true;
                _room.sendAnnouncement('🌸 El NINO FLOR ha usado su poder! La eliminacion sera cancelada!', null, 0xFF99CC, 'bold', 2);
            }
            return false;
        }
        if (gameState.activePlayers[player.id]) {
            var vp = findPlayerById(player.id);
            if (vp && vp.alive) {
                processVote(_room, player, message);
            } else if (vp && !vp.alive) {
                _room.sendAnnouncement('💀 Estas muerto, no puedes votar.', player.id, 0xFF0000);
            }
        }
        return false;
    }

    // DISCUSSION
    if (gameState.phase === 'discussion') {
        if (!gameState.activePlayers[player.id]) return true;

        var dp = findPlayerById(player.id);
        if (dp && !dp.alive) {
            _room.sendAnnouncement('💀 Estas muerto, no puedes hablar.', player.id, 0xFF0000);
            return false;
        }

        // Comando !jail del carcelero (privado)
        var lower = message.toLowerCase();
        if (lower.indexOf('!jail') === 0 && player.id === gameState.jailerId) {
            var jailerP = findPlayerById(player.id);
            if (jailerP && jailerP.alive) {
                var jailNum = parseInt(message.substring(5).trim());
                if (isNaN(jailNum)) {
                    _room.sendAnnouncement('⚠️ Usa: !jail [numero]', player.id, 0xFF6600);
                } else {
                    var jailTarget = findPlayerByNumber(jailNum);
                    if (!jailTarget || !jailTarget.alive || jailTarget.id === gameState.jailerId) {
                        _room.sendAnnouncement('⚠️ Numero invalido. Elige un jugador vivo.', player.id, 0xFF6600);
                    } else {
                        gameState.pendingJail = jailNum;
                        _room.sendAnnouncement('🔒 Encarcelaras a ' + jailTarget.name + ' (#' + jailNum + ') esta noche.', player.id, 0x888888);
                    }
                }
            }
            return false; // no mostrar el comando
        }

        lower = message.toLowerCase();
        for (var i = 0; i < filteredWords.length; i++) {
            if (lower.indexOf(filteredWords[i]) !== -1) {
                _room.sendAnnouncement('⚠️ No puedes revelar roles directamente!', player.id, 0xFF6600);
                return false;
            }
        }
        return true;
    }

    return true;
}

// ============================================
// PLAYER LEAVE
// ============================================
function onPlayerLeave(room, player) {
    if (!gameState.active) return;

    var p = findPlayerById(player.id);
    if (!p || !p.alive) return;

    p.alive = false;
    room.sendAnnouncement('🚪 ' + p.name + ' se desconecto', null, 0xFF6600);

    // Si el jugador protegido se va, quitar proteccion
    if (player.id === gameState.protectedPlayerId) {
        gameState.protectedPlayerId = null;
    }
    if (player.id === gameState.guardedPlayerId) {
        gameState.guardedPlayerId = null;
    }
    // Si el preso se va, liberar
    if (player.id === gameState.jailedPlayerId) {
        gameState.jailedPlayerId = null;
        if (gameState.jailerId) {
            room.sendAnnouncement('🔒 El prisionero se desconecto.', gameState.jailerId, 0x888888);
        }
    }
    // Si el carcelero se va, liberar preso
    if (player.id === gameState.jailerId) {
        if (gameState.jailedPlayerId) {
            room.sendAnnouncement('🔒 El carcelero se fue. Has sido liberado.', gameState.jailedPlayerId, 0x888888);
            gameState.jailedPlayerId = null;
        }
    }

    // Piromano: quitar de empapados si se desconecta
    var dousedIdx = gameState.dousedPlayers.indexOf(player.id);
    if (dousedIdx !== -1) gameState.dousedPlayers.splice(dousedIdx, 1);

    // Cupido link: si el que se fue estaba vinculado, matar al otro
    handleCupidoLink(room, player.id);

    // Si un impostor se fue
    if (isImpostor(player.id)) {
        var aliveImpostors = getAliveImpostors();
        if (aliveImpostors.length === 0) {
            room.sendAnnouncement('🔪 Todos los impostores se desconectaron! Los INOCENTES ganan!', null, 0x00FF00, 'bold', 2);
            endGame(room, 'inocentes');
            return;
        }
    }

    // Durante setup
    if (gameState.phase === 'setup') {
        var alive = getAlivePlayers();
        if (alive.length < config.minPlayers) {
            room.sendAnnouncement('❌ No hay suficientes jugadores. Juego cancelado.', null, 0xFF0000, 'bold', 2);
            clearAllTimeouts();
            gameState.phase = null;
            gameState.active = false;
            var cb = gameState.onGameEnd;
            gameState.onGameEnd = null;
            try { room.stopGame(); } catch(e) {}
            if (cb) cb(null);
            return;
        }
    }

    if (checkWinCondition(room)) return;

    if (gameState.phase === 'voting') {
        delete gameState.votes[player.id];
        checkAllVoted(room);
    }

    if (gameState.phase === 'kill') {
        for (var impId in gameState.pendingKills) {
            var pendingTarget = findPlayerByNumber(gameState.pendingKills[impId]);
            if (pendingTarget && pendingTarget.id === player.id) {
                delete gameState.pendingKills[impId];
                room.sendAnnouncement('⚠️ Tu objetivo se desconecto. Elige otro.', parseInt(impId), 0xFF6600);
            }
        }

        if (gameState.pendingProtect !== null) {
            var protTarget = findPlayerByNumber(gameState.pendingProtect);
            if (protTarget && protTarget.id === player.id) {
                gameState.pendingProtect = null;
            }
        }
        if (gameState.pendingGuard !== null) {
            var guardTarget = findPlayerByNumber(gameState.pendingGuard);
            if (guardTarget && guardTarget.id === player.id) {
                gameState.pendingGuard = null;
            }
        }
        if (gameState.pendingHolyWater !== null) {
            var holyTarget = findPlayerByNumber(gameState.pendingHolyWater);
            if (holyTarget && holyTarget.id === player.id) {
                gameState.pendingHolyWater = null;
            }
        }
    }
}

// ============================================
// STOP / UTILS
// ============================================
function stop(room) {
    clearAllTimeouts();
    gameState.active = false;
    gameState.phase = null;
    gameState.players = [];
    gameState.votes = {};
    gameState.activePlayers = {};
    gameState.savedTeams = {};
    gameState.impostorIds = [];
    gameState.pendingKills = {};
    gameState.onGameEnd = null;
    gameState.round = 0;
    gameState.medicoId = null;
    gameState.videnteId = null;
    gameState.bodyguardId = null;
    gameState.bodyguardHits = 0;
    gameState.protectedPlayerId = null;
    gameState.guardedPlayerId = null;
    gameState.pendingProtect = null;
    gameState.pendingGuard = null;
    gameState.pendingHolyWater = null;
    gameState.sacerdoteId = null;
    gameState.jailerId = null;
    gameState.jailedPlayerId = null;
    gameState.pendingJail = null;
    gameState.jailerBulletUsed = false;
    gameState.jailerKilledThisNight = false;
    gameState.pendingVision = null;
    gameState.videnteActed = false;
    gameState.bufonId = null;
    gameState.impostorVidenteId = null;
    gameState.pendingImpostorVision = null;
    gameState.impostorVidenteActed = false;
    gameState.cupidoId = null;
    gameState.linkedPair = [];
    gameState.cupidoChoice1 = null;
    gameState.brujaId = null;
    gameState.brujaLifeUsed = false;
    gameState.brujaDeathUsed = false;
    gameState.pendingBrujaLife = null;
    gameState.pendingBrujaDeath = null;
    gameState.brujaProtectedId = null;
    gameState.cazadorId = null;
    gameState.cazadorShot = false;
    gameState.cazadorDying = false;
    gameState.cazadorCallback = null;
    gameState.cazadorTarget = null;
    gameState.clarividenteId = null;
    gameState.clarividenteReviveUsed = false;
    gameState.pendingRevive = null;
    gameState.ninoFlorId = null;
    gameState.ninoFlorUsed = false;
    gameState.ninoFlorActivated = false;
    gameState.embrujadoId = null;
    gameState.embrujadoConverted = false;
    gameState.piromanoId = null;
    gameState.dousedPlayers = [];
    gameState.piromanoDouseTargets = [];
    gameState.piromanoAction = null;
    try { room.stopGame(); } catch(e) {}
}

function setMapData(m) { mapData = m; }

function isActive() { return gameState.active; }

module.exports = {
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: setMapData,
    isActive: isActive
};
