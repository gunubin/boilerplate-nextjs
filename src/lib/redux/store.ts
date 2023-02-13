import {configureStore as rtkConfigureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import rootReducer from '@/lib/redux/rootReducer';
import {modalPromiseMiddleware} from '@/services/app/modal/redux/modalPromiseMiddleware';
// import {appApi} from '@/services/domain/redux/appApi';

// 永続化の設定
const persistConfig = {
  key: 'root', // Storageに保存されるキー名を指定する
  storage, // 保存先としてlocalStorageがここで設定される
  whitelist: ['todo'], // Stateは`todos`のみStorageに保存する
  // blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk, modalPromiseMiddleware /*, appApi.middleware*/];

const store = rtkConfigureStore({
  middleware: middlewares,
  reducer: persistedReducer,
});

export const configureStore = () => {
  return {persistor: persistStore(store), store};
};

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;

export interface ReduxProvider {
  dispatch: AppDispatch;
  getState: typeof store.getState;
}
