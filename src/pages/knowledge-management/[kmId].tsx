import Head from 'next/head';
import NavBar from '../../components/nav_bar/nav_bar';
import Footer from '../../components/footer/footer';
import Breadcrumb from '../../components/breadcrumb/breadcrumb';
import Link from 'next/link';
import KMArticle from '../../components/km_article/km_article';
import { ImFacebook, ImTwitter, ImLinkedin2 } from 'react-icons/im';
import { FaRedditAlien } from 'react-icons/fa';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IKnowledgeManagement } from '../../interfaces/km_article';
import { ICrumbItem } from '../../interfaces/crumb_item';
import { useTranslation } from 'next-i18next';
import { TranslateFunction } from '../../interfaces/locale';
import { MERURL } from '../../constants/url';
// import { DOMAIN, KM_DESCRIPTION_LIMIT, KM_FOLDER } from '../../constants/config';
import { DOMAIN, KM_DESCRIPTION_LIMIT, merMerKMViewerConfig } from '../../constants/config';
// import { getPost, getSlugs } from '../../lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import { truncateText } from '../../lib/common';
import useShareProcess from '../../lib/hooks/use_share_process';
import { ISocialMedia, SocialMediaConstant, ShareSettings } from '../../constants/social_media';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { increaseViewAfterDelay } from '../../lib/increase_view_after_delay';

// interface IPageProps {
//   kmId: string;
//   kmData: IKnowledgeManagement;
// }

const KMDetailPage = ({ }) => {
  const { t }: { t: TranslateFunction } = useTranslation('common');
  const router = useRouter();
  const kmId = router.query.kmId;

  if (!kmId || typeof kmId !== 'string') {
    return router.back();
  }
  const [kmData, setKmData] = useState<IKnowledgeManagement>({
    id: '',
    title: '',
    date: new Date().getTime(),
    content: '',
    category: [],
    picture: '',
    description: '',
    author: {
      id: '',
      name: '',
      jobTitle: '',
      intro: '',
      avatar: '',
    },
    views: 0,
    shares: 0,
  });

  useEffect(() => {
    const fetchKm = async () => {
      const response = await fetch(`/api/kms/${kmId}?language=${router.locale}`);
      if (!response.ok) {
        return {
          notFound: true,
        };
      }
      const kmData = await response.json() as IKnowledgeManagement;
      if (!kmData) {
        return {
          notFound: true,
        };
      }
      setKmData(kmData);
    }
    fetchKm();

    // Info: (20240220 - Murky) 閱讀一定秒數後，才增加view
    increaseViewAfterDelay(kmId, merMerKMViewerConfig.timeBeforeIncreaseView);
  }, []);
  const shareUrl = `${DOMAIN}${MERURL.KM}/${kmData.id}`;
  const description = truncateText(kmData.description, KM_DESCRIPTION_LIMIT);

  const { share } = useShareProcess({ shareId: kmData.id });

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

  const shareList = (
    <div className="flex items-center space-x-4">
      {Object.entries(ShareSettings).map(([key, value]) => {
        const mediaIcon =
          key === SocialMediaConstant.FACEBOOK ? (
            <ImFacebook />
          ) : key === SocialMediaConstant.TWITTER ? (
            <ImTwitter />
          ) : key === SocialMediaConstant.LINKEDIN ? (
            <ImLinkedin2 />
          ) : key === SocialMediaConstant.REDDIT ? (
            <FaRedditAlien />
          ) : null;

        return (
          <button
            key={key}
            className="text-2xl hover:text-lightBlue1"
            onClick={() => {
              share({ socialMedia: key as ISocialMedia, text: value.text });
            }}
          >
            {mediaIcon}
          </button>
        );
      })}
    </div>
  );

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
        <meta name="og:locale" content="zh_TW" />

        {/* Info: (20230811 - Julian) LinkedIn */}
        <meta name="title" property="og:title" content={kmData.title} />
        <meta property="og:type" content="website" />
        <meta name="description" property="og:description" content={description} />
        <meta name="image" property="og:image" content={`${DOMAIN}${kmData.picture}`} />
        <meta property="og:url" content={shareUrl} />

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
          {/* Info: (20230811 - Julian) Share List */}
          <div className="flex flex-1 items-center space-x-12">
            <p>{t('KM_DETAIL_PAGE.SHARE_TO')}</p>
            {shareList}
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // if (!params || !params.kmId || typeof params.kmId !== 'string') {
  //   return {
  //     notFound: true,
  //   };
  // }

  // const kmData = await getPost(KM_FOLDER, params.kmId);

  // if (!kmData) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      // kmId: params.kmId,
      // kmData,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const slugs = (await getSlugs(KM_FOLDER)) ?? [];

  // const paths = slugs
  //   .flatMap(slug => {
  //     return locales?.map(locale => ({ params: { kmId: slug }, locale }));
  //   })
  //   .filter((path): path is { params: { kmId: string }; locale: string } => !!path);

  const paths: string[] = []
  return {
    paths,
    fallback: 'blocking',
  };
};

export default KMDetailPage;
