# Guía de instalación — HaxBall Bot en VPS Linux

## Requisitos
- VPS con Ubuntu 22.04 (mínimo 2GB RAM)
- Acceso SSH al servidor
- El repo de GitHub: https://github.com/CristianBaron123/Minijuegos

---

## Paso 1 — Conectarse al VPS

Desde tu PC, abrí una terminal y conectate:
```bash
ssh root@IP_DEL_VPS
```
(reemplazá IP_DEL_VPS con la IP que te da Supercores)

---

## Paso 2 — Instalar dependencias

Ejecutá estos comandos uno por uno:

```bash
# Actualizar el sistema
apt-get update && apt-get upgrade -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Instalar Chromium y dependencias para Puppeteer
apt-get install -y chromium-browser ca-certificates fonts-liberation git

# Instalar PM2 (para mantener el bot corriendo)
npm install -g pm2
```

---

## Paso 3 — Clonar el repositorio

```bash
cd /root
git clone https://github.com/CristianBaron123/Minijuegos.git
cd Minijuegos
npm install
```

---

## Paso 4 — Configurar variables de entorno

```bash
nano .env
```

Dentro del archivo escribí exactamente esto (reemplazá con el URI real de MongoDB):
```
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/haxball_minijuegos
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
NODE_ENV=production
```

Para guardar: `Ctrl+O` → Enter → `Ctrl+X`

---

## Paso 5 — Arrancar el bot

```bash
pm2 start panel.js --name haxball
pm2 save
pm2 startup
```
(el último comando muestra otro comando para copiar y ejecutar — ejecutalo también)

---

## Paso 6 — Verificar que funciona

```bash
pm2 logs haxball
```

Deberías ver algo como:
```
MongoDB conectado
Panel de Salas HaxBall
http://localhost:3000
```

---

## Paso 7 — Abrir el panel web

En el navegador entrá a:
```
http://IP_DEL_VPS:3000
```

Ahí ponés el token de HaxBall y encendés la sala.

---

## Comandos útiles (para después)

```bash
pm2 status          # Ver si el bot está corriendo
pm2 restart haxball # Reiniciar el bot
pm2 stop haxball    # Apagar el bot
pm2 logs haxball    # Ver logs en tiempo real

# Actualizar el bot cuando haya cambios en GitHub:
cd /root/Minijuegos
git pull
pm2 restart haxball
```

---

## Si algo falla

- **"chromium-browser not found"** → probar con `chromium` en vez de `chromium-browser` en el .env
- **Puerto 3000 no abre** → ejecutar: `ufw allow 3000`
- **MongoDB no conecta** → verificar que el MONGO_URI esté correcto en el .env
