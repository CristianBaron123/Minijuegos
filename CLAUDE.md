# CLAUDE.md — Minijuegos HaxBall Bot

## ⚠️ ADVERTENCIA CRÍTICA — NO APAGAR EL BOT

**NUNCA ejecutes ninguno de estos comandos en este proyecto:**
- `taskkill` sobre procesos `node.exe` o `bot.js`
- `pkill node`
- `kill` sobre el proceso del bot
- Detener, reiniciar o matar el proceso de Node.js que corre `bot.js`

**Motivo:** El bot usa Puppeteer para controlar un navegador con HaxBall. Al iniciarse requiere resolver un CAPTCHA manualmente. Si el proceso se mata, el bot no puede reiniciarse solo y requiere intervención humana.

Si necesitas detener algo en este proyecto, **pregunta al usuario primero**.

---

## Descripción del proyecto

Bot de HaxBall headless con más de 60 minijuegos, sistema de economía, clanes, matrimonios, torneos y más.

### Archivos principales
- `bot.js` — Entry point (Node.js + Puppeteer)
- `room-main.txt` — Lógica del bot (se inyecta en el navegador)
- `db.js` — Conexión y funciones de MongoDB
- `games/minijuegos/` — Módulos de cada minijuego
- `games/luckys/lucky.js` — Sistema lucky/ruleta

### Comandos para correr el bot
```bash
node bot.js
# o en modo test:
node bot-test.js
```

**Recuerda: no matar el proceso una vez corriendo.**

---

## Minijuegos de goles (torneo) — Sistema 1v1 final

Los minijuegos de goles con torneo por eliminación (XD_GOALS, BOOMERANG_LEAGUE, SUPER_GRAVEDAD, EARN_EASILY, etc.) tienen una mecánica especial cuando quedan 2 jugadores:

- **50% probabilidad** de cargar un mapa especial 1v1 distinto al del torneo
- Los mapas especiales disponibles son: `DOMINIC_SURVIVOR`, `AIR_HOCKEY`, `GOL_A_GOL`, `SPACE_VORTEX`
- Se elige uno al azar del pool y se llama a `_chosenFinale.start(room, p1, p2, callback)`
- Si no se activa el especial, se juega el 1v1 normal en el mapa original del torneo

### Patrón de código (agregar en el bloque `players.length === 2`):
```js
var _finaleGames = [];
if (typeof DOMINIC_SURVIVOR !== 'undefined') _finaleGames.push(DOMINIC_SURVIVOR);
if (typeof AIR_HOCKEY !== 'undefined') _finaleGames.push(AIR_HOCKEY);
if (typeof GOL_A_GOL !== 'undefined') _finaleGames.push(GOL_A_GOL);
if (typeof SPACE_VORTEX !== 'undefined') _finaleGames.push(SPACE_VORTEX);
if (_finaleGames.length > 0 && Math.random() < 0.50) {
    var p1 = room.getPlayerList().find(function(x) { return x.id === ids[0]; });
    var p2 = room.getPlayerList().find(function(x) { return x.id === ids[1]; });
    if (p1 && p2) {
        var _chosenFinale = _finaleGames[Math.floor(Math.random() * _finaleGames.length)];
        _chosenFinale.start(room, p1, p2, function(winner) {
            if (winner && gameState.callback) { gameState.callback(winner); }
            else if (gameState.callback) { gameState.callback(null); }
            stop(room);
        });
        return;
    }
}
```

---

## Refactor pendiente: Sistema de registro centralizado en room-main.txt

**Archivo a modificar:** `room-main.txt` (el unico archivo que necesita cambios)

**Los modulos** (`games/minijuegos/*.js`) **NO se tocan** — ya exportan todo lo necesario.

### Problema actual
- Cada juego esta hardcoded en ~10 lugares distintos de room-main.txt (forceStopAllGames, checkAndStart anyModuleActive, onPlayerLeave, onPlayerChat, escoger, elegir, start functions, etc.)
- Agregar un juego = tocar 10 sitios = riesgo de romper todo
- Un bug en un juego puede contaminar a los demas (ej: room.onTeamGoal sobrescrito)

### Solucion
Crear UN array de modulos y recorrerlo con loops en vez de hardcodear cada juego.

### Plan de implementacion

#### 1. Crear el array central (cerca de la zona de variables globales, ~linea 600-700)
```js
var minigameModules = [
    { name: 'LALALA', module: LALALA, displayName: 'Lalala', starter: startLALALA, minPlayers: 2, maxPlayers: 16 },
    { name: 'SURVIVAL', module: SURVIVAL, displayName: 'Survival', starter: startSURVIVAL, minPlayers: 2, maxPlayers: 16 },
    // ... agregar todos los juegos aqui
    { name: 'BUHO', module: BUHO, displayName: 'Buho', starter: startBUHO, minPlayers: 3, maxPlayers: 16 },
    { name: 'COVID_NAMAJUNAS', module: COVID_NAMAJUNAS, displayName: 'COVID Namajunas', starter: startCOVID_NAMAJUNAS, minPlayers: 2, maxPlayers: 16 },
    // etc.
];
```

#### 2. Reemplazar forceStopAllGames (~linea 2750-2850)
```js
// ANTES: 80+ lineas de try/catch individuales
// DESPUES:
function forceStopAllGames() {
    minigameModules.forEach(function(g) {
        try { if (g.module && g.module.isActive && g.module.isActive()) g.module.stop(room); } catch(e){}
    });
    try { room.stopGame(); } catch(e){}
    room.onTeamGoal = buhoGoalHandler;
    botState.gameActive = false;
    if (botState.startTimeout) { clearTimeout(botState.startTimeout); botState.startTimeout = null; }
}
```

#### 3. Reemplazar checkAndStart anyModuleActive check (~linea 2950-3000)
```js
// ANTES: 60+ lineas de checks individuales
// DESPUES:
var anyModuleActive = false;
minigameModules.forEach(function(g) {
    try { if (g.module && g.module.isActive && g.module.isActive()) anyModuleActive = true; } catch(e){}
});
```

#### 4. Reemplazar onPlayerLeave notificaciones (~linea 3730-3850)
```js
// ANTES: 40+ lineas de try/catch individuales
// DESPUES:
minigameModules.forEach(function(g) {
    if (g.module && g.module.isActive && g.module.isActive() && g.module.onPlayerLeave) {
        try { g.module.onPlayerLeave(room, player); } catch(e){}
    }
});
```

#### 5. Reemplazar onPlayerChat bloqueo de chat (~linea 4560-5010)
```js
minigameModules.forEach(function(g) {
    if (g.module && g.module.isActive && g.module.isActive() && g.module.onPlayerChat) {
        try { var r = g.module.onPlayerChat(player, message); if (r === false) return false; } catch(e){}
    }
});
```

#### 6. Reemplazar escoger/elegir arrays (~linea 6000-6300)
```js
// ANTES: 2 arrays hardcodeados de ~60 juegos cada uno
// DESPUES: generar desde minigameModules
var escogerGames = [];
minigameModules.forEach(function(g) {
    escogerGames.push({n: g.name, d: g.displayName, s: g.starter});
});
var elegirGames = [];
minigameModules.forEach(function(g) {
    elegirGames.push({n: g.name, d: g.displayName});
});
```

#### 7. Handler global onTeamGoal centralizado (~linea 3470)
```js
function buhoGoalHandler(team) {
    for (var i = 0; i < minigameModules.length; i++) {
        var g = minigameModules[i];
        if (g.module && g.module.isActive && g.module.isActive() && g.module.onTeamGoal) {
            try { g.module.onTeamGoal(room, team); } catch(e){}
            return;
        }
    }
}
room.onTeamGoal = buhoGoalHandler;
```

#### 8. Igual para onGameTick y onPositionsReset
```js
room.onGameTick = function() {
    for (var i = 0; i < minigameModules.length; i++) {
        var g = minigameModules[i];
        if (g.module && g.module.isActive && g.module.isActive() && g.module.onGameTick) {
            try { g.module.onGameTick(room); } catch(e){}
        }
    }
};

room.onPositionsReset = function() {
    for (var i = 0; i < minigameModules.length; i++) {
        var g = minigameModules[i];
        if (g.module && g.module.isActive && g.module.isActive() && g.module.onPositionsReset) {
            try { g.module.onPositionsReset(room); } catch(e){}
        }
    }
};
```

### Beneficios
- **Agregar juego nuevo** = agregar 1 linea al array `minigameModules`
- **Un error aislado** = try/catch en cada loop, no contamina otros juegos
- **room.onTeamGoal seguro** = handler centralizado, se restaura automaticamente
- **Menos codigo** = ~300 lineas menos en room-main.txt
- **Sin riesgo de olvidar** un registro (stop, leave, chat, etc.)

### Notas importantes
- Los modulos Lucky (LUCKY, LUCKY_HELL, LUCKY_DIOS) van SEPARADOS del array porque tienen logica especial (anti-dodge, getCurrentPlayer, etc.)
- Las start functions (startLALALA, startBUHO, etc.) se mantienen como funciones wrapper individuales porque algunas tienen logica especifica (como BUHO que necesita check de jugadores)
- El array se define DESPUES de que todos los modulos esten declarados (alrededor de linea 600-700 en room-main.txt, despues de los `var LALALA = ...`, `var BUHO = ...`, etc.)
- Los modulos que necesitan mapas inyectados (como BUHO con `setMapData`) tienen su inyeccion ANTES del array
