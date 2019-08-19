import dotenv from 'dotenv';
import { environmentSanityCheck } from './environment-sanity';

export const configEnvironment = () => {
  dotenv.config({ path: `${__dirname}/../../config.env` });
  environmentSanityCheck();
};
