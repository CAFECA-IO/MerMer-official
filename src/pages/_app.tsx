import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {appWithTranslation} from 'next-i18next';
import { UserProvider } from '../contexts/user_context';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default appWithTranslation(App);
