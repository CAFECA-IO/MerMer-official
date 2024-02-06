import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../../components/mermer_admin/layout/admin_layout';
import { ForwardRefEditor } from '../../../components/mdx_editor/ForwardRefEditor';

// Editor pacage
import type { MDXEditorMethods } from '@mdxeditor/editor';
import KmMeta from '../../../components/mermer_admin/km_meta/km_meta';
import Tags from '../../../components/mermer_admin/tags/tags';

export default function KmEdit({ }) {
  const router = useRouter();
  const kmId = router.query.kmId;

  // Editor ref，可以用來直接控制Ｍdx editor
  const editorRef = useRef<MDXEditorMethods>(null);

  // For KmMeta
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [kmTitle, setKmTitle] = useState<string>('');
  const [selectedKmTopic, setSeletedKmTopi] = useState<string>('');

  return (
    <>
      <Head>
        <title>KM Edit - {kmId}</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="canonical" href="https://mermer.com.tw/" />
      </Head>
      <Layout>
        <div className="flex size-full flex-col items-start justify-center gap-6 px-10 py-6">
          <div className="flex flex-col gap-6">{kmId}</div>
          <KmMeta
            setSelectedImage={setSelectedImage}
            kmTitle={kmTitle}
            setKmTitle={setKmTitle}
            selectedKmTopic={selectedKmTopic}
            setSeletedKmTopic={setSeletedKmTopi}
          />
          <Tags />
          {/* MDX editor, demo */}
          {/* <button onClick={() => editorRef.current?.setMarkdown('new markdown')}>Set new markdown</button>
          <button onClick={() => editorRef.current?.insertMarkdown('new markdown to insert')}>Insert new markdown</button>

          <button onClick={() => console.log(editorRef.current?.getMarkdown())}>Get markdown</button> */}
          <ForwardRefEditor className='' markdown='Hellow' ref={editorRef} />
        </div>
      </Layout>
    </>
  );
}
