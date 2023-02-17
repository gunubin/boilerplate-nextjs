import '@/styles/globals.scss';
import {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {ReactElement, ReactNode} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {configureStore} from '@/lib/redux/store';
import {useAppPage} from '@/pages/_app/hooks';

const {store, persistor} = configureStore();
const reduxProvider = ReduxProvider.create();
reduxProvider.setContext(store);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
  useAppPage();
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {getLayout(<Component {...pageProps} />)}
      </PersistGate>
    </Provider>
  );
}
