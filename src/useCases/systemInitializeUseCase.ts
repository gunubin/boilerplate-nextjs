import {createUseCaseFactory} from "@/lib/useCase/utils";
import {ReduxProvider} from "@/lib/redux/ReduxProvider";

export const useSystemInitializeUseCase = createUseCaseFactory(
  () => {
    return async () => {
      // const redux = ReduxProvider.create();
      // redux.dispatch(authTokenSaved({authToken}));
    };
  },
  {id: 'useSystemInitializeUseCase'}
);
