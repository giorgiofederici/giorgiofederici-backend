/* import express from 'express';
import chai from 'chai';
import sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { ServerApp } from '../../server/src/app';
import { skillRouter } from '../../server/src/routes/skill-routes';
import * as skillControllerModule from '../../server/src/controllers/skill-controller';
import {
  TestConstants,
  HttpMethod,
  checkMethodRoute,
  fakeRequestHandler,
  checkMethodRouteHandlerName
} from '../test-utilities';

describe('Skill routes', () => {
  let app: any;
  let getAllSkillsStub: sinon.SinonStub<any[], any>;
  let createSkillStub: sinon.SinonStub<any[], any>;
  let getSkillStub: sinon.SinonStub<any[], any>;
  let updateSkillStub: sinon.SinonStub<any[], any>;
  let deleteSkillStub: sinon.SinonStub<any[], any>;

  before(() => {
    app = ServerApp.bootstrap().getApp();
    getAllSkillsStub = ImportMock.mockFunction(
      skillControllerModule,
      'getAllSkills',
      fakeRequestHandler
    );
    createSkillStub = ImportMock.mockFunction(
      skillControllerModule,
      'createSkill',
      fakeRequestHandler
    );
    getSkillStub = ImportMock.mockFunction(
      skillControllerModule,
      'getSkill',
      fakeRequestHandler
    );
    updateSkillStub = ImportMock.mockFunction(
      skillControllerModule,
      'updateSkill',
      fakeRequestHandler
    );
    deleteSkillStub = ImportMock.mockFunction(
      skillControllerModule,
      'deleteSkill',
      fakeRequestHandler
    );
  });

  after(() => {
    getAllSkillsStub.restore();
    createSkillStub.restore();
    getSkillStub.restore();
    updateSkillStub.restore();
    deleteSkillStub.restore();
  });

  describe('GET [/api/v1/skills/]', () => {
    it('should have a route for getting all skills', () => {
      chai.expect(
        checkMethodRoute(app, TestConstants.SKILLS_REGEXP, HttpMethod.GET, '/')
      ).true;
    });

    it('should call skill conroller get all function', done => {
      skillRouter['handle']({ url: '/', method: 'GET' });
      console.log(getAllSkillsStub);
      if (
        !getAllSkillsStub.returnValues ||
        !(getAllSkillsStub.returnValues[0] instanceof Function)
      ) {
        done(new Error('Wrong function called as handler request!'));
      }
      // The returned value is the fakeRequestHandler
      getAllSkillsStub.returnValues[0]({}, {}, done, getAllSkillsStub);
    });
  });

  describe('POST [/api/v1/skills/]', () => {
    it('should have a route for creating a skill', () => {
      chai.expect(
        checkMethodRoute(app, TestConstants.SKILLS_REGEXP, HttpMethod.POST, '/')
      ).true;
    });

    it('should call its create skill function', done => {
      skillRouter['handle']({ url: '/', method: 'POST' });
      if (
        !createSkillStub.returnValues ||
        !(createSkillStub.returnValues[0] instanceof Function)
      ) {
        done(new Error('Wrong function called as handler request!'));
      }
      // The returned value is the fakeRequestHandler
      createSkillStub.returnValues[0]({}, {}, done, createSkillStub);
    });
  });

  describe('GET [/api/v1/skills/:id]', () => {
    it('should have a route for getting a specific skill', () => {
      chai.expect(
        checkMethodRoute(
          app,
          TestConstants.SKILLS_REGEXP,
          HttpMethod.GET,
          '/:id'
        )
      ).true;
    });

    it('should call its get skill function', done => {
      skillRouter['handle']({ url: '/:id', method: 'GET' });
      if (
        !getSkillStub.returnValues ||
        !(getSkillStub.returnValues[0] instanceof Function)
      ) {
        done(new Error('Wrong function called as handler request!'));
      }
      // The returned value is the fakeRequestHandler
      getSkillStub.returnValues[0]({}, {}, done, getSkillStub);
    });
  });

  describe('PATCH [/api/v1/skills/:id]', () => {
    it('should have a route for updating a specific skill', () => {
      chai.expect(
        checkMethodRoute(
          app,
          TestConstants.SKILLS_REGEXP,
          HttpMethod.PATCH,
          '/:id'
        )
      ).true;
    });

    it('should call its update skill function', done => {
      skillRouter['handle']({ url: '/:id', method: 'PATCH' });
      if (
        !updateSkillStub.returnValues ||
        !(updateSkillStub.returnValues[0] instanceof Function)
      ) {
        done(new Error('Wrong function called as handler request!'));
      }
      // The returned value is the fakeRequestHandler
      updateSkillStub.returnValues[0]({}, {}, done, updateSkillStub);
    });
  });

  describe('DELETE [/api/v1/skills/:id]', () => {
    it('should have a route for deleting a specific skill - ', () => {
      chai.expect(
        checkMethodRoute(
          app,
          TestConstants.SKILLS_REGEXP,
          HttpMethod.DELETE,
          '/:id'
        )
      ).true;
    });

    it('should call its delete skill function', done => {
      skillRouter['handle']({ url: '/:id', method: 'DELETE' });
      if (
        !deleteSkillStub.returnValues ||
        !(deleteSkillStub.returnValues[0] instanceof Function)
      ) {
        done(new Error('Wrong function called as handler request!'));
      }
      // The returned value is the fakeRequestHandler
      deleteSkillStub.returnValues[0]({}, {}, done, deleteSkillStub);
    });
  });
});
 */
