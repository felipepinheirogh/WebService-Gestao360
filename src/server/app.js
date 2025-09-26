const express = require('express');
const path = require('path');
const routes = require('../routes/index');
const cors = require('../middlewares/cors');
const errorHandler = require('../middlewares/errorHandler');
const { env } = require('../config/env');

const app = express();
const PORT = env.PORT;

// Middlewares
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir frontend
app.use(express.static(path.join(__dirname, '../../client')));

// Rotas API
app.use('/api', routes);

// Middleware de erros
app.use(errorHandler);

// Start
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
