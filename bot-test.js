// ============================================
// ENTORNO DE PRUEBAS - Sala privada con contraseña
// Ejecutar: node bot-test.js
// ============================================
// Crea una sala PRIVADA con contraseña "1234" para probar cambios
// sin afectar la sala pública principal.
// Usa la misma DB, mapas y módulos que el bot principal.
// Los webhooks de Discord se desactivan (solo se loguean en consola).

process.env.TEST_MODE = 'true';

// ============================================
// JUEGOS A PROBAR - Cambia esta lista según lo que quieras testear
// Si está vacío [], se cargan TODOS los minijuegos (como en producción)
// ============================================
process.env.TEST_GAMES = JSON.stringify([
    'BUHO'
]);

require('./bot.js');
