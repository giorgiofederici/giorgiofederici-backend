import { Application } from 'express';
import helmet from 'helmet';

export const useHelmetMiddleware = (app: Application): Application => {
  app.use(helmet());

  return app;
};
