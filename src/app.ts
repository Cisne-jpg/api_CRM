// src/app.ts
import express from 'express';
import cors from 'cors';
import ownersRouter from './routes/owners'; // Asegúrate de que la ruta y extensión sean correctas

const app = express();

// Habilitar CORS (puedes configurarlo según tus necesidades)
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Montar las rutas
app.use('/owners', ownersRouter);

// Ruta básica para pruebas
app.get('/', (_req, res) => {
  res.send('API viva y coleando 🚀');
});

export default app;
