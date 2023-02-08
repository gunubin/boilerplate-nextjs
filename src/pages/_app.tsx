import '@/styles/globals.scss';
import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';

import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {configureStore} from '@/lib/redux/store';
import {useAppPage} from '@/pages/_app/hooks';

const store = configureStore();
const reduxProvider = ReduxProvider.create();
reduxProvider.setContext(store);

export default function App({Component, pageProps}: AppProps) {
  useAppPage();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
