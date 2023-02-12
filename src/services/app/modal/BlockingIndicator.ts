import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {BlockingIndicatorPayload} from '@/services/app/modal/BlockingIndicatorPayload';
import {indicatorSelectors, actions} from '@/services/app/modal/redux/indicatorSlice';
import {IBlockingIndicator} from '@/services/app/modal/types';

export const createBlockingIndicator = (): IBlockingIndicator => {
  const redux = ReduxProvider.create();
  return {
    clear: () => {
      return redux.dispatch(actions.cleared());
    },
    hide: ({id} = {}) => {
      const indicator = indicatorSelectors.selectLatestIndicator(redux.getState());
      const targetId = id || indicator?.id;
      return targetId && redux.dispatch(actions.hid(targetId));
    },
    show: ({id, isShowHeaderNavigation} = {}) => {
      return redux.dispatch(
        actions.showed(BlockingIndicatorPayload.create(id, isShowHeaderNavigation))
      );
    },
  };
};
