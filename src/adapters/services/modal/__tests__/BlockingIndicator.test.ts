import {indicatorSelectors} from '@/adapters/services/modal/redux/indicatorSlice';
import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {AppDispatch, AppGetState} from '@/lib/redux/store';

import {createBlockingIndicator} from '../BlockingIndicator';
import {createMockStore} from "../../../../../__fixtures__/createMockStore";

describe('@app/BlockingIndicator', () => {
  const redux = ReduxProvider.create();
  beforeEach(() => {
    const store = createMockStore();
    redux.setContext(
      store as {
        dispatch: AppDispatch;
        getState: AppGetState;
      }
    );
    const mockDispatch = jest.spyOn(redux, 'dispatch');
    mockDispatch.mockImplementation((action: any) => {
      return store.dispatch(action);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('show()', () => {
    const blockingIndicator = createBlockingIndicator();
    blockingIndicator.show();
    const indicator = indicatorSelectors.selectLatestIndicator(redux.getState());
    expect(indicator).toBeTruthy();
  });
});
