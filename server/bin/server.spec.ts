import { Server } from 'http';
import { expect } from 'chai';
import sinon from 'sinon';
import { rewiremock } from '../../tests/rewiremock';
import * as errorHandlerModule from '../src/errors/error-handlers';
import * as configEnvironment from '../src/environment/config-environment';
import * as dbConnectionModule from '../src/db/db-connection';

// Vars
let erroHandlerStub: any;
let configEnvironmentStub: sinon.SinonStub;
let dbConnectionStub: sinon.SinonStub;

// Functions
const createFakeServer = () => {
  const fakeServer: Server = null;
  return fakeServer;
};

const mockServerModule = async () => {
  const mock = await rewiremock.around(
    () => import('./server'),
    () => {
      rewiremock(() => import('../src/server/create-server')).with({
        createServer: createFakeServer
      });
      rewiremock(() => import('../src/errors/error-handlers')).mockThrough(
        name => erroHandlerStub[name]
      );
      rewiremock(() =>
        import('../src/environment/config-environment')
      ).mockThrough(() => configEnvironmentStub);
      rewiremock(() => import('../src/db/db-connection')).mockThrough(name =>
        name === 'connectDB' ? dbConnectionStub : sinon.stub()
      );
    }
  );
  return mock;
};

// Tests

describe('Server bin', () => {
  afterEach(() => {
    rewiremock.forceCacheClear();
  });

  describe('start server', () => {
    beforeEach(() => {
      erroHandlerStub = sinon.stub(errorHandlerModule);
      configEnvironmentStub = sinon.stub(
        configEnvironment,
        'configEnvironment'
      );
      dbConnectionStub = sinon.stub(dbConnectionModule, 'connectDB');
    });
    afterEach(() => {
      erroHandlerStub.debug.restore();
      erroHandlerStub.uncaughtExceptionHandler.restore();
      erroHandlerStub.unhandledRejectionHandler.restore();
      configEnvironmentStub.restore();
      dbConnectionStub.restore();
    });

    it('should configure the environment', async () => {
      const serverModuleMock = await mockServerModule();
      const server = serverModuleMock.start();
      expect(configEnvironmentStub.calledOnce).to.be.true;
    });

    it('should connect with the DB', async () => {
      const serverModuleMock = await mockServerModule();
      const server = serverModuleMock.start();
      expect(dbConnectionStub.calledOnce).to.be.true;
    });

    it('should create a server', async () => {
      const serverModuleMock = await mockServerModule();
      const server = serverModuleMock.start();
      expect(server).to.be.equal(null);
    });

    it('should handle uncaught exceptions', async () => {
      const serverModuleMock = await mockServerModule();
      const server = serverModuleMock.start();
      expect(erroHandlerStub.uncaughtExceptionHandler.calledOnce).to.be.true;
    });

    it('should handle unhandled rejections', async () => {
      const serverModuleMock = await mockServerModule();
      const server = serverModuleMock.start();
      expect(erroHandlerStub.unhandledRejectionHandler.calledOnceWith(server))
        .to.be.true;
      expect(
        erroHandlerStub.unhandledRejectionHandler.getCall(0).args[0]
      ).to.be.equal(createFakeServer());
    });
  });
});
