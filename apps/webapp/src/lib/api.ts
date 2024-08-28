import axios, { AxiosError, AxiosResponse } from 'axios';
import $token, { tokenKeys } from './token';
import { ApiResponse, FailedResponse, SuccessResponse } from '@shared/request';
import { toast } from 'sonner';
import { wait } from './utils';

const $api = axios.create({
  baseURL: `${import.meta.env.API_URL}/api`,
});

$api.interceptors.request.use(config => {
  const token = $token.get(tokenKeys.auth);

  if (token && !config.headers.get('Authorization')) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

$api.interceptors.response.use(
  response => response,
  err => {
    console.log(err);

    return err;
  },
);

export const handleResponse = async <T = unknown>(
  response: AxiosResponse<ApiResponse<T>> | AxiosError<FailedResponse>,
  onSuccess?: (data: SuccessResponse<T>) => void | Promise<void>,
  onFailure?: (data: FailedResponse) => void | Promise<void>,
) => {
  if (import.meta.env.DEV) {
    const ms = Math.floor(Math.random() * 2 * 1000);

    await wait(ms);
  }

  if ('data' in response) {
    const data = response.data as SuccessResponse<T>;

    if (!onSuccess && data.message) {
      data.message.forEach(it => toast.success(it.code));
      return;
    } else if (onSuccess) {
      await onSuccess(data);
    }

    return;
  } else {
    // if no onFailure message provided, we display toasts with the error messages
    if (onFailure && response!.response!.data) {
      await onFailure(response!.response!.data);
    } else {
      response?.response?.data?.message?.forEach(it => toast.error(it.code));
      return;
    }
  }
};

export default $api;
