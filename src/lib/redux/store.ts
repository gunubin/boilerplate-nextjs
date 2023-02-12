import {configureStore as rtkConfigureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import rootReducer from '@/lib/redux/rootReducer';
import {modalPromiseMiddleware} from '@/services/app/modal/redux/modalPromiseMiddleware';
import {appApi} from '@/services/domain/redux/appApi';

const middlewares = [thunk, modalPromiseMiddleware, appApi.middleware];

const store = rtkConfigureStore({
  middleware: middlewares,
  reducer: rootReducer,
});

export const configureStore = () => {
  return store;
};

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;

export interface ReduxProvider {
  dispatch: AppDispatch;
  getState: typeof store.getState;
}
