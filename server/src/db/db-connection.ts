import mongoose from 'mongoose';
import { cDebug } from '../utils/custom-debug';

export const debug = (msg: string) => cDebug(__filename, msg);

export const connectDB = async () => {
  const db = process.env.DATABASE_URI.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  const connection = await mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  debug('DB connection successful!');

  return connection;
};
