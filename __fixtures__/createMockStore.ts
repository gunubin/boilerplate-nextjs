import {createStore} from '@reduxjs/toolkit';

import rootReducer from '@/lib/redux/rootReducer';

export function createMockStore() {
  const store = createStore(rootReducer);
  return store;
}
