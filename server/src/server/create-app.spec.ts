/* import { expect } from 'chai';
import { rewiremock } from '../../../tests/rewiremock';

describe('Create express app', () => {
  afterEach(() => {
    rewiremock.forceCacheClear();
  });
  it('should initialize the express app', async () => {
    const createAppModuleMock = await rewiremock.around(
      () => import('./create-app'),
      () => {
        rewiremock(() => import('express'))
          .nonStrict()
          .withDefault(() => 'mocked');
      }
    );
    const app = createAppModuleMock.createExpressApp();
    expect(app).to.be.equal('mocked');
  });
}); */
