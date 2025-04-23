// src/app.ts
import express from 'express';
import cors from 'cors';
import ownersRouter from './routes/owners';
import kanbanRouter from './routes/kanban';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/owners', ownersRouter);
app.use('/kanban', kanbanRouter);

app.get('/', (_req, res) => {
  res.send('API viva y coleando 🚀');
});

export default app;
