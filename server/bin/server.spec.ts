import { Server } from 'http';
import { expect } from 'chai';
import sinon from 'sinon';
import { rewiremock } from '../../tests/rewiremock';

const createFakeServer = () => {
  const fakeServer: Server = null;
  return fakeServer;
};

describe('Server bin', () => {
  afterEach(() => {
    rewiremock.forceCacheClear();
  });

  describe('start server', () => {
    it('should create a server', async () => {
      const serverModuleMock = await rewiremock.around(
        () => import('./server2'),
        () => {
          rewiremock(() =>
            import('../src/errors/error-handlers')
          ).mockThrough();
          rewiremock(() => import('../src/server/create-server')).with({
            createServer: createFakeServer
          });
        }
      );
      const server = serverModuleMock.start();
      expect(server).to.be.equal(null);
    });

    it('should handle uncaught exceptions', async () => {
      const serverModuleMock = await rewiremock.around(
        () => import('./server2'),
        () => {
          rewiremock(() =>
            import('../src/errors/error-handlers')
          ).mockThrough();
          rewiremock(() => import('../src/server/create-server')).with({
            createServer: createFakeServer
          });
        }
      );
      const stub = sinon.stub(serverModuleMock, 'uncaughtExceptionHandler');
      serverModuleMock.start();
      expect(stub.calledOnce).to.be.true;
    });

    it('should handle unhandled rejections', async () => {
      const serverModuleMock = await rewiremock.around(
        () => import('./server2'),
        () => {
          rewiremock(() =>
            import('../src/errors/error-handlers')
          ).mockThrough();
          rewiremock(() => import('../src/server/create-server')).with({
            createServer: createFakeServer
          });
        }
      );
      const stub = sinon.stub(serverModuleMock, 'unhandledRejectionHandler');
      serverModuleMock.start();
      expect(stub.calledOnce).to.be.true;
      expect(stub.getCall(0).args[0]).to.be.equal(null);
    });
  });
  describe('error handlers', () => {
    it('should be defined loaded a uncaught exceptions handler', async () => {
      const serverModuleMock = await rewiremock.around(
        () => import('./server2'),
        () => {
          rewiremock(() => import('../src/errors/error-handlers')).with({
            uncaughtExceptionHandler: () => 'uncaught-exceptions-handler'
          });
        }
      );
      expect(serverModuleMock.uncaughtExceptionHandler()).to.be.equal(
        'uncaught-exceptions-handler'
      );
    });
    it('should be defined loaded a unhandled rejections handler', async () => {
      const serverModuleMock = await rewiremock.around(
        () => import('./server2'),
        () => {
          rewiremock(() => import('../src/errors/error-handlers')).with({
            unhandledRejectionHandler: (server: Server) =>
              'unhandled-rejection-handler'
          });
        }
      );

      expect(
        serverModuleMock.unhandledRejectionHandler(createFakeServer())
      ).to.be.equal('unhandled-rejection-handler');
    });
  });
});
