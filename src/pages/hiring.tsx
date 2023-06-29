import Head from 'next/head';
import NavBar from '../components/nav_bar/nav_bar';
import Footer from '../components/footer/footer';
import Image from 'next/image';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../interfaces/locale';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {ILocale} from '../interfaces/locale';

const HiringPage = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - Hiring</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col bg-darkBlue3 py-20">
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-hiringBanner bg-contain bg-no-repeat font-Dosis">
          <h1 className="text-54px font-bold drop-shadow-heightLight">{t('HIRING_PAGE.BANNER')}</h1>
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

export default HiringPage;
