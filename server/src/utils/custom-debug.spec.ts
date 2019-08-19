import { expect } from 'chai';
import sinon from 'sinon';
import { debug } from 'debug';
import { rewiremock } from '../../../tests/rewiremock';

describe('Custom debug utility', () => {
  let stub: any;
  let stub1: any;

  beforeEach(() => {
    stub1 = sinon.stub().returns('gf:mockedFilename mockedMsg');
    stub = sinon.stub().returns(stub1);
  });
  afterEach(() => {
    rewiremock.forceCacheClear();
  });

  it('should wrap the debug library using with the right filename', async () => {
    const cDebugMock = await rewiremock.around(
      () => import('./custom-debug'),
      () => {
        rewiremock(() => import('debug')).with({
          debug: stub
        });
      }
    );
    cDebugMock.cDebug('mockedFilename', 'mockedMsg');
    expect(stub.calledOnce).to.be.true;
    expect(stub.getCall(0).args[0]).to.equal('gf:mockedFilename');
    expect(stub1.getCall(0).args[0]).to.equal('mockedMsg');
  });
});
