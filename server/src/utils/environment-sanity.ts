import debug from 'debug';
import { EnvError } from '../errors/env-error';

const envDebug = debug('giorgiofederici:environment-sanity');

export const environmentSanityCheck = () => {
  console.log(process.env.DATABASE_URI);
  if (!process.env.DATABASE_URI) {
    const msg =
      'No mongo connection string. Set MONGODB_URI environment variable.';
    envDebug(msg);
    throw new EnvError(msg);
  }
};
