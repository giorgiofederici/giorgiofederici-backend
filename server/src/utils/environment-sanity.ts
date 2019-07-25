import debug from 'debug';

export const environmentSanityCheck = () => {
  if (!process.env.DATABASE_URI) {
    debug('No mongo connection string. Set MONGODB_URI environment variable.');
    process.exit(1);
  }
};
