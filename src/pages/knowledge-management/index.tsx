import Head from 'next/head';
import NavBar from '../../components/nav_bar/nav_bar';
import Footer from '../../components/footer/footer';
import KMPageBody from '../../components/km_page_body/km_page_body';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {IKnowledgeManagement} from '../../interfaces/km_article';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps} from 'next';
import {truncateText} from '../../lib/common';
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

        {/* Info: (20230717 - Julian) KM Page Body */}
        <KMPageBody briefs={briefs} />
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps<IPageProps> = async ({params, locale}) => {
  const allKmData = await getPosts('src/km/julian');

  const briefs: IKnowledgeManagement[] = allKmData.map(km => {
    const description = truncateText(km.description, 40);
    return {
      id: km.id,
      date: km.date,
      title: km.title,
      description,
      content: km.content,
      picture: km.picture,
      category: km.category,
      author: km.author,
    };
  });

  if (!allKmData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      briefs,
      ...(await serverSideTranslations(locale as string, ['common', 'footer'])),
    },
  };
};

export default KnowledgeManagementPage;
