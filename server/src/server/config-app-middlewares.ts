import express from 'express';
import RateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cors from 'cors';
// import bluebird from 'bluebird';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import compression from 'compression';
// TODO: Check how to create xss-clean @types
const xss = require('xss-clean');

export const configExpressApp = (app: any) => {
  // configure CORS
  const corsOptions: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  };

  // TODO: Create env vars for origin
  if (process.env.NODE_ENV === 'development') {
    corsOptions.origin = 'http://localhost:4200';
  } else if (process.env.NODE_ENV === 'production') {
    corsOptions.origin = [
      'https://giorgiofederici.com',
      'https://www.giorgiofederici.com'
    ];
  }

  app.use(cors(corsOptions));

  // Set security HTTP Headers
  app.use(helmet());

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // Limit requests
  const limiter = new RateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP. Please, try again in an hour'
  });
  app.use('*', limiter);

  // Body parser, reading data from body into req.body
  app.use(express.json({ limit: '10kb' }));

  // Parsing data from html forms
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Cookie middleware
  app.use(cookieParser());

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(xss());

  // Prevent parameter pollution
  app.use(hpp());

  app.use(compression());

  // Test middleware
  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // Keep this middleware for testing
      next();
    }
  );

  return app;
};
