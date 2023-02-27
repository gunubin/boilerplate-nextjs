
import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {Type} from '@/components/features/modal/Toast/types';
import {useTimeout} from '@/hooks/timber';
import {RootState} from '@/lib/redux/rootReducer';
import {createToastManger} from '@/services/app/toast/ToastManager';
import {toastSelectors} from '@/services/app/toast/redux/toastSlice';

export type Props = {
  id: string;
};

const DISPLAY_DURATION = 5000;

export const useTransientToast = (params: {id: string}) => {
  const toast = useSelector((state: RootState) =>
    toastSelectors.selectById(state, params.id)
  );

  const timeoutHandler = useCallback(() => {
    const toastManager = createToastManger();
    toastManager.hide(params.id);
  }, [params.id]);

  const onRequestClose = useCallback(() => {
    const toastManager = createToastManger();
    toastManager.hide(params.id);
  }, [params.id])

  useTimeout(timeoutHandler, DISPLAY_DURATION);
  return {
    children: toast?.message || '',
    onRequestClose,
    type: toast?.status as Type,
  };
};
