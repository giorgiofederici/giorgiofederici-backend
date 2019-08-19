import { expect } from 'chai';
import sinon from 'sinon';
import { rewiremock } from '../../../tests/rewiremock';
import * as configAppMiddlewaresModule from './config-app-middlewares';
import * as configAppRoutesModule from './config-app-routes';
import * as configAppGlobalErrorMiddlewareModule from './config-app-global-error-middleware';

// Vars
let configAppMiddlewaresStub: sinon.SinonStub;
let configAppRoutesStub: sinon.SinonStub;
let configAppGlobalErrorMiddlewareStub: sinon.SinonStub;

// Functions
const mockCreateAppModule = async () => {
  const mock = await rewiremock.around(
    () => import('./create-app'),
    () => {
      rewiremock(() => import('express'))
        .nonStrict()
        .withDefault(() => 'mocked');

      rewiremock(() => import('./config-app-middlewares')).with({
        configExpressAppMiddlewares: configAppMiddlewaresStub
      });
      rewiremock(() => import('./config-app-routes')).with({
        configExpressAppRoutes: configAppRoutesStub
      });
      rewiremock(() => import('./config-app-global-error-middleware')).with({
        configExpressAppGlobalErrorMiddleware: configAppGlobalErrorMiddlewareStub
      });
    }
  );
  return mock;
};

describe('Create express app', () => {
  beforeEach(() => {
    configAppMiddlewaresStub = sinon.stub(
      configAppMiddlewaresModule,
      'configExpressAppMiddlewares'
    );
    configAppRoutesStub = sinon.stub(
      configAppRoutesModule,
      'configExpressAppRoutes'
    );
    configAppGlobalErrorMiddlewareStub = sinon.stub(
      configAppGlobalErrorMiddlewareModule,
      'configExpressAppGlobalErrorMiddleware'
    );
  });
  afterEach(() => {
    rewiremock.forceCacheClear();
    configAppMiddlewaresStub.restore();
    configAppRoutesStub.restore();
    configAppGlobalErrorMiddlewareStub.restore();
  });

  it('should initialize the express app', async () => {
    const createAppModuleMock = await mockCreateAppModule();
    const app = createAppModuleMock.createExpressApp();
    expect(app).to.be.equal('mocked');
  });

  it('should configure the express app middlewares', async () => {
    const createAppModuleMock = await mockCreateAppModule();
    createAppModuleMock.createExpressApp();
    expect(configAppMiddlewaresStub.calledOnce).to.be.true;
  });

  it('should configure the express app routes', async () => {
    const createAppModuleMock = await mockCreateAppModule();
    createAppModuleMock.createExpressApp();
    expect(configAppRoutesStub.calledOnce).to.be.true;
  });

  it('should configure the express app global error handler middleware', async () => {
    const createAppModuleMock = await mockCreateAppModule();
    createAppModuleMock.createExpressApp();
    expect(configAppGlobalErrorMiddlewareStub.calledOnce).to.be.true;
  });
});
