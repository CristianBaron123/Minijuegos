// ============================================
// MINIJUEGO: TRIVIA - Preguntas y Respuestas
// ============================================

var mapData = null;

var gameState = {
    active: false,
    players: [],
    chatBlocked: false,
    currentQuestion: null,
    answerTimeout: null,
    revealTimeouts: [],
    gameStartTime: null,
    firstEliminated: null
};

// Preguntas usadas en la sesion (evitar repetir)
var usedQuestions = [];

var config = {
    answerTimeMs: 15000, // 15 segundos para responder
    explanationMs: 15000 // 15 segundos para leer la pregunta (pausado)
};

// Detectar zona del jugador segun posicion X
function getPlayerZone(pos) {
    if (pos.x <= -255) return 'a';
    if (pos.x <= 0) return 'b';
    if (pos.x <= 255) return 'c';
    return 'd';
}

// ============================================
// 30 PREGUNTAS DE TRIVIA
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
    // === PREGUNTAS CAPCIOSAS (30) ===
    { q: "Que se moja mas mientras llueve, correr o caminar?", a: "Correr", b: "Caminar", c: "Igual", d: "Depende del viento", correct: "c" },
    { q: "Un avion se estrella entre Mexico y USA. Donde entierran a los sobrevivientes?", a: "Mexico", b: "USA", c: "En la frontera", d: "No se entierran", correct: "d" },
    { q: "Que pesa mas, 1 kilo de plumas o 1 kilo de hierro?", a: "Plumas", b: "Hierro", c: "Pesan igual", d: "Depende", correct: "c" },
    { q: "Cuantos meses del ano tienen 28 dias?", a: "1 (febrero)", b: "6", c: "Ninguno", d: "Todos (12)", correct: "d" },
    { q: "Si un gallo pone un huevo en la cima de un techo, hacia donde cae?", a: "Izquierda", b: "Derecha", c: "Los dos lados", d: "Los gallos no ponen", correct: "d" },
    { q: "Que hay en diciembre que no hay en ningun otro mes?", a: "Navidad", b: "Nieve", c: "La letra D", d: "Frio", correct: "c" },
    { q: "Un granjero tiene 17 ovejas. Se mueren todas menos 9. Cuantas quedan?", a: "8", b: "9", c: "0", d: "17", correct: "b" },
    { q: "Que fue antes, el huevo o la gallina?", a: "El huevo", b: "La gallina", c: "Ninguno", d: "Los dos a la vez", correct: "a" },
    { q: "Si me tienes, quieres compartirme. Si me compartes, ya no me tienes. Que soy?", a: "Dinero", b: "Amor", c: "Un secreto", d: "Comida", correct: "c" },
    { q: "Cuantas veces puede restarse 5 de 25?", a: "5 veces", b: "4 veces", c: "1 vez", d: "Infinitas", correct: "c" },
    { q: "Que sube pero nunca baja?", a: "Un globo", b: "La edad", c: "El humo", d: "Un avion", correct: "b" },
    { q: "Si un medico te da 3 pastillas y dice toma una cada media hora, cuanto duran?", a: "1.5 horas", b: "1 hora", c: "3 horas", d: "2 horas", correct: "b" },
    { q: "Un padre y su hijo tienen un accidente. El padre muere. El cirujano dice: es mi hijo. Como?", a: "Imposible", b: "Es adoptado", c: "Es la madre", d: "Es el abuelo", correct: "c" },
    { q: "Cuantos animales metio Moises en el arca?", a: "2 de cada uno", b: "Muchos", c: "Ninguno, fue Noe", d: "7 de cada uno", correct: "c" },
    { q: "Que tiene cabeza y cola pero no tiene cuerpo?", a: "Una serpiente", b: "Una moneda", c: "Un alfiler", d: "Un cometa", correct: "b" },
    { q: "Si hay 3 manzanas y te llevas 2, cuantas tienes?", a: "1", b: "3", c: "2", d: "0", correct: "c" },
    { q: "Como se llama el hermano de tu tio que no es tu tio?", a: "Tu primo", b: "Tu abuelo", c: "Tu padre", d: "Tu sobrino", correct: "c" },
    { q: "Que esta en el centro de Paris?", a: "La torre Eiffel", b: "El Louvre", c: "La letra R", d: "El rio Sena", correct: "c" },
    { q: "Un tren electrico va hacia el norte. Hacia donde va el humo?", a: "Norte", b: "Sur", c: "Arriba", d: "No tiene humo", correct: "d" },
    { q: "Que palabra esta siempre mal escrita en el diccionario?", a: "Ninguna", b: "Error", c: "MAL", d: "Incorrecto", correct: "c" },
    { q: "Si un auto rojo esta a la izquierda y uno azul a la derecha, donde esta el auto blanco?", a: "En medio", b: "Atras", c: "No se menciono", d: "Adelante", correct: "c" },
    { q: "Cuantas letras tiene la respuesta a esta pregunta?", a: "Cuatro", b: "Cinco", c: "Seis", d: "Siete", correct: "d" },
    { q: "Antes de descubrir el Everest, cual era la montana mas alta?", a: "K2", b: "El Everest", c: "Kangchenjunga", d: "No se sabia", correct: "b" },
    { q: "Si un reloj marca las 9:15, que angulo forman las manecillas?", a: "90 grados", b: "0 grados", c: "172.5 grados", d: "180 grados", correct: "c" },
    { q: "Que puedes sostener sin tocarlo con las manos?", a: "Una idea", b: "La respiracion", c: "Una conversacion", d: "Todas las anteriores", correct: "d" },
    { q: "Que tiene 4 patas por la manana, 2 al mediodia y 3 por la noche?", a: "Un gato", b: "Un perro", c: "El ser humano", d: "Una mesa", correct: "c" },
    { q: "Si adelantas al segundo lugar en una carrera, en que posicion quedas?", a: "Primero", b: "Segundo", c: "Tercero", d: "Ultimo", correct: "b" },
    { q: "Un hombre construyo una casa con 4 paredes mirando al sur. Vio un oso. De que color era?", a: "Marron", b: "Negro", c: "Blanco", d: "Gris", correct: "c" },
    { q: "Cuantas veces aparece la letra A en los numeros del 1 al 100?", a: "Ninguna", b: "10 veces", c: "5 veces", d: "1 vez", correct: "a" },
    { q: "Si 5 gatos cazan 5 ratones en 5 minutos, cuanto tardan 100 gatos en cazar 100 ratones?", a: "100 minutos", b: "50 minutos", c: "5 minutos", d: "1 minuto", correct: "c" }
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
    gameState.firstEliminated = null;
    gameState.gameStartTime = null;
    gameState.revealTimeouts = [];

    // Seleccionar pregunta
    var q = selectQuestion();
    gameState.currentQuestion = q;

    setTimeout(function() {
        room.startGame();
        try { room.pauseGame(true); } catch(e) {}
        gameState.chatBlocked = true;

        room.sendAnnouncement(
            '\n📝 TRIVIA - PREGUNTA:\n\n' +
            '❓ ' + q.q + '\n\n' +
            'A) ' + q.a + '\n' +
            'B) ' + q.b + '\n' +
            'C) ' + q.c + '\n' +
            'D) ' + q.d + '\n\n' +
            '👉 Muevete a la zona de tu respuesta!\n' +
            '⏱️ Tienes 15 segundos...',
            null, 0xFFFF00, 'bold', 2
        );

        setTimeout(function() {
            if (!gameState.active) return;
            try { room.pauseGame(false); } catch(e) {}
            gameState.chatBlocked = false;
            gameState.gameStartTime = Date.now();
            room.sendAnnouncement('🟢 ELIGE TU RESPUESTA!', null, 0x00FF00, 'bold', 2);

            // Aviso a mitad de tiempo
            var halfWarn = setTimeout(function() {
                if (!gameState.active) return;
                room.sendAnnouncement('⏱️ Quedan 7 segundos...', null, 0xFFA500, 'bold', 2);
            }, 8000);
            gameState.revealTimeouts.push(halfWarn);

            // Al terminar el tiempo, verificar respuestas
            gameState.answerTimeout = setTimeout(function() {
                if (!gameState.active) return;
                checkAnswers(room, onGameEnd);
            }, config.answerTimeMs);
        }, config.explanationMs);
    }, 1500);
}

// ============================================
// VERIFICAR RESPUESTAS
// ============================================
function checkAnswers(room, onGameEnd) {
    if (!gameState.active) return;
    gameState.chatBlocked = true;

    var q = gameState.currentQuestion;
    var correct = q.correct;

    room.sendAnnouncement('⏰ TIEMPO! Las respuestas estan bloqueadas!', null, 0xFF6600, 'bold', 2);

    // Clasificar jugadores por zona
    var playerZones = { a: [], b: [], c: [], d: [] };
    var correctPlayers = [];
    var wrongPlayers = [];

    gameState.players.forEach(function(p) {
        var player = room.getPlayer(p.id);
        if (!player || !player.position) return;
        var zone = getPlayerZone(player.position);
        playerZones[zone].push(p);
        if (zone === correct) {
            correctPlayers.push(p);
        } else {
            wrongPlayers.push(p);
        }
    });

    // Trackear primer eliminado
    if (wrongPlayers.length > 0 && !gameState.firstEliminated && gameState.gameStartTime) {
        var elapsedS = ((Date.now() - gameState.gameStartTime) / 1000).toFixed(1);
        gameState.firstEliminated = { name: wrongPlayers[0].name, timeS: elapsedS };
    }

    // Fase 1: Revelar respuesta correcta (2s despues)
    var t1 = setTimeout(function() {
        if (!gameState.active) return;
        var answerText = correct === 'a' ? q.a : correct === 'b' ? q.b : correct === 'c' ? q.c : q.d;
        room.sendAnnouncement(
            '✅ La respuesta correcta es... ' + correct.toUpperCase() + ') ' + answerText + '!',
            null, 0x00FF00, 'bold', 2
        );
    }, 2000);
    gameState.revealTimeouts.push(t1);

    // Fase 2: Mostrar zonas y eliminar (4s despues)
    var t2 = setTimeout(function() {
        if (!gameState.active) return;
        var zoneNames = ['a', 'b', 'c', 'd'];
        var zoneLabels = { a: 'A', b: 'B', c: 'C', d: 'D' };

        for (var i = 0; i < zoneNames.length; i++) {
            var z = zoneNames[i];
            if (playerZones[z].length > 0) {
                var names = [];
                for (var j = 0; j < playerZones[z].length; j++) {
                    names.push(playerZones[z][j].name);
                }
                var icon = z === correct ? '✅' : '❌';
                var color = z === correct ? 0x00FF00 : 0xFF0000;
                room.sendAnnouncement(
                    icon + ' Zona ' + zoneLabels[z] + ': ' + names.join(', '),
                    null, color
                );
            }
        }

        // Mover incorrectos a espectador
        wrongPlayers.forEach(function(p) {
            try { room.setPlayerTeam(p.id, 0); } catch(e) {}
        });
    }, 4000);
    gameState.revealTimeouts.push(t2);

    // Fase 3: Resultado final (7s despues)
    var t3 = setTimeout(function() {
        if (!gameState.active) return;

        if (correctPlayers.length === 0) {
            room.sendAnnouncement(
                '😱 Nadie acerto! Mejor suerte la proxima...',
                null, 0xFF6600, 'bold', 2
            );
            stop(room);
            if (onGameEnd) onGameEnd(null);
        } else if (correctPlayers.length === 1) {
            declareWinner(room, correctPlayers[0], onGameEnd);
        } else {
            // Multiples acertaron: ganador al azar
            room.sendAnnouncement(
                '🎲 ' + correctPlayers.length + ' acertaron! Eligiendo ganador al azar...',
                null, 0xFFFF00, 'bold'
            );
            var t4 = setTimeout(function() {
                if (!gameState.active) return;
                var winner = correctPlayers[Math.floor(Math.random() * correctPlayers.length)];
                declareWinner(room, winner, onGameEnd);
            }, 2000);
            gameState.revealTimeouts.push(t4);
        }
    }, 7000);
    gameState.revealTimeouts.push(t3);
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner, onGameEnd) {
    if (!gameState.active) return;
    gameState.active = false;

    room.sendAnnouncement(
        '\n🏆 ' + winner.name.toUpperCase() + ' HA GANADO TRIVIA! 🏆',
        null, 0xFFD700, 'bold', 2
    );

    setTimeout(function() {
        if (onGameEnd) onGameEnd(winner);
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
    gameState.chatBlocked = false;
    gameState.currentQuestion = null;
    try { room.stopGame(); } catch(e) {}
}

// ============================================
// EVENTOS
// ============================================
function onPlayerLeave(room, player) {
    if (gameState.active) {
        // Remover de la lista de jugadores
        gameState.players = gameState.players.filter(function(p) { return p.id !== player.id; });
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
