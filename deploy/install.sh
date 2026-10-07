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
echo
echo "Pegá tu llave PÚBLICA SSH (una línea que empieza con ssh-ed25519 o ssh-rsa) y apretá Enter."
echo "(En tu PC de Windows se genera con:  ssh-keygen -t ed25519   y se muestra con:  type %USERPROFILE%\\.ssh\\id_ed25519.pub )"
read -r PUBKEY
case "$PUBKEY" in
    ssh-ed25519\ *|ssh-rsa\ *|ecdsa-sha2-*) ;;
    *) echo "Eso no parece una llave pública SSH. Abortando SIN tocar el acceso por contraseña."; exit 1 ;;
esac
install -d -m 700 -o "$BOT_USER" -g "$BOT_USER" "/home/$BOT_USER/.ssh"
echo "$PUBKEY" > "/home/$BOT_USER/.ssh/authorized_keys"
chown "$BOT_USER:$BOT_USER" "/home/$BOT_USER/.ssh/authorized_keys"
chmod 600 "/home/$BOT_USER/.ssh/authorized_keys"

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
