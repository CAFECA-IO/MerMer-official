import React, { useState } from 'react'
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
// type Props = {}

const getStaticPropsFunction = async ({ locale }: ILocale) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'footer'])),
  },
});

export const getStaticProps = getStaticPropsFunction;

export default function index() {
  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")

  const tagDatas = [
    {
      tagName: 'Drafts',
      amount: 100,
    },
    {
      tagName: 'Published',
      amount: 5,
    }
  ];

  const [activeTag, setActiveTag] = useState(tagDatas[0].tagName)
  return (
    <>
      <Head>
        <title>MerMer Admin - Login</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="canonical" href="https://mermer.com.tw/" />
      </Head>
      <Layout>
        <div className='flex flex-col gap-6 px-10 py-6 font-Dosis max-w-[1024px]'>
          <h4 className='m-0 p-0 text-2xl font-bold'>Knowledge Management</h4>
          <div className='flex w-full justify-between'>
            <DraftOrPublishTags tagDatas={tagDatas} activeTag={activeTag} setActiveTag={setActiveTag} />
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className='flex w-full justify-between items-center'>
            <span>{tagDatas.find(tagData => tagData.tagName === activeTag)?.amount} Articles</span>
            <MerMerButton className='h-[44px] w-[44px] flex justify-center items-center rounded-full'>
              <Image
                src="/elements/plus.svg"
                width={16}
                height={16}
                alt="Plus sign"
              />
            </MerMerButton>
          </div>
          <KmCardDisplay />
          <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={15}></Pagination>
        </div>
      </Layout>
    </>
  )
}