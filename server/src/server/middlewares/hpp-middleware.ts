import { Application } from 'express';
import hpp from 'hpp';

export const useHppMiddleware = (app: Application): Application => {
  app.use(hpp());

  return app;
};
