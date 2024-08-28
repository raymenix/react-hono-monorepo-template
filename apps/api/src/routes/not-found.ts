import { $error } from '@helpers/errors.js';
import { $transformError } from '@helpers/request.js';
import httpStatus from '@helpers/status.js';
import { Hono } from 'hono';

const notFound = new Hono().all('*', ctx => {
  const json = $transformError($error(httpStatus.NOT_FOUND, 'Endpoint not found'));

  return ctx.json(json, httpStatus.NOT_FOUND);
});

export default notFound;
