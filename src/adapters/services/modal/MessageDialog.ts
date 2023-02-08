import {
  MessageDialogPayload,
  MessageDialogType,
} from '@/adapters/services/modal/MessageDialogPayload';
import {actions} from '@/adapters/services/modal/redux/modalSlice';
import {IMessageDialog, DialogLabels} from '@/adapters/services/modal/types';
import {ReduxProvider} from '@/lib/redux/ReduxProvider';

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
