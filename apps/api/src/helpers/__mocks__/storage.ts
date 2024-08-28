import Storage from '@helpers/storage.js';
import { beforeEach } from 'vitest';
import { mockReset, mockDeep } from 'vitest-mock-extended';

beforeEach(() => {
  mockReset($file);
});

const $file = mockDeep<typeof Storage>();

export default $file;
