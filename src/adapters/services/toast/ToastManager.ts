import {actions} from '@/adapters//services/toast/redux/toastSlice';
import {IToastManager} from '@/adapters/services/toast/types';
import {ReduxProvider} from '@/lib/redux/ReduxProvider';

let toastIndex = 0;

const createId = () => {
  toastIndex++;
  return toastIndex.toString();
};

export const createToastManger = (): IToastManager => {
  const redux = ReduxProvider.create();
  return {
    hide: (id) => {
      redux.dispatch(actions.hid(id));
    },
    show: (params) => {
      redux.dispatch(actions.showed({...params, id: createId()}));
    },
  };
};
