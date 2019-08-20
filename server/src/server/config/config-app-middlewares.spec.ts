import express from 'express';
import { expect } from 'chai';
import sinon from 'sinon';
import { rewiremock } from '../../../../tests/rewiremock';
import * as useCorsMiddlewareModule from '../middlewares/cors-middleware';
import * as useHelmetMiddlewareModule from '../middlewares/helmet-middleware';
import * as useMorganMiddlewareModule from '../middlewares/morgan-middleware';
import * as useRateLimitMiddlewareModule from '../middlewares/rate-limit-middleware';
import * as useBodyParserMiddlewareModule from '../middlewares/body-parser-middleware';
import * as useUrlEncodingMiddlewareModule from '../middlewares/url-econding-middleware';
import * as useCookieParserMiddlewareModule from '../middlewares/cookie-parser-middleware';
import * as useMongoSanitizeMiddlewareModule from '../middlewares/mongo-sanitize-middleware';
import * as useXSSMiddlewareModule from '../middlewares/xss-middleware';
import * as useHppMiddlewareModule from '../middlewares/hpp-middleware';
import * as useCompressionMiddlewareModule from '../middlewares/compression-middleware';

// Vars
let useCorsMiddlewareStub: sinon.SinonStub;
let useHelmetMiddlewareStub: sinon.SinonStub;
let useMorganMiddlewareStub: sinon.SinonStub;
let useRateLimitMiddlewareStub: sinon.SinonStub;
let useBodyParserMiddlewareStub: sinon.SinonStub;
let useUrlEncodingMiddlewareStub: sinon.SinonStub;
let useCookieParserMiddlewareStub: sinon.SinonStub;
let useMongoSanitizeMiddlewareStub: sinon.SinonStub;
let useXSSMiddlewareStub: sinon.SinonStub;
let useHppMiddlewareStub: sinon.SinonStub;
let useCompressionMiddlewareStub: sinon.SinonStub;

// Functions
const mockConfigureAppMiddlewaresModule = async () => {
  const mock = await rewiremock.around(
    () => import('./config-app-middlewares'),
    () => {
      rewiremock(() => import('../middlewares/cors-middleware')).with({
        useCorsMiddleware: useCorsMiddlewareStub
      });
      rewiremock(() => import('../middlewares/helmet-middleware')).with({
        useHelmetMiddleware: useHelmetMiddlewareStub
      });
      rewiremock(() => import('../middlewares/morgan-middleware')).with({
        useMorganMiddleware: useMorganMiddlewareStub
      });
      rewiremock(() => import('../middlewares/rate-limit-middleware')).with({
        useRateLimitMiddleware: useRateLimitMiddlewareStub
      });
      rewiremock(() => import('../middlewares/body-parser-middleware')).with({
        useBodyParserMiddleware: useBodyParserMiddlewareStub
      });
      rewiremock(() => import('../middlewares/url-econding-middleware')).with({
        useUrlEncodingMiddleware: useUrlEncodingMiddlewareStub
      });
      rewiremock(() => import('../middlewares/cookie-parser-middleware')).with({
        useCookieParserMiddleware: useCookieParserMiddlewareStub
      });
      rewiremock(() => import('../middlewares/mongo-sanitize-middleware')).with(
        {
          useMongoSanitizeMiddleware: useMongoSanitizeMiddlewareStub
        }
      );
      rewiremock(() => import('../middlewares/xss-middleware')).with({
        useXSSMiddleware: useXSSMiddlewareStub
      });
      rewiremock(() => import('../middlewares/hpp-middleware')).with({
        useHppMiddleware: useHppMiddlewareStub
      });
      rewiremock(() => import('../middlewares/compression-middleware')).with({
        useCompressionMiddleware: useCompressionMiddlewareStub
      });
    }
  );
  return mock;
};

// Tests
describe('App middlewares configuration', () => {
  beforeEach(() => {
    useCorsMiddlewareStub = sinon.stub(
      useCorsMiddlewareModule,
      'useCorsMiddleware'
    );
    useHelmetMiddlewareStub = sinon.stub(
      useHelmetMiddlewareModule,
      'useHelmetMiddleware'
    );
    useMorganMiddlewareStub = sinon.stub(
      useMorganMiddlewareModule,
      'useMorganMiddleware'
    );
    useRateLimitMiddlewareStub = sinon.stub(
      useRateLimitMiddlewareModule,
      'useRateLimitMiddleware'
    );
    useBodyParserMiddlewareStub = sinon.stub(
      useBodyParserMiddlewareModule,
      'useBodyParserMiddleware'
    );
    useUrlEncodingMiddlewareStub = sinon.stub(
      useUrlEncodingMiddlewareModule,
      'useUrlEncodingMiddleware'
    );
    useCookieParserMiddlewareStub = sinon.stub(
      useCookieParserMiddlewareModule,
      'useCookieParserMiddleware'
    );
    useMongoSanitizeMiddlewareStub = sinon.stub(
      useMongoSanitizeMiddlewareModule,
      'useMongoSanitizeMiddleware'
    );
    useXSSMiddlewareStub = sinon.stub(
      useXSSMiddlewareModule,
      'useXSSMiddleware'
    );
    useHppMiddlewareStub = sinon.stub(
      useHppMiddlewareModule,
      'useHppMiddleware'
    );
    useCompressionMiddlewareStub = sinon.stub(
      useCompressionMiddlewareModule,
      'useCompressionMiddleware'
    );
  });
  afterEach(() => {
    rewiremock.forceCacheClear();
    useCorsMiddlewareStub.restore();
    useHelmetMiddlewareStub.restore();
    useMorganMiddlewareStub.restore();
    useRateLimitMiddlewareStub.restore();
    useBodyParserMiddlewareStub.restore();
    useUrlEncodingMiddlewareStub.restore();
    useCookieParserMiddlewareStub.restore();
    useMongoSanitizeMiddlewareStub.restore();
    useXSSMiddlewareStub.restore();
    useHppMiddlewareStub.restore();
    useCompressionMiddlewareStub.restore();
  });

  const app: express.Application = null;

  it('should use cors middleware', async () => {
    const configureAppMiddlewaresModuleMock = await mockConfigureAppMiddlewaresModule();
    configureAppMiddlewaresModuleMock.configExpressAppMiddlewares(app);
    expect(useCorsMiddlewareStub.calledOnce).to.be.true;
  });

  it('should use helmet middleware', async () => {
    const configureAppMiddlewaresModuleMock = await mockConfigureAppMiddlewaresModule();
    configureAppMiddlewaresModuleMock.configExpressAppMiddlewares(app);
    expect(useHelmetMiddlewareStub.calledOnce).to.be.true;
  });

  it('should use morgan middleware', async () => {
    const configureAppMiddlewaresModuleMock = await mockConfigureAppMiddlewaresModule();
    configureAppMiddlewaresModuleMock.configExpressAppMiddlewares(app);
    expect(useMorganMiddlewareStub.calledOnce).to.be.true;
  });

  it('should use rate limit middleware', async () => {
    const configureAppMiddlewaresModuleMock = await mockConfigureAppMiddlewaresModule();
    configureAppMiddlewaresModuleMock.configExpressAppMiddlewares(app);
    expect(useRateLimitMiddlewareStub.calledOnce).to.be.true;
  });

  it('should use body parser middleware', async () => {
    const configureAppMiddlewaresModuleMock = await mockConfigureAppMiddlewaresModule();
    configureAppMiddlewaresModuleMock.configExpressAppMiddlewares(app);
    expect(useBodyParserMiddlewareStub.calledOnce).to.be.true;
  });

  it('should use url encoding middleware', async () => {
    const configureAppMiddlewaresModuleMock = await mockConfigureAppMiddlewaresModule();
    configureAppMiddlewaresModuleMock.configExpressAppMiddlewares(app);
    expect(useUrlEncodingMiddlewareStub.calledOnce).to.be.true;
  });

  it('should use cookie parser middleware', async () => {
    const configureAppMiddlewaresModuleMock = await mockConfigureAppMiddlewaresModule();
    configureAppMiddlewaresModuleMock.configExpressAppMiddlewares(app);
    expect(useCookieParserMiddlewareStub.calledOnce).to.be.true;
  });

  it('should use mongo sanitize middleware', async () => {
    const configureAppMiddlewaresModuleMock = await mockConfigureAppMiddlewaresModule();
    configureAppMiddlewaresModuleMock.configExpressAppMiddlewares(app);
    expect(useMongoSanitizeMiddlewareStub.calledOnce).to.be.true;
  });

  it('should use xss middleware', async () => {
    const configureAppMiddlewaresModuleMock = await mockConfigureAppMiddlewaresModule();
    configureAppMiddlewaresModuleMock.configExpressAppMiddlewares(app);
    expect(useXSSMiddlewareStub.calledOnce).to.be.true;
  });

  it('should use hpp middleware', async () => {
    const configureAppMiddlewaresModuleMock = await mockConfigureAppMiddlewaresModule();
    configureAppMiddlewaresModuleMock.configExpressAppMiddlewares(app);
    expect(useHppMiddlewareStub.calledOnce).to.be.true;
  });

  it('should use compression middleware', async () => {
    const configureAppMiddlewaresModuleMock = await mockConfigureAppMiddlewaresModule();
    configureAppMiddlewaresModuleMock.configExpressAppMiddlewares(app);
    expect(useCompressionMiddlewareStub.calledOnce).to.be.true;
  });
});
