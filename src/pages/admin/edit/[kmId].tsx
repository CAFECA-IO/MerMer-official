import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../../components/mermer_admin/layout/admin_layout';
import { ForwardRefEditor } from '../../../components/mdx_editor/ForwardRefEditor';
import Image from 'next/image'

// Editor pacage
import type { MDXEditorMethods } from '@mdxeditor/editor';
import KmMeta from '../../../components/mermer_admin/km_meta/km_meta';
import Tags from '../../../components/mermer_admin/tags/tags';
import { useAlerts } from '../../../contexts/alert_context';
import { IKm, IKmTag } from '../../../interfaces/km';
import { Topic } from '@prisma/client';
import KmDescription from '../../../components/mermer_admin/km_meta/km_description';
import EditPageSavePublishDelete from '../../../components/mermer_admin/edit_page_save_publish_delete/edit_page_save_publish_delete';
import Cookies from 'js-cookie';

export default function KmEdit({ }) {


  const router = useRouter();
  const kmId = router.query.kmId;
  if (typeof kmId !== 'string') return (<div>loading...</div>);

  // Info (20240217 - Murky) Editor ref，可以用來直接控制Ｍdx editor
  const editorRef = useRef<MDXEditorMethods>(null);



  // For KmMeta
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isNewImage, setIsNewImage] = useState<boolean>(false);
  const [kmTitle, setKmTitle] = useState<string>('');
  const [selectedKmTopic, setSeletedKmTopic] = useState<string>('');
  const [kmDescription, setKmDescription] = useState<string>('');
  const [kmTags, setKmTags] = useState<IKmTag[]>([])
  const [isPublished, setIsPublished] = useState<boolean>(false);

  // Info (20240216 - Murky) Alert
  const { addAlert, clearAlerts } = useAlerts();
  function emitAlert(severity: 'error' | 'success', message: string) {
    addAlert({
      severity, message, timeout: 3000, handleDismiss: () => {
        setTimeout(() => {
          clearAlerts();
        }, 2000);
      }
    });
  }



  // Info (20240216 - Murky) Fetch km
  const [km, setKm] = useState<IKm>();
  useEffect(() => {
    if (kmId) {
      const fetchKm = async () => {
        const response = await fetch(`/api/kmEdit/${kmId}`);

        if (!response.ok) {
          emitAlert('error', "Can't fetch km");
          return null
        }



        const json = await response.json();

        // Info (20240216 - Murky) 如果沒有從cookie取到userEmail，或者cookie的userEmail跟km的author的email不一樣，就返回上一頁  
        const userEmailFromCookies = Cookies.get('userEmail');
        if (!userEmailFromCookies || userEmailFromCookies !== json?.author?.email) {
          return router.back();
        }

        setKm(json);
        setKmTitle(json.title);
        setKmDescription(json.description);
        setSeletedKmTopic(json.topic.name);
        setKmTags(json.categories);
        setIsPublished(json.isPublished);
        // Info (20240216 - Murky) read preview image
        const imgResponse = await fetch(json.picture);
        const imgBlob = await imgResponse.blob();
        const imgFile = new File([imgBlob], imgBlob.name, { type: imgBlob.type });
        setSelectedImage(imgFile);
      };
      fetchKm();
    }
  }, [kmId]);

  // Info (20240216 - Murky) Fetch all topic
  const [kmTopics, setKmTopics] = useState<Topic[]>([]);
  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch('/api/topics');
      if (!response.ok) {
        emitAlert('error', "Can't fetch kmTopics");
        return null
      }


      const json = await response.json();
      setKmTopics(json);
    };
    fetchTopics();
  }, []);

  // Info (20240216 - Murky) 如果有圖片路徑卻沒有 圖片load進來，reuturn null
  if (km && km.picture && !selectedImage) return null;

  return km && (
    <>
      <Head>
        <title>KM Edit - {km.title}</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="canonical" href="https://mermer.com.tw/" />
      </Head>
      <Layout>
        {/* <ConfirmWraper /> */}
        <div className="flex size-full flex-col items-start justify-center gap-6 px-10 py-6">
          <div className="flex w-full items-center justify-between">
            <div className='flex cursor-pointer gap-2' onClick={() => router.push('/admin/browse')}>
              <Image
                src='/elements/left-arrow.svg'
                height={24}
                width={24}
                alt='arrow'
              />
              <h1 className='text-2xl font-bold'>Create new KM</h1>
            </div>

            <EditPageSavePublishDelete
              kmId={kmId}
              kmTitle={kmTitle}
              selectedKmTopic={selectedKmTopic}
              kmDescription={kmDescription}
              kmTags={kmTags}
              editorRef={editorRef}
              selectedImage={selectedImage}
              isNewImage={isNewImage}
              isPublished={isPublished}
            />
          </div>
          <KmMeta
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setIsNewImage={setIsNewImage}
            kmTitle={kmTitle}
            setKmTitle={setKmTitle}
            selectedKmTopic={selectedKmTopic}
            setSeletedKmTopic={setSeletedKmTopic}
            kmTopics={kmTopics}
          />
          <KmDescription kmDescription={kmDescription} setKmDescription={setKmDescription} />
          <Tags tags={kmTags} setTags={setKmTags} />
          <ForwardRefEditor className='' markdown={km.mdFile} ref={editorRef} />
        </div>
      </Layout>
    </>
  );
}
