import Head from 'next/head';
import NavBar from '../../components/nav_bar/nav_bar';
import Footer from '../../components/footer/footer';
import KMPageBody from '../../components/km_page_body/km_page_body';
import {useTranslation} from 'next-i18next';
import {TranslateFunction, ILocale} from '../../interfaces/locale';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const KnowledgeManagementPage = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - Knowledge Management</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col py-20 font-Dosis">
        {/* Info: (20230717 - Julian) KM Title */}
        <div className="flex h-450px w-full flex-col items-start justify-center bg-kmBanner bg-cover bg-top bg-no-repeat">
          <h1 className="px-20 text-2xl font-bold drop-shadow-heightLight lg:text-54px">
            {t('KM_PAGE.TITLE')}
          </h1>
        </div>

        {/* Info: (20230717 - Julian) KM Page Body */}
        <KMPageBody />
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

export default KnowledgeManagementPage;
