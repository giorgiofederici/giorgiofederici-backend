import { Application } from 'express';
import cookieParser from 'cookie-parser';

export const useCookieParserMiddleware = (app: Application): Application => {
  app.use(cookieParser());

  return app;
};
