import '../styles/globals.css';
import '../styles/Mdx_Dark_Editor.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { UserProvider } from '../contexts/user_context';
import { WorkerProvider } from '../contexts/worker_context';
import { GlobalProvider } from '../contexts/global_context';
import { ConfirmContextProvider } from '../contexts/confirm_context/confirm_context';
// Info: (20240327 - Murky) ssr 定成false, 才能讓自定義的確認彈出視窗正常顯示
const ConfirmAlert = dynamic(() => import('../components/mermer_admin/alert/confirm_alert'), {
  ssr: false,
});
import AlertsProvider from '../contexts/alert_context';
import dynamic from 'next/dynamic';
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AlertsProvider>
      <ConfirmContextProvider>
        <WorkerProvider>
          <UserProvider>
            <GlobalProvider>
              {/*Portal is for confirm alert to pop up */}
              <div id="portal"></div>
              <Component {...pageProps} />
              <ConfirmAlert />
            </GlobalProvider>
          </UserProvider>
        </WorkerProvider>
      </ConfirmContextProvider>
    </AlertsProvider>
  );
};

export default appWithTranslation(App);
