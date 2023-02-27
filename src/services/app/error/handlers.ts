import {AppError, NetworkError} from '@/services/app/error/errors';
import {ErrorHandler} from '@/services/app/error/types';

export const applicationErrorHandler: ErrorHandler<AppError> = () => {
  return {
    displayType: 'dialog',
    message: 'アプリでエラーが発生しました。',
    title: 'エラー',
  };
};

export const networkErrorHandler: ErrorHandler<NetworkError> = (error) => {
  if (error.status === 422) {
    return [
      {
        displayType: 'dialog',
        message: 'サーバーでエラーが発生しました。少し時間をおいて再度お試しください。', // baseが設定されるが一応デフォルトで文言用意
        title: '',
      },
      {
        displayType: 'toast',
        message: 'サーバーでエラーが発生しました。少し時間をおいて再度お試しください。', // baseが設定されるが一応デフォルトで文言用意
        title: '',
      },
    ];
  }
  return [
    {
      displayType: 'dialog',
      message: 'サーバーでエラーが発生しました。少し時間をおいて再度お試しください。',
      title: 'ネットワークエラー',
    },
    {
      displayType: 'toast',
      message: 'サーバーでエラーが発生しました。少し時間をおいて再度お試しください。',
    },
  ];
};
