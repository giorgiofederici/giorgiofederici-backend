import fs from 'fs';
import https from 'https';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ServerApp } from '../src/app';
import { cDebug } from '../src/utils/custom-debug';
import { environmentSanityCheck } from '../src/utils/environment-sanity';
import {
  uncaughtExceptionHandler,
  unhandledRejectionHandler
} from '../src/errors/error-handlers';
import { Server } from 'http';

const debug = cDebug(__filename);

// Listen for the uncaught exceptions
uncaughtExceptionHandler();

// Set the environment variables, works only in DEV
dotenv.config({ path: `${__dirname}/../config.env` });
environmentSanityCheck();

const DB = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => debug('DB connection successful!'));

const port = process.env.PORT || 3000;
// Express App
const serverApp = ServerApp.bootstrap();

let server: Server;

if (process.env.NODE_ENV === 'production') {
  const sslOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH)
  };
  https.createServer(sslOptions, serverApp.getApp()).listen(port, () => {
    debug(`HTTPS server running on port ${port}...`);
  });
} else if (process.env.NODE_ENV === 'development') {
  server = serverApp.getApp().listen(port, () => {
    debug(`Server running on port ${port}...`);
  });
}

export { server };

// Listener for unhandledRejection event
unhandledRejectionHandler(server);

process.on('SIGTERM', () => {
  debug('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    debug('Process terminated!');
  });
});
