import {ApiError} from '@/api/ApiError';
import {BaseError} from '@/lib/error/types';

export type AppError = BaseError<'App'>;

// TODO: 命名
export type NetworkError = BaseError<'network', ApiError> & {
  code?: string;
  base?: string[]; // FIXME: サーバーサイドエラーメッセージ？
  status: number;
};

export const transformApplicationError = (error: Error): AppError => {
  return {
    original: error,
    type: 'App',
  };
};

export const transformNetworkError = (error: ApiError): NetworkError => {
  return {
    code: error.code,
    original: error,
    status: error.status,
    type: 'network',
  };
};
