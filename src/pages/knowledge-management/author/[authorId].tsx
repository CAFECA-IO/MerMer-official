import Head from 'next/head';
import Image from 'next/image';
import NavBar from '../../../components/nav_bar/nav_bar';
import Footer from '../../../components/footer/footer';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import KMPageBody from '../../../components/km_page_body/km_page_body';
// import { getAuthor, getPostsByAuthor, getCategories, getAuthors } from '../../../lib/posts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { IKnowledgeManagement } from '../../../interfaces/km_article';
import { ICrumbItem } from '../../../interfaces/crumb_item';
import { MERURL } from '../../../constants/url';
import { IAuthor } from '../../../interfaces/author_data';
import { useTranslation } from 'next-i18next';
import { TranslateFunction } from '../../../interfaces/locale';


type Props = {
  author: IAuthor;
  posts: IKnowledgeManagement[];
  categories: string[];
}
const AuthorPage = ({
  author,
  posts,
  categories,
}: Props) => {
  const { t }: { t: TranslateFunction } = useTranslation('common');

  const crumbs: ICrumbItem[] = [
    { label: t('NAV_BAR.HOME'), path: MERURL.HOME },
    { label: t('NAV_BAR.KNOWLEDGE_MANAGEMENT'), path: MERURL.KM },
    { label: t(author.name), path: `${MERURL.AUTHOR}/${author.id}` },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - {t(author.name)}</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col py-20 font-Dosis">
        <div className="relative flex w-full items-center justify-center bg-authorIntro bg-150 bg-center bg-no-repeat px-5 py-10 lg:h-440px lg:px-20">
          {/* Info: (20230718 - Julian) author information */}
          <div className="flex flex-1 flex-col items-center space-y-4 rounded-3xl bg-glass p-12">
            {/* Info: (20230718 - Julian) author avatar */}
            <div className="relative flex size-96px items-center justify-center overflow-hidden rounded-full bg-lightGray2">
              <Image
                src={author.avatar}
                fill
                style={{ objectFit: 'cover' }}
                alt={`${author.id}_avatar`}
              />
            </div>
            {/* Info: (20230718 - Julian) author name & introduction */}
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold text-lightBlue1">{t(author.name)}</p>
              <p className="text-lg text-lightWhite1">{t(author.jobTitle)}</p>
            </div>
            <p className="text-lg text-lightWhite1">{t(author.intro)}</p>
          </div>
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
            <div>Loading...</div>  // 如果沒有畫面就load
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = (async (context) => {
  const host = context.req.headers.host
  const tmpProtocol = context.req.headers['x-forwarded-proto'] || 'https';
  // Info (20240318 - Luphia) somtimes the protocol would be 'https,http' or 'http,https' so we need to split it
  const protocol = tmpProtocol.toString().split(',')[0];
  if (!host) {
    return {
      notFound: true,
    };
  }
  const { locale, query } = context;
  const authorId = query.authorId as string;
  // Fetch data from external API
  const response = await fetch(`${protocol}://${host}/api/users/${authorId}?language=${locale}`);
  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const posts = await response.json() as IKnowledgeManagement[];
  if (!posts) {
    return {
      notFound: true,
    };
  }

  const author = posts[0].author;
  const categories = posts.flatMap((post) => post.category);
  // Pass data to the page via props
  return {
    props: {
      posts,
      author,
      categories,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
})


export default AuthorPage;
