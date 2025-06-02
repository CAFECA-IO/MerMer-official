import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Layout from '../../../components/mermer_admin/layout/admin_layout';
import {ForwardRefEditor} from '../../../components/mdx_editor/ForwardRefEditor';
import Image from 'next/image';

// Editor pacage
import type {MDXEditorMethods} from '@mdxeditor/editor';
import KmMeta from '../../../components/mermer_admin/km_meta/km_meta';
import Tags from '../../../components/mermer_admin/tags/tags';
import {IKm, IKmTag} from '../../../interfaces/km';
import KmDescription from '../../../components/mermer_admin/km_meta/km_description';
import EditPageSavePublishDelete from '../../../components/mermer_admin/edit_page_save_publish_delete/edit_page_save_publish_delete';
import Cookies from 'js-cookie';
import {GetServerSideProps} from 'next';
import {Topic} from '@prisma/client';

interface IKmAndAssociatedData extends IKm {
  topic: {
    id: number;
    name: string;
  };
  author: {
    email: string;
  };
  categories: {
    id: number;
    label: string;
    value: string;
  }[];
}
type Props = {
  km: IKmAndAssociatedData;
  kmTitleFromServer: string;
  kmDescriptionFromServer: string;
  selectedKmTopicFromServer: string;
  kmTagsFromServer: IKmTag[];
  isPublished: boolean;
  kmTopics: Topic[];
};
export default function KmEdit({
  km,
  kmTitleFromServer,
  kmDescriptionFromServer,
  selectedKmTopicFromServer,
  kmTagsFromServer,
  isPublished,
  kmTopics,
}: Props) {
  const router = useRouter();
  const kmId = router.query.kmId;
  if (typeof kmId !== 'string') return <div>loading...</div>;

  // Info: (20240217 - Murky) Editor ref，可以用來直接控制Ｍdx editor
  const editorRef = useRef<MDXEditorMethods>(null);

  // Info: (20240217 - Murky) For KmMeta
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isNewImage, setIsNewImage] = useState<boolean>(false);
  const [kmTitle, setKmTitle] = useState<string>(kmTitleFromServer);
  const [selectedKmTopic, setSeletedKmTopic] = useState<string>(selectedKmTopicFromServer);
  const [kmDescription, setKmDescription] = useState<string>(kmDescriptionFromServer);
  const [kmTags, setKmTags] = useState<IKmTag[]>(kmTagsFromServer);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  // Info: (20240216 - Murky) Fetch km
  useEffect(() => {
    // Info: (20240216 - Murky) 如果沒有從cookie取到userEmail，或者cookie的userEmail跟km的author的email不一樣，就返回上一頁
    const userEmailFromCookies = Cookies.get('userEmail');
    if (!userEmailFromCookies || userEmailFromCookies !== km?.author?.email) {
      // return router.back();
    }
    // Info: (20240216 - Murky) read preview image
    const fetchImage = async () => {
      if (km.picture) {
        const imgResponse = await fetch(km.picture);
        const imgBlob = await imgResponse.blob();
        const imgFile = new File([imgBlob], imgBlob.name, {type: imgBlob.type});
        setSelectedImage(imgFile);
      }
    };
    fetchImage();
  }, []);

  // Info: (20240216 - Murky) Fetch all topic

  // Info: (20240220 - Murky) Prevent Unsave leave
  useEffect(() => {
    const warningText = 'You have unsaved changes - are you sure you wish to leave this page?';

    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (isSaved) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (isSaved) return;

      if (window.confirm(warningText)) return;
      router.events.emit('routeChangeError');
      throw 'routeChange aborted.';
    };

    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    };
  }, [isSaved]);

  // Info: (20240216 - Murky) 如果有圖片路徑卻沒有 圖片load進來，reuturn null
  if (km && km.picture && !selectedImage) return null;

  return (
    km && (
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
              <div className="flex flex-row items-center justify-center gap-2">
                <div
                  className="flex cursor-pointer gap-2"
                  onClick={() => router.push('/admin/browse')}
                >
                  <Image src="/elements/left-arrow.svg" height={24} width={24} alt="arrow" />
                  <h1 className="text-2xl font-bold">Create new KM</h1>
                </div>
                <div>
                  <span className="text-xs text-lightGray1">{isSaved ? 'Saved' : 'Not Saved'}</span>
                </div>
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
                isSaved={isSaved}
                setIsSaved={setIsSaved}
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
            <ForwardRefEditor
              className=""
              markdown={km.mdFile}
              ref={editorRef}
              onChange={() => {
                setIsSaved(false);
              }}
            />
          </div>
        </Layout>
      </>
    )
  );
}
export const getServerSideProps: GetServerSideProps = async context => {
  const host = context.req.headers.host;
  const tmpProtocol = context.req.headers['x-forwarded-proto'] ? 'https' : 'http';
  // Info: (20240318 - Luphia) somtimes the protocol would be 'https,http' or 'http,https' so we need to split it
  const protocol = tmpProtocol.toString().split(',')[0];
  if (!host) {
    return {
      notFound: true,
    };
  }
  // Info: (20240318 - Luphia) Fetch data from external API
  const kmId = context.query.kmId as string;
  const response = await fetch(`${protocol}://${host}/api/kmEdit/${kmId}`);

  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const json = (await response.json()) as IKmAndAssociatedData;
  const responseTopic = await fetch(`${protocol}://${host}/api/topics`);
  if (!responseTopic.ok) {
    return {
      notFound: true,
    };
  }
  const jsonTopic = (await responseTopic.json()) as Topic[];
  // Info: (20240318 - Luphia) Pass data to the page via props
  return {
    props: {
      km: json,
      kmTitleFromServer: json.title,
      kmDescriptionFromServer: json.description,
      selectedKmTopicFromServer: json.topic.name,
      kmTagsFromServer: json.categories,
      isPublished: json.isPublished,
      kmTopics: jsonTopic,
    },
  };
};
