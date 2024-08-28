import { MiddlewareHandler } from 'hono';
import { AUTHORIZATION, AUTHORIZATION_BEARER } from '@const/index.js';
import $jwt from '@helpers/jwt.js';
import { User } from '@prisma/client';
import $prisma from '@db/prisma.js';

export type UserContextData = {
  user?: User;
};

export type MiddlewareFn = MiddlewareHandler<{ Bindings: undefined; Variables: UserContextData }>;

const userMiddleware: MiddlewareFn = async (ctx, next) => {
  const bearer = ctx.req.header(AUTHORIZATION);

  // extract token
  if (bearer && bearer.startsWith(AUTHORIZATION_BEARER)) {
    const token = bearer.substring(AUTHORIZATION_BEARER.length + 1);

    // verify token
    try {
      const { userId } = await $jwt.verifyToken(token);

      const user = await $prisma.user.findFirst({ where: { id: userId } });

      if (user) {
        ctx.set('user', user);
      }
    } catch (e) {
      // we continue without setting user
    }
  }

  // TODO: extract i18n language

  await next();
};

export default userMiddleware;
