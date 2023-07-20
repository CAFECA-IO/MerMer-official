import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../../../components/nav_bar/nav_bar';
import Footer from '../../../components/footer/footer';
import KMFilters from '../../../components/km_filter/km_filter';
import {useTranslation} from 'next-i18next';
import {TranslateFunction, ILocale} from '../../../interfaces/locale';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps} from 'next';

interface IPageProps {}

const AuthorPage = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - Author</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex w-screen flex-1 flex-col py-20 font-Dosis">
        <div className="relative flex h-440px w-full items-center justify-center bg-authorIntro bg-150 bg-center bg-no-repeat px-20 py-10">
          {/* ToDo: (20230718 - Julian) author information */}
          <div className="flex flex-1 flex-col items-center space-y-4 rounded-3xl bg-glass p-12">
            {/* Info: (20230718 - Julian) author avatar */}
            <div className="relative flex h-96px w-96px items-center justify-center overflow-hidden rounded-full bg-lightGray2">
              <Image
                src={`/icons/user.svg`}
                fill
                style={{objectFit: 'cover'}}
                alt="author_avatar"
              />
            </div>
            {/* Info: (20230718 - Julian) author name & introduction */}
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold text-lightBlue1">{`Welly Wang`}</p>
              <p className="text-lg text-lightWhite1">{`Intern`}</p>
            </div>
            <p className="text-lg text-lightWhite1">{`I like cake`}</p>
          </div>
        </div>

        {/* ToDo: (20230720 - Julian) breadcrumb */}
        <div className="px-20 py-10">breadcrumb</div>
        {/* Info: (20230720 - Julian) Author Page Body */}
        <div className="flex flex-col px-20">
          <KMFilters />
        </div>
      </main>

      <Footer />
    </div>
  );
};

const getStaticPropsFunction = async ({locale}: ILocale) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export const getStaticProps = getStaticPropsFunction;

export const getStaticPaths = async () => {
  return {
    // ToDo: (20230719 - Julian) paths
    paths: [{params: {authorId: 'julian'}}],
    fallback: 'blocking',
  };
};

// export const getStaticProps: GetStaticProps<IPageProps> = async ({params, locale}) => {
//   //const allKmData = await getPosts('src/km/julian');

//   // if (!allKmData) {
//   //   return {
//   //     notFound: true,
//   //   };
//   // }

//   return {
//     props: {
//       //briefs,
//       ...(await serverSideTranslations(locale as string, ['common', 'footer'])),
//     },
//   };
// };

export default AuthorPage;
