import {BaseQueryFn} from '@reduxjs/toolkit/query';
import {AxiosError} from 'axios';

import {APIClientFactory} from '@/api/APIClientFactory';
import {ApiError, AxiosErrorData} from '@/api/ApiError';

export const appBaseQuery =
  (getBaseUrl: () => string): BaseQueryFn<Promise<any/*RequestArgs*/>, unknown, unknown> =>
  async (config) => {
    try {
      const baseUrl = getBaseUrl();
      const apiFactory = APIClientFactory.create();
      const result = await apiFactory.getClient(baseUrl).request(config);
      return {data: result};
    } catch (axiosError) {
      return {
        error: ApiError.initWithAxiosError(axiosError as AxiosError<AxiosErrorData>),
      };
    }
  };
