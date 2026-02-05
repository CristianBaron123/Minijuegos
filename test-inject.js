const fs = require('fs');
const path = require('path');

// Cargar archivos igual que bot.js
const mapLALALAPath = path.join(__dirname, 'Mapas', 'LALALA from HaxMaps.hbs');
const mapLALALAData = fs.readFileSync(mapLALALAPath, 'utf8');

const lalalaModulePath = path.join(__dirname, 'games', 'minijuegos', 'lalala.js');
const lalalaModuleCode = fs.readFileSync(lalalaModulePath, 'utf8');

function transformModuleForBrowser(moduleCode, mapData) {
    const safeJson = JSON.stringify(mapData);
    let code = moduleCode
        .replace(/const /g, 'var ')
        .replace(/let /g, 'var ')
        .replace(/module\.exports\s*=\s*/g, 'return ')
        .replace(/var mapData = null;/g, `var mapData = JSON.parse(${safeJson});`);
    return `(function() {\n${code}\n})()`;
}

const result = transformModuleForBrowser(lalalaModuleCode, mapLALALAData);

// Escribir resultado a archivo para inspeccionar
fs.writeFileSync('test-output.js', result, 'utf8');
console.log('✅ Archivo test-output.js generado. Verificando sintaxis...');

// Intentar evaluar para ver el error
try {
    eval(result);
    console.log('✅ Sintaxis correcta!');
} catch (e) {
    console.log('❌ Error:', e.message);
    console.log('Línea aproximada:', e.stack);
}
