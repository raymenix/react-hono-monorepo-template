import jsCookie from 'js-cookie';

export const tokenKeys = {
  auth: `${import.meta.env.API_URL}-token`,
};

export type TokenKey = (typeof tokenKeys)[keyof typeof tokenKeys];

const $token = {
  set: (key: TokenKey, value: string) => jsCookie.set(key, value),
  reset: (key: TokenKey) => jsCookie.remove(key),
  get: (key: TokenKey) => jsCookie.get(key),
};

export default $token;
