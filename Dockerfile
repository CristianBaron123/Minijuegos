FROM node:20-slim

# Instalar Chromium del sistema + dependencias
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Decirle a Puppeteer que use el Chromium del sistema (no descargue el suyo)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV NODE_ENV=production

WORKDIR /app

# Instalar dependencias primero (cacheable)
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar el resto del proyecto
COPY . .

# Usar configuración de Railway (solo sala Minijuegos, sin Buho)
RUN cp sala-config.railway.json sala-config.json

EXPOSE 3000

CMD ["node", "panel.js"]
