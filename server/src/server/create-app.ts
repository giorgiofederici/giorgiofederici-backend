import express from 'express';
import { configExpressApp } from './config-app-middlewares';
import { configureExpressAppRoutes } from './config-app-routes';
import { configExpressAppGlobalErrorMiddleware } from './config-app-global-error-middleware';

export const createExpressApp = () => {
  const app = express();

  // Configure app middlewares
  // configExpressApp(app);

  // Configure app routes
  // configureExpressAppRoutes(app);

  // Configure global error handler
  // configExpressAppGlobalErrorMiddleware(app);

  return app;
};
