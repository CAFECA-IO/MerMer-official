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
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon/favicon.ico" />

        <title>MerMer 墨沫有限公司</title>
        <meta
          name="description"
          content="墨沫有限公司是一支富有經驗的區塊鏈團隊，提供 WEB 3.0 解決方案的導入、顧問與研發，曾開發知名區塊鏈冷錢包、虛擬通貨交易所以及國家高速網路中心 AI 大數據主機計劃 "
        />
        <meta name="keywords" content="區塊鏈, AI, WEB 3.0, 金融科技" />
        <meta name="author" content="CAFECA" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content="MerMer 墨沫有限公司" />
        <meta
          property="og:description"
          content="墨沫有限公司是一支富有經驗的區塊鏈團隊，提供 WEB 3.0 解決方案的導入、顧問與研發，曾開發知名區塊鏈冷錢包、虛擬通貨交易所以及國家高速網路中心 AI 大數據主機計劃 "
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
