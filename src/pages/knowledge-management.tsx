import Head from 'next/head';
import NavBar from '../components/nav_bar/nav_bar';
import Footer from '../components/footer/footer';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';
import {RiSearchLine} from 'react-icons/ri';
import {TbSortDescending} from 'react-icons/tb';
import {useTranslation} from 'next-i18next';
import {TranslateFunction, ILocale} from '../interfaces/locale';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const KnowledgeManagementPage = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>MerMer - Knowledge Management</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <NavBar />

      <main className="mt-20 flex w-screen flex-1 flex-col bg-kmBanner bg-contain bg-top bg-no-repeat py-20 font-Dosis">
        {/* Info: (20230717 - Julian) KM Title */}
        <div className="flex h-400px w-full flex-col items-start">
          <h1 className="mt-1/5 px-20 text-2xl font-bold drop-shadow-heightLight lg:text-54px">
            {t('KM_PAGE.TITLE')}
          </h1>
        </div>
        <div className="flex min-h-screen w-full flex-col">
          <div className="px-20 py-10">breadcrumb</div>
          {/* Info: (20230717 - Julian) Page Body */}
          <div className="flex w-full flex-col items-center px-20">
            <div className="flex w-full space-x-20">
              {/* Info: (20230717 - Julian) category */}
              <button className="flex items-center space-x-2 text-base">
                <p>{t('KM_PAGE.CATEGORY_TITLE')}</p>
                <MdOutlineKeyboardArrowDown />
              </button>
              {/* Info: (20230717 - Julian) search */}
              <div className="relative flex flex-1 items-center">
                <input
                  type="search"
                  className="w-full items-center rounded-full bg-mermerTheme px-10 py-3 text-base"
                  placeholder={t('KM_PAGE.SEARCH_PLACEHOLDER')}
                />
                <div className="absolute left-4 text-base font-bold">
                  <RiSearchLine />
                </div>
              </div>
              {/* Info: (20230717 - Julian) sort by */}
              <div className="flex items-center space-x-2 text-base">
                <TbSortDescending />
                <p>{t('KM_PAGE.SORT_BY_TITLE')}</p>
              </div>
            </div>
            <div className="gap"></div>
          </div>
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

export default KnowledgeManagementPage;
