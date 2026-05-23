# Encerra processos que costumam travar o túnel (porta 8081 + ngrok)
Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
Get-Process -Name "ngrok" -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "Porta 8081 e ngrok liberados."
