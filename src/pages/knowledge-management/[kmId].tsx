import Head from 'next/head';
import NavBar from '../../components/nav_bar/nav_bar';
import Footer from '../../components/footer/footer';
import KMArticle from '../../components/km_article/km_article';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {ILocale} from '../../interfaces/locale';
import {useRouter} from 'next/router';
import {dummyKMList, notFoundKM} from '../../interfaces/km_article';

const KMDetailPage = () => {
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

      <main className="flex w-screen flex-1 flex-col overflow-x-hidden bg-darkBlue3 py-20">
        {/* Info: (20230718 - Julian) Breadcrumb */}
        <div className="px-20 py-10">breadcrumb</div>

        {/* Info: (20230718 - Julian) Page Body */}
        <KMArticle
          title={kmData.title}
          date={kmData.date}
          content={kmData.content}
          picture={kmData.picture}
          author={kmData.author}
        />
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
    ],
    fallback: 'blocking',
  };
};

export default KMDetailPage;
