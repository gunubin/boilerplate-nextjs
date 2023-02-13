import '@/styles/globals.scss';
import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {configureStore} from '@/lib/redux/store';
import {useAppPage} from '@/pages/_app/hooks';

const {store, persistor} = configureStore();
const reduxProvider = ReduxProvider.create();
reduxProvider.setContext(store);

export default function App({Component, pageProps}: AppProps) {
  useAppPage();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
