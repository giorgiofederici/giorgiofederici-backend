import express from 'express';

export const useUrlEncodingMiddleware = (
  app: express.Application
): express.Application => {
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  return app;
};
