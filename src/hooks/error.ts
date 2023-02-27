import {useLayoutEffect, useMemo} from 'react';

import {ApiError} from '@/api/ApiError';
import {createErrorManager} from '@/services/app/error/ErrorManager';
import {transformNetworkError} from '@/services/app/error/errors';
import {networkErrorHandler} from '@/services/app/error/handlers';

export const useErrorDisplay = (error: unknown) => {
  const errorManager = useMemo(() => createErrorManager(networkErrorHandler), [networkErrorHandler]);
  useLayoutEffect(() => {
    if (error instanceof ApiError) {
      errorManager.show({
        defaultErrorDisplayType: 'toast',
        error: transformNetworkError(error),
      });
    }
  }, [error, errorManager]);
};
