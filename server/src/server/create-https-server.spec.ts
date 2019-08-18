import { Express } from 'express';
import { ServerOptions } from 'https';
import { Server } from 'http';
import { expect } from 'chai';
import { rewiremock } from '../../../tests/rewiremock';

const createFakeApp = () => {
  const fakeApp: Express = null;
  return fakeApp;
};

const createFakeSSLOptions = () => {
  const fakeSSLOptions: ServerOptions = null;
  return fakeSSLOptions;
};

const createFakeServer = (options?: ServerOptions, app?: Express): Server => {
  const fakeServer: Server = new Server();
  fakeServer['options'] = options;
  fakeServer['app'] = app;
  return fakeServer;
};

describe('Create HTTPS server', () => {
  afterEach(() => {
    rewiremock.forceCacheClear();
  });
  it('should create a live https server', async () => {
    const createHttpsServerModuleMock = await rewiremock.around(
      () => import('./create-https-server'),
      () => {
        rewiremock(() => import('./create-app')).with({
          createExpressApp: createFakeApp
        });
        rewiremock(() => import('./create-ssl-options')).with({
          createSSLOptions: createFakeSSLOptions
        });
        rewiremock(() => import('https'))
          .nonStrict()
          .with({
            createServer: createFakeServer
          });
      }
    );

    expect(createHttpsServerModuleMock.createHttpsServer()).to.deep.equal(
      createFakeServer(null, null)
    );
  });
});
