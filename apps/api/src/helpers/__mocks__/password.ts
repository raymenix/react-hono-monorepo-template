import Password from '../password.js';
import { beforeEach } from 'vitest';
import { mockReset, mockDeep } from 'vitest-mock-extended';

beforeEach(() => {
  mockReset($password);
});

const $password = mockDeep<typeof Password>();

export default $password;
