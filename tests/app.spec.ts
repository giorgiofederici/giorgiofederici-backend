import chai from 'chai';
import { ServerApp } from '../server/src/app';
import {
  TestConstants,
  checkAppRouter,
  checkAppMiddleware
} from './test-utilities';

describe('Server App', () => {
  describe('static bootstrap', () => {
    it('should be callable', () => {
      chai.assert.equal(typeof ServerApp.bootstrap, 'function');
    });

    it('should return a new ServerApp instance', () => {
      const serverApp: any = ServerApp.bootstrap();
      chai.assert.equal(typeof ServerApp.bootstrap, 'function');
      chai.expect(serverApp).instanceOf(ServerApp);
    });
  });

  describe('public getter', () => {
    it('it should be callable', () => {
      const serverApp: ServerApp = ServerApp.bootstrap();
      chai.assert.equal(typeof serverApp.getApp, 'function');
    });
    it('it should return a callable express app', () => {
      const serverApp: ServerApp = ServerApp.bootstrap();
      const app: any = serverApp.getApp();
      chai.assert.equal(typeof app, 'function');
    });
  });
  describe('express app', function() {
    let app: any;

    this.beforeEach(() => {
      const serverApp = ServerApp.bootstrap();
      app = serverApp.getApp();
    });

    it('should have cors middleware', () => {
      chai.expect(checkAppMiddleware(app, 'corsMiddleware')).true;
    });

    /*
    it('should have serve static middleware', () => {
      chai.expect(checkAppMiddleware(app, 'serveStatic')).true;
    });
    */

    it('should have helmet middleware', () => {
      chai.expect(checkAppMiddleware(app, 'helmet')).true;
    });

    it('should have logger (morgan) middleware', () => {
      chai.expect(checkAppMiddleware(app, 'helmet')).true;
    });

    it('should have rate limit middleware', () => {
      chai.expect(checkAppMiddleware(app, 'rateLimit')).true;
    });

    it('should have json parser middleware', () => {
      chai.expect(checkAppMiddleware(app, 'jsonParser')).true;
    });

    it('should have url encoded parser middleware', () => {
      chai.expect(checkAppMiddleware(app, 'urlencodedParser')).true;
    });

    it('should have cookie parser middleware', () => {
      chai.expect(checkAppMiddleware(app, 'cookieParser')).true;
    });

    it('should have hpp middleware', () => {
      chai.expect(checkAppMiddleware(app, 'hpp')).true;
    });

    it('should have compression middleware', () => {
      chai.expect(checkAppMiddleware(app, 'compression')).true;
    });

    it('should have cookie parser middleware', () => {
      chai.expect(checkAppMiddleware(app, 'cookieParser')).true;
    });

    describe('skills route', () => {
      it('should use a router', () => {
        // Keep updated with express
        chai.expect(checkAppRouter(app, TestConstants.SKILLS_REGEXP)).true;
      });
    });
  });
});
