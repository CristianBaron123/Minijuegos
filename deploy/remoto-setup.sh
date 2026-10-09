#!/usr/bin/env bash
# Se ejecuta EN la VPS como usuario "bot" (lo lanza deploy/primera-vez.ps1). Es idempotente.
# Configura el .env, arranca el panel con pm2, deja el arranque automático y abre el túnel público.
#   bash remoto-setup.sh off     -> el panel no pide token (como pediste)
#   bash remoto-setup.sh token   -> el panel pide token (se genera uno)
set -euo pipefail
MODE="${1:-off}"
cd ~/Minijuegos

touch .env
chmod 600 .env
grep -q '^HEADLESS=' .env || echo 'HEADLESS=true' >> .env
if [ "$MODE" = "token" ]; then
    sed -i '/^PANEL_AUTH=/d' .env
    grep -q '^PANEL_TOKEN=' .env || echo "PANEL_TOKEN=$(openssl rand -hex 18)" >> .env
else
    if grep -q '^PANEL_AUTH=' .env; then sed -i 's/^PANEL_AUTH=.*/PANEL_AUTH=off/' .env; else echo 'PANEL_AUTH=off' >> .env; fi
fi

# Panel
pm2 delete tld-panel >/dev/null 2>&1 || true
pm2 start panel.js --name tld-panel >/dev/null

# Túnel público (cloudflared, sin root y sin abrir puertos)
mkdir -p ~/bin
if [ ! -x ~/bin/cloudflared ]; then
    curl -fsSL -o ~/bin/cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
    chmod +x ~/bin/cloudflared
fi
pm2 delete tld-tunnel >/dev/null 2>&1 || true
pm2 start ~/bin/cloudflared --name tld-tunnel --interpreter none -- tunnel --no-autoupdate --url http://localhost:3000 >/dev/null
pm2 save >/dev/null

# Arranque automático tras reiniciar el servidor (el usuario bot no tiene sudo)
( crontab -l 2>/dev/null | grep -v pm2-resurrect; echo '@reboot sleep 20 && PATH=/usr/bin:/usr/local/bin:$PATH pm2 resurrect # pm2-resurrect' ) | crontab -

# URL pública del túnel (cambia cada vez que el túnel se reinicia)
URL=""
for i in $(seq 1 30); do
    URL=$(pm2 logs tld-tunnel --lines 80 --nostream 2>/dev/null | grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' | tail -1 || true)
    [ -n "$URL" ] && break
    sleep 2
done
echo "PANEL_URL=${URL:-todavia-no-disponible}"
