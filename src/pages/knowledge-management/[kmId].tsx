import Head from 'next/head';
import NavBar from '../../components/nav_bar/nav_bar';
import Footer from '../../components/footer/footer';
import Link from 'next/link';
import KMArticle from '../../components/km_article/km_article';
import {ImFacebook, ImTwitter, ImLinkedin2} from 'react-icons/im';
import {FaRedditAlien} from 'react-icons/fa';
import {RiArrowLeftSLine} from 'react-icons/ri';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from 'next/router';
import {dummyKMList, notFoundKM} from '../../interfaces/km_article';
import {useTranslation} from 'next-i18next';
import {TranslateFunction, ILocale} from '../../interfaces/locale';
import {MERURL} from '../../constants/url';

const KMDetailPage = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');
  const router = useRouter();
  const {kmId} = router.query;

  const kmData = dummyKMList.find(km => km.id === kmId) ?? notFoundKM;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - Knowledge Management</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col overflow-x-hidden bg-darkBlue3 pt-20">
        {/* ToDo: (20230718 - Julian) Breadcrumb */}
        <div className="px-20 py-10">breadcrumb</div>

        {/* Info: (20230718 - Julian) Page Body */}
        <KMArticle
          title={kmData.title}
          date={kmData.date}
          content={kmData.content}
          picture={kmData.picture}
          author={kmData.author}
        />

        <div className="flex items-center p-20">
          {/* ToDo: (20230719 - Julian) Share */}
          <div className="flex flex-1 items-center space-x-12">
            <p>{t('KM_DETAIL_PAGE.SHARE_TO')}</p>
            <div className="flex items-center space-x-4">
              <button className="text-2xl hover:text-lightBlue1">
                <FaRedditAlien />
              </button>
              <button className="text-2xl hover:text-lightBlue1">
                <ImFacebook />
              </button>
              <button className="text-2xl hover:text-lightBlue1">
                <ImTwitter />
              </button>
              <button className="text-2xl hover:text-lightBlue1">
                <ImLinkedin2 />
              </button>
            </div>
          </div>
          {/* Info: (20230719 - Julian) Back Button */}

          <Link href={MERURL.KM} className="group flex items-center text-2xl hover:text-lightBlue1">
            <RiArrowLeftSLine className="mr-2 text-2xl transition-all duration-300 ease-in-out group-hover:mr-4" />
            <p className="text-base">{t('KM_DETAIL_PAGE.BACK_BUTTON')}</p>
          </Link>
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

export const getStaticPaths = async () => {
  return {
    paths: [
      {params: {kmId: 'km000001'}},
      {params: {kmId: 'km000002'}},
      {params: {kmId: 'km000003'}},
      {params: {kmId: 'km000004'}},
    ],
    fallback: 'blocking',
  };
};

export default KMDetailPage;
