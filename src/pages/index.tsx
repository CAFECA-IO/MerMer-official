import Head from 'next/head';
import NavBar from '../components/nav_bar/nav_bar';
import BlueWaves from '../components/blue_waves/blue_waves';
import Footer from '../components/footer/footer';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {ILocale} from '../interfaces/locale';

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col bg-mermerTheme2">
        <BlueWaves />
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

export default Home;
