import {combineReducers} from '@reduxjs/toolkit';

import {appApi} from '@/adapters/domain/redux/appApi';
import formStorageReducer from '@/adapters/services/form/redux/formStorageSlice';
import indicatorReducer from '@/adapters/services/modal/redux/indicatorSlice';
import modalReducer from '@/adapters/services/modal/redux/modalSlice';
import toastReducer from '@/adapters/services/toast/redux/toastSlice';
import useCaseReducer from '@/lib/useCase/redux/useCaseSlice';

const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  formStorage: formStorageReducer,
  indicator: indicatorReducer,
  modal: modalReducer,
  toast: toastReducer,
  useCase: useCaseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
