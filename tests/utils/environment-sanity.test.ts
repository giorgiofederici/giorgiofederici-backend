/* import { environmentSanityCheck } from '../../server/src/utils/environment-sanity';

describe('environment sanity check', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // this is important - it clears the cache
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  describe('for mongodb uri', () => {
    test('exit the process for missing database uri env variable', () => {
      expect(environmentSanityCheck).toThrowError(
        'No mongo connection string. Set MONGODB_URI environment variable.'
      );
    });

    test('proceed for available database uri env variable', () => {
      process.env['DATABASE_URI'] = 'mongodb://just-a-test';
      expect(environmentSanityCheck).not.toThrowError(
        'No mongo connection string. Set MONGODB_URI environment variable.'
      );
    });
  });
});
 */
