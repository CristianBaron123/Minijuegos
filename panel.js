const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const db = require('./db');

// DB de Buho (separada)
let dbBuho = null;
try { dbBuho = require(path.resolve(__dirname, '../Buho/script/db')); } catch(e) {}

const app = express();
app.use(express.json());

// Chrome compartido
let browser = null;
const MAX_LOGS = 200;

// Estado de salas
const salas = {};

// Cargar configuración de salas
let salaConfigs = [];
try {
    salaConfigs = JSON.parse(fs.readFileSync(path.join(__dirname, 'sala-config.json'), 'utf8'));
} catch(e) {
    console.log('No se encontro sala-config.json, usando defaults');
    salaConfigs = [
        { id: 'minijuegos', name: 'Minijuegos_Isagi v1.9', script: 'bot.js', maxPlayers: 30 }
    ];
}

// Inicializar estado
salaConfigs.forEach(c => {
    salas[c.id] = { config: c, page: null, status: 'stopped', logs: [], startTime: null, link: null };
});

// ============================================
// Funciones del bot (importadas de bot.js)
// ============================================

const { execSync } = require('child_process');

function generateScriptForSala(salaConfig) {
    // Determinar directorio del bot.js de esta sala
    var scriptPath = path.resolve(__dirname, salaConfig.script);
    var scriptDir = path.dirname(scriptPath);
    var scriptFile = path.basename(scriptPath);
    var debugPath = path.join(scriptDir, 'debug-script.js');

    console.log('Generando script para ' + salaConfig.name + '...');
    try {
        execSync('node ' + scriptFile + ' --generate-only', { cwd: scriptDir, timeout: 30000, env: { ...process.env, HAXBALL_TOKEN: 'thr1.PLACEHOLDER' } });
        if (fs.existsSync(debugPath)) {
            console.log('Script generado para ' + salaConfig.name);
            return true;
        }
    } catch(e) {
        console.log('Error generando script para ' + salaConfig.name + ':', e.message);
    }
    return false;
}

function loadBotScriptForSala(salaConfig, token) {
    var scriptPath = path.resolve(__dirname, salaConfig.script);
    var scriptDir = path.dirname(scriptPath);
    var debugPath = path.join(scriptDir, 'debug-script.js');

    if (!fs.existsSync(debugPath)) {
        if (!generateScriptForSala(salaConfig)) return null;
    }
    var script = fs.readFileSync(debugPath, 'utf8');
    // Reemplazar token por el nuevo
    script = script.replace(/token:\s*"thr1\.[^"]*"/g, 'token: "' + token + '"');
    return script;
}

async function initBrowser() {
    if (!browser || !browser.isConnected()) {
        console.log('Iniciando Chrome compartido...');
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
        console.log('Chrome iniciado');
    }
    return browser;
}

async function exposeDbFunctions(page) {
    try {
        await page.exposeFunction('__dbSaveWin', async (auth, name, minigame) => {
            await db.saveWin(auth, name, minigame);
        });
        await page.exposeFunction('__dbSaveGamePlayed', async (auth, name) => {
            await db.saveGamePlayed(auth, name);
        });
        await page.exposeFunction('__dbSaveBestStreak', async (auth, streak) => {
            await db.saveBestStreak(auth, streak);
        });
        await page.exposeFunction('__dbGetStats', async (auth) => {
            return await db.getStats(auth);
        });
        await page.exposeFunction('__dbGetTopPlayers', async (field, limit) => {
            return await db.getTopPlayers(field, limit);
        });
        await page.exposeFunction('__dbGetPlayerRank', async (auth, field) => {
            return await db.getPlayerRank(auth, field);
        });
        await page.exposeFunction('__dbAddBalance', async (auth, name, amount) => {
            await db.addBalance(auth, name, amount);
        });
        await page.exposeFunction('__dbAddGayCount', async (auth, name) => {
            await db.addGayCount(auth, name);
        });
        await page.exposeFunction('__dbAddKickCount', async (auth, name) => {
            await db.addKickCount(auth, name);
        });
        await page.exposeFunction('__dbAddBanCount', async (auth, name) => {
            await db.addBanCount(auth, name);
        });
        await page.exposeFunction('__dbCreateClan', async (tag, name, leaderAuth, leaderName) => {
            return await db.createClan(tag, name, leaderAuth, leaderName);
        });
        await page.exposeFunction('__dbInviteToClan', async (leaderAuth, targetAuth, targetName) => {
            return await db.inviteToClan(leaderAuth, targetAuth, targetName);
        });
        await page.exposeFunction('__dbAcceptClanInvite', async (playerAuth, playerName) => {
            return await db.acceptClanInvite(playerAuth, playerName);
        });
        await page.exposeFunction('__dbLeaveClan', async (playerAuth) => {
            return await db.leaveClan(playerAuth);
        });
        await page.exposeFunction('__dbGetClanInfo', async (tag) => {
            return await db.getClanInfo(tag);
        });
        await page.exposeFunction('__dbGetClanByAuth', async (auth) => {
            return await db.getClanByAuth(auth);
        });
        await page.exposeFunction('__dbAddClanWin', async (auth) => {
            await db.addClanWin(auth);
        });
        await page.exposeFunction('__dbGetTopClans', async (limit) => {
            return await db.getTopClans(limit);
        });
        await page.exposeFunction('__dbKickFromClan', async (leaderAuth, targetAuth) => {
            return await db.kickFromClan(leaderAuth, targetAuth);
        });
        await page.exposeFunction('__dbSaveMarriage', async (auth1, auth2) => {
            await db.saveMarriage(auth1, auth2);
        });
        await page.exposeFunction('__dbRemoveMarriage', async (auth1, auth2) => {
            await db.removeMarriage(auth1, auth2);
        });
        await page.exposeFunction('__dbLoadMarriages', async () => {
            return await db.loadMarriages();
        });
        await page.exposeFunction('__dbSaveTitan', async (auth, name, value) => {
            await db.saveTitan(auth, name, value);
        });
        await page.exposeFunction('__dbLoadTitanData', async () => {
            return await db.loadTitanData();
        });
        await page.exposeFunction('__dbResetTitanData', async () => {
            await db.resetTitanData();
        });
        await page.exposeFunction('__dbSaveDailyReward', async (auth, lastClaim, streak) => {
            await db.saveDailyReward(auth, lastClaim, streak);
        });
        await page.exposeFunction('__dbLoadDailyRewards', async () => {
            return await db.loadDailyRewards();
        });
        await page.exposeFunction('__sendMonthlyStats', async () => {
            return 'OK';
        });
        await page.exposeFunction('__dbResetMonthlyWins', async () => {
            await db.resetMonthlyWins();
        });
        await page.exposeFunction('__dbGetMonthlyReport', async () => {
            return await db.getMonthlyReport();
        });
        await page.exposeFunction('__dbResetClanWins', async () => {
            await db.resetClanWins();
        });
        // Buho stats
        if (dbBuho) {
            await page.exposeFunction('__dbSaveStats', async (auth, name, wins, golesAnotados, golesRecibidos) => {
                await dbBuho.saveStats(auth, name, wins, golesAnotados, golesRecibidos);
            });
            await page.exposeFunction('__dbLoadAllStats', async () => {
                return await dbBuho.loadAllStats();
            });
        }
        // Discord webhook
        await page.exposeFunction('__discordWebhook', async (type, content) => {
            return 'OK';
        });
        await page.exposeFunction('__sendReplay', async (replayArray, gameName) => {
            return 'OK';
        });
    } catch(e) {
        console.log('Error exponiendo funciones DB:', e.message);
    }
}

async function startSala(salaId, token) {
    const s = salas[salaId];
    if (!s) throw new Error('Sala no encontrada');
    if (s.status === 'running') throw new Error('La sala ya esta corriendo');

    s.logs = [];
    s.link = null;
    addLog(s, 'Iniciando sala...', true);

    // Iniciar Chrome si no está corriendo
    const b = await initBrowser();

    // Crear nueva pestaña
    const page = await b.newPage();
    s.page = page;
    s.status = 'starting';
    s.startTime = Date.now();

    addLog(s, 'Navegando a HaxBall Headless...');
    await page.goto('https://www.haxball.com/headless', {
        waitUntil: 'networkidle2',
        timeout: 60000
    });

    // Esperar HBInit
    addLog(s, 'Esperando Cloudflare y HBInit...');
    let hbFound = false;
    for (let attempt = 1; attempt <= 12; attempt++) {
        const found = await page.waitForFunction('typeof HBInit === "function"', { timeout: 10000 }).then(() => true).catch(() => false);
        if (found) {
            hbFound = true;
            addLog(s, 'HBInit detectado');
            break;
        }
        addLog(s, 'Intento ' + attempt + '/12 - esperando...');
    }

    if (!hbFound) {
        addLog(s, 'ERROR: HBInit no se detecto. Cerrando pestana.');
        await page.close();
        s.page = null;
        s.status = 'stopped';
        throw new Error('HBInit no disponible');
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

    // Exponer funciones de DB
    addLog(s, 'Exponiendo funciones de DB...');
    await exposeDbFunctions(page);

    // Cargar script específico de esta sala
    addLog(s, 'Cargando script del bot...');
    const script = loadBotScriptForSala(s.config, token);
    if (!script) {
        addLog(s, 'ERROR: No se pudo generar el script del bot.');
        await page.close();
        s.page = null;
        s.status = 'stopped';
        throw new Error('No se pudo generar el script. Verifica que bot.js funcione.');
    }

    // Capturar logs de la pestaña
    page.on('console', async msg => {
        try {
            const args = await Promise.all(
                msg.args().map(arg => arg.jsonValue().catch(() => arg.toString()))
            );
            const text = args.join(' ');
            addLog(s, text);

            if (text.includes('haxball.com/play')) {
                const match = text.match(/(https:\/\/www\.haxball\.com\/play\?c=[A-Za-z0-9]+)/);
                if (match) s.link = match[1];
            }
        } catch(e) {}
    });

    // Inyectar script
    addLog(s, 'Inyectando script...');
    await page.evaluate((sc) => {
        const textarea = document.querySelector('textarea') ||
                        document.querySelector('#code') ||
                        document.querySelector('textarea[class*="code"]');
        if (textarea) {
            textarea.value = sc;
            const buttons = Array.from(document.querySelectorAll('button'));
            const runButton = buttons.find(b =>
                b.textContent.toLowerCase().includes('run') || b.id === 'run'
            );
            if (runButton) runButton.click();
        } else {
            eval(sc);
        }
    }, script);

    s.status = 'running';
    addLog(s, 'Sala encendida! Esperando link...', true);

    // Detectar si la pestaña se cierra
    page.on('close', () => {
        s.status = 'stopped';
        s.page = null;
        addLog(s, 'Pestana cerrada', true);
    });
}

async function stopSala(salaId) {
    const s = salas[salaId];
    if (!s) throw new Error('Sala no encontrada');
    if (!s.page) throw new Error('La sala no esta corriendo');

    addLog(s, 'Apagando sala...', true);
    try { await s.page.close(); } catch(e) {}
    s.page = null;
    s.status = 'stopped';
    addLog(s, 'Sala apagada', true);
}

function addLog(s, text, forceConsole) {
    s.logs.push({ time: Date.now(), text });
    if (s.logs.length > MAX_LOGS) s.logs.shift();
    if (forceConsole) console.log(`[${s.config.id}] ${text}`);
}

// ============================================
// API Routes
// ============================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'panel.html'));
});

app.get('/api/status', (req, res) => {
    const status = {};
    for (const id in salas) {
        const s = salas[id];
        status[id] = {
            config: s.config,
            status: s.status,
            startTime: s.startTime,
            uptime: s.startTime && s.status === 'running' ? Math.floor((Date.now() - s.startTime) / 1000) : 0,
            link: s.link,
            logsCount: s.logs.length
        };
    }
    res.json(status);
});

app.get('/api/logs/:id', (req, res) => {
    const s = salas[req.params.id];
    if (!s) return res.status(404).json({ error: 'Sala no encontrada' });
    res.json(s.logs.slice(-50));
});

app.post('/api/start', async (req, res) => {
    const { salaId, token } = req.body;
    if (!token || !token.startsWith('thr1.')) {
        return res.status(400).json({ error: 'Token invalido. Debe empezar con thr1.' });
    }
    try {
        await startSala(salaId, token);
        res.json({ ok: true, message: 'Sala encendida' });
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
});

app.post('/api/stop', async (req, res) => {
    const { salaId } = req.body;
    try {
        await stopSala(salaId);
        res.json({ ok: true, message: 'Sala apagada' });
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
});

// ============================================
// Iniciar
// ============================================

(async () => {
    // Conectar a MongoDB (Minijuegos)
    try {
        await db.connect();
        console.log('MongoDB conectado (Minijuegos)');
    } catch(e) {
        console.log('MongoDB Minijuegos no disponible:', e.message);
    }
    // Conectar a MongoDB (Buho)
    if (dbBuho) {
        try {
            await dbBuho.connect();
            console.log('MongoDB conectado (Buho)');
        } catch(e) {
            console.log('MongoDB Buho no disponible:', e.message);
        }
    }

    // Generar scripts de todas las salas al iniciar
    salaConfigs.forEach(function(c) {
        generateScriptForSala(c);
    });

    const PORT = process.env.PANEL_PORT || 3000;
    app.listen(PORT, () => {
        console.log('\n========================================');
        console.log('  Panel de Salas HaxBall');
        console.log('  http://localhost:' + PORT);
        console.log('  Salas: ' + salaConfigs.map(c => c.name).join(', '));
        console.log('========================================\n');
    });
})();
