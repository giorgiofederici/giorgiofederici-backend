import { Application, Request, Response, NextFunction } from 'express';
import { useCorsMiddleware } from '../middlewares/cors-middleware';
import { useHelmetMiddleware } from '../middlewares/helmet-middleware';
import { useMorganMiddleware } from '../middlewares/morgan-middleware';
import { useRateLimitMiddleware } from '../middlewares/rate-limit-middleware';
import { useBodyParserMiddleware } from '../middlewares/body-parser-middleware';
import { useUrlEncodingMiddleware } from '../middlewares/url-econding-middleware';
import { useCookieParserMiddleware } from '../middlewares/cookie-parser-middleware';
import { useMongoSanitizeMiddleware } from '../middlewares/mongo-sanitize-middleware';
import { useXSSMiddleware } from '../middlewares/xss-middleware';
import { useHppMiddleware } from '../middlewares/hpp-middleware';
import { useCompressionMiddleware } from '../middlewares/compression-middleware';

// TODO: Check how to create xss-clean @types

export const configExpressAppMiddlewares = (app: Application) => {
  // configure CORS
  useCorsMiddleware(app);

  // Set security HTTP Headers
  useHelmetMiddleware(app);

  // Development logging
  useMorganMiddleware(app);

  // Limit requests
  useRateLimitMiddleware(app);

  // Body parser, reading data from body into req.body
  useBodyParserMiddleware(app);

  // Parsing data from html forms
  useUrlEncodingMiddleware(app);

  // Cookie middleware
  useCookieParserMiddleware(app);

  // Data sanitization against NoSQL query injection
  useMongoSanitizeMiddleware(app);

  // Data sanitization against XSS
  useXSSMiddleware(app);

  // Prevent parameter pollution
  useHppMiddleware(app);

  useCompressionMiddleware(app);

  /*
  // Test middleware
  app.use(
    (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      // Keep this middleware for testing
      next();
    }
  );
   */

  return app;
};
