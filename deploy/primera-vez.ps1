# Instala TODO en una VPS Ubuntu 24.04 recien reinstalada, de principio a fin.
#   .\deploy\primera-vez.ps1                 -> el panel NO pide token
#   .\deploy\primera-vez.ps1 -ConToken       -> el panel pide token
#   .\deploy\primera-vez.ps1 -Servidor 1.2.3.4
# Te va a pedir la contrasena de ROOT dos veces (solo la primera vez; despues todo es con llave SSH).
# (Archivo en ASCII a proposito: PowerShell 5.1 lee mal los acentos sin BOM.)
param(
    [string]$Servidor = "2.26.161.47",
    [switch]$ConToken
)
$ErrorActionPreference = "Stop"
$raiz = Split-Path -Parent $PSScriptRoot
Set-Location $raiz

$llave = Join-Path $env:USERPROFILE ".ssh\id_ed25519.pub"
if (-not (Test-Path $llave)) { throw "No encuentro tu llave publica ($llave). Crea una con: ssh-keygen -t ed25519" }
$pub = (Get-Content $llave -Raw).Trim()

Write-Host "1/6 Olvidando la huella SSH vieja de $Servidor (el servidor se reinstalo)..." -ForegroundColor Cyan
ssh-keygen -R $Servidor 2>$null | Out-Null

Write-Host "2/6 Subiendo el instalador. Te pide la contrasena de root." -ForegroundColor Cyan
scp -o StrictHostKeyChecking=accept-new deploy\install.sh "root@${Servidor}:/root/"
if ($LASTEXITCODE -ne 0) { throw "No se pudo subir el instalador (scp). Revisa la IP y la contrasena de root." }

Write-Host "3/6 Instalando el sistema (usuario bot, llave SSH, firewall, Node, Chrome, pm2). Tarda unos minutos..." -ForegroundColor Cyan
ssh -t "root@$Servidor" "bash /root/install.sh '$pub'"
if ($LASTEXITCODE -ne 0) { throw "Fallo el instalador. Mira los mensajes de arriba." }

Write-Host "4/6 Comprobando que entras con llave SSH (sin contrasena)..." -ForegroundColor Cyan
ssh -o BatchMode=yes "bot@$Servidor" "echo acceso-ok"
if ($LASTEXITCODE -ne 0) { throw "No se pudo entrar como bot con la llave. No sigas: avisame con el mensaje de error." }

Write-Host "5/6 Subiendo el proyecto y los secretos (.env y secrets.json)..." -ForegroundColor Cyan
& (Join-Path $PSScriptRoot "subir.ps1") -Servidor "bot@$Servidor" -CopiarSecretos -SinReiniciar

Write-Host "6/6 Configurando el panel, el arranque automatico y el enlace publico..." -ForegroundColor Cyan
scp (Join-Path $PSScriptRoot "remoto-setup.sh") "bot@${Servidor}:~/remoto-setup.sh"
$modo = if ($ConToken) { "token" } else { "off" }
$salida = ssh "bot@$Servidor" "bash ~/remoto-setup.sh $modo"
$salida | ForEach-Object { Write-Host $_ }
$url = ($salida | Where-Object { $_ -like "PANEL_URL=*" } | Select-Object -Last 1)

Write-Host ""
Write-Host "LISTO." -ForegroundColor Green
if ($url) { Write-Host ("Tu panel: " + $url.Substring(10)) -ForegroundColor Green }
if ($ConToken) {
    Write-Host "El panel pide token: leelo con  ssh bot@$Servidor 'grep PANEL_TOKEN ~/Minijuegos/.env'" -ForegroundColor Yellow
}
Write-Host "Falta: generar un token nuevo de HaxBall (haxball.com/headlesstoken), pegarlo en el panel y encender la sala." -ForegroundColor Yellow
Write-Host "Recorda que el enlace del panel cambia si el servidor se reinicia (se ve con .\deploy\url.ps1)." -ForegroundColor Yellow
