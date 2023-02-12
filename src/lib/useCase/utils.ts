import {useMemo, useState} from 'react';

import {ApiError} from '@/api/ApiError';
import {ErrorDisplayType} from '@/lib/error/types';
import {createUseCaseState} from '@/lib/useCase/useCaseState';
import {createErrorManager} from '@/services/app/error/ErrorManager';
import {transformApplicationError, transformNetworkError} from '@/services/app/error/errors';
import {applicationErrorHandler, networkErrorHandler} from '@/services/app/error/handlers';

type UseCase<TParams, TResult> = (params: TParams) => Promise<TResult | undefined>;
type UseCaseFactoryResult<TParams, TResult> = [
  UseCase<TParams, TResult>,
  {fieldErrors?: ApiError['fields']; isLoading: boolean}
];

type UseCaseFactoryOptions = {
  id: string; // TODO: 関数名を自動で取得するようにしないとuseCase名変更時に絶対バグる
  errorDisplayType?: ErrorDisplayType;
};

export const createUseCaseFactory = <
  // 順番悩ましいけど一旦
  TParams = void,
  TDeps = void,
  TResult = void
>(
  useCseFactory: (deps: TDeps) => UseCase<TParams, TResult>,
  options: UseCaseFactoryOptions
) => {
  const {id} = options;
  return (deps: TDeps): UseCaseFactoryResult<TParams, TResult> => {
    const [isLoading, setIsLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<ApiError['fields']>(undefined);
    const useCaseState = createUseCaseState();
    const useCase = useCseFactory(deps);
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
            if (error.isValidationError()) {
              setFieldErrors(error.fields);
            }
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
    return [command, {fieldErrors, isLoading}];
  };
};
