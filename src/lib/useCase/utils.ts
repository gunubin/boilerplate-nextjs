import {TSTypeQuery} from '@babel/types';
import {UseQueryStateResult} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {QueryDefinition} from '@reduxjs/toolkit/query';
import {UseQuery, UseQueryHookResult} from '@reduxjs/toolkit/src/query/react/buildHooks';
import {useErrorHandler} from 'next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler';
import {useEffect, useMemo, useState} from 'react';

import {ApiError} from '@/api/ApiError';
import {useErrorDisplay} from '@/hooks/error';
import {useIndicator} from '@/hooks/indicator';
import {ErrorDisplayType} from '@/lib/error/types';
import {createUseCaseState} from '@/lib/useCase/useCaseState';
import {createErrorManager} from '@/services/app/error/ErrorManager';
import {transformApplicationError, transformNetworkError} from '@/services/app/error/errors';
import {applicationErrorHandler, networkErrorHandler} from '@/services/app/error/handlers';
import {createBlockingIndicator} from '@/services/app/modal/BlockingIndicator';

type UseCase<TParams, TResult> = (params: TParams) => Promise<TResult | undefined>;
type UseCaseFactoryResult<TParams, TResult> = [
  UseCase<TParams, TResult>,
  {isLoading: boolean}
];

type UseCaseFactoryOptions = {
  id?: string; // TODO: 関数名を自動で取得するようにしないとuseCase名変更時に絶対バグる
  errorDisplayType?: ErrorDisplayType;
};

export const createUseCaseFactory = <
  // 順番悩ましいけど一旦
  TParams = void,
  TDeps = void,
  TResult = void
>(
  useCseFactory: (deps: TDeps) => UseCase<TParams, TResult>,
  options?: UseCaseFactoryOptions
) => {
  return (deps: TDeps): UseCaseFactoryResult<TParams, TResult> => {
    const [isLoading, setIsLoading] = useState(false);
    const useCaseState = createUseCaseState();
    const useCase = useCseFactory(deps);
    const {id = useCase.name} = options || {};
    if (!id) {
      throw new Error('useCaseName is undefined.');
    }
    const command = useMemo(
      () => async (params: TParams) => {
        try {
          useCaseState.command({id});
          setIsLoading(true);
          const result = await useCase(params);
          useCaseState.success({id, result});
          return result;
        } catch (error) {
          useCaseState.fail({error, id});
          if (error instanceof ApiError) {
            const errorManager = createErrorManager(networkErrorHandler);
            errorManager.show({
              error: transformNetworkError(error),
              ...(options?.errorDisplayType && {
                defaultErrorDisplayType: options.errorDisplayType,
              }),
            });
          } else {
            const errorManager = createErrorManager(applicationErrorHandler);
            errorManager.show({
              error: transformApplicationError(error as Error),
            });
          }
          return undefined;
        } finally {
          setIsLoading(false);
        }
      },
      [] // eslint-disable-line react-hooks/exhaustive-deps
    );
    return [command, {isLoading}];
  };
};

/*
 * usage: const getUser = createQuery(useGetUserQuery);
 * useErrorDisplayとuseIndicatorのみなので不要かも
 */
export const createQuery = <
  TQuery extends UseQuery<QueryDefinition<any, any, any, any>>,
>(
  query: TQuery,
  options?: {
    indicator?: boolean;
  }
) => {
  const {indicator = false} = options || {};
  return (...args: Parameters<typeof query>) => {
    // eslint-disable-next-line prefer-spread
    const ret = query.apply(null, args);
    useErrorDisplay(ret.error)
    useIndicator(indicator && ret.isLoading)
    return ret;
  };
};
