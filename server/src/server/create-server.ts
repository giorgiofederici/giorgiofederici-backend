import { Server } from 'http';
import express from 'express';
import { createHttpsServer } from './create-https-server';
import { createExpressApp } from './create-app';
import { cDebug } from '../utils/custom-debug';

export const debug = (msg: string) => cDebug(__filename, msg);

export const port = process.env.BACKEND_PORT || 3000;

export const createServer = (): Server => {
  let tmpServer: Server | express.Application;

  if (process.env.NODE_ENV === 'production') {
    tmpServer = createHttpsServer();
  } else if (process.env.NODE_ENV === 'development') {
    tmpServer = createExpressApp();
  }
  const server = tmpServer.listen(port, () => {
    debug(`Server running on port ${port}...`);
  });
  return server;
};
