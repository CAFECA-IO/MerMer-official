import React, { Dispatch, use, useEffect } from 'react'
import MerMerButton from '../../mermer_button/mermer_button'
import Image from 'next/image'
import useConfirm from '../../../contexts/confirm_context/use_confirm';
import { IKmForSave, IKmTag } from '../../../interfaces/km';
import { useAlerts } from '../../../contexts/alert_context';
import type { MDXEditorMethods } from '@mdxeditor/editor';
import { useRouter } from 'next/router';

type Props = {
  kmId: string,
  kmTitle: string,
  selectedKmTopic: string,
  kmDescription: string,
  kmTags: IKmTag[],
  editorRef: React.MutableRefObject<MDXEditorMethods | null>,
  isPublished: boolean,
  isNewImage: boolean,
  selectedImage: File | null,
  setIsSaved: Dispatch<React.SetStateAction<boolean>>
}

export default function EditPageSavePublishDelete({
  kmId,
  kmTitle,
  selectedKmTopic,
  kmDescription,
  kmTags,
  editorRef,
  isPublished,
  isNewImage,
  selectedImage,
  setIsSaved
}: Props) {

  const router = useRouter();
  // Info (20240216 - Murky) Global Confirm
  const { confirm } = useConfirm();
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

  useEffect(() => {
    setIsSaved(false);
  }, [kmTitle, selectedKmTopic, kmDescription, kmTags, isNewImage])

  // Info (20240216 - Murky) Save or publish km
  async function saveKm(publishNow: boolean) {
    const formData = new FormData();
    const alertWording = publishNow ? 'Publish' : 'Save';
    const kmForSave: IKmForSave = {
      title: kmTitle,
      selectedKmTopicName: selectedKmTopic,
      description: kmDescription,
      tags: kmTags.map(tag => {
        return { id: tag.id, label: tag.label, value: tag.value }
      }),
      isNewImage,
      mdFile: editorRef.current?.getMarkdown() || '',
      isPublished: publishNow || isPublished,
    };

    formData.append('kmForSave', JSON.stringify(kmForSave));
    if (isNewImage && selectedImage) {
      formData.append('image', selectedImage);
    }
    const response = await fetch(`/api/kmEdit/${kmId}`, {
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

    setIsSaved(true);
    return null
  }

  // Info (20240217 - Murky) Delete km
  const handleDeleteOnclick = async () => {
    const isConfirmed = await confirm(`Are you sure you want to delete "${kmTitle}" this article?`);

    if (!isConfirmed) return

    const res = await fetch(`/api/kmEdit/${kmId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      emitAlert('error', 'Delete failed');
      return;
    }

    emitAlert('success', 'Delete success');

    router.push('/admin/browse');
    return;
  }
  return (
    <div className='flex items-center justify-center gap-2' >
      <button
        className='group relative box-border w-fit rounded-full border-2 border-lightWhite1 bg-darkBlue3/0 px-10 py-[10px] text-[18px] font-bold text-lightWhite1 hover:cursor-pointer'
        onClick={() => saveKm(true)}
      >
        <span className='relative z-10 flex items-center'>Publish</span>
        <span
          className={`absolute left-0 top-0 size-full rounded-full bg-buttonHover opacity-0 shadow-buttonHover transition-all duration-300 ease-in-out group-hover:opacity-100`}
        ></span>
      </button>
      <MerMerButton
        className='px-10 py-[10px] text-[18px] font-bold'
        onClick={() => saveKm(false)}
      >Save</MerMerButton>

      <MerMerButton
        className='flex size-[44px] items-center justify-center rounded-full'
        onClick={handleDeleteOnclick} >
        <Image
          src='/elements/delete.svg'
          height={20}
          width={20}
          alt='trash icon'
        />
      </MerMerButton>
    </div >
  )
}