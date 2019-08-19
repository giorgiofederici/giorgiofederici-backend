import http from 'http';
import { cDebug } from '../utils/custom-debug';

export const debug = (msg: string) => cDebug(__filename, msg);

// Exit immediately the process, do not close the server carefully
export const uncaughtExceptionHandler = () => {
  process.on('uncaughtException', (err: Error) => {
    debug('UNCAUGHT EXCEPTION! Shutting down...');
    debug(`${err.name}: ${err}`);
    process.exit(1);
  });
};

export const unhandledRejectionHandler = (server: http.Server) => {
  process.on('unhandledRejection', (err: Error) => {
    debug('UNHANDLER REJECTION! Shutting down...');
    debug(`${err.name}: ${err.message}`);
    server.close(() => {
      process.exit(1);
    });
  });
};
