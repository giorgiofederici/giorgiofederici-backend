import { Application } from 'express';
import morgan from 'morgan';

export const useMorganMiddleware = (app: Application): Application => {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  return app;
};
