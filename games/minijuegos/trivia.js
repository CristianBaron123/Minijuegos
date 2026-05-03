// ============================================
// MINIJUEGO: TRIVIA - Preguntas y Respuestas (3 rondas)
// Cada ronda elimina a quienes fallen.
// Si quedan varios al final, ganador aleatorio.
// Si nadie acierta en la ronda 3, nadie gana.
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    alivePlayers: [],
    chatBlocked: false,
    currentQuestion: null,
    answerTimeout: null,
    revealTimeouts: [],
    gameStartTime: null,
    firstEliminated: null,
    round: 0,
    onGameEnd: null
};

// Preguntas usadas en la sesion (evitar repetir)
var usedQuestions = [];

var config = {
    answerTimeMs: 30000,    // 30 segundos para responder
    explanationMs: 5000,    // 5 segundos para leer la pregunta (pausado)
    maxRounds: 3
};

// Detectar zona del jugador segun posicion X
function getPlayerZone(pos) {
    if (pos.x <= -255) return 'a';
    if (pos.x <= 0) return 'b';
    if (pos.x <= 255) return 'c';
    return 'd';
}

// ============================================
// 60 PREGUNTAS DE TRIVIA
// ============================================
var questions = [
    // === CULTURA GENERAL (30) ===
    { q: "Cual es el planeta mas grande del sistema solar?", a: "Jupiter", b: "Saturno", c: "Neptuno", d: "Urano", correct: "a" },
    { q: "En que ano llego el hombre a la Luna?", a: "1969", b: "1972", c: "1961", d: "1965", correct: "a" },
    { q: "Cual es el oceano mas grande del mundo?", a: "Atlantico", b: "Indico", c: "Artico", d: "Pacifico", correct: "d" },
    { q: "Cuantos huesos tiene un adulto?", a: "186", b: "206", c: "256", d: "176", correct: "b" },
    { q: "Cual es el pais mas grande del mundo?", a: "Canada", b: "China", c: "Rusia", d: "Estados Unidos", correct: "c" },
    { q: "Cuantos continentes hay?", a: "5", b: "6", c: "8", d: "7", correct: "d" },
    { q: "Cual es el rio mas largo del mundo?", a: "Nilo", b: "Amazonas", c: "Yangtse", d: "Misisipi", correct: "a" },
    { q: "En que pais se invento la pizza?", a: "Francia", b: "Grecia", c: "Espana", d: "Italia", correct: "d" },
    { q: "Quien pinto la Mona Lisa?", a: "Miguel Angel", b: "Da Vinci", c: "Rafael", d: "Picasso", correct: "b" },
    { q: "Cuantos jugadores tiene un equipo de futbol?", a: "9", b: "11", c: "10", d: "12", correct: "b" },
    { q: "Que planeta es conocido como el planeta rojo?", a: "Venus", b: "Jupiter", c: "Saturno", d: "Marte", correct: "d" },
    { q: "Cuantas patas tiene una arana?", a: "8", b: "6", c: "10", d: "12", correct: "a" },
    { q: "En que continente esta Egipto?", a: "Asia", b: "Europa", c: "Africa", d: "America", correct: "c" },
    { q: "Cual es el animal mas grande del mundo?", a: "Elefante", b: "Ballena azul", c: "Jirafa", d: "Tiburon ballena", correct: "b" },
    { q: "Cuantos dientes tiene un adulto?", a: "28", b: "30", c: "36", d: "32", correct: "d" },
    { q: "Cual es la capital de Japon?", a: "Pekin", b: "Seul", c: "Tokio", d: "Bangkok", correct: "c" },
    { q: "Que vitamina nos da el Sol?", a: "Vitamina A", b: "Vitamina B", c: "Vitamina C", d: "Vitamina D", correct: "d" },
    { q: "Cuantos colores tiene el arcoiris?", a: "7", b: "5", c: "6", d: "8", correct: "a" },
    { q: "En que ano se hundio el Titanic?", a: "1905", b: "1912", c: "1918", d: "1920", correct: "b" },
    { q: "Cuantos lados tiene un hexagono?", a: "5", b: "7", c: "6", d: "8", correct: "c" },
    { q: "Cual es el hueso mas largo del cuerpo?", a: "Tibia", b: "Humero", c: "Femur", d: "Radio", correct: "c" },
    { q: "Que porcentaje de la Tierra es agua?", a: "50%", b: "60%", c: "80%", d: "70%", correct: "d" },
    { q: "Cual es el animal terrestre mas rapido?", a: "Leon", b: "Guepardo", c: "Caballo", d: "Avestruz", correct: "b" },
    { q: "Quien escribio Don Quijote?", a: "Cervantes", b: "Lope de Vega", c: "Garcia Marquez", d: "Neruda", correct: "a" },
    { q: "Cual es el metal mas ligero?", a: "Aluminio", b: "Sodio", c: "Magnesio", d: "Litio", correct: "d" },
    { q: "Cual es el idioma mas hablado del mundo?", a: "Espanol", b: "Ingles", c: "Mandarin", d: "Hindi", correct: "c" },
    { q: "Que gas necesitamos para respirar?", a: "Nitrogeno", b: "Oxigeno", c: "CO2", d: "Hidrogeno", correct: "b" },
    { q: "Cual es el deporte mas popular del mundo?", a: "Futbol", b: "Basquet", c: "Cricket", d: "Tenis", correct: "a" },
    { q: "Cual es la montana mas alta del mundo?", a: "K2", b: "Everest", c: "Kangchenjunga", d: "Lhotse", correct: "b" },
    { q: "A cuanto viaja la luz en km/s?", a: "100.000", b: "500.000", c: "300.000", d: "200.000", correct: "c" },
    // === PREGUNTAS DIFICILES (40) ===
    { q: "Cual es el unico pais del mundo que tiene una bandera no rectangular?", a: "Suiza", b: "Nepal", c: "Vaticano", d: "Japon", correct: "b" },
    { q: "Cuantos corazones tiene un pulpo?", a: "1", b: "2", c: "3", d: "4", correct: "c" },
    { q: "Cual es el elemento quimico mas abundante en el universo?", a: "Oxigeno", b: "Carbono", c: "Helio", d: "Hidrogeno", correct: "d" },
    { q: "En que ano cayo el Muro de Berlin?", a: "1987", b: "1989", c: "1991", d: "1985", correct: "b" },
    { q: "Cual es el hueso mas pequeno del cuerpo humano?", a: "Estribo", b: "Martillo", c: "Yunque", d: "Rotula", correct: "a" },
    { q: "Que pais tiene mas islas en el mundo?", a: "Indonesia", b: "Filipinas", c: "Suecia", d: "Noruega", correct: "c" },
    { q: "Cuantos litros de sangre tiene el cuerpo humano aproximadamente?", a: "3 litros", b: "5 litros", c: "7 litros", d: "10 litros", correct: "b" },
    { q: "Cual fue el primer animal en orbitar la Tierra?", a: "Un mono", b: "Una perra", c: "Un gato", d: "Una mosca", correct: "b" },
    { q: "Que porcentaje del cerebro humano es agua?", a: "50%", b: "60%", c: "75%", d: "90%", correct: "c" },
    { q: "Cuanto tarda la luz del Sol en llegar a la Tierra?", a: "1 segundo", b: "8 minutos", c: "1 minuto", d: "30 segundos", correct: "b" },
    { q: "Cual es el desierto mas grande del mundo?", a: "Sahara", b: "Gobi", c: "Antartico", d: "Arabigo", correct: "c" },
    { q: "En que pais se origino el chocolate?", a: "Suiza", b: "Belgica", c: "Mexico", d: "Peru", correct: "c" },
    { q: "Cuantas veces late el corazon humano por dia aproximadamente?", a: "50.000", b: "100.000", c: "150.000", d: "200.000", correct: "b" },
    { q: "Cual es el unico mamifero que puede volar?", a: "Ardilla voladora", b: "Murcielago", c: "Colibri", d: "Petirrojo", correct: "b" },
    { q: "Que pais invento la dinamita?", a: "Alemania", b: "Francia", c: "Suecia", d: "Inglaterra", correct: "c" },
    { q: "Cuantos pares de cromosomas tiene el ser humano?", a: "21", b: "23", c: "25", d: "46", correct: "b" },
    { q: "Cual es la unica fruta que tiene las semillas por fuera?", a: "Kiwi", b: "Mora", c: "Fresa", d: "Frambuesa", correct: "c" },
    { q: "En que organo del cuerpo se produce la insulina?", a: "Higado", b: "Rinon", c: "Pancreas", d: "Estomago", correct: "c" },
    { q: "Que temperatura alcanza un rayo en grados Celsius?", a: "5.000", b: "10.000", c: "20.000", d: "30.000", correct: "d" },
    { q: "Cual es el pais mas pequeno del mundo por superficie?", a: "Monaco", b: "San Marino", c: "Vaticano", d: "Liechtenstein", correct: "c" },
    { q: "Que numero es el resultado de: 8 + (6 x 4) / 3 - 5?", a: "11", b: "15", c: "7", d: "9", correct: "a" },
    { q: "Cuanto es: (2^5) - (3 x 7)?", a: "13", b: "31", c: "11", d: "9", correct: "c" },
    { q: "Si x + 3 = 2x - 7, cual es el valor de x?", a: "10", b: "5", c: "7", d: "3", correct: "a" },
    { q: "Que numero sigue en la serie: 2, 6, 12, 20, 30, ...?", a: "42", b: "40", c: "38", d: "36", correct: "a" },
    { q: "Cuanto es el area de un circulo con radio 7? (Usa π=3.14)", a: "153.86", b: "43.96", c: "138.47", d: "164.92", correct: "a" },
    { q: "Si un tren recorre 120 km en 1.5 horas, cual es su velocidad promedio?", a: "90 km/h", b: "80 km/h", c: "100 km/h", d: "70 km/h", correct: "b" },
    { q: "Cuanto es: 15% de 240?", a: "36", b: "30", c: "32", d: "40", correct: "a" },
    { q: "Cual es la raiz cuadrada de 1.764?", a: "42", b: "36", c: "38", d: "44", correct: "a" },
    { q: "Si 3x - 7 = 2x + 5, cual es x?", a: "12", b: "8", c: "10", d: "7", correct: "a" },
    { q: "Cuanto es: 2^10?", a: "1024", b: "512", c: "2048", d: "256", correct: "a" },
    { q: "Que numero es divisible por 3 y 5 a la vez: 125, 150, 145, 130?", a: "150", b: "125", c: "145", d: "130", correct: "a" },
    { q: "Cual es el resultado de: (5!)?", a: "120", b: "60", c: "24", d: "720", correct: "a" },
    { q: "Si a=3 y b=4, cuanto es: a^2 + b^2?", a: "25", b: "49", c: "12", d: "7", correct: "a" },
    { q: "Cuanto es: 3/4 + 2/5?", a: "23/20", b: "5/9", c: "6/20", d: "1/2", correct: "a" },
    { q: "Cual es el perimetro de un cuadrado de lado 8.5?", a: "34", b: "17", c: "68", d: "72", correct: "a" },
    { q: "Si compras 3 objetos por $45 cada uno y pagas con $200, cuanto vuelto recibes?", a: "65", b: "55", c: "75", d: "45", correct: "a" },
    { q: "Cuanto es: log10(1000)?", a: "3", b: "2", c: "4", d: "100", correct: "a" },
    { q: "Cual es el valor de π (pi) redondeado a 2 decimales?", a: "3.14", b: "3.16", c: "3.12", d: "3.18", correct: "a" },
    { q: "Si un libro tiene 350 paginas y lees 25 por dia, cuantos dias tardas en leerlo?", a: "14", b: "12", c: "10", d: "15", correct: "a" },
    { q: "Cuanto es: 8! / 6!?", a: "56", b: "48", c: "64", d: "72", correct: "a" },
    { q: "Cual es el area de un triangulo de base 12 y altura 8?", a: "48", b: "96", c: "20", d: "60", correct: "a" },
    { q: "Si x^2 = 169, cual es el valor positivo de x?", a: "13", b: "12", c: "14", d: "11", correct: "a" }
];

// ============================================
// SELECCIONAR PREGUNTA (sin repetir)
// ============================================
function selectQuestion() {
    var available = [];
    for (var i = 0; i < questions.length; i++) {
        if (usedQuestions.indexOf(i) === -1) available.push(i);
    }
    if (available.length === 0) {
        usedQuestions = [];
        for (var j = 0; j < questions.length; j++) available.push(j);
    }
    var idx = available[Math.floor(Math.random() * available.length)];
    usedQuestions.push(idx);
    return questions[idx];
}

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('📝 TRIVIA - Iniciando...');
    try {
        if (!mapData) {
            console.error('TRIVIA: mapData no disponible');
            if (onGameEnd) onGameEnd(null);
            return;
        }
        room.setCustomStadium(mapData);
    } catch (e) {
        console.error('TRIVIA: error al cargar mapa', e && e.message);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    try { shuffleTeams(room); } catch (e) {}

    gameState.active = true;
    gameState.players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    gameState.alivePlayers = gameState.players.slice(); // copia
    gameState.firstEliminated = null;
    gameState.gameStartTime = null;
    gameState.revealTimeouts = [];
    gameState.round = 0;
    gameState.onGameEnd = onGameEnd;

    room.sendAnnouncement(
        '📝 TRIVIA (3 RONDAS)\n👥 Jugadores: ' + gameState.players.length + '\n🏆 Sobrevive las 3 preguntas para ganar!',
        null, 0xFFFF00, 'bold', 2
    );

    var t = setTimeout(function() {
        if (!gameState.active) return;
        startRound(room);
    }, 1500);
    gameState.revealTimeouts.push(t);
}

// ============================================
// INICIAR RONDA
// ============================================
function startRound(room) {
    if (!gameState.active) return;
    gameState.round++;

    var q = selectQuestion();
    gameState.currentQuestion = q;

    room.startGame();
    try { room.pauseGame(true); } catch(e) {}
    gameState.chatBlocked = true;

    room.sendAnnouncement(
        '\n📝 RONDA ' + gameState.round + '/' + config.maxRounds + '\n\n' +
        '❓ ' + q.q + '\n\n' +
        'A) ' + q.a + '\n' +
        'B) ' + q.b + '\n' +
        'C) ' + q.c + '\n' +
        'D) ' + q.d + '\n\n' +
        '👉 Muevete a la zona de tu respuesta!\n' +
        '⏱️ Tienes 15 segundos...',
        null, 0xFFFF00, 'bold', 2
    );

    var t1 = setTimeout(function() {
        if (!gameState.active) return;
        try { room.pauseGame(false); } catch(e) {}
        gameState.chatBlocked = false;
        gameState.gameStartTime = Date.now();
        room.sendAnnouncement('🟢 ELIGE TU RESPUESTA! (' + (config.answerTimeMs / 1000) + 's)', null, 0x00FF00, 'bold', 2);

        // Aviso a los 10s
        var halfWarn = setTimeout(function() {
            if (!gameState.active) return;
            room.sendAnnouncement('⏱️ 5 segundos!', null, 0xFF6600, 'bold', 2);
        }, config.answerTimeMs - 5000);
        gameState.revealTimeouts.push(halfWarn);

        // Al terminar el tiempo, verificar respuestas
        gameState.answerTimeout = setTimeout(function() {
            if (!gameState.active) return;
            checkAnswers(room);
        }, config.answerTimeMs);
    }, config.explanationMs);
    gameState.revealTimeouts.push(t1);
}

// ============================================
// VERIFICAR RESPUESTAS
// ============================================
function checkAnswers(room) {
    if (!gameState.active) return;
    gameState.chatBlocked = true;

    var q = gameState.currentQuestion;
    var correct = q.correct;

    room.sendAnnouncement('⏰ TIEMPO!', null, 0xFF6600, 'bold', 2);

    // Clasificar jugadores vivos por zona
    var playerZones = { a: [], b: [], c: [], d: [] };
    var correctPlayers = [];
    var wrongPlayers = [];

    for (var i = 0; i < gameState.alivePlayers.length; i++) {
        var p = gameState.alivePlayers[i];
        var player = room.getPlayer(p.id);
        if (!player || !player.position) {
            wrongPlayers.push(p);
            continue;
        }
        var zone = getPlayerZone(player.position);
        playerZones[zone].push(p);
        if (zone === correct) {
            correctPlayers.push(p);
        } else {
            wrongPlayers.push(p);
        }
    }

    // Trackear primer eliminado
    if (wrongPlayers.length > 0 && !gameState.firstEliminated && gameState.gameStartTime) {
        var elapsedS = ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1);
        gameState.firstEliminated = { name: wrongPlayers[0].name, timeS: elapsedS };
    }

    // Fase 1: Revelar respuesta correcta (1.5s despues)
    var t1 = setTimeout(function() {
        if (!gameState.active) return;
        var answerText = correct === 'a' ? q.a : correct === 'b' ? q.b : correct === 'c' ? q.c : q.d;
        room.sendAnnouncement(
            '✅ Respuesta correcta: ' + correct.toUpperCase() + ') ' + answerText,
            null, 0x00FF00, 'bold', 2
        );
    }, 1500);
    gameState.revealTimeouts.push(t1);

    // Fase 2: Mostrar zonas y eliminar (3s despues)
    var t2 = setTimeout(function() {
        if (!gameState.active) return;
        var zoneNames = ['a', 'b', 'c', 'd'];
        var zoneLabels = { a: 'A', b: 'B', c: 'C', d: 'D' };

        for (var z = 0; z < zoneNames.length; z++) {
            var zn = zoneNames[z];
            if (playerZones[zn].length > 0) {
                var names = [];
                for (var j = 0; j < playerZones[zn].length; j++) {
                    names.push(playerZones[zn][j].name);
                }
                var icon = zn === correct ? '✅' : '❌';
                var color = zn === correct ? 0x00FF00 : 0xFF0000;
                room.sendAnnouncement(icon + ' Zona ' + zoneLabels[zn] + ': ' + names.join(', '), null, color);
            }
        }

        // Mover incorrectos a espectador
        for (var w = 0; w < wrongPlayers.length; w++) {
            try { room.setPlayerTeam(wrongPlayers[w].id, 0); } catch(e) {}
        }

        // Actualizar lista de vivos
        gameState.alivePlayers = correctPlayers;

        room.sendAnnouncement(
            '👥 Sobrevivientes: ' + correctPlayers.length + ' | Eliminados: ' + wrongPlayers.length,
            null, 0x00BFFF, 'bold'
        );
    }, 3000);
    gameState.revealTimeouts.push(t2);

    // Fase 3: Decidir si otra ronda o fin (5.5s despues)
    var t3 = setTimeout(function() {
        if (!gameState.active) return;

        try { room.stopGame(); } catch(e) {}

        // Nadie acerto
        if (correctPlayers.length === 0) {
            room.sendAnnouncement('😱 Nadie acerto! Mejor suerte la proxima...', null, 0xFF6600, 'bold', 2);
            var cb = gameState.onGameEnd;
            gameState.onGameEnd = null;
            stop(room);
            if (cb) cb(null);
            return;
        }

        // Solo queda 1: ganador directo
        if (correctPlayers.length === 1) {
            declareWinner(room, correctPlayers[0]);
            return;
        }

        // Ultima ronda: ganador aleatorio entre sobrevivientes
        if (gameState.round >= config.maxRounds) {
            room.sendAnnouncement(
                '🎲 ' + correctPlayers.length + ' sobrevivieron las 3 rondas! Eligiendo ganador al azar...',
                null, 0xFFFF00, 'bold', 2
            );
            var t4 = setTimeout(function() {
                if (!gameState.active) return;
                var winner = correctPlayers[Math.floor(Math.random() * correctPlayers.length)];
                declareWinner(room, winner);
            }, 2000);
            gameState.revealTimeouts.push(t4);
            return;
        }

        // Quedan mas de 1 y hay rondas restantes: siguiente ronda
        room.sendAnnouncement(
            '➡️ RONDA ' + (gameState.round + 1) + ' en 3 segundos...',
            null, 0xFFFF00, 'bold'
        );

        // Reasignar equipos a los sobrevivientes
        for (var s = 0; s < correctPlayers.length; s++) {
            var team = (s % 2 === 0) ? 1 : 2;
            try { room.setPlayerTeam(correctPlayers[s].id, team); } catch(e) {}
        }

        var t5 = setTimeout(function() {
            if (!gameState.active) return;
            startRound(room);
        }, 3000);
        gameState.revealTimeouts.push(t5);
    }, 5500);
    gameState.revealTimeouts.push(t3);
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner) {
    if (!gameState.active) return;

    var cb = gameState.onGameEnd;
    gameState.onGameEnd = null;

    room.sendAnnouncement(
        '\n🏆 ' + winner.name.toUpperCase() + ' HA GANADO TRIVIA! 🏆\n' +
        '📝 Sobrevivio ' + gameState.round + ' ronda(s)',
        null, 0xFFD700, 'bold', 2
    );

    gameState.active = false;

    setTimeout(function() {
        stop(room);
        if (cb) cb(winner);
    }, 3000);
}

// ============================================
// REVOLVER EQUIPOS
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p) { return p.id !== 0; });
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var k = 0; k < players.length; k++) {
        try { room.setPlayerTeam(players[k].id, (k < half) ? 1 : 2); } catch(e) {}
    }
}

// ============================================
// DETENER JUEGO
// ============================================
function stop(room) {
    if (gameState.answerTimeout) {
        clearTimeout(gameState.answerTimeout);
        gameState.answerTimeout = null;
    }
    for (var i = 0; i < gameState.revealTimeouts.length; i++) {
        clearTimeout(gameState.revealTimeouts[i]);
    }
    gameState.revealTimeouts = [];
    gameState.active = false;
    gameState.players = [];
    gameState.alivePlayers = [];
    gameState.chatBlocked = false;
    gameState.currentQuestion = null;
    gameState.round = 0;
    gameState.onGameEnd = null;
    try { room.stopGame(); } catch(e) {}
}

// ============================================
// EVENTOS
// ============================================
function onPlayerLeave(room, player) {
    if (gameState.active) {
        gameState.players = gameState.players.filter(function(p) { return p.id !== player.id; });
        gameState.alivePlayers = gameState.alivePlayers.filter(function(p) { return p.id !== player.id; });
    }
}

function onPlayerChat(player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function setMapData(m) { mapData = m; }

function isActive() { return gameState.active; }

function getStats() {
    return { firstEliminated: gameState.firstEliminated };
}

// ============================================
// EXPORTS
// ============================================
module.exports = {
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: setMapData,
    isActive: isActive,
    getStats: getStats
};
