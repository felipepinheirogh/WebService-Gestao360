@echo off
setlocal

echo Criando estrutura de pastas e arquivos para WebService-Gestao360...

:: Criar pasta principal
mkdir WebService-Gestao360
cd WebService-Gestao360

:: Criar pastas e subpastas
mkdir src src\config src\controllers src\repositories src\routes src\services src\middlewares src\utils src\server
mkdir client client\css client\js

:: Criar arquivos na pasta src/config
echo. > src\config\database.js
echo. > src\config\env.js

:: Criar arquivo na pasta src/controllers
echo. > src\controllers\ExampleController.js

:: Criar arquivo na pasta src/repositories
echo. > src\repositories\SupabaseRepository.js

:: Criar arquivo na pasta src/routes
echo. > src\routes\index.js

:: Criar arquivo na pasta src/services
echo. > src\services\ExampleService.js

:: Criar arquivos na pasta src/middlewares
echo. > src\middlewares\errorHandler.js
echo. > src\middlewares\auth.js
echo. > src\middlewares\cors.js

:: Criar arquivo na pasta src/utils
echo. > src\utils\Response.js

:: Criar arquivo na pasta src/server
echo. > src\server\app.js

:: Criar arquivos na pasta client
echo. > client\index.html
echo. > client\dashboard.html
echo. > client\login.html

:: Criar arquivos na pasta client/css
echo. > client\css\style.css

:: Criar arquivos na pasta client/js
echo. > client\js\main.js

:: Criar arquivos na pasta raiz
echo. > package.json
echo. > tsconfig.json
echo. > README.md

echo Estrutura de pastas e arquivos criada com sucesso!
pause