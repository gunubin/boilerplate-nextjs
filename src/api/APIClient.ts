import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

import {RequestArgs} from '@/api/gen/base';

export class APIClient {
  static instance: APIClient;

  static create(apiBaseUrl: string) {
    return new APIClient(axios.create(), apiBaseUrl);
  }

  constructor(private axios: AxiosInstance, private baseUrl: string) {
    // this.axios.interceptors.request.use((request) => {
    //   console.info('Request: ', request);
    //   return request;
    // });
    // this.axios.interceptors.response.use(
    //   (response) => {
    //     console.info('Response: ', response);
    //     return response;
    //   },
    //   (error) => {
    //     console.info('Response: ', {error});
    //     return Promise.reject(error);
    //   }
    // );
  }

  use(interceptor: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>) {
    this.axios.interceptors.request.use(interceptor);
  }

  private makeConfig(config: AxiosRequestConfig, url: string): AxiosRequestConfig {
    return {
      ...config,
      url,
    };
  }

  async request(config: Promise<RequestArgs>): Promise<any /* FIXME: type */> {
    const {options, url} = await config;
    const axiosConfig = this.makeConfig(options, `${this.baseUrl}${url}`);

    return new Promise((resolve, reject) => {
      this.axios(axiosConfig)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
