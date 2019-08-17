import { Server } from 'http';
import { createServer } from '../src/server/create-server';

export function start(): Server {
  return createServer();
}
