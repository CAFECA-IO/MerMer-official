import React from 'react'
import Layout from '../../../components/mermer_admin/layout/admin_layout'
import Head from 'next/head';
// type Props = {}

export default function index() {
  return (
    <>
      <Head>
        <title>MerMer Admin - Login</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="canonical" href="https://mermer.com.tw/" />
      </Head>
      <Layout>
        <div>U are in</div>
      </Layout>
    </>
  )
}