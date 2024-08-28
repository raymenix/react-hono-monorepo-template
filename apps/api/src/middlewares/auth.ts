import { ApiError } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { User } from '@prisma/client';

import { MiddlewareHandler } from 'hono';

export type AuthContextData = {
  user: User;
};

export type AuthMiddleware = MiddlewareHandler<{ Bindings: undefined; Variables: AuthContextData }, '/:userId'>;

const authMiddleware: AuthMiddleware = async (ctx, next) => {
  const user = ctx.get('user');

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to perform such action');
  }

  await next();
};

export default authMiddleware;
