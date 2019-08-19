import express from 'express';
import { configExpressAppMiddlewares } from './config-app-middlewares';
import { configExpressAppRoutes } from './config-app-routes';
import { configExpressAppGlobalErrorMiddleware } from './config-app-global-error-middleware';

export const createExpressApp = () => {
  const app = express();

  // Configure app middlewares
  configExpressAppMiddlewares(app);

  // Configure app routes
  configExpressAppRoutes(app);

  // Configure global error handler
  configExpressAppGlobalErrorMiddleware(app);

  return app;
};
