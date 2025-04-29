// src/app.ts
import express from 'express';
import cors from 'cors';
import ownersRouter from './routes/owners';
import kanbanRouter from './routes/kanban';
import contactsRoutes from './routes/contacts';
import profileRoutes from './routes/profile';

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000', // Desarrollo local
    'http://127.0.0.1:3000',
    'https://localhost:3001', // Reemplaza con tu dominio en producción
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Headers'
  ],
  credentials: true,
  optionsSuccessStatus: 200 // Para navegadores antiguos
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/owners', ownersRouter);
app.use('/kanban', kanbanRouter);
app.use('/api', contactsRoutes);
app.use('/profile', profileRoutes);


app.get('/', (_req, res) => {
  res.send('API operativa 🚀');
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;