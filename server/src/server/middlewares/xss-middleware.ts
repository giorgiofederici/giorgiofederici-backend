import { Application } from 'express';
const xss = require('xss-clean');

export const useXSSMiddleware = (app: Application): Application => {
  app.use(xss());

  return app;
};
