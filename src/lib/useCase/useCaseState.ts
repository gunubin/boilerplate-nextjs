import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {commanded, failed, succeeded} from '@/lib/useCase/redux/useCaseSlice';
import {IUseCaseState, useCaseEventTypes} from '@/lib/useCase/types';

export const createUseCaseState = (): IUseCaseState => {
  const redux = ReduxProvider.create();
  return {
    command(params) {
      redux.dispatch(commanded({command: params, type: useCaseEventTypes.commanded}));
    },
    fail(params) {
      redux.dispatch(
        failed({
          command: {id: params.id},
          error: params.error,
          type: useCaseEventTypes.failed,
        })
      );
    },
    success(params) {
      redux.dispatch(
        succeeded({
          command: {id: params.id},
          result: params.result,
          type: useCaseEventTypes.succeeded,
        })
      );
    },
  };
};
