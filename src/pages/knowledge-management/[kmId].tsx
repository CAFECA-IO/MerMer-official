import Head from 'next/head';
import NavBar from '../../components/nav_bar/nav_bar';
import Footer from '../../components/footer/footer';
import Breadcrumb from '../../components/breadcrumb/breadcrumb';
import Link from 'next/link';
import KMArticle from '../../components/km_article/km_article';
import {ImFacebook, ImTwitter, ImLinkedin2} from 'react-icons/im';
import {FaRedditAlien} from 'react-icons/fa';
import {RiArrowLeftSLine} from 'react-icons/ri';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {IKnowledgeManagement} from '../../interfaces/km_article';
import {ICrumbItem} from '../../interfaces/crumb_item';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {MERURL} from '../../constants/url';
import {DOMAIN, KM_DESCRIPTION_LIMIT, KM_FOLDER} from '../../constants/config';
import {getPost} from '../../lib/posts';
import {GetStaticProps} from 'next';
import {truncateText} from '../../lib/common';

interface IPageProps {
  kmId: string;
  kmData: IKnowledgeManagement;
}

const KMDetailPage = ({kmData}: IPageProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const shareUrl = `${DOMAIN}${MERURL.KM}/${kmData.id}`;
  const description = truncateText(kmData.description, KM_DESCRIPTION_LIMIT);

  const crumbs: ICrumbItem[] = [
    {
      label: t('NAV_BAR.HOME'),
      path: MERURL.HOME,
    },
    {
      label: t('NAV_BAR.KNOWLEDGE_MANAGEMENT'),
      path: MERURL.KM,
    },
    {
      label: kmData.title,
      path: `${MERURL.KM}/${kmData.id}`,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>{kmData.title}</title>
        <link rel="icon" href="/favicon/favicon.ico" />

        <meta name="keywords" content={kmData.title} />
        <meta name="description" content={description} />
        <meta name="author" content="MerMer" />

        {/* Info: (20230720 - Julian) Safari */}
        <meta name="application-name" content="MerMer" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" />
        <meta name="apple-mobile-web-app-title" content="MerMer" />

        {/* Info: (20230720 - Julian) Open Graph Tag */}
        <meta name="og:title" content={kmData.title} />
        <meta name="og:type" content="website" />
        <meta name="og:url" content={shareUrl} />
        <meta name="og:image" content={kmData.picture} />
        <meta name="og:image:width" content={'1200'} />
        <meta name="og:image:height" content={'630'} />
        <meta name="og:image:alt" content={kmData.title} />
        <meta name="og:description" content={description} />
        <meta name="og:site_name" content="MerMer" />
        <meta name="og:locale" content="en_US" />

        {/* Info: (20230720 - Julian) Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@mermer" />
        <meta name="twitter:creator" content="@mermer" />
        <meta name="twitter:url" content={DOMAIN} />
        <meta name="twitter:title" content={kmData.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={kmData.picture} />
        <meta name="twitter:image:alt" content={kmData.title} />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col overflow-x-hidden bg-darkBlue3 pt-20">
        {/* Info: (20230718 - Julian) Breadcrumb */}
        <div className="px-5 py-10 lg:px-20">
          <Breadcrumb crumbs={crumbs} />
        </div>

        {/* Info: (20230718 - Julian) Page Body */}
        <KMArticle
          title={kmData.title}
          date={kmData.date}
          content={kmData.content}
          category={kmData.category}
          picture={kmData.picture}
          author={kmData.author}
        />

        <div className="flex flex-col items-center space-y-10 px-5 py-10 lg:flex-row lg:space-y-0 lg:p-20">
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

  const kmData = await getPost(KM_FOLDER, params.kmId);

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
      {params: {kmId: 'km-julian-20230719001'}},
      {params: {kmId: 'km-julian-20230720001'}},
      {params: {kmId: 'km-test-20230720001'}},
    ],
    fallback: 'blocking',
  };
};

export default KMDetailPage;
