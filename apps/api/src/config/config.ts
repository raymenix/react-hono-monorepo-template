import { ApiError } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import type { EnvConfig } from '@shared/config.js';

const $env = <K extends keyof EnvConfig>(key: K): EnvConfig[K] => {
  const value = process.env[key];

  if (typeof value !== 'string') {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `❌ Env variable "${key}" is not found `);
  }

  return value as EnvConfig[K];
};

export default $env;
