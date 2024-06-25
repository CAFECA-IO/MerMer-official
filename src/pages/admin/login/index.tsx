import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import MerMerButton from '../../../components/mermer_button/mermer_button';
import {useGlobal} from '../../../contexts/global_context';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {ILocale} from '../../../interfaces/locale';

const getStaticPropsFunction = async ({locale}: ILocale) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'footer'])),
  },
});

export const getStaticProps = getStaticPropsFunction;

export default function index() {
  // useContext
  const globalCtx = useGlobal();

  return (
    <>
      <Head>
        <title>MerMer Admin - Login</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="canonical" href="https://mermer.com.tw/" />
      </Head>
      <div className="flex h-screen flex-row items-center">
        <div className="flex items-center justify-center" style={{width: 'calc(100vw - 717px)'}}>
          <div className="m-20 flex flex-col justify-between gap-12">
            <div className="font-Dosis text-7xl font-bold">
              <h1>Welcome to</h1>
              <h1>
                <span className="text-lightBlue1">MerMer </span>Team
              </h1>
            </div>
            <MerMerButton
              className="flex flex-row gap-2 px-10 py-10px"
              onClick={globalCtx.visibleSignatureProcessModalHandler}
            >
              <Image className="" src="/icons/login.svg" width={24} height={24} alt="" />
              <span className="text-lg font-bold">Wallet Connect</span>
            </MerMerButton>
          </div>
        </div>

        <Image
          className="fixed bottom-0 right-0"
          src="/elements/welcome_team1.png"
          width={717}
          height={717}
          alt="Welcome Login Picture"
        />
      </div>
    </>
  );
}
