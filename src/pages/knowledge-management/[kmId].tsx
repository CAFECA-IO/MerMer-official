import Head from 'next/head';
import NavBar from '../../components/nav_bar/nav_bar';
import Footer from '../../components/footer/footer';
import Link from 'next/link';
import KMArticle from '../../components/km_article/km_article';
import {ImFacebook, ImTwitter, ImLinkedin2} from 'react-icons/im';
import {FaRedditAlien} from 'react-icons/fa';
import {RiArrowLeftSLine} from 'react-icons/ri';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {IKnowledgeManagement} from '../../interfaces/km_article';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {MERURL} from '../../constants/url';
import {getPost} from '../../lib/posts';
import {GetStaticProps} from 'next';

interface IPageProps {
  kmId: string;
  kmData: IKnowledgeManagement;
}

const KMDetailPage = ({kmData}: IPageProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - {kmData.title}</title>
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

export const getStaticProps: GetStaticProps<IPageProps> = async ({params, locale}) => {
  if (!params || !params.kmId || typeof params.kmId !== 'string') {
    return {
      notFound: true,
    };
  }

  // ToDo: (20230719 - Julian) 整理 dir data
  //const dir = params.kmId.includes('julian') ? 'src/km/julian' : '/';
  //const kmData = await getPost(dir, params.kmId);

  const kmData = await getPost('src/km/julian', 'km-julian-20230719001');

  if (!kmData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      kmId: params.kmId,
      kmData,
      ...(await serverSideTranslations(locale as string, ['common', 'footer'])),
    },
  };
};

export const getStaticPaths = async () => {
  return {
    // ToDo: (20230719 - Julian) paths
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
