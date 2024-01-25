import React, { useState } from 'react'
import Layout from '../../../components/mermer_admin/layout/admin_layout'
import Head from 'next/head';
import KmCardDisplay from '../../../components/mermer_admin/km_card/km_card_display';
import Pagination from '../../../components/mermer_admin/pagination/pagination';
// type Props = {}

export default function index() {
  const [activePage, setActivePage] = useState(1)
  return (
    <>
      <Head>
        <title>MerMer Admin - Login</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="canonical" href="https://mermer.com.tw/" />
      </Head>
      <Layout>
        <div className='flex flex-col gap-6 px-10 py-6'>
          <KmCardDisplay />
        </div>
        <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={10}></Pagination>
      </Layout>
    </>
  )
}