// ============================================
// SALA DE MINIJUEGOS - HAXBALL HEADLESS
// ============================================

const HBInit = require("node-haxball");

// ============================================
// IMPORTAR MINIJUEGOS
// ============================================
const lalalaGame = require("./games/lalala");

// ============================================
// CONFIGURACIÓN DE LA SALA
// ============================================
const roomConfig = {
    roomName: "🎮 Sala de Minijuegos 🎮",
    maxPlayers: 20,
    public: true,
    geo: { code: "US", lat: 40.7128, lon: -74.0060 },
    noPlayer: true,
    token: "" // Agrega tu token aquí
};

// ============================================
// CONFIGURACIÓN DE ADMINISTRADORES
// ============================================
const adminList = [
    // Agrega tu auth aquí (lo verás en consola cuando entres)
    // Ejemplo: "TU_AUTH_AQUI",
    "Cristian" // Puedes usar nombre temporalmente, pero auth es más seguro
];

// Link de Discord (cámbialo cuando tengas el servidor)
const discordLink = "LINK_DISCORD_AQUI"; // Cambia esto por tu link de Discord

// ============================================
// CREAR SALA
// ============================================
const room = HBInit(roomConfig);

    // ============================================
    // VARIABLES GLOBALES
    // ============================================
    let gameState = {
        currentGame: null,
        isActive: false,
        players: [],
        eliminated: [],
        winner: null,
        scores: {},
        autoRotation: true,
        rotationTimer: null
    };

    // Lista de minijuegos disponibles
    const availableGames = [
        { name: "lalala", module: lalalaGame, displayName: "LALALA - Esquiva las Bolas" }
        // Aquí se agregarán más juegos
    ];

    let adminPassword = "admin123"; // Cambia esto

    // ============================================
    // COMANDOS
    // ============================================
    const commands = {
        "!ayuda": (player) => {
            let helpMsg = "📋 COMANDOS DISPONIBLES:\n" +
                "!mapas - Ver lista de minijuegos\n" +
                "!stats - Ver estadísticas\n";
            
            if (discordLink !== "LINK_DISCORD_AQUI") {
                helpMsg += "!discord - Link del servidor de Discord\n";
            }
            
            helpMsg += "Los minijuegos se ejecutan automáticamente 🎲";
            
            room.sendAnnouncement(helpMsg, player.id, 0x00FF00);
        },
        
        "!mapas": (player) => {
            let mapList = "🗺️ MINIJUEGOS DISPONIBLES:\n";
            availableGames.forEach((game, index) => {
                mapList += `${index + 1}. ${game.displayName}\n`;
            });
            mapList += "\n🎲 Los mapas se ejecutan aleatoriamente";
            
            room.sendAnnouncement(mapList, player.id, 0x00BFFF);
        },

        "!stats": (player) => {
            let stats = gameState.scores[player.id] || { wins: 0, games: 0 };
            room.sendAnnouncement(
                `📊 ${player.name}: ${stats.wins} victorias en ${stats.games} partidas`,
                player.id,
                0xFFD700
            );
        },

        "!discord": (player) => {
            if (discordLink !== "LINK_DISCORD_AQUI") {
                room.sendAnnouncement(
                    `💬 Únete a nuestro Discord:\n${discordLink}`,
                    player.id,
                    0x7289DA
                );
            } else {
                room.sendAnnouncement(
                    "❌ Link de Discord no configurado aún",
                    player.id,
                    0xFF0000
                );
            }
        }
    };

    // ============================================
    // FUNCIONES DE JUEGO
    // ============================================
    function startRandomGame() {
        if (gameState.isActive) {
            return;
        }

        const playerCount = room.getPlayerList().filter(p => p.id !== 0).length;
        
        if (playerCount < 2) {
            room.sendAnnouncement(
                "⏳ Esperando más jugadores... (mínimo 2)",
                null,
                0xFFFF00
            );
            scheduleNextGame(10000); // Reintentar en 10 segundos
            return;
        }

        // Seleccionar juego aleatorio
        const randomIndex = Math.floor(Math.random() * availableGames.length);
        const selectedGame = availableGames[randomIndex];

        gameState.currentGame = selectedGame.name;
        gameState.isActive = true;

        room.sendAnnouncement(
            `🎲 Próximo minijuego: ${selectedGame.displayName}\n` +
            `⏱️ Iniciando en 3 segundos...`,
            null,
            0x00BFFF,
            "bold",
            2
        );

        setTimeout(() => {
            selectedGame.module.start(room, (winner) => {
                // Callback cuando el juego termina
                if (winner) {
                    // Actualizar estadísticas
                    if (!gameState.scores[winner.id]) {
                        gameState.scores[winner.id] = { wins: 0, games: 0 };
                    }
                    gameState.scores[winner.id].wins++;
                }
                
                // Programar siguiente juego
                stopGame();
            });
        }, 3000);
    }

    function stopGame() {
        gameState.isActive = false;
        gameState.currentGame = null;
        gameState.players = [];
        gameState.eliminated = [];
        
        // Programar siguiente juego
        if (gameState.autoRotation) {
            scheduleNextGame(5000); // 5 segundos de espera
        }
    }

    function scheduleNextGame(delay) {
        if (gameState.rotationTimer) {
            clearTimeout(gameState.rotationTimer);
        }

        gameState.rotationTimer = setTimeout(() => {
            startRandomGame();
        }, delay);
    }

    function checkWinner() {
        if (!gameState.isActive) return;

        let alive = gameState.players.filter(p => 
            !gameState.eliminated.includes(p.id) && 
            room.getPlayer(p.id) !== null
        );

        if (alive.length === 1) {
            declareWinner(alive[0]);
        } else if (alive.length === 0) {
            room.sendAnnouncement("❌ No hay ganador", null, 0xFF0000);
            stopGame();
        }
    }

    function declareWinner(player) {
        gameState.winner = player;
        
        // Actualizar estadísticas
        if (!gameState.scores[player.id]) {
            gameState.scores[player.id] = { wins: 0, games: 0 };
        }
        gameState.scores[player.id].wins++;
        
        room.sendAnnouncement(
            `🏆 ¡${player.name} HA GANADO! 🏆`,
            null,
            0xFFD700
        );

        setTimeout(() => stopGame(), 3000);
    }

    // ============================================
    // EVENTOS DE HAXBALL
    // ============================================
    room.onPlayerJoin = (player) => {
        // Verificar si es admin
        const isAdmin = adminList.includes(player.auth) || adminList.includes(player.name);
        
        if (isAdmin) {
            room.setPlayerAdmin(player.id, true);
            console.log(`✅ Admin detectado: ${player.name} (Auth: ${player.auth})`);
            room.sendAnnouncement(
                `🔑 Admin detectado. Bienvenido ${player.name}!`,
                player.id,
                0xFFD700
            );
        } else {
            room.sendAnnouncement(
                `👋 Bienvenido ${player.name}! Escribe !ayuda para ver los comandos`,
                player.id,
                0x00FF00
            );
        }
        
        // Mostrar auth en consola (para agregarlo a la lista)
        console.log(`Jugador: ${player.name} | Auth: ${player.auth} | ID: ${player.id}`);
        
        // Inicializar estadísticas
        if (!gameState.scores[player.id]) {
            gameState.scores[player.id] = { wins: 0, games: 0 };
        }
    };
// Notificar a los juegos activos
        if (lalalaGame.isActive()) {
            lalalaGame.onPlayerLeave(room, player);
        }

        
    room.onPlayerLeave = (player) => {
        if (gameState.isActive && gameState.players.some(p => p.id === player.id)) {
            if (!gameState.eliminated.includes(player.id)) {
                gameState.eliminated.push(player.id);
                room.sendAnnouncement(
                    `❌ ${player.name} ha abandonado el juego`,
                    null,
                    0xFF6600
                );
                checkWinner();
            }
        }
    };

    room.onPlayerChat = (player, message) => {
        if (message.startsWith("!")) {
            const args = message.slice(1).split(" ");
            const command = "!" + args[0].toLowerCase();
            
            if (commands[command]) {
                commands[command](player, args.slice(1));
                return false; // No mostrar el comando en el chat
            }
        }
        return true;
    };

    room.onGameStart = (byPlayer) => {
        if (gameState.isActive) {
            room.sendAnnouncement("🎮 ¡El juego ha comenzado!", null, 0x00FF00);
        }
    };

    room.onGameStop = (byPlayer) => {
        if (gameState.isActive && !gameState.winner) {
            room.sendAnnouncement("⏹️ Juego detenido", null, 0xFF6600);
        }
    };

    room.onPositionsReset = () => {
        // Se usará para detectar eventos en mapas específicos
    };

    room.onPlayerBallKick = (player) => {
        // Se usará para mapas de ruleta y similares
    };

// ============================================
// INICIO
// ============================================
console.log("✅ Sala de minijuegos iniciada");
console.log("🔗 Link: " + room.link);
console.log("📋 Admins configurados:", adminList);

// Iniciar anuncios periódicos
startPeriodicAnnouncements();

// Iniciar rotación automática después de 5 segundos
setTimeout(() => {
    room.sendAnnouncement(
        "🎮 Bienvenidos a la Sala de Minijuegos 🎮\n" +
        "Los minijuegos se ejecutan automáticamente\n" +
        "Escribe !ayuda para más información",
        null,
        0x00FF00,
        "bold",
        2
    );
    scheduleNextGame(5000);
}, 5000);
