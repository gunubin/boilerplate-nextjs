import {BlockingIndicatorPayload} from '@/adapters/services/modal/BlockingIndicatorPayload';
import {indicatorSelectors, actions} from '@/adapters/services/modal/redux/indicatorSlice';
import {IBlockingIndicator} from '@/adapters/services/modal/types';
import {ReduxProvider} from '@/lib/redux/ReduxProvider';

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
