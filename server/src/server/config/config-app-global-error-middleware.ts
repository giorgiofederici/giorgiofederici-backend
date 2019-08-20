import { globalErrorHandler } from '../../controllers/error-controller';

export const configExpressAppGlobalErrorMiddleware = (app: any) => {
  // ERROR MIDDLEWARE
  app.use(globalErrorHandler);

  return app;
};
