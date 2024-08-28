import $env from '@cfg/config.js';
import { sign, verify } from 'hono/jwt';
import { JwtTokenExpired } from 'hono/utils/jwt/types';
import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import $prisma from '@db/prisma.js';
import { TokenSubject } from '@prisma/client';

export type TokenPayload<T extends object = object> = {
  sub: TokenSubject;
  userId: string;
  exp: Date;
  nbf?: Date;
  iat?: Date;
} & T;

export function getDateAfterDays(days: number): Date {
  const initialDate = new Date();
  const resultDate = new Date(initialDate);

  resultDate.setDate(initialDate.getDate() + days);

  return resultDate;
}

const createToken = async (payload: TokenPayload): Promise<string> => {
  const { userId, sub, exp } = payload;

  await $prisma.token.deleteMany({
    where: {
      userId,
      subject: sub,
    },
  });

  const value = await sign(payload, $env('API_SECRET'), 'HS256');

  const token = await $prisma.token.create({
    data: {
      userId,
      value,
      subject: sub,
      expiresAt: exp,
    },
  });

  return token.value;
};

const verifyToken = async <T extends object = object>(token: string): Promise<TokenPayload<T>> => {
  let payload: TokenPayload<T>;

  try {
    payload = (await verify(token, $env('API_SECRET'), 'HS256')) as TokenPayload<T>;
  } catch (error) {
    if (error instanceof JwtTokenExpired) {
      throw $error(httpStatus.UNAUTHORIZED, 'Token expired');
    }

    throw $error(httpStatus.UNAUTHORIZED, 'Invalid token');
  }

  const { userId, sub } = payload;

  const exists = await $prisma.token.findFirst({
    where: { userId, subject: sub, value: token, expiresAt: { gte: new Date() } },
  });
  if (!exists) {
    throw $error(httpStatus.UNAUTHORIZED, 'Token expired');
  }

  if (exists.expiresAt && new Date(exists.expiresAt) < new Date()) {
    throw $error(httpStatus.UNAUTHORIZED, 'Token expired');
  }

  return payload;
};

const $jwt = { verifyToken, createToken };

export default $jwt;
