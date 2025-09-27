# Exclui arquivos extras na raiz
Remove-Item -Force .\estrutura.txt -ErrorAction SilentlyContinue
Remove-Item -Force .\README.md -ErrorAction SilentlyContinue

# Exclui pasta _diversos se existir
Remove-Item -Recurse -Force .\_diversos -ErrorAction SilentlyContinue

# Exclui node_modules da API
Remove-Item -Recurse -Force .\api\node_modules -ErrorAction SilentlyContinue

# Exclui src e outros diretórios de desenvolvimento da API
Remove-Item -Recurse -Force .\api\src -ErrorAction SilentlyContinue

# Exclui arquivos e pastas não listados em web (se houver)
# Adicione outros comandos conforme necessário para limpar web/

Write-Host "Limpeza concluída. Apenas arquivos de produção mantidos."