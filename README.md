# WebService-Gestao360

Um serviço web multiplataforma (Android, iOS, Windows) para o sistema Gestao360, construído com Node.js, Express, Supabase e frontend em HTML/CSS/JS. O projeto segue os princípios DRY, SOLID, thread-safety e utiliza o padrão Singleton para conexões com o banco de dados.

## Estrutura do Projeto
- `src/`: Código backend (Node.js, Express, Supabase)
  - `config/`: Configurações (variáveis de ambiente e conexão com banco)
  - `controllers/`: Controladores RESTful
  - `repositories/`: Comunicação com Supabase (DRY)
  - `services/`: Regras de negócio (SOLID)
  - `middlewares/`: Middlewares para autenticação, erros e CORS
  - `utils/`: Utilitários para respostas padronizadas
  - `server/`: Ponto de entrada do Express
- `client/`: Frontend HTML/CSS/JS para login e dashboard
- `package.json`: Dependências e scripts
- `tsconfig.json`: Configuração do TypeScript

## Pré-requisitos
- Node.js (v16 ou superior)
- Supabase (crie um projeto e obtenha `SUPABASE_URL` e `SUPABASE_KEY`)
- Variáveis de ambiente em `.env`:
  ```env
  PORT=10000
  JWT_SECRET=sua-chave-secreta-aqui
  SUPABASE_URL=sua-url-supabase
  SUPABASE_KEY=sua-chave-supabase
  SUPABASE_SCHEMA=public
  ```

## Instalação
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd WebService-Gestao360
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` com as variáveis acima.
4. Inicie o servidor:
   ```bash
   npm start
   ```

## Desenvolvimento
- Use `npm run dev` para rodar com `nodemon` e recarregamento automático.
- Acesse o frontend em `http://localhost:10000`.
- A API está disponível em `http://localhost:10000/api`.

## Deploy no Render
1. Faça push do projeto para um repositório Git.
2. No Render, crie um novo "Web Service" e conecte ao repositório.
3. Configure as variáveis de ambiente no painel do Render.
4. O deploy é automático após o push.

## Notas
- O frontend é otimizado para navegadores modernos e webviews (Android/iOS).
- A autenticação usa JWT (implementada no `auth.js`).
- O Supabase é configurado como Singleton para eficiência e thread-safety.
- O projeto segue padrões RESTful e MVC.

## Contribuição
1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.
```

## Notas
- **src/middlewares/auth.js**: Implementa autenticação JWT, integrando com `env.js` e `Response.js` para consistência. É thread-safe, pois evita estado compartilhado e usa try-catch para erros.
- **client/login.html**: Alinha com o estilo de `index.html` e `dashboard.html`, usando o mesmo `styles.css` e `main.js` para login via API (simulado com localStorage, mas pronto para integração com JWT).
- **tsconfig.json**: Configurado para TypeScript, suportando o backend e o JavaScript do frontend, com caminhos relativos para facilitar imports.
- **README.md**: Fornece instruções completas para instalação, desenvolvimento e deploy no Render, com ênfase em multiplatforma.
- **SupabaseRepository.js**: Como você confirmou que está correto, não incluí conteúdo. Se precisar de um exemplo, posso fornecer algo como:
  ```javascript
  const Database = require('../config/database');

  class SupabaseRepository {
    constructor(table) {
      this.table = table;
      this.db = Database.client;
    }

    async list(query) {
      let dbQuery = this.db.from(this.table).select('*');
      if (query.filter) {
        dbQuery = dbQuery.eq('some_column', query.filter);
      }
      const { data, error } = await dbQuery;
      if (error) throw new Error(error.message);
      return { items: data };
    }

    async create(payload) {
      const { data, error } = await this.db.from(this.table).insert(payload).select();
      if (error) throw new Error(error.message);
      return data[0];
    }
  }

  module.exports = SupabaseRepository;
  ```
  Confirme se deseja incluir isso.

### Instruções para Uso
- **Como usar**: Extraia o conteúdo do .zip na pasta do projeto `WebService-Gestao360`, substituindo os arquivos vazios. Configure o `.env` com as variáveis necessárias (conforme o `README.md`).
- **Teste**: Execute `npm start` e acesse `http://localhost:10000` para o frontend e `http://localhost:10000/api/examples` para a API.
- **Deploy**: Siga as instruções do `README.md` para deploy no Render.
- **Multiplatforma**: O frontend é compatível com navegadores e webviews (Android/iOS/Windows), e o backend é servido pelo Express, otimizado para Render.