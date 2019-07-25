import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ServerApp } from '../src/app';
import { cDebug } from '../src/utils/custom-debug';
import { environmentSanityCheck } from '../src/utils/environment-sanity';
import {
  uncaughtExceptionHandler,
  unhandledRejectionHandler
} from '../src/errors/error-handlers';

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
const serverApp = new ServerApp();

const server = serverApp.app.listen(port, () => {
  debug(`App running on port ${port}...`);
});

// Listener for unhandledRejection event
unhandledRejectionHandler(server);

process.on('SIGTERM', () => {
  debug('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    debug('Process terminated!');
  });
});
