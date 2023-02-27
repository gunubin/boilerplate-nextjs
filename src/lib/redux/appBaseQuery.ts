import {BaseQueryFn} from '@reduxjs/toolkit/query';
import {AxiosError} from 'axios';

import {APIClientFactory} from '@/api/APIClientFactory';
import {ApiError} from '@/api/ApiError';
import {ApiClientConfig} from '@/api/types';

export const appBaseQuery =
  (getBaseUrl: () => string): BaseQueryFn<ApiClientConfig, unknown, unknown> =>
  async (config) => {
    try {
      const baseUrl = getBaseUrl();
      const apiFactory = APIClientFactory.create();
      const result = await apiFactory.getClient(baseUrl).request(config);
      return {data: result};
    } catch (axiosError) {
      return {
        error: ApiError.initWithAxiosError(axiosError as AxiosError),
      };
    }
  };
