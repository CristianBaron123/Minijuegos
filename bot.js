// Bot de Haxball con sistema de minijuegos automático
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Token de Haxball
const HAXBALL_TOKEN = "thr1.AAAAAGl_okIBMBkfgD5Nuw._Rjq_nJJiH4";

// ============================================
// CONFIGURACIÓN DE OWNER (DUEÑO DE LA SALA)
// ============================================
const OWNER_AUTH = "JHcYct4vfesGbi6tGaauh08AxSwWnZq3QCm4rnzn2GE";

// Cargar mapas de minijuegos
const mapLALALAPath = path.join(__dirname, 'Mapas', 'LALALA from HaxMaps.hbs');
const mapLALALAData = fs.readFileSync(mapLALALAPath, 'utf8');

const mapSurvivalPath = path.join(__dirname, 'Mapas', 'Survival Room _ Leo.hbs');
const mapSurvivalData = fs.readFileSync(mapSurvivalPath, 'utf8');

const mapMeteorsPath = path.join(__dirname, 'Mapas', 'Meteors Survival v3 from HaxMaps.hbs');
const mapMeteorsData = fs.readFileSync(mapMeteorsPath, 'utf8');

const mapJumpingPath = path.join(__dirname, 'Mapas', 'Jumping Arena by MC [20 players].hbs');
const mapJumpingData = fs.readFileSync(mapJumpingPath, 'utf8');

const mapWebSurvivalPath = path.join(__dirname, 'Mapas', 'Web Survival Version 2 by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapWebSurvivalData = fs.readFileSync(mapWebSurvivalPath, 'utf8');

const mapGalacticPath = path.join(__dirname, 'Mapas', 'Galactic Fit by Vhagar & Jordan [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapGalacticData = fs.readFileSync(mapGalacticPath, 'utf8');

const mapSupermanPath = path.join(__dirname, 'Mapas', 'Superman Chair v2 by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapSupermanData = fs.readFileSync(mapSupermanPath, 'utf8');

const mapSurvivalSquarePath = path.join(__dirname, 'Mapas', 'Survival Square Deluxe by _R [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapSurvivalSquareData = fs.readFileSync(mapSurvivalSquarePath, 'utf8');

const mapGymPath = path.join(__dirname, 'Mapas', 'GYM from HaxMaps.hbs');
const mapGymData = fs.readFileSync(mapGymPath, 'utf8');

const mapMultiBallsPath = path.join(__dirname, 'Mapas', 'MultiBalls Survival by Galactic Boy from HaxMaps.hbs');
const mapMultiBallsData = fs.readFileSync(mapMultiBallsPath, 'utf8');

const mapUltraBallPath = path.join(__dirname, 'Mapas', 'ULTRABALL.hbs');
const mapUltraBallData = fs.readFileSync(mapUltraBallPath, 'utf8');

const mapDodgeballPath = path.join(__dirname, 'Mapas', 'Dodgeball by MC.hbs');
const mapDodgeballData = fs.readFileSync(mapDodgeballPath, 'utf8');
const mapNumberChairsPath = path.join(__dirname, 'Mapas', 'NumberChairs v2 by Şerefli Şeref [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapNumberChairsData = fs.readFileSync(mapNumberChairsPath, 'utf8');

const mapCollisionPath = path.join(__dirname, 'Mapas', 'Collision team racing 9 by MC  from HaxMaps.hbs');
const mapCollisionData = fs.readFileSync(mapCollisionPath, 'utf8');

// Map: Space Melee
const mapSpaceMeleePath = path.join(__dirname, 'Mapas', 'Space Melee by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapSpaceMeleeData = fs.readFileSync(mapSpaceMeleePath, 'utf8');

// Cargar mapas de luckys
const mapLuckPath = path.join(__dirname, 'Lucks', 'Lucky-Map-2-by-Meeelany-ʜᴀxᴍᴏᴅs.ᴄᴏᴍ_667a7e7e87381.hbs');
const mapLuckData = fs.readFileSync(mapLuckPath, 'utf8');

const mapLuckDiosPath = path.join(__dirname, 'Lucks', 'Luck DIOS 2 by Pagus.hbs');
const mapLuckDiosData = fs.readFileSync(mapLuckDiosPath, 'utf8');

const mapLuckHellPath = path.join(__dirname, 'Lucks', 'Lucky Hell Map 1 by Meeelany from HaxMaps.hbs');
const mapLuckHellData = fs.readFileSync(mapLuckHellPath, 'utf8');

// Cargar módulos de luckys desde nueva carpeta
const luckyModulePath = path.join(__dirname, 'games', 'luckys', 'lucky.js');
const luckyModuleCode = fs.readFileSync(luckyModulePath, 'utf8');

const luckyHellModulePath = path.join(__dirname, 'games', 'luckys', 'luckyhell.js');
const luckyHellModuleCode = fs.readFileSync(luckyHellModulePath, 'utf8');

const luckyDiosModulePath = path.join(__dirname, 'games', 'luckys', 'luckydios.js');
const luckyDiosModuleCode = fs.readFileSync(luckyDiosModulePath, 'utf8');

// Cargar módulos de minijuegos desde nueva carpeta
const lalalaModulePath = path.join(__dirname, 'games', 'minijuegos', 'lalala.js');
const lalalaModuleCode = fs.readFileSync(lalalaModulePath, 'utf8');

const survivalModulePath = path.join(__dirname, 'games', 'minijuegos', 'survival.js');
const survivalModuleCode = fs.readFileSync(survivalModulePath, 'utf8');

const meteorsModulePath = path.join(__dirname, 'games', 'minijuegos', 'meteors.js');
const meteorsModuleCode = fs.readFileSync(meteorsModulePath, 'utf8');

const jumpingModulePath = path.join(__dirname, 'games', 'minijuegos', 'jumping.js');
const jumpingModuleCode = fs.readFileSync(jumpingModulePath, 'utf8');

const websurvivalModulePath = path.join(__dirname, 'games', 'minijuegos', 'websurvival.js');
const websurvivalModuleCode = fs.readFileSync(websurvivalModulePath, 'utf8');

const galacticModulePath = path.join(__dirname, 'games', 'minijuegos', 'galactic.js');
const galacticModuleCode = fs.readFileSync(galacticModulePath, 'utf8');

const gymModulePath = path.join(__dirname, 'games', 'minijuegos', 'gym.js');
const gymModuleCode = fs.readFileSync(gymModulePath, 'utf8');

const multiballsModulePath = path.join(__dirname, 'games', 'minijuegos', 'multiballs.js');
const multiballsModuleCode = fs.readFileSync(multiballsModulePath, 'utf8');
const supermanModulePath = path.join(__dirname, 'games', 'minijuegos', 'superman.js');
const supermanModuleCode = fs.readFileSync(supermanModulePath, 'utf8');
const dodgeballModulePath = path.join(__dirname, 'games', 'minijuegos', 'dodgeball.js');
const dodgeballModuleCode = fs.readFileSync(dodgeballModulePath, 'utf8');
const numberChairsModulePath = path.join(__dirname, 'games', 'minijuegos', 'numberchairs.js');
const numberChairsModuleCode = fs.readFileSync(numberChairsModulePath, 'utf8');
const ultraballModulePath = path.join(__dirname, 'games', 'minijuegos', 'ultraball.js');
const ultraballModuleCode = fs.readFileSync(ultraballModulePath, 'utf8');
const survSquareModulePath = path.join(__dirname, 'games', 'minijuegos', 'survivalsquare.js');
const survSquareModuleCode = fs.readFileSync(survSquareModulePath, 'utf8');
const collisionModulePath = path.join(__dirname, 'games', 'minijuegos', 'collision_team_racing.js');
const collisionModuleCode = fs.readFileSync(collisionModulePath, 'utf8');
const spaceMeleeModulePath = path.join(__dirname, 'games', 'minijuegos', 'space_melee.js');
const spaceMeleeModuleCode = fs.readFileSync(spaceMeleeModulePath, 'utf8');

// Cargar código principal de la sala
const roomMainCodePath = path.join(__dirname, 'room-main.txt');
const roomMainCode = fs.readFileSync(roomMainCodePath, 'utf8');

// Función helper para transformar módulos Node.js a navegador
function transformModuleForBrowser(moduleCode, mapData) {
    // ⚠️ CRÍTICO: El mapa DEBE ser una STRING JSON, NO un objeto JavaScript
    // Haxball's room.setCustomStadium() espera recibir una string JSON, no un objeto
    // Si pasas un objeto, falla con "Unexpected 'o' at line 1 column 3" porque
    // internamente Haxball hace JSON.parse() y recibe "[object Object]" como string
    const mapJsonString = JSON.stringify(mapData);
    
    // Eliminar require, module.exports y agregar return al final
    let code = moduleCode
        .replace(/const fs = require\('fs'\);?\n?/g, '')
        .replace(/const path = require\('path'\);?\n?/g, '')
        .replace(/const /g, 'var ')
        .replace(/let /g, 'var ')
        .replace(/module\.exports\s*=\s*/g, 'return ')
        .replace(/var mapData = null;.*$/m, 'var mapData = ' + mapJsonString + ';');
    
    return '(function() {\n' + code + '\n})()';
}

// Script del bot con minijuegos automáticos
const getBotScript = () => {
    const lalalaModule = transformModuleForBrowser(lalalaModuleCode, mapLALALAData);
    const survivalModule = transformModuleForBrowser(survivalModuleCode, mapSurvivalData);
    const meteorsModule = transformModuleForBrowser(meteorsModuleCode, mapMeteorsData);
    const jumpingModule = transformModuleForBrowser(jumpingModuleCode, mapJumpingData);
    const websurvivalModule = transformModuleForBrowser(websurvivalModuleCode, mapWebSurvivalData);
    const galacticModule = transformModuleForBrowser(galacticModuleCode, mapGalacticData);
    const spaceMeleeModule = transformModuleForBrowser(spaceMeleeModuleCode, mapSpaceMeleeData);
    const gymModule = transformModuleForBrowser(gymModuleCode, mapGymData);
    const multiballsModule = transformModuleForBrowser(multiballsModuleCode, mapMultiBallsData);
    const supermanModule = transformModuleForBrowser(supermanModuleCode, mapSupermanData);
    const dodgeballModule = transformModuleForBrowser(dodgeballModuleCode, mapDodgeballData);
    const collisionModule = transformModuleForBrowser(collisionModuleCode, mapCollisionData);
    const numberChairsModule = transformModuleForBrowser(numberChairsModuleCode, mapNumberChairsData);
    const ultraballModule = transformModuleForBrowser(ultraballModuleCode, mapUltraBallData);
    const survSquareModule = transformModuleForBrowser(survSquareModuleCode, mapSurvivalSquareData);
    
    // Escapar el código de los módulos Lucky
    const escapedLuckyCode = luckyModuleCode;
    const escapedLuckyHellCode = luckyHellModuleCode;
    const escapedLuckyDiosCode = luckyDiosModuleCode;
    
    // Reemplazar variables dinámicas en room-main.txt
    let mainCode = roomMainCode
        .replace(/##TOKEN##/g, HAXBALL_TOKEN)
        .replace(/##OWNER_AUTH##/g, OWNER_AUTH)
        .replace(/##MAP_LUCK##/g, JSON.stringify(JSON.stringify(mapLuckData)))
        .replace(/##MAP_LUCK_DIOS##/g, JSON.stringify(JSON.stringify(mapLuckDiosData)))
        .replace(/##MAP_LUCK_HELL##/g, JSON.stringify(JSON.stringify(mapLuckHellData)))
        .replace(/##MAP_DODGEBALL##/g, JSON.stringify(JSON.stringify(mapDodgeballData)))
        .replace(/##MAP_SUPERMAN##/g, JSON.stringify(JSON.stringify(mapSupermanData)))
        .replace(/##MAP_ULTRABALL##/g, JSON.stringify(JSON.stringify(mapUltraBallData)))
        .replace(/##MAP_NUMBERCHAIRS##/g, JSON.stringify(JSON.stringify(mapNumberChairsData)))
        .replace(/##MAP_SURVIVAL_SQUARE##/g, JSON.stringify(JSON.stringify(mapSurvivalSquareData)))
        .replace(/##MAP_COLLISION##/g, JSON.stringify(JSON.stringify(mapCollisionData)))
        .replace(/##MAP_SPACE_MELEE##/g, JSON.stringify(JSON.stringify(mapSpaceMeleeData)));
    
    // Construir el script completo
    return `
// ============================================
// MÓDULO: LALALA
// ============================================
var LALALA = ` + lalalaModule + `;

// ============================================
// MÓDULO: SURVIVAL ROOM
// ============================================
var SURVIVAL = ` + survivalModule + `;

// ============================================
// MÓDULO: METEORS SURVIVAL
// ============================================
var METEORS = ` + meteorsModule + `;

// ============================================
// MÓDULO: JUMPING ARENA
// ============================================
var JUMPING = ` + jumpingModule + `;

// ============================================
// MÓDULO: WEB SURVIVAL
// ============================================
var WEBSURVIVAL = ` + websurvivalModule + `;

// ============================================
// MÓDULO: GALACTIC FIT
// ============================================
var GALACTIC = ` + galacticModule + `;

// ============================================
// MÓDULO: SPACE MELEE
// ============================================
var SPACE_MELEE = ` + spaceMeleeModule + `;

// ============================================
// MÓDULO: GYM
// ============================================
var GYM = ` + gymModule + `;

// ============================================
// MÓDULO: MULTIBALLS
// ============================================
var MULTIBALLS = ` + multiballsModule + `;

// ============================================
// MÓDULO: DODGEBALL
// ============================================
var DODGEBALL = ` + dodgeballModule + `;

// ============================================
// MÓDULO: SUPERMAN
// ============================================
var SUPERMAN = ` + supermanModule + `;

// ============================================
// MÓDULO: ULTRABALL
// ============================================
var ULTRABALL = ` + ultraballModule + `;

// ============================================
// MÓDULO: NUMBER CHAIRS
// ============================================
var NUMBERCHAIRS = ` + numberChairsModule + `;

// ============================================
// MÓDULO: SURVIVAL SQUARE
// ============================================
var SURVIVAL_SQ = ` + survSquareModule + `;

// ============================================
// MÓDULO: COLLISION TEAM RACING
// ============================================
var COLLISION_TEAM_RACING = ` + collisionModule + `;

// ============================================
// MÓDULO: LUCKY
// ============================================
` + escapedLuckyCode + `

// ============================================
// MÓDULO: LUCKY HELL
// ============================================
` + escapedLuckyHellCode + `

// ============================================
// MÓDULO: LUCKY DIOS
// ============================================
` + escapedLuckyDiosCode + `

` + mainCode;
};

(async () => {
    console.log('🚀 Iniciando bot de Haxball...');
    
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    console.log('📄 Navegando a Haxball Headless...');
    await page.goto('https://www.haxball.com/headless', {
        waitUntil: 'networkidle2',
        timeout: 60000
    });
    
    console.log('⏳ Esperando que cargue...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('📝 Inyectando script automáticamente...');
    
    // Generar y guardar script para debugging
    const generatedScript = getBotScript();
    fs.writeFileSync(path.join(__dirname, 'debug-script.js'), generatedScript, 'utf8');
    console.log('💾 Script guardado en debug-script.js para inspección');
    
    // Inyectar y ejecutar el script directamente
    await page.evaluate((script) => {
        // Buscar el textarea
        const textarea = document.querySelector('textarea') || 
                        document.querySelector('#code') ||
                        document.querySelector('textarea[class*="code"]');
        
        if (textarea) {
            textarea.value = script;
            
            // Buscar y hacer click en el botón Run
            const buttons = Array.from(document.querySelectorAll('button'));
            const runButton = buttons.find(b => 
                b.textContent.toLowerCase().includes('run') ||
                b.id === 'run'
            );
            
            if (runButton) {
                runButton.click();
            }
        } else {
            // Si no hay textarea, ejecutar directamente
            eval(script);
        }
    }, generatedScript);
    
    console.log('✅ Script inyectado y ejecutado');
    console.log('⏳ Bot activo. Los logs aparecerán abajo:\n');
    
    // Capturar TODOS los mensajes de consola del navegador
    page.on('console', async msg => {
        try {
            const args = await Promise.all(
                msg.args().map(arg => arg.jsonValue().catch(() => arg.toString()))
            );
            const text = args.join(' ');
            
            // Mostrar link especial
            if (text.includes('Link:')) {
                console.log('\n🔗 ' + text);
                console.log('📋 Copia ese link para entrar a la sala\n');
                return;
            }
            
            // Mostrar TODOS los logs del juego
            console.log(text);
        } catch (e) {
            console.log(msg.text());
        }
    });
    
    console.log('⏹️ Presiona Ctrl+C para cerrar el bot\n');
    
    // Mantener el bot corriendo
    process.on('SIGINT', async () => {
        console.log('\n⏹️ Cerrando bot...');
        await browser.close();
        process.exit();
    });
    
})().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
