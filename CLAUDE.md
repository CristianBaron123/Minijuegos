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
