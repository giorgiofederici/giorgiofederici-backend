import { expect } from 'chai';
import sinon from 'sinon';
import { rewiremock } from '../../../tests/rewiremock';
import * as customDebugModule from '../utils/custom-debug';

// Vars
let debugStub: sinon.SinonStub;

// Functions
const fakeDBConnection = (uri: string, opts: any) => {
  return { uri, opts };
};

const mockDBConnectionModule = async () => {
  const mock = await rewiremock.around(
    () => import('./db-connection'),
    () => {
      rewiremock(() => import('mongoose'))
        .nonStrict()
        .with({ connect: fakeDBConnection });
      rewiremock(() => import('../utils/custom-debug')).with({
        cDebug: debugStub
      });
    }
  );
  return mock;
};

describe('DB Connection', () => {
  beforeEach(() => {
    process.env.DATABASE_URI = 'http://fakehost-fakeUser@<PASSWORD>';
    process.env.DATABASE_PASSWORD = 'fakePassword';
    debugStub = sinon.stub(customDebugModule, 'cDebug');
  });
  afterEach(() => {
    rewiremock.forceCacheClear();
    delete process.env.DATABASE_URI;
    delete process.env.DATABASE_PASSWORD;
    debugStub.restore();
  });
  describe('debug', () => {
    it('should use the custom debugger', async () => {
      const dBConnectionModuleMock = await mockDBConnectionModule();
      dBConnectionModuleMock.debug('logMessage');
      expect(debugStub.calledOnce).to.be.true;
      expect(debugStub.getCall(0).args[0]).to.be.equal(
        __filename.replace('.spec', '')
      );
      expect(debugStub.getCall(0).args[1]).to.be.equal('logMessage');
    });
  });
  describe('finalize db uri', () => {
    it('should replace the password placeholder from the connection string', async () => {
      const mock = await rewiremock.around(
        () => import('./db-connection'),
        () => {}
      );
      const dbURI = mock.finalizeConnectionURI('<PASSWORD>');
      expect(dbURI).to.be.equal('http://fakehost-fakeUser@fakePassword');
    });
  });
  describe('connect DB', () => {
    it('should finalize the db uri', async () => {
      const dBConnectionModuleMock = await mockDBConnectionModule();
      const spy = sinon.spy(dBConnectionModuleMock, 'finalizeConnectionURI');
      await dBConnectionModuleMock.connectDB();
      expect(spy.calledOnce).to.be.true;
      expect(spy.getCall(0).args[0]).to.be.equal('<PASSWORD>');
      expect(spy.getCall(0).returnValue).to.be.equal(
        'http://fakehost-fakeUser@fakePassword'
      );
      spy.restore();
    });

    it('should create a mongoose connection', async () => {
      const dBConnectionModuleMock = await mockDBConnectionModule();
      const connection = await dBConnectionModuleMock.connectDB();
      expect(connection['uri']).to.be.equal(
        'http://fakehost-fakeUser@fakePassword'
      );
      expect(connection['opts']).to.deep.equal({
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
    });

    it('should log a successful message', async () => {
      const dBConnectionModuleMock = await mockDBConnectionModule();
      const spy = sinon.spy(dBConnectionModuleMock, 'debug');
      await dBConnectionModuleMock.connectDB();
      expect(spy.calledOnce).to.be.true;
      expect(spy.getCall(0).args[0]).to.be.equal('DB connection successful!');
      spy.restore();
    });
  });
});
