import { expect } from 'chai';
import sinon from 'sinon';
import { rewiremock } from '../../../tests/rewiremock';

describe('Create server', () => {
  afterEach(() => {
    rewiremock.forceCacheClear();
  });

  it('should use default port when env var not defined', async () => {
    const createServerModuleMock = await rewiremock.around(
      () => import('./create-server'),
      () => {}
    );
    expect(createServerModuleMock.port).to.be.equal(3000);
  });

  it('should use env var port when defined', async () => {
    process.env.BACKEND_PORT = '1234';
    const createServerModuleMock = await rewiremock.around(
      () => import('./create-server'),
      () => {}
    );
    expect(createServerModuleMock.port).to.be.equal('1234');
    delete process.env.BACKEND_PORT;
  });

  it('should have a debug logger', async () => {
    const createServerModuleMock = await rewiremock.around(
      () => import('./create-server'),
      () => {
        rewiremock(() => import('../utils/custom-debug'))
          .nonStrict()
          .with({
            cDebug: (filename: string, msg: string) => {
              return `${filename} ${msg}`;
            }
          });
      }
    );

    expect(createServerModuleMock.debug('debugMock')).to.be.equal(
      `${__filename.replace('spec.', '')} debugMock`
    );
  });

  describe('in development', () => {
    it('should create a live server from an Express App', async () => {
      process.env.NODE_ENV = 'development';
      const createServerModuleMock = await rewiremock.around(
        () => import('./create-server'),
        () => {
          rewiremock(() => import('./create-app'))
            .nonStrict()
            .with({
              createExpressApp: () => {
                return {
                  listen: (port: number, cb: Function) => {
                    cb();
                    return port;
                  }
                };
              }
            });
        }
      );
      const stub = sinon.stub(createServerModuleMock, 'debug');
      expect(createServerModuleMock.createServer()).to.be.equal(
        createServerModuleMock.port
      );

      expect(stub.calledOnce).to.be.true;
      expect(stub.getCall(0).args[0]).to.be.equal(
        'Server running on port 3000...'
      );
    });
  });

  describe('in production', () => {
    it('should create an HTTPS live server', async () => {
      process.env.NODE_ENV = 'production';
      process.env.BACKEND_PORT = '1234';
      const createServerModuleMock = await rewiremock.around(
        () => import('./create-server'),
        () => {
          rewiremock(() => import('./create-https-server'))
            .nonStrict()
            .with({
              createHttpsServer: () => {
                return {
                  listen: (port: number, cb: Function) => {
                    cb();
                    return port;
                  }
                };
              }
            });
        }
      );
      const stub = sinon.stub(createServerModuleMock, 'debug');
      expect(createServerModuleMock.createServer()).to.be.equal(
        createServerModuleMock.port
      );
      expect(stub.calledOnce).to.be.true;
      expect(stub.getCall(0).args[0]).to.be.equal(
        'Server running on port 1234...'
      );
      delete process.env.BACKEND_PORT;
    });
  });
});
