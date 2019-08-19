import mongoose from 'mongoose';
import { cDebug } from '../utils/custom-debug';

export const debug = (msg: string) => cDebug(__filename, msg);

export const finalizeConnectionURI = (placeholder: string): string => {
  return process.env.DATABASE_URI.replace(
    placeholder,
    process.env.DATABASE_PASSWORD
  );
};

export const connectDB = async () => {
  const db = finalizeConnectionURI('<PASSWORD>');

  const connection = await mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  debug('DB connection successful!');

  return connection;
};
