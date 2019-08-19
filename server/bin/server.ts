import { Server } from 'http';
import { createServer } from '../src/server/create-server';
import {
  uncaughtExceptionHandler,
  unhandledRejectionHandler
} from '../src/errors/error-handlers';
import { configEnvironment } from '../src/environment/config-environment';
import { connectDB } from '../src/db/db-connection';

export function start(): Server {
  // Listen for the uncaught exceptions
  uncaughtExceptionHandler();

  // Set the environment variables, works only in DEV
  configEnvironment();

  // connect DB
  connectDB();

  const server: Server = createServer();

  // Listener for unhandledRejection event
  unhandledRejectionHandler(server);

  /*
  process.on('SIGTERM', () => {
    debug('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
      debug('Process terminated!');
    });
  });
  */

  return server;
}
