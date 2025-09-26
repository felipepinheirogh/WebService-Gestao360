@echo off
setlocal
REM Define o nome da pasta raiz
set "ROOT_DIR=Webservice-Gestao360"
set "API_SRC_DIR=%ROOT_DIR%\api\src"
set "WEB_DIR=%ROOT_DIR%\web"

echo.
echo ====================================================================
echo Inicializando a criação da estrutura de pastas para %ROOT_DIR%...
echo ====================================================================
echo.

REM --- 1. Cria a Pasta Raiz e Arquivos de Nível Superior ---
mkdir "%ROOT_DIR%" 2>nul

echo # Variaveis de ambiente de exemplo (DB_URL, API_KEY, PORT) > "%ROOT_DIR%\.env.example"
echo # Regras de ignorar arquivos (ex: node_modules, build) > "%ROOT_DIR%\.gitignore"
echo # Documentacao principal do projeto (Visao Geral) > "%ROOT_DIR%\README.md"
echo # Licenca de uso do software (Ex: MIT) > "%ROOT_DIR%\LICENSE"

REM --- 2. Estrutura do Backend (API REST) ---
mkdir "%API_SRC_DIR%\config"
mkdir "%API_SRC_DIR%\core"
mkdir "%API_SRC_DIR%\controllers"
mkdir "%API_SRC_DIR%\services"
mkdir "%API_SRC_DIR%\routes"
mkdir "%API_SRC_DIR%\middlewares"
mkdir "%API_SRC_DIR%\models"

REM --- Arquivos de Nível Superior da API ---
echo { "name": "api" } > "%ROOT_DIR%\api\package.json"
echo { "compilerOptions": {} } > "%ROOT_DIR%\api\tsconfig.json"
echo # Documentacao especifica do Backend > "%ROOT_DIR%\api\README.md"

REM --- Arquivos na api/src/config/ ---
echo // Configurações de conexão com o banco de dados > "%API_SRC_DIR%\config\database.ts"
echo // Gerenciamento de variaveis de ambiente > "%API_SRC_DIR%\config\env.ts"
echo // Configuracao e instancia do logger > "%API_SRC_DIR%\config\logger.ts"

REM --- Arquivos na api/src/core/ ---
echo // Padrao Singleton para a aplicacao > "%API_SRC_DIR%\core\AppSingleton.ts"
echo // Classe base para o servidor HTTP > "%API_SRC_DIR%\core\HttpServer.ts"
echo // Middleware/Handler de erros global > "%API_SRC_DIR%\core\ErrorHandler.ts"
echo // Funções utilitárias diversas > "%API_SRC_DIR%\core\Utils.ts"

REM --- Arquivos na api/src/controllers/ ---
echo // Controller de Autenticacao > "%API_SRC_DIR%\controllers\AuthController.ts"
echo // Controller de Usuarios > "%API_SRC_DIR%\controllers\UserController.ts"
echo // Controller de Clientes > "%API_SRC_DIR%\controllers\ClienteController.ts"
echo // Controller de Dashboard > "%API_SRC_DIR%\controllers\DashboardController.ts"

REM --- Arquivos na api/src/services/ ---
echo // Regras de negocio para Autenticacao > "%API_SRC_DIR%\services\AuthService.ts"
echo // Regras de negocio para Usuarios > "%API_SRC_DIR%\services\UserService.ts"
echo // Regras de negocio para Clientes > "%API_SRC_DIR%\services\ClienteService.ts"
echo // Regras de negocio para Dashboard > "%API_SRC_DIR%\services\DashboardService.ts"

REM --- Arquivos na api/src/routes/ ---
echo // Definicao das Rotas de Autenticacao > "%API_SRC_DIR%\routes\AuthRoutes.ts"
echo // Definicao das Rotas de Usuarios > "%API_SRC_DIR%\routes\UserRoutes.ts"
echo // Definicao das Rotas de Clientes > "%API_SRC_DIR%\routes\ClienteRoutes.ts"
echo // Definicao das Rotas de Dashboard > "%API_SRC_DIR%\routes\DashboardRoutes.ts"

REM --- Arquivos na api/src/middlewares/ ---
echo // Middleware de verificacao de token/sessao > "%API_SRC_DIR%\middlewares\AuthMiddleware.ts"
echo // Middleware de validacao de schema de dados > "%API_SRC_DIR%\middlewares\ValidationMiddleware.ts"

REM --- Arquivos na api/src/models/ ---
echo // DTO/Interface do Usuario > "%API_SRC_DIR%\models\User.ts"
echo // DTO/Interface do Cliente > "%API_SRC_DIR%\models\Cliente.ts"
echo // DTO/Interface de Autenticacao > "%API_SRC_DIR%\models\Auth.ts"

REM --- Arquivos na api/src/ (nível central) ---
echo // Registro central e aplicacao dos sub-modulos de rotas > "%API_SRC_DIR%\routes.ts"
echo // Ponto de entrada (Entry Point) da API > "%API_SRC_DIR%\index.ts"


REM --- 3. Estrutura do Frontend (Web) ---
mkdir "%WEB_DIR%\public\css"
mkdir "%WEB_DIR%\public\js"
mkdir "%WEB_DIR%\public\img"
mkdir "%WEB_DIR%\views\auth"
mkdir "%WEB_DIR%\views\dashboard"
mkdir "%WEB_DIR%\views\usuario"
mkdir "%WEB_DIR%\views\cliente"
mkdir "%WEB_DIR%\views\revenda"
mkdir "%WEB_DIR%\views\dispositivo"
mkdir "%WEB_DIR%\views\licenca"
mkdir "%WEB_DIR%\views\integracao"
mkdir "%WEB_DIR%\views\configuracoes"
mkdir "%WEB_DIR%\partials"

REM --- Arquivos de Nível Superior da Web ---
echo { "name": "web-frontend" } > "%WEB_DIR%\package.json"
echo # Documentacao especifica do Frontend > "%WEB_DIR%\README.md"

REM --- Arquivos na web/public/ ---
echo /* Estilos CSS customizados do projeto */ > "%WEB_DIR%\public\css\custom.css"
echo // Lógica JavaScript principal do frontend > "%WEB_DIR%\public\js\main.js"
REM A pasta public/img é criada e fica vazia intencionalmente

REM --- Arquivos na web/views/ ---
echo > "%WEB_DIR%\views\auth\login.html"
echo > "%WEB_DIR%\views\dashboard\index.html"
echo > "%WEB_DIR%\views\usuario\list.html"
echo > "%WEB_DIR%\views\usuario\form.html"
echo > "%WEB_DIR%\views\cliente\list.html"
echo > "%WEB_DIR%\views\cliente\form.html"
echo > "%WEB_DIR%\views\revenda\list.html"
echo > "%WEB_DIR%\views\dispositivo\list.html"
echo > "%WEB_DIR%\views\licenca\list.html"
echo > "%WEB_DIR%\views\integracao\settings.html"
echo > "%WEB_DIR%\views\configuracoes\geral.html"

REM --- Arquivos na web/partials/ ---
echo > "%WEB_DIR%\partials\_header.html"
echo > "%WEB_DIR%\partials\_sidebar.html"
echo > "%WEB_DIR%\partials\_footer.html"

echo.
echo ====================================================================
echo Estrutura de pastas e arquivos criada com sucesso! ✨
echo Pasta raiz: "%ROOT_DIR%"
echo ====================================================================
echo.

endlocal