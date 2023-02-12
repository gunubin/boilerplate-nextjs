import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {createUseCaseFactory} from '@/lib/useCase/utils';

export const useSystemInitializeUseCase = createUseCaseFactory(
  () => {
    return async () => {
      // const redux = ReduxProvider.create();
      // redux.dispatch(authTokenSaved({authToken}));
    };
  },
  {id: 'useSystemInitializeUseCase'}
);
