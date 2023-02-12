import {ReduxProvider} from '@lib/redux/ReduxProvider';

import {actions, formSelectors} from './redux/formStorageSlice';
import {FormStorageEntity, FormStorageName, IFormStorage} from './types';

export const createFormStorage = (): IFormStorage => {
  const redux = ReduxProvider.create();
  return {
    get: <TName extends FormStorageName>(
      name: TName
    ): FormStorageEntity<TName> | undefined => {
      const state = redux.getState();
      return formSelectors.selectForm(name)(state);
    },
    reset: (name: FormStorageName) => {
      redux.dispatch(actions.reset({name}));
    },
    store: <TName extends FormStorageName>(
      name: TName,
      entity: Partial<FormStorageEntity<TName>>
    ) => {
      redux.dispatch(actions.stored({entity, name}));
    },
  };
};
