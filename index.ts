// api/index.ts
import dotenv from 'dotenv';
dotenv.config();

import app from './src/app'; // probablemente tu app está aquí

import { createServer } from 'http';

export default (req: any, res: any) => {
  app(req, res); // Express ya sabe manejarlo
};
