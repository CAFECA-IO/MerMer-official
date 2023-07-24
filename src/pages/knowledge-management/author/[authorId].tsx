import Head from 'next/head';
import Image from 'next/image';
import NavBar from '../../../components/nav_bar/nav_bar';
import Footer from '../../../components/footer/footer';
import KMPageBody from '../../../components/km_page_body/km_page_body';
import {getAuthor, getPostsByAuthor, getCategorys} from '../../../lib/posts';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps} from 'next';
import {IKnowledgeManagement} from '../../../interfaces/km_article';
import {IAuthor} from '../../../interfaces/author_data';

interface IPageProps {
  author: IAuthor;
  posts: IKnowledgeManagement[];
  categorys: string[];
}

const AuthorPage = ({author, posts, categorys}: IPageProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - {author.name}</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col py-20 font-Dosis">
        <div className="relative flex h-440px w-full items-center justify-center bg-authorIntro bg-150 bg-center bg-no-repeat px-20 py-10">
          {/* ToDo: (20230718 - Julian) author information */}
          <div className="flex flex-1 flex-col items-center space-y-4 rounded-3xl bg-glass p-12">
            {/* Info: (20230718 - Julian) author avatar */}
            <div className="relative flex h-96px w-96px items-center justify-center overflow-hidden rounded-full bg-lightGray2">
              <Image src={author.avatar} fill style={{objectFit: 'cover'}} alt="author_avatar" />
            </div>
            {/* Info: (20230718 - Julian) author name & introduction */}
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold text-lightBlue1">{author.name}</p>
              <p className="text-lg text-lightWhite1">{author.jobTitle}</p>
            </div>
            <p className="text-lg text-lightWhite1">{author.intro}</p>
          </div>
        </div>

        <div className="flex min-h-screen w-full flex-col font-Dosis">
          {/* ToDo: (20230718 - Julian) Breadcrumb */}
          <div className="px-20 py-10">breadcrumb</div>
          {/* Info: (20230718 - Julian) Page Body */}
          <KMPageBody posts={posts} categorys={categorys} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps<IPageProps> = async ({params, locale}) => {
  if (!params || !params.authorId || typeof params.authorId !== 'string') {
    return {
      notFound: true,
    };
  }

  const author = await getAuthor(params?.authorId);
  const posts = await getPostsByAuthor(params?.authorId);
  const categorys = await getCategorys();

  return {
    props: {
      author,
      posts,
      categorys,
      ...(await serverSideTranslations(locale as string, ['common', 'footer'])),
    },
  };
};

export const getStaticPaths = async () => {
  return {
    // ToDo: (20230719 - Julian) paths
    paths: [{params: {authorId: 'julian'}}],
    fallback: 'blocking',
  };
};

export default AuthorPage;
