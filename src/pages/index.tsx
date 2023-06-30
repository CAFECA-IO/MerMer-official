import Head from 'next/head';
import NavBar from '../components/nav_bar/nav_bar';
import BlueWaves from '../components/blue_waves/blue_waves';
import CatchUp from '../components/catch_up/catch_up';
import WhatWeOffer from '../components/what_we_offer/what_we_offer';
import WhyMermer from '../components/why_mermer/why_mermer';
import ContactUsForm from '../components/contact_us_form/contact_us_form';
import Footer from '../components/footer/footer';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {ILocale} from '../interfaces/locale';

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <meta property="og:title" content="MerMer 墨沫有限公司" />
        <meta
          property="og:description"
          content="墨沫有限公司是一家充滿活力的初創公司，我們的目標是引領區塊鏈在日常生活各方面的創新"
        />
        <meta
          name="keywords"
          content="墨沫, MerMer, 區塊鏈, Blockchain, DeFi, Web3, FinTech, 金融科技"
        />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col bg-mermerTheme2">
        <BlueWaves />

        <CatchUp />

        <WhatWeOffer />

        <WhyMermer />

        <ContactUsForm />
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
