import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { UserProvider } from '../contexts/user_context';
import { NotificationProvider } from '../contexts/notification_context';
import { WorkerProvider } from '../contexts/worker_context';
import { GlobalProvider } from '../contexts/global_context';
import { ConfirmContextProvider } from '../contexts/confirm_context/confirm_context';
import ConfirmAlert from '../components/mermer_admin/alert/confirm_alert';
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NotificationProvider>
      <ConfirmContextProvider>
        <WorkerProvider>
          <UserProvider>
            <GlobalProvider>
              <Component {...pageProps} />
              <ConfirmAlert />
            </GlobalProvider>
          </UserProvider>
        </WorkerProvider>
      </ConfirmContextProvider>
    </NotificationProvider>
  );
};

export default appWithTranslation(App);
