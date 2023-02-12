import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {actions} from '@/services/app/toast/redux/toastSlice';
import {IToastManager} from '@/services/app/toast/types';

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
