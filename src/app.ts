// src/app.ts
import express from 'express';
import cors from 'cors';
import ownersRouter from './routes/owners';
import kanbanRouter from './routes/kanban';
import contactsRoutes from './routes/contacts';
import profileRoutes from './routes/profile';

const app = express();

// Configuración de CORS para el front desplegado en Vercel
const allowedOrigins = [
  'https://reto-crm.vercel.app',
  // 'https://<tu-preview-url>.vercel.app' // añade si usas preview deployments
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Preflight handler (maneja OPTIONS para todas las rutas)
app.options('*', cors({ origin: allowedOrigins }));

// Rutas de Owners y Kanban
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