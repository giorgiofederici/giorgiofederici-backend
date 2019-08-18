import { Server } from 'http';
import { createServer } from '../src/server/create-server';
import * as exceptionHandlers from '../src/errors/error-handlers';

export const uncaughtExceptionHandler = () =>
  exceptionHandlers.uncaughtExceptionHandler();

export const unhandledRejectionHandler = (serverToClose: Server) =>
  exceptionHandlers.unhandledRejectionHandler(serverToClose);

export function start(): Server {
  // Listen for the uncaught exceptions
  uncaughtExceptionHandler();

  const server: Server = createServer();

  // Listener for unhandledRejection event
  unhandledRejectionHandler(server);

  return server;
}
