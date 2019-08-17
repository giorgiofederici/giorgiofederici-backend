import { expect } from 'chai';
import { rewiremock } from '../../../tests/rewiremock';

describe('Create SSL options', () => {
  afterEach(() => {
    rewiremock.forceCacheClear();
  });
  it('should create ssl options for HTTPS server', async () => {
    process.env.SSL_KEY_PATH = 'keyPath';
    process.env.SSL_CERT_PATH = 'certPath';

    const createSSLOptionModuleMock = await rewiremock.around(
      () => import('./create-ssl-options'),
      mock => {
        mock(() => import('fs')).with({
          readFileSync: (path: string) => path as any
        });
      }
    );
    const sslOptions = createSSLOptionModuleMock.createSSLOptions();
    expect(sslOptions).to.deep.equal({
      key: 'keyPath',
      cert: 'certPath'
    });
  });
});
