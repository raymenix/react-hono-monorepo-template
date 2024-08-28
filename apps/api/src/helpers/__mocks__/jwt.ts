import JWT from '../jwt.js';
import { beforeEach } from 'vitest';
import { mockReset, mockDeep } from 'vitest-mock-extended';

beforeEach(() => {
  mockReset($jwt);
});

const $jwt = mockDeep<typeof JWT>();

export default $jwt;
