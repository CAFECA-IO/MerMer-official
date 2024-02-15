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

// Test alert
import { useAlerts } from '../../../contexts/alert_context';
import { IKm, IKmForSave, IKmTag } from '../../../interfaces/km';
import { Topic } from '@prisma/client';
import KmDescription from '../../../components/mermer_admin/km_meta/km_description';
import MerMerButton from '../../../components/mermer_button/mermer_button';

export default function KmEdit({ }) {
  const router = useRouter();
  const kmId = router.query.kmId;

  // Editor ref，可以用來直接控制Ｍdx editor
  const editorRef = useRef<MDXEditorMethods>(null);

  // For KmMeta
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isNewImage, setIsNewImage] = useState<boolean>(false);
  const [kmTitle, setKmTitle] = useState<string>('');
  const [selectedKmTopic, setSeletedKmTopic] = useState<string>('');
  const [kmDescription, setKmDescription] = useState<string>('');
  const [kmTags, setKmTags] = useState<IKmTag[]>([])
  const [isPublished, setIsPublished] = useState<boolean>(false);

  // Alert
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

  // Fetch km
  const [km, setKm] = useState<IKm>();
  useEffect(() => {
    if (kmId) {
      const fetchKm = async () => {
        const response = await fetch(`/api/kms/${kmId}`);

        if (!response.ok) {
          emitAlert('error', "Can't fetch km");
          return null
        }

        const json = await response.json();
        setKm(json);
        setKmTitle(json.title);
        setKmDescription(json.description);
        setSeletedKmTopic(json.topic.name);
        setKmTags(json.categories);
        setIsPublished(json.isPublished);
        // read preview image
        const imgResponse = await fetch(json.picture);
        const imgBlob = await imgResponse.blob();
        const imgFile = new File([imgBlob], imgBlob.name, { type: imgBlob.type });
        setSelectedImage(imgFile);
      };
      fetchKm();
    }
  }, [kmId]);

  // Fetch all topic
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

  // Save or publish km
  async function saveKm(publishNow: boolean) {
    const formData = new FormData();
    const alertWording = publishNow ? 'Publish' : 'Save';
    const kmForSave: IKmForSave = {
      title: kmTitle,
      selectedKmTopicName: selectedKmTopic,
      description: kmDescription,
      tags: kmTags,
      isNewImage,
      mdFile: editorRef.current?.getMarkdown() || '',
      isPublished: publishNow || isPublished,
    };

    formData.append('kmForSave', JSON.stringify(kmForSave));
    if (isNewImage && selectedImage) {
      formData.append('image', selectedImage);
    }
    const response = await fetch(`/api/kms/${kmId}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      emitAlert('error', `Can't ${alertWording} KM`);
      return null
    }

    emitAlert('success', `${alertWording} Put KM Complete`);
    if (publishNow) {
      router.push('/admin/browse');
    }
    return null
  }

  // 如果有圖片路徑卻沒有 圖片load進來，reuturn null
  if (km && km.picture && !selectedImage) return null;

  return km && (
    <>
      <Head>
        <title>KM Edit - {km.title}</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="canonical" href="https://mermer.com.tw/" />
      </Head>
      <Layout>
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
            <div className='flex items-center justify-center gap-2'>
              <button
                className='group relative box-border w-fit rounded-full border-2 border-lightWhite1 bg-darkBlue3/0 px-10 py-[10px] text-[18px] font-bold text-lightWhite1 hover:cursor-pointer'
                onClick={() => saveKm(true)}
              >
                <span className='relative z-50 flex items-center'>Publish</span>
                <span
                  className={`absolute left-0 top-0 size-full rounded-full bg-buttonHover opacity-0 shadow-buttonHover transition-all duration-300 ease-in-out group-hover:opacity-100`}
                ></span>
              </button>
              <MerMerButton
                className='px-10 py-[10px] text-[18px] font-bold'
                onClick={() => saveKm(false)}
              >Save</MerMerButton>
            </div>
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
