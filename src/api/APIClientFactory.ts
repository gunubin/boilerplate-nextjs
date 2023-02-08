import {AxiosRequestConfig} from 'axios';

import {APIClient} from '@/api/APIClient';

export class APIClientFactory {
  static instance: APIClientFactory;
  private map = new Map<string, APIClient>();

  static create() {
    if (APIClientFactory.instance) {
      return APIClientFactory.instance;
    }
    APIClientFactory.instance = new APIClientFactory();
    return APIClientFactory.instance;
  }

  async getBaseHeaders(config: AxiosRequestConfig) {
    config.headers = {
      ...config.headers,
      Accept: config.headers?.['Accept'] || 'application/json',
      'Accept-Language': config.headers?.['Accept-Language'] || 'ja-JP',
      'Content-Type': config.headers?.['Content-Type'] || 'application/json',
    };
    config.withCredentials = false; // TODO: サーバー側が実装されたらtrueにする
    return config;
  }

  getClient(apiBaseUrl: string) {
    const client = this.map.get(apiBaseUrl);
    if (client) {
      return client;
    }
    const newClient = APIClient.create(apiBaseUrl);
    newClient.use(async (config) => {
      config.headers = {
        ...config.headers,
      };
      const baseConfig = await this.getBaseHeaders(config);
      return {...baseConfig, ...config};
    });
    this.map.set(apiBaseUrl, newClient);
    return newClient;
  }
}
