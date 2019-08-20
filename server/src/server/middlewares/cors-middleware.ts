import { Application } from 'express';
import cors from 'cors';

export const corsOptions: cors.CorsOptions = {
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

export const useCorsMiddleware = (app: Application): Application => {
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

  return app;
};
