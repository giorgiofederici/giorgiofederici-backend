import sinon from 'sinon';

export const stubFactory = (name: string) => (nameToStub: string, stub: any) =>
  name === nameToStub ? stub : sinon.stub();
