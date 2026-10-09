#!/usr/bin/env bash
# Instalador del bot en una VPS Ubuntu 24.04 limpia.
# Se corre UNA vez como root:   bash install.sh
# Hace: actualiza el sistema, crea el usuario "bot" con tu llave SSH, bloquea el login por contraseña,
# activa firewall + fail2ban, instala Node 20 + librerías de Chrome + pm2.
# NO sube el proyecto ni crea el .env: eso se hace después (ver deploy/LEEME.md).
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then echo "Corré este script como root."; exit 1; fi

BOT_USER="bot"

echo "== 1/6  Actualizando el sistema =="
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y curl ca-certificates gnupg ufw fail2ban unattended-upgrades git tar

echo "== 2/6  Usuario '$BOT_USER' y llave SSH =="
if ! id "$BOT_USER" >/dev/null 2>&1; then
    adduser --disabled-password --gecos "" "$BOT_USER"
fi
# Si /home/bot ya existía (creado por otro proyecto, p. ej. otros bots), adduser lo deja con su dueño original y
# el usuario no puede escribir. Se corrige SOLO la carpeta del home, sin tocar su contenido (puede ser de otros).
if [ "$(stat -c %U "/home/$BOT_USER")" != "$BOT_USER" ]; then
    chown "$BOT_USER:$BOT_USER" "/home/$BOT_USER"
    echo "Aviso: /home/$BOT_USER tenía otro dueño; se corrigió solo la carpeta (su contenido no se tocó)."
fi
# La llave se recibe como argumento (recomendado) o se pide por teclado.
RAW_KEY="${1:-}"
if [ -z "$RAW_KEY" ]; then
    echo
    echo "Pegá tu llave PÚBLICA SSH (una línea que empieza con ssh-ed25519 o ssh-rsa) y apretá Enter."
    read -r RAW_KEY
fi
# Se extrae la llave aunque venga con espacios, retornos de carro o caracteres de control del pegado
PUBKEY="$(printf '%s' "$RAW_KEY" | tr -d '' | grep -oE '(ssh-ed25519|ssh-rsa|ecdsa-sha2-[a-z0-9-]+) [A-Za-z0-9+/=]+( [^ ]+)?' | head -n1 || true)"
if [ -z "$PUBKEY" ]; then
    echo "No encontré una llave pública SSH en lo que pegaste. Abortando SIN tocar el acceso por contraseña."
    exit 1
fi
echo "Llave detectada: ${PUBKEY:0:40}..."
install -d -m 700 -o "$BOT_USER" -g "$BOT_USER" "/home/$BOT_USER/.ssh"
echo "$PUBKEY" > "/home/$BOT_USER/.ssh/authorized_keys"
chown "$BOT_USER:$BOT_USER" "/home/$BOT_USER/.ssh/authorized_keys"
chmod 600 "/home/$BOT_USER/.ssh/authorized_keys"

# El endurecimiento desactiva el login por contraseña. Si en la VPS ya hay otros proyectos corriendo y alguien los
# administra entrando con contraseña, quedaría sin acceso. Se pregunta antes (FORCE=1 salta la pregunta).
OTROS="$(ps -eo cmd | grep -E '(^| )(node|pm2|PM2)( |$)' | grep -v grep | grep -v 'install.sh' | head -3 || true)"
if [ -n "$OTROS" ] && [ "${FORCE:-0}" != "1" ]; then
    echo
    echo "ATENCION: ya hay otros procesos de Node/pm2 corriendo en este servidor:"
    echo "$OTROS" | sed 's/^/   /'
    echo "Seguir desactiva el login por contraseña (solo se podrá entrar con llave SSH o desde la consola del panel)."
    read -r -p "¿Seguir? (s/N) " RESP
    case "$RESP" in s|S|si|SI|sí) ;; *) echo "Cancelado: no se tocó el acceso SSH."; exit 1 ;; esac
fi

echo "== 3/6  Endureciendo SSH (solo llaves, sin root por contraseña) =="
cat > /etc/ssh/sshd_config.d/99-hardening.conf <<'EOF'
PasswordAuthentication no
PermitRootLogin prohibit-password
KbdInteractiveAuthentication no
EOF
sshd -t
systemctl reload ssh || systemctl reload sshd

echo "== 4/6  Firewall y fail2ban =="
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
# El panel (puerto 3000) NO se abre al exterior: se usa con túnel SSH.
ufw --force enable
systemctl enable --now fail2ban

echo "== 5/6  Node 20 + librerías de Chrome + pm2 =="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
apt-get install -y fonts-liberation libasound2t64 libatk-bridge2.0-0t64 libatk1.0-0t64 libcups2t64 \
    libdbus-1-3 libdrm2 libgbm1 libgtk-3-0t64 libnspr4 libnss3 libx11-6 libxcomposite1 libxdamage1 \
    libxext6 libxfixes3 libxrandr2 libxkbcommon0 libpango-1.0-0 libcairo2 xdg-utils wget
npm install -g pm2

echo "== 6/6  Swap de 2 GB (por si Chrome se pasa de RAM) =="
if ! swapon --show | grep -q swapfile; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo
echo "Listo. Probá en OTRA ventana, SIN cerrar esta:   ssh $BOT_USER@<IP-del-servidor>"
echo "Si entra, ya podés seguir con deploy/LEEME.md (subir el proyecto)."
