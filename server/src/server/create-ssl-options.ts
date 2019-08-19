import fs from 'fs';
import { ServerOptions } from 'https';

export const createSSLOptions = (): ServerOptions => {
  const key = fs.readFileSync(process.env.SSL_KEY_PATH);
  const cert = fs.readFileSync(process.env.SSL_CERT_PATH);
  return { key, cert };
};
