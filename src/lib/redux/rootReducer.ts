import {combineReducers} from '@reduxjs/toolkit';

import useCaseReducer from '@/lib/useCase/redux/useCaseSlice';
import formStorageReducer from '@/services/app/form/redux/formStorageSlice';
import indicatorReducer from '@/services/app/modal/redux/indicatorSlice';
import modalReducer from '@/services/app/modal/redux/modalSlice';
import toastReducer from '@/services/app/toast/redux/toastSlice';
import todoReducer from '@/services/domain/todo/redux/todoSlice';
// import {appApi} from '@/services/domain/redux/appApi';

const rootReducer = combineReducers({
  // [appApi.reducerPath]: appApi.reducer,
  formStorage: formStorageReducer,
  indicator: indicatorReducer,
  modal: modalReducer,
  toast: toastReducer,
  todo: todoReducer,
  useCase: useCaseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
