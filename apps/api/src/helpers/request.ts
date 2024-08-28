import type {
  ApiMessage,
  FailedResponse,
  SearchQueryOptions,
  SortDirection,
  SortType,
  SuccessResponse,
} from '@shared/request.js';
import { ApiError } from './errors.js';
import httpStatus from './status.js';
import { ZodError } from 'zod';
import { Arrayable } from 'vitest';

export const $success = <T = unknown>(
  data: T,
  message?: Arrayable<string | ApiMessage>,
  status: number = httpStatus.OK,
): SuccessResponse<T> => {
  const msg: Array<ApiMessage> = [];

  if (message) {
    if (typeof message === 'string') {
      msg.push({ code: message });
    } else if ('code' in message) {
      msg.push(message);
    } else if (Array.isArray(message)) {
      msg.push(
        ...message.map(it => {
          if (typeof it === 'string') {
            return { code: it };
          } else {
            return it;
          }
        }),
      );
    }
  }

  return { data, ok: true, message: msg, status };
};

export const $transformError = (err: Error): FailedResponse => {
  const obj: FailedResponse = {
    ok: false,
    status: httpStatus.INTERNAL_SERVER_ERROR,
    error: err,
    message: [],
  };

  if (err instanceof ZodError) {
    // we just return the first issue
    obj.message?.push(...err.issues.map(it => ({ code: it.message })));
    obj.status = httpStatus.UNPROCESSABLE_ENTITY;
  } else if (err instanceof ApiError) {
    return { ok: false, message: [{ code: err.message }], status: err.code };
  } else {
    obj.message?.push({ code: 'Something went wrong in our side while processing your request.' });
  }

  return obj;
};

export const extractPaginationData = (queryParams: Record<string, string>): SearchQueryOptions => {
  const count = Number(queryParams['count'] ?? 10);
  const page = Number(queryParams['page'] ?? 0);
  const query = queryParams['query'] ?? '';
  const sortDirection = (queryParams['sortDirection'] ?? 'desc') as SortDirection;
  const sortBy = (queryParams['sort'] ?? 'alpha') as SortType;

  return { count, page, query, sortDirection, sortBy };
};
