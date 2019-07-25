import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Debug from 'debug';
import { environmentSanityCheck } from '../src/utils/environment-sanity';
import { ServerApp } from '../src/app';

const debug = Debug('giorgiofederici:server');

// Listen for the uncaught exceptions
// Exit immediately the process, do not close the server carefully
process.on('uncaughtException', (err: Error) => {
  debug('UNCAUGHT EXCEPTION! Shutting down...');
  debug(err.name, err);
  process.exit(1);
});

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

process.on('unhandledRejection', (err: Error) => {
  debug('UNHANDLER REJECTION! Shutting down...');
  debug(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  debug('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    debug('Process terminated!');
  });
});
