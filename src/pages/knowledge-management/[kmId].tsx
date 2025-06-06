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
import {DOMAIN, KM_DESCRIPTION_LIMIT, merMerKMViewerConfig} from '../../constants/config';
import {GetServerSideProps} from 'next';
import {truncateText} from '../../lib/common';
import useShareProcess from '../../lib/hooks/use_share_process';
import {ISocialMedia, SocialMediaConstant, ShareSettings} from '../../constants/social_media';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {increaseViewAfterDelay} from '../../lib/increase_view_after_delay';
import {ITableOfContentsItem} from '../../interfaces/table_of_contents';

interface IPageProps {
  kmId: string;
  kmData: IKnowledgeManagement;
  kmContents: ITableOfContentsItem[];
}

const KMDetailPage = ({kmId, kmData, kmContents}: IPageProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');
  const router = useRouter();

  if (!kmId || typeof kmId !== 'string') {
    return router.back();
  }

  useEffect(() => {
    // Info: (20240220 - Murky) 閱讀一定秒數後，才增加view
    increaseViewAfterDelay(kmId, merMerKMViewerConfig.timeBeforeIncreaseView);
  }, []);
  const shareUrl = `${DOMAIN}${MERURL.KM}/${kmData.id}`;
  const description = truncateText(kmData.description, KM_DESCRIPTION_LIMIT);

  const {share} = useShareProcess({shareId: kmData.id});

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
              share({socialMedia: key as ISocialMedia, text: value.text});
            }}
          >
            {mediaIcon}
          </button>
        );
      })}
    </div>
  );

  const keywords = kmData.category.join(', ');

  return (
    <>
      <Head>
        <title>{kmData.title}</title>
        <link rel="icon" href="/favicon/favicon.ico" />

        <meta name="keywords" content={keywords} />
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
        <meta name="image" property="og:image" content={kmData.picture} />
        <meta property="og:url" content={shareUrl} />

        {/* Info: (20230720 - Julian) Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@mermer" />
        <meta name="twitter:creator" content="@mermer" />
        <meta name="twitter:url" content={shareUrl} />
        <meta name="twitter:title" content={kmData.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={kmData.picture} />
        <meta name="twitter:image:alt" content={kmData.title} />
      </Head>

      <NavBar />

      <main className="flex flex-1 flex-col bg-darkBlue3 pt-20">
        {/* Info: (20240318 - Julian) Structured Data */}
        <ol className="hidden" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a itemProp="item" href={MERURL.HOME}>
              <span itemProp="name">{t('NAV_BAR.HOME')}</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          ›
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a
              itemScope
              itemType="https://schema.org/WebPage"
              itemProp="item"
              itemID={MERURL.KM}
              href={MERURL.KM}
            >
              <span itemProp="name">{t('NAV_BAR.KNOWLEDGE_MANAGEMENT')}</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          ›
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">{kmData.title}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>

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
          tableOfContents={kmContents ?? []}
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const host = context.req.headers.host;
  const tmpProtocol = context.req.headers['x-forwarded-proto'] ? 'https' : 'http';
  // Info (20240318 - Luphia) somtimes the protocol would be 'https,http' or 'http,https' so we need to split it
  const protocol = tmpProtocol.toString().split(',')[0];
  if (!host) {
    return {
      notFound: true,
    };
  }

  const {locale, query} = context;
  const kmId = query.kmId as string;
  // Fetch data from external API
  const response = await fetch(`${protocol}://${host}/api/kms/${kmId}?language=${locale}`);
  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const responseContents = await fetch(`${protocol}://${host}/api/kms/${kmId}/contents`);

  if (!responseContents.ok) {
    return {
      notFound: true,
    };
  }

  const kmData = (await response.json()) as IKnowledgeManagement;
  const kmContents = (await responseContents.json()) as ITableOfContentsItem[];

  if (!kmData) {
    return {
      notFound: true,
    };
  }

  // Pass data to the page via props
  return {
    props: {
      kmId,
      kmData,
      kmContents,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};
export default KMDetailPage;
