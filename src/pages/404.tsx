import Head from 'next/head';
import Image from 'next/image';
import NavBar from '../components/nav_bar/nav_bar';
import Footer from '../components/footer/footer';
import {useTranslation} from 'next-i18next';
import {TranslateFunction, ILocale} from '../interfaces/locale';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const NotFoundPage = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - {t('NOT_FOUND_PAGE.TITLE_2')}</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col bg-darkBlue3 font-Dosis">
        <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-20 bg-stars bg-cover bg-no-repeat">
          <Image src="/elements/404.png" alt="404" height={253} width={759} />
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-center text-xl font-bold text-lightBlue1">
              {t('NOT_FOUND_PAGE.TITLE_1')} – {t('NOT_FOUND_PAGE.TITLE_2')}
            </h1>
            <p className="text-center text-54px font-bold text-lightWhite1 drop-shadow-heightLight">
              {t('NOT_FOUND_PAGE.DESCRIPTION')}
            </p>
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

export default NotFoundPage;
