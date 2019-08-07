/* import chai from 'chai';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { ServerApp } from '../../server/src/app';
import {
  TestConstants,
  HttpMethod,
  checkMethodRouteHandlerName
} from '../test-utilities';
import * as handlerFactoryModule from '../../server/src/controllers/handler-factory';
import * as skillController from '../../server/src/controllers/skill-controller';
import { Skill } from '../../server/src/models/skill-model';

describe('Skill controller', () => {
  let app: any;
  before(() => {
    app = ServerApp.bootstrap().getApp();
  });

  describe('handler factory', () => {
    it('should be used for getting all skills', () => {
      const stub = ImportMock.mockFunction(
        handlerFactoryModule,
        'getAll',
        true
      );
      skillController.getAllSkills({} as any, {} as any, {} as any);
      chai.assert(
        stub.calledOnceWith(),
        'Handler factory function for getting all skills not called'
      );
      chai.assert(
        stub.calledOnceWith(Skill),
        'Handler factory function for getting all skills called with wrong Model'
      );
    });

    it('should be used for creating a skill', () => {
      const stub = ImportMock.mockFunction(
        handlerFactoryModule,
        'createOne',
        true
      );
      skillController.createSkill({} as any, {} as any, {} as any);
      chai.assert(
        stub.calledOnce,
        'Handler factory function for creating a skill not called'
      );
      chai.assert(
        stub.calledOnceWith(Skill),
        'Handler factory function for creating a skill called with wrong Model'
      );
    });

    it('should be used for getting a skill', () => {
      const stub = ImportMock.mockFunction(
        handlerFactoryModule,
        'getOne',
        true
      );
      skillController.getSkill({} as any, {} as any, {} as any);
      chai.assert(
        stub.calledOnce,
        'Handler factory function for getting a skill not called'
      );
      chai.assert(
        stub.calledOnceWith(Skill),
        'Handler factory function for getting a skill called with wrong Model'
      );
    });

    it('should be used for updating a skill', () => {
      const stub = ImportMock.mockFunction(
        handlerFactoryModule,
        'updateOne',
        true
      );
      skillController.updateSkill({} as any, {} as any, {} as any);
      chai.assert(
        stub.calledOnce,
        'Handler factory function for updating a skill not called'
      );
      chai.assert(
        stub.calledOnceWith(Skill),
        'Handler factory function for updating a skill called with wrong Model'
      );
    });

    it('should be used for deleting a skill', () => {
      const stub = ImportMock.mockFunction(
        handlerFactoryModule,
        'deleteOne',
        true
      );
      skillController.deleteSkill({} as any, {} as any, {} as any);
      chai.assert(
        stub.calledOnce,
        'Handler factory function for deleting a skill not called'
      );
      chai.assert(
        stub.calledOnceWith(Skill),
        'Handler factory function for deleting a skill called with wrong Model'
      );
    });
  });
});
 */
