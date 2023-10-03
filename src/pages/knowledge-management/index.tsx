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
import {GetStaticProps} from 'next';
import {getPosts, getCategories} from '../../lib/posts';
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - Knowledge Management</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col py-20 font-Dosis">
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
          <KMPageBody posts={posts} categories={categories} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps<IPageProps> = async ({locale}) => {
  const posts = await getPosts();
  const categories = await getCategories();

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      categories,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default KnowledgeManagementPage;
