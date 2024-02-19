import Head from 'next/head';
import Image from 'next/image';
import NavBar from '../../../components/nav_bar/nav_bar';
import Footer from '../../../components/footer/footer';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import KMPageBody from '../../../components/km_page_body/km_page_body';
// import { getAuthor, getPostsByAuthor, getCategories, getAuthors } from '../../../lib/posts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPaths } from 'next';
import { IKnowledgeManagement } from '../../../interfaces/km_article';
import { ICrumbItem } from '../../../interfaces/crumb_item';
import { MERURL } from '../../../constants/url';
import { IAuthor } from '../../../interfaces/author_data';
import { useTranslation } from 'next-i18next';
import { TranslateFunction } from '../../../interfaces/locale';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// interface IPageProps {
//   author: IAuthor;
//   posts: IKnowledgeManagement[];
//   categories: string[];
// }

const AuthorPage = ({ }) => {
  const { t }: { t: TranslateFunction } = useTranslation('common');
  const router = useRouter();
  const authorId = router.query.authorId;
  const [author, setAuthor] = useState<IAuthor>({
    id: '',
    name: '',
    avatar: '',
    jobTitle: '',
    intro: '',
  });
  const [posts, setPosts] = useState<IKnowledgeManagement[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {

      const response = await fetch(`/api/users/${authorId}?language=${router.locale}`);
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

      setPosts(posts);
      setAuthor(author);
      setCategories(categories);
    }
    fetchPosts();
  }, []);
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // if (!params || !params.authorId || typeof params.authorId !== 'string') {
  //   return {
  //     notFound: true,
  //   };
  // }

  // const author = await getAuthor(params?.authorId);
  // const posts = await getPostsByAuthor(params?.authorId);
  // const categories = await getCategories(posts);

  return {
    props: {
      // author,
      // posts,
      // categories,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ }) => {
  // const authors = (await getAuthors()) ?? [];

  // const paths = authors
  //   .flatMap(author => {
  //     return locales?.map(locale => ({params: {authorId: author}, locale}));
  //   })
  //   .filter((path): path is {params: {authorId: string}; locale: string} => !!path);

  const paths: string[] = []
  return {
    paths,
    fallback: 'blocking',
  };
};

export default AuthorPage;
