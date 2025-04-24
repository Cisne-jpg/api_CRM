// src/app.ts
import express from 'express';
import cors from 'cors';
import ownersRouter from './routes/owners';
import kanbanRouter from './routes/kanban';
import contactsRoutes from './routes/contacts';
import profileRoutes from './routes/profile';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de Owners y Kanban
app.use('/owners', ownersRouter);
app.use('/kanban', kanbanRouter);

// Ruta de Contacts (une Contact con Organization)
// Accesible en GET /api/contacts
app.use('/api', contactsRoutes);
app.use('/profile', profileRoutes);

// Ruta raíz de prueba
app.get('/', (_req, res) => {
  res.send('API viva y coleando 🚀');
});

export default app;