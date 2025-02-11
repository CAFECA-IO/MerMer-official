import Head from 'next/head';
import NavBar from '../../components/nav_bar/nav_bar';
import Footer from '../../components/footer/footer';
import Breadcrumb from '../../components/breadcrumb/breadcrumb';
import KMPageBody from '../../components/km_page_body/km_page_body';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {IKnowledgeManagement} from '../../interfaces/km_article';
import {ICrumbItem} from '../../interfaces/crumb_item';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetServerSideProps} from 'next';
import {MERURL} from '../../constants/url';

interface IPageProps {
  posts: IKnowledgeManagement[];
  categories: string[];
}

const KnowledgeManagementPage = ({posts, categories}: IPageProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const crumbs: ICrumbItem[] = [
    {label: t('NAV_BAR.HOME'), path: MERURL.HOME},
    {
      label: t('NAV_BAR.KNOWLEDGE_MANAGEMENT'),
      path: MERURL.KM,
    },
  ];

  // Info: (20240318 - Julian) 將 posts 包裝成 structured data
  const structuredData = posts.map((post, i) => {
    const publishedDate = new Date(post.date).toISOString();
    return (
      <div key={i} className="hidden" itemScope itemType="https://schema.org/NewsArticle">
        <div itemProp="headline">{post.title}</div>
        <img itemProp="image" src={post.picture} />
        <div>
          <span itemProp="datePublished" content={publishedDate}>
            {publishedDate}
          </span>
        </div>
        <div>
          by
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <a itemProp="url" href={`${MERURL.AUTHOR}/${post.author.id}`}>
              <span itemProp="name">{post.author.name}</span>
            </a>
          </span>
        </div>
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>MerMer - {t('KM_PAGE.TITLE')}</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-full flex-1 flex-col py-20 font-Dosis">
        {structuredData}

        {/* Info: (20230717 - Julian) KM Title */}
        <div className="flex h-200px w-full flex-col items-start justify-center bg-kmBanner bg-cover bg-top bg-no-repeat lg:h-450px">
          <h1 className="px-20 text-2xl font-bold drop-shadow-heightLight lg:text-54px">
            {t('KM_PAGE.TITLE')}
          </h1>
        </div>

        <div className="flex min-h-screen w-full flex-col font-Dosis">
          {/* Info: (20230718 - Julian) Breadcrumb */}
          <div className="px-5 py-10 lg:px-20">
            <Breadcrumb crumbs={crumbs} />
          </div>
          {/* Info: (20230718 - Julian) Page Body */}
          {posts.length > 0 ? (
            <KMPageBody posts={posts} categories={categories} />
          ) : (
            <div>Loading...</div> // 如果沒有畫面就load
          )}
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
  const {locale} = context;
  // Fetch data from external API
  const response = await fetch(`${protocol}://${host}/api/kms?language=${locale}`);
  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const posts = (await response.json()) as IKnowledgeManagement[];
  if (!posts) {
    return {
      notFound: true,
    };
  }

  const categories = posts.flatMap(post => post.category);

  // Pass data to the page via props
  return {
    props: {
      posts,
      categories,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};
export default KnowledgeManagementPage;
