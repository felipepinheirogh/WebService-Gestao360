import express from 'express';
import path from 'path';
import { setRoutes } from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir frontend compilado
app.use(express.static(path.join(__dirname, '../client')));

// Set routes
setRoutes(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
