import { Application } from 'express';
import compression from 'compression';

export const useCompressionMiddleware = (app: Application): Application => {
  app.use(compression());

  return app;
};
