import https from 'https';
import { createExpressApp } from './create-app';
import { createSSLOptions } from './create-ssl-options';

export const createHttpsServer = () => {
  const expressApp = createExpressApp();
  const sslOptions = createSSLOptions();
  return https.createServer(sslOptions, expressApp);
};
