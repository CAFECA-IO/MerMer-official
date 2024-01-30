import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../../components/mermer_admin/layout/admin_layout';
// type Props = {};

export default function KmEdit({ }) {
  const router = useRouter();
  const kmId = router.query.kmId;
  return (
    <>
      <Head>
        <title>KM Edit - {kmId}</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="canonical" href="https://mermer.com.tw/" />
      </Head>
      <Layout>
        <div className="flex items-start justify-center px-10 py-6">
          <div className="flex flex-col gap-6"></div>
        </div>
      </Layout>
    </>
  );
}
