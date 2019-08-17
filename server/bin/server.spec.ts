import http from 'http';
import { expect } from 'chai';
import { rewiremock } from '../../tests/rewiremock';

// Default is 12000, fake a strange value
const fakeTimeout = 1234;

describe('Server bin', () => {
  afterEach(() => {
    rewiremock.forceCacheClear();
  });
  it('should start an http server in development', async () => {
    process.env.NODE_ENV = 'development';
    const serverModuleMock = await rewiremock.around(
      () => import('./server2'),
      () => {
        rewiremock(() => import('../src/server/create-server')).with({
          createServer: () => new http.Server().setTimeout(fakeTimeout)
        });
      }
    );
    const server = serverModuleMock.start();
    expect(server.timeout).to.be.equal(fakeTimeout);
  });
});
