# Publica el proyecto en la VPS y reinicia el panel con pm2.
#   .\deploy\subir.ps1                      -> sube el codigo y reinicia
#   .\deploy\subir.ps1 -CopiarSecretos      -> ademas copia .env y secrets.json (solo la primera vez)
#   .\deploy\subir.ps1 -SinReiniciar        -> sube el codigo pero no reinicia nada
# NUNCA pisa el .env ni el secrets.json del servidor salvo que uses -CopiarSecretos.
# (Archivo en ASCII a proposito: PowerShell 5.1 lee mal los acentos sin BOM.)
param(
    [string]$Servidor = "bot@2.26.161.47",
    [switch]$CopiarSecretos,
    [switch]$SinReiniciar
)
$ErrorActionPreference = "Stop"

$raiz = Split-Path -Parent $PSScriptRoot
Set-Location $raiz
$tgz = Join-Path $env:TEMP "minijuegos.tgz"

Write-Host "1/4 Empaquetando el proyecto..." -ForegroundColor Cyan
if (Test-Path $tgz) { Remove-Item $tgz -Force }
tar --exclude=node_modules --exclude=.git --exclude=backups --exclude=logs --exclude=Mapas.rar --exclude=debug-script.js --exclude=.env --exclude=secrets.json --exclude=minijuegos.tgz -czf $tgz .
if ($LASTEXITCODE -ne 0) { throw "Fallo el empaquetado (tar)." }
Write-Host ("    {0:N1} MB" -f ((Get-Item $tgz).Length / 1MB))

Write-Host "2/4 Subiendo a $Servidor ..." -ForegroundColor Cyan
scp $tgz "${Servidor}:~/minijuegos.tgz"
if ($LASTEXITCODE -ne 0) { throw "Fallo la subida (scp)." }

if ($CopiarSecretos) {
    Write-Host "    Copiando .env y secrets.json (solo se hace a pedido)..." -ForegroundColor Yellow
    ssh $Servidor "mkdir -p ~/Minijuegos"
    foreach ($f in @(".env", "secrets.json")) {
        if (Test-Path (Join-Path $raiz $f)) {
            scp (Join-Path $raiz $f) "${Servidor}:~/Minijuegos/$f"
            ssh $Servidor "chmod 600 ~/Minijuegos/$f"
        }
    }
}

Write-Host "3/4 Instalando en el servidor..." -ForegroundColor Cyan
ssh $Servidor "mkdir -p ~/Minijuegos && tar -xzf ~/minijuegos.tgz -C ~/Minijuegos && rm ~/minijuegos.tgz && cd ~/Minijuegos && npm install --omit=dev --no-audit --no-fund"
if ($LASTEXITCODE -ne 0) { throw "Fallo la instalacion en el servidor." }

if ($SinReiniciar) {
    Write-Host "4/4 Listo (sin reiniciar)." -ForegroundColor Green
} else {
    Write-Host "4/4 Reiniciando el panel (pm2)..." -ForegroundColor Cyan
    ssh $Servidor "cd ~/Minijuegos && if pm2 describe tld-panel >/dev/null 2>&1; then pm2 restart tld-panel; else pm2 start panel.js --name tld-panel; fi && pm2 save"
    Write-Host "Listo. OJO: reiniciar el panel apaga las salas encendidas; hay que volver a encenderlas con un token nuevo." -ForegroundColor Yellow
}
