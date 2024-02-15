import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Layout from '../../../components/mermer_admin/layout/admin_layout'
import Head from 'next/head';
import KmCardDisplay from '../../../components/mermer_admin/km_card/km_card_display';
import Pagination from '../../../components/mermer_admin/pagination/pagination';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ILocale } from '../../../interfaces/locale';
import SearchBar from '../../../components/mermer_admin/search_bar/SearchBar';
import DraftOrPublishTags from '../../../components/mermer_admin/draft_or_publish_tag/draft_or_publish_tags';
import MerMerButton from '../../../components/mermer_button/mermer_button';
import { IAllKmMeta, IKmMeta } from '../../../interfaces/km';
import useWindowDimensions from '../../../lib/hooks/use_window_dimensions';
// type Props = {}

const getStaticPropsFunction = async ({ locale }: ILocale) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'footer'])),
  },
});

export const getStaticProps = getStaticPropsFunction;

const getCardsDisplayPerPage = (screenHeight: number | undefined | null): number => {
  // if (screenHeight && screenHeight >= 960) return 4
  return 3
}

export default function index() {
  const defaultKmAllMeta: IAllKmMeta = {
    drafts: {
      publishStatus: 'Drafts',
      kmMetas: []
    },
    published: {
      publishStatus: 'Published',
      kmMetas: []
    }
  }

  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { height: _, width: screenWidth } = useWindowDimensions();
  const cardsRenderPerPage = getCardsDisplayPerPage(screenWidth);

  const [kmAllMeta, setKmAllMeta] = useState<IAllKmMeta>(defaultKmAllMeta)
  const [renderedKmMeta, setRenderedKmMeta] = useState<IKmMeta[]>([])
  const [activePublishStatus, setActivePublishStatus] = useState<'drafts' | 'published'>(
    () => {
      // 記得上次是在draft還是published
      if (typeof localStorage === 'undefined') return 'drafts'
      const savedStatus = localStorage.getItem('activePublishStatus');
      return savedStatus === 'drafts' || savedStatus === 'published' ? savedStatus : 'drafts';
    }
  );

  useEffect(() => {
    // 把draft或publish的狀態存在localstorage
    localStorage.setItem('activePublishStatus', activePublishStatus);
  }, [activePublishStatus]);

  useEffect(() => {
    const fetchAllKmMeta = async () => {
      const response = await fetch('/api/kms');
      if (!response.ok) return null;
      const json = await response.json();
      setKmAllMeta(json);
    };
    fetchAllKmMeta();
  }, []);

  useEffect(() => {
    if (!search) {
      setRenderedKmMeta(kmAllMeta[activePublishStatus].kmMetas || []);
      return;
    }
    const filteredKmMeta = kmAllMeta[activePublishStatus].kmMetas?.filter(km => {
      const isRendered: boolean = (
        km.title.toLowerCase().includes(search.toLowerCase()) ||
        km.categories.some(category => category.label.toLowerCase().includes(search.toLowerCase())) ||
        km.topic.name.toLowerCase().includes(search.toLowerCase())
      )
      return isRendered
    });
    setRenderedKmMeta(filteredKmMeta || []);
  }, [search, kmAllMeta, activePublishStatus]);

  return (
    <>
      <Head>
        <title>MerMer Admin - KM</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="canonical" href="https://mermer.com.tw/" />
      </Head>
      <Layout>
        <div className='flex w-[500px] flex-col gap-6 px-10 py-6 font-Dosis md:w-[640px] lg:w-[768px] xl:w-[1024px]'>
          <h4 className='m-0 p-0 text-2xl font-bold'>Knowledge Management</h4>
          <div className='flex w-full justify-between'>
            <DraftOrPublishTags kmAllMetas={kmAllMeta} activePublishStatus={activePublishStatus} setActivePublishStatus={setActivePublishStatus} />
            {/* 最後回來改search */}
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className='flex w-full items-center justify-between'>
            <span>{renderedKmMeta.length} Articles</span>
            {/* 記得幫加號新增新的文章 */}
            <MerMerButton className='flex size-[44px] items-center justify-center rounded-full'>
              <Image
                src="/elements/plus.svg"
                width={16}
                height={16}
                alt="Plus sign"
              />
            </MerMerButton>
          </div>
          <KmCardDisplay kmCards={renderedKmMeta} cardsRenderPerPage={cardsRenderPerPage} activePage={activePage} />
          <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={Math.ceil((renderedKmMeta.length) / cardsRenderPerPage)}></Pagination>
        </div>
      </Layout>
    </>
  )
}