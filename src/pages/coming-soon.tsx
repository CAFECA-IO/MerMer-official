import Head from 'next/head';
import NavBar from '../components/nav_bar/nav_bar';
import Footer from '../components/footer/footer';
import {useTranslation} from 'next-i18next';
import {TranslateFunction, ILocale} from '../interfaces/locale';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const ComingSoonPage = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - {t('NOT_FOUND_PAGE.TITLE_2')}</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-full flex-1 flex-col bg-darkBlue2 font-Dosis">
        <div className="flex min-h-screen w-full flex-col justify-center bg-comingSoon bg-cover bg-right-93 bg-no-repeat md:bg-bottom md:px-32">
          <div className="-mt-40 flex flex-col items-center space-y-2 font-bold text-lightWhite1 md:mt-0 md:items-start">
            <h1 className="text-3xl md:text-54px">{t('COMING_SOON_PAGE.TITLE')}</h1>
            <p className="text-xl md:text-42px">{t('COMING_SOON_PAGE.DESCRIPTION')}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const getStaticPropsFunction = async ({locale}: ILocale) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export const getStaticProps = getStaticPropsFunction;

export default ComingSoonPage;
