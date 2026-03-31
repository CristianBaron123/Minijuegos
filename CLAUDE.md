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
