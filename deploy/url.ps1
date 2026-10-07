# Muestra la URL publica actual del panel (cambia si el tunel se reinicia).
param([string]$Servidor = "bot@2.26.161.47")
ssh $Servidor "pm2 logs tld-tunnel --lines 200 --nostream 2>/dev/null | grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' | tail -1"
