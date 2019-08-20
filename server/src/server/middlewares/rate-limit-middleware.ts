import { Application } from 'express';
import RateLimit from 'express-rate-limit';

export const limiter = new RateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please, try again in an hour'
});

export const useRateLimitMiddleware = (app: Application): Application => {
  app.use('*', limiter);

  return app;
};
