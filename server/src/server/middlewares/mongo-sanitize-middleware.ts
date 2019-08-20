import { Application } from 'express';
import mongoSanitize from 'express-mongo-sanitize';

export const useMongoSanitizeMiddleware = (app: Application): Application => {
  app.use(mongoSanitize());

  return app;
};
