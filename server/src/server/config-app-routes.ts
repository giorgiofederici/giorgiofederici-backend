import { Request, Response, NextFunction } from 'express';
import { skillRouter } from '../routes/skill-routes';
import { userRouter } from '../routes/user-routes';
import { projectRouter } from '../routes/project-routes';
import { AppError } from '../errors/app-error';

export const configExpressAppRoutes = (app: any) => {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/skills', skillRouter);
  app.use('/api/v1/projects', projectRouter);

  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  return app;
};
