import express from 'express';

export const useBodyParserMiddleware = (
  app: express.Application
): express.Application => {
  app.use(express.json({ limit: '10kb' }));

  return app;
};
