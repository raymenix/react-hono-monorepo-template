import { $logger } from '@helpers/logger.js';
import { $transformError } from '@helpers/request.js';
import { HttpStatus } from '@helpers/status.js';
import { ErrorHandler } from 'hono';

const errorHandler: ErrorHandler = (err, ctx) => {
  $logger.error(err, 'An error occured :');

  const e = $transformError(err);

  return ctx.json(e, e.status as HttpStatus);
};

export default errorHandler;
