# 🎮 Sala de Minijuegos - Haxball

Sala de minijuegos personalizada para Haxball Headless.

## 📦 Instalación

```bash
npm install
```

## 🚀 Uso

```bash
npm start
```

## 🎯 Minijuegos Disponibles

- **Ruleta**: Juego de ruleta con diferentes resultados
- **Último en pie**: Batalla hasta que quede solo uno
- **Carrera**: Carrera de obstáculos

## 📝 Comandos

- `!ayuda` - Ver lista de comandos
- `!mapas` - Ver minijuegos disponibles
- `!iniciar [mapa]` - Iniciar un minijuego
- `!stop` - Detener el juego actual
- `!stats` - Ver tus estadísticas

## 🔧 Configuración

Edita las siguientes variables en `index.js`:
- `token`: Tu token de Haxball Headless
- `roomName`: Nombre de la sala
- `adminPassword`: Contraseña de admin

## 📁 Estructura

```
Minijuegos/
├── index.js          # Archivo principal
├── maps/             # Carpeta para mapas .hbs
├── games/            # Scripts de cada minijuego
└── package.json      # Dependencias
```
