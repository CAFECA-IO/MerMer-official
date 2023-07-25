import Head from 'next/head';
import NavBar from '../../components/nav_bar/nav_bar';
import Footer from '../../components/footer/footer';
import KMPageBody from '../../components/km_page_body/km_page_body';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {IKnowledgeManagement} from '../../interfaces/km_article';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps} from 'next';
import {getPosts} from '../../lib/posts';

interface IPageProps {
  briefs: IKnowledgeManagement[];
}

const KnowledgeManagementPage = ({briefs}: IPageProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - Knowledge Management</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col py-20 font-Dosis">
        {/* Info: (20230717 - Julian) KM Title */}
        <div className="flex h-450px w-full flex-col items-start justify-center bg-kmBanner bg-cover bg-top bg-no-repeat">
          <h1 className="px-20 text-2xl font-bold drop-shadow-heightLight lg:text-54px">
            {t('KM_PAGE.TITLE')}
          </h1>
        </div>

        <div className="flex min-h-screen w-full flex-col font-Dosis">
          {/* ToDo: (20230718 - Julian) Breadcrumb */}
          <div className="px-20 py-10">breadcrumb</div>
          {/* Info: (20230718 - Julian) Page Body */}
          <KMPageBody briefs={briefs} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps<IPageProps> = async ({params, locale}) => {
  const allKmData = await getPosts();

  if (!allKmData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      briefs: allKmData,
      ...(await serverSideTranslations(locale as string, ['common', 'footer'])),
    },
  };
};

export default KnowledgeManagementPage;
