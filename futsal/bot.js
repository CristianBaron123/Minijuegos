// Bot de Haxball - Sala Real Futsal
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const HAXBALL_TOKEN = process.env.HAXBALL_TOKEN || "thr1.PLACEHOLDER";

// Cargar room-main.txt
const roomMainCode = fs.readFileSync(path.join(__dirname, 'room-main.txt'), 'utf8');

// Cargar mapas
const mapasDir = path.join(__dirname, 'mapa');
const mapFiles = {};
if (fs.existsSync(mapasDir)) {
    fs.readdirSync(mapasDir).forEach(file => {
        if (file.endsWith('.hbs')) {
            mapFiles[file] = fs.readFileSync(path.join(mapasDir, file), 'utf8');
        }
    });
    console.log('Mapas cargados: ' + Object.keys(mapFiles).length);
}

function getBotScript() {
    let code = roomMainCode
        .replace(/##TOKEN##/g, HAXBALL_TOKEN);

    // Inyectar el primer mapa disponible como ##MAP_FUTSAL##
    const firstMap = Object.values(mapFiles)[0] || null;
    if (firstMap) {
        code = code.replace('##MAP_FUTSAL##', JSON.stringify(firstMap));
    } else {
        code = code.replace('##MAP_FUTSAL##', 'null');
    }

    return code;
}

(async () => {
    // Modo generate-only: genera debug-script.js y sale
    if (process.argv.includes('--generate-only')) {
        const script = getBotScript();
        fs.writeFileSync(path.join(__dirname, 'debug-script.js'), script, 'utf8');
        console.log('SCRIPT_GENERATED');
        process.exit(0);
    }

    console.log('Iniciando bot Real Futsal...');

    const useHeadless = process.env.HEADLESS === 'true';
    const browser = await puppeteer.launch({
        headless: useHeadless ? 'new' : false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    console.log('Navegando a Haxball Headless...');
    await page.goto('https://www.haxball.com/headless', {
        waitUntil: 'networkidle2',
        timeout: 60000
    });

    console.log('Esperando HBInit...');
    for (let attempt = 1; attempt <= 12; attempt++) {
        const found = await page.waitForFunction('typeof HBInit === "function"', { timeout: 10000 }).then(() => true).catch(() => false);
        if (found) {
            console.log('HBInit detectado!');
            break;
        }
        console.log('Intento ' + attempt + '/12...');
    }
    await new Promise(resolve => setTimeout(resolve, 3000));

    const script = getBotScript();

    await page.evaluate((sc) => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
            textarea.value = sc;
            const buttons = Array.from(document.querySelectorAll('button'));
            const runButton = buttons.find(b => b.textContent.toLowerCase().includes('run'));
            if (runButton) runButton.click();
        } else {
            eval(sc);
        }
    }, script);

    console.log('Bot Real Futsal activo!');

    page.on('console', async msg => {
        try {
            const args = await Promise.all(msg.args().map(arg => arg.jsonValue().catch(() => arg.toString())));
            const text = args.join(' ');
            if (text.includes('Link:')) {
                console.log('\n' + text + '\n');
            } else {
                console.log(text);
            }
        } catch(e) {}
    });

    process.on('SIGTERM', async () => {
        console.log('Apagando bot Real Futsal...');
        try { await browser.close(); } catch(e) {}
        process.exit(0);
    });
})();
