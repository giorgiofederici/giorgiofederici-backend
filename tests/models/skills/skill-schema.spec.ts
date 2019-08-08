import { expect } from 'chai';
import { Skill } from '../../../server/src/models/skill-model';

describe('Skill model', () => {
  describe('name', () => {
    it('should be invalid if name is empty', done => {
      const skill = new Skill();
      skill.validate(err => {
        expect(err.errors.name).to.exist;
        expect(err.errors.name.message).to.equal('A skill must have a name.');
        done();
      });
    });

    it('should be invalid if name is empty string', done => {
      const skill = new Skill({ name: '' });
      skill.validate(err => {
        expect(err.errors.name).to.exist;
        expect(err.errors.name.message).to.equal('A skill must have a name.');
        done();
      });
    });

    it('should be valid if name is a string', done => {
      const skill = new Skill({ name: 'Giorgi Federici' });
      skill.validate(err => {
        expect(err.errors.name).to.not.exist;
        done();
      });
    });
  });

  describe('type', () => {
    it('should be invalid if type is empty', done => {
      const skill = new Skill();
      skill.validate(err => {
        expect(err.errors.type).to.exist;
        expect(err.errors.type.message).to.equal('A skill must have a type.');
        done();
      });
    });

    it('should be invalid if type is empty string', done => {
      const skill = new Skill({ type: '' });
      skill.validate(err => {
        expect(err.errors.type).to.exist;
        expect(err.errors.type.message).to.equal('A skill must have a type.');
        done();
      });
    });

    it('should be invalid if type is not it or soft', done => {
      const skill = new Skill({ type: 'randomType' });
      skill.validate(err => {
        expect(err.errors.type).to.exist;
        expect(err.errors.type.message).to.equal(
          'A skill type is either: it or soft.'
        );
        done();
      });
    });

    it('should be valid if type is <it>', done => {
      const skill = new Skill({ type: 'it' });
      skill.validate(err => {
        expect(err.errors.type).to.not.exist;
        done();
      });
    });

    it('should be valid if type is <soft>', done => {
      const skill = new Skill({ type: 'soft' });
      skill.validate(err => {
        expect(err.errors.type).to.not.exist;
        done();
      });
    });
  });
});
