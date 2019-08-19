/* import path from 'path';
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
import { globalErrorHandler } from './controllers/error-controller';
import { skillRouter } from './routes/skill-routes';
import { userRouter } from './routes/user-routes';
import { projectRouter } from './routes/project-routes';
import { AppError } from './errors/app-error';

// The server application.
export class ServerApp {
  // The express application.
  private app: express.Application;

  public static bootstrap(): ServerApp {
    return new ServerApp();
  }

  constructor() {
    // Create expressjs application
    this.app = express();

    // Configure application middlewares
    this.configMiddlewares();

    // Add routes
    this.configRoutes();
  }

  public getApp() {
    return this.app;
  }

  private configMiddlewares() {
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

    this.app.use(cors(corsOptions));

    // Set security HTTP Headers
    this.app.use(helmet());

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }

    // Limit requests
    const limiter = new RateLimit({
      max: 200,
      windowMs: 60 * 60 * 1000,
      message: 'Too many requests from this IP. Please, try again in an hour'
    });
    this.app.use('*', limiter);

    // Body parser, reading data from body into req.body
    this.app.use(express.json({ limit: '10kb' }));

    // Parsing data from html forms
    this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));

    // Cookie middleware
    this.app.use(cookieParser());

    // Data sanitization against NoSQL query injection
    this.app.use(mongoSanitize());

    // Data sanitization against XSS
    this.app.use(xss());

    // Prevent parameter pollution
    this.app.use(hpp());

    this.app.use(compression());

    // Test middleware
    this.app.use((req, res, next) => {
      // Keep this middleware for testing
      next();
    });
  }

  private configRoutes() {
    this.app.use('/api/v1/users', userRouter);
    this.app.use('/api/v1/skills', skillRouter);
    this.app.use('/api/v1/projects', projectRouter);

    this.app.all('*', (req, res, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });

    // ERROR MIDDLEWARE
    this.app.use(globalErrorHandler);
  }
}
 */
