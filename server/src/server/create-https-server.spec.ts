import { expect } from 'chai';
import { rewiremock } from '../../../tests/rewiremock';

describe('Create HTTPS server', () => {
  afterEach(() => {
    rewiremock.forceCacheClear();
  });
  it('should create a live https server', async () => {
    const createHttpsServerModuleMock = await rewiremock.around(
      () => import('./create-https-server'),
      () => {
        rewiremock(() => import('./create-app'))
          .nonStrict()
          .with({
            createExpressApp: () => 'appMocked'
          });
        rewiremock(() => import('./create-ssl-options'))
          .nonStrict()
          .with({
            createSSLOptions: () => 'sslOptionsMocked'
          });
        rewiremock(() => import('https'))
          .nonStrict()
          .with({
            createServer: (options: any, app: any) => {
              return { opts: options, app: app };
            }
          });
      }
    );

    expect(createHttpsServerModuleMock.createHttpsServer()).to.deep.equal({
      opts: 'sslOptionsMocked',
      app: 'appMocked'
    });
  });
});
