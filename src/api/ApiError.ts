import {AxiosError} from 'axios';


export class ApiError extends Error {
  static initWithAxiosError(error: AxiosError) {
    if (!error.response) {
      return new this(500, '', '');
    }
    return new this(
      error.response?.status,
      error.code,
      error.message,
    );
  }

  constructor(
    readonly status: number,
    readonly code?: string,
    message?: string,
  ) {
    super(message);
  }
}
