import {createMessageDialog} from '@/adapters/services/modal/MessageDialog';
import {modalSelectors} from '@/adapters/services/modal/redux/modalSlice';
import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {AppDispatch, AppGetState} from '@/lib/redux/store';

import {createMockStore} from '../../../../../__fixtures__/createMockStore';
import {createBlockingIndicator} from '../BlockingIndicator';

describe('@app/MessageDialog', () => {
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

  describe('show()', () => {
    test('must show', () => {
      const dialog = createMessageDialog();
      dialog.show({labels: ['CANCEL', 'OK'], title: 'Title'});
      const dialogPayload = modalSelectors.selectLatestModal(redux.getState());
      expect(dialogPayload).toBeTruthy();
    });
    test('must interrupt if indicator is showed', () => {
      const dialog = createMessageDialog();
      const blockingIndicator = createBlockingIndicator();
      blockingIndicator.show();
      dialog.show({labels: ['CANCEL', 'OK'], title: 'Title'});
      const {type = ''} = modalSelectors.selectLatestModal(redux.getState()) || {};
      expect(type).toEqual('messageDialog');
    });
  });
});
