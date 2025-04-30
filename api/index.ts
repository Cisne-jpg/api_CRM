import { createServer } from 'http';
import app from '../src/app'; // ojo, sube un nivel desde /api
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Server } from 'http';

let server: Server;

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) {
    server = createServer(app);
  }
  server.emit('request', req, res);
}
