import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {AppDispatch, AppGetState} from '@/lib/redux/store';
import {indicatorSelectors} from '@/services/app/modal/redux/indicatorSlice';

import {createMockStore} from '../../../../../__fixtures__/createMockStore';
import {createBlockingIndicator} from '../BlockingIndicator';

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
