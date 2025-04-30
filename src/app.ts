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

// Ruta de Contacts (une Contacts con Organizations)
// Accesible en GET /api/contacts
app.use('/api', contactsRoutes);

// Ruta de perfil de owner
// Accesible en GET /profile/:id
app.use('/profile', profileRoutes);

// Ruta raíz de prueba
app.get('/', (_req, res) => {
  res.send('API viva y coleando 🚀');
});

export default app;
