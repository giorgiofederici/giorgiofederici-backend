import express from 'express';
import { configExpressAppMiddlewares } from './config/config-app-middlewares';
import { configExpressAppRoutes } from './config/config-app-routes';
import { configExpressAppGlobalErrorMiddleware } from './config/config-app-global-error-middleware';

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
