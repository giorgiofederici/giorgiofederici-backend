/* import chai from 'chai';
import sinon from 'sinon';
import { Skill } from '../../../server/src/models/skill-model';

describe('Get all skills', () => {
  // Test will pass if we get all skills
  it('should return all skills', done => {
    const SkillMock = sinon.mock(Skill);
    const expectedResult: any = { status: true, skill: [] };
    SkillMock.expects('find').yields(null, expectedResult);
    Skill.find((err, result: any) => {
      SkillMock.verify();
      SkillMock.restore();
      chai.expect(result.status).to.be.true;
      done();
    });
  });
}); */
