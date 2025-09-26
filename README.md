# ERP Cloud App

Este projeto é um ERP em nuvem desenvolvido com uma arquitetura de cliente-servidor. A aplicação utiliza TypeScript no backend com Express e HTML/CSS/JavaScript no frontend, aproveitando o Bootstrap para um design responsivo.

## Estrutura do Projeto

```
erp-cloud-app
├── src
│   ├── server
│   │   ├── app.ts                # Ponto de entrada da aplicação do servidor
│   │   ├── controllers
│   │   │   └── index.ts          # Controlador principal para gerenciar requisições
│   │   ├── routes
│   │   │   └── index.ts          # Configuração das rotas da aplicação
│   │   └── types
│   │       └── index.ts          # Definições de tipos personalizados
│   └── client
│       ├── index.html            # Página inicial da aplicação
│       ├── login.html            # Formulário de login
│       ├── dashboard.html         # Painel principal do ERP
│       ├── css
│       │   └── styles.css        # Estilos CSS utilizando Bootstrap
│       └── js
│           └── main.js           # Código JavaScript para interação do usuário
├── package.json                   # Configuração do npm e dependências
├── tsconfig.json                  # Configuração do TypeScript
└── README.md                      # Documentação do projeto
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```
   cd erp-cloud-app
   ```

3. Instale as dependências:
   ```
   npm install
   ```

## Uso

1. Inicie o servidor:
   ```
   npm start
   ```

2. Acesse a aplicação no navegador em `http://localhost:3000`.

3. Navegue até a página de login e insira suas credenciais.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.