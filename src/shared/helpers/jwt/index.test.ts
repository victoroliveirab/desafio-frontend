import sampleJwt from '__mocks__/jwt';
import { headerFromJwt, userFromJwt } from '.';

describe('Helpers: JWT', () => {
  it('should decode jwt header', () => {
    const decodedHeader = headerFromJwt(sampleJwt);
    expect(decodedHeader).toStrictEqual({
      alg: 'RS256',
      kid: '729189450d49028570425266f03e737f45af2932',
      typ: 'JWT',
    });
  });
  it('should decode jwt user', () => {
    const decodedUser = userFromJwt(sampleJwt);
    expect(decodedUser.name).toBe('VICTOR OLIVEIRA BARBOSA');
  });
});
