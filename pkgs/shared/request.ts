export interface ApiMessage {
  code: string;
  data?: Record<string, string>;
}

export interface BaseApiResponse {
  ok: boolean;
  status: number;
  message?: Array<ApiMessage>;
}

export interface SuccessResponse<T = unknown> extends BaseApiResponse {
  ok: true;
  data: T;
}

export interface FailedResponse extends BaseApiResponse {
  ok: false;
  error?: Error;
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | FailedResponse;

export type SortDirection = 'asc' | 'desc';

export type SortType = 'alpha' | 'createdAt' | 'updatedAt';

export interface SearchQueryOptions {
  page: number;
  count: number;
  query: string;
  sortBy: SortType;
  sortDirection: SortDirection;
}

export interface SearchData<T = unknown> {
  page: number;
  total: number;
  items: T[];
}
