import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {MessageDialogPayload, MessageDialogType} from '@/services/app/modal/MessageDialogPayload';
import {actions} from '@/services/app/modal/redux/modalSlice';
import {IMessageDialog, DialogLabels} from '@/services/app/modal/types';

/**
 * Modal that overlay screen
 */
export const createMessageDialog = (): IMessageDialog => {
  const redux = ReduxProvider.create();
  return {
    hide: async ({id, label}) => {
      return redux.dispatch(actions.hid({id, label}));
    },
    show: async <TLabel extends string>(params: {
      labels: DialogLabels<TLabel>;
      message?: string;
      title: string;
      dialogType?: MessageDialogType;
    }) => {
      const dialog = MessageDialogPayload.create<TLabel>(params);
      return redux.dispatch(actions.showed(dialog));
    },
  };
};
