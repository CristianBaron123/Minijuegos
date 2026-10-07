# Despliegue en VPS (Ubuntu 24.04)

Servidor: Miami (EE. UU.). El bot corre como usuario `bot`, el panel solo se usa por túnel SSH y MongoDB queda en Atlas.

## 0. Antes de nada
1. **Cambiá la contraseña root** desde el panel del proveedor ("Cambiar Contraseña"). Larga y única; no `1234`.
2. En tu PC (PowerShell) creá una llave SSH si no tenés: `ssh-keygen -t ed25519` (Enter a todo o poné una frase).
3. Mostrá la llave pública para copiarla: `type $env:USERPROFILE\.ssh\id_ed25519.pub`

## 1. Instalar lo básico (una sola vez)
Desde tu PC:
```powershell
scp deploy\install.sh root@IP_DEL_SERVIDOR:/root/
ssh root@IP_DEL_SERVIDOR "bash /root/install.sh"
```
El script te pide pegar la llave pública, crea el usuario `bot`, bloquea el login por contraseña, activa firewall y fail2ban e instala Node 20, las librerías de Chrome y pm2.
Antes de cerrar la sesión, probá en otra ventana: `ssh bot@IP_DEL_SERVIDOR`.

## 2. Subir el proyecto
Desde la carpeta del proyecto, en tu PC (no se sube `.git`, `node_modules` ni los backups):
```powershell
tar --exclude=node_modules --exclude=.git --exclude=backups --exclude=Mapas.rar --exclude=debug-script.js -czf minijuegos.tgz .
scp minijuegos.tgz bot@IP_DEL_SERVIDOR:~/
ssh bot@IP_DEL_SERVIDOR "mkdir -p ~/Minijuegos && tar -xzf ~/minijuegos.tgz -C ~/Minijuegos && cd ~/Minijuegos && npm install --omit=dev"
```
`npm install` baja también el Chrome que usa Puppeteer.

## 3. Secretos (se crean en el servidor, no se suben a git)
```bash
ssh bot@IP_DEL_SERVIDOR
cd ~/Minijuegos
nano .env
```
Contenido mínimo del `.env`:
```
MONGO_URI=mongodb+srv://USUARIO:CONTRASEÑA@cluster0.f6sc2cw.mongodb.net/?appName=Cluster0
PANEL_TOKEN=una-clave-larga-y-unica
HEADLESS=true
```
Los webhooks de Discord van en `secrets.json` (copiá el de tu PC con `scp secrets.json bot@IP:~/Minijuegos/`) o como variables `DISCORD_WEBHOOK_<TIPO>`.

En Atlas, en **Network Access**, agregá la IP del servidor.

## 4. Arrancar con pm2 (se reinicia solo si se cae o si se reinicia el servidor)
```bash
cd ~/Minijuegos
pm2 start panel.js --name tld-panel
pm2 save
pm2 startup        # copiá y ejecutá la línea que imprime (con sudo)
```

## 5. Usar el panel (túnel SSH, el puerto 3000 no está abierto al exterior)
En tu PC:
```powershell
ssh -L 3000:localhost:3000 bot@IP_DEL_SERVIDOR
```
Abrí http://localhost:3000, ingresá el `PANEL_TOKEN`, pegá un token nuevo de HaxBall (de haxball.com/headlesstoken) y encendé la sala.

## Comandos útiles
- Estado: `pm2 status` · Logs: `pm2 logs tld-panel` · Reiniciar el panel: `pm2 restart tld-panel`
- Actualizar el proyecto: repetí el paso 2 (el `.env` y `secrets.json` no se pisan porque no están en el `.tgz`) y `pm2 restart tld-panel`.

> Reiniciar el panel apaga las salas que tenga encendidas; después hay que volver a encenderlas con un token nuevo.
