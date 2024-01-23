import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {appWithTranslation} from 'next-i18next';
import { UserProvider } from '../contexts/user_context';
import { NotificationProvider } from '../contexts/notification_context';
import { WorkerProvider } from '../contexts/worker_context';
import { GlobalProvider } from '../contexts/global_context';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <NotificationProvider>
      <WorkerProvider>
        <UserProvider>
          <GlobalProvider>
            <Component {...pageProps} />
          </GlobalProvider>
        </UserProvider>
      </WorkerProvider>
    </NotificationProvider>
  );
};

export default appWithTranslation(App);
