import React, { Dispatch, useState } from 'react'
import Image from 'next/image';
import MerMerDropdownButton from '../../mermer_button/mermer_dropdown_button'
import useConfirm from '../../../contexts/confirm_context/use_confirm';
import { useAlerts } from '../../../contexts/alert_context';
import { IAllKmMeta, IKmMeta } from '../../../interfaces/km';

type Props = {
  kmId: string,
  kmTitle: string,
  isPublish: boolean,
  setIsPublish: React.Dispatch<React.SetStateAction<boolean>>
  className?: string,
  kmAllMeta: IAllKmMeta,
  setKmAllMeta: Dispatch<React.SetStateAction<IAllKmMeta>>,
}


export default function KmCardDropdown({ kmId, kmTitle, isPublish, setIsPublish, kmAllMeta, setKmAllMeta, className }: Props) {
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

  const [isOpen, setIsOpen] = useState(false);
  const { confirm } = useConfirm();

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation(); // Info (202400125) Murky card 點擊下拉選單時才可以正確點到，不會跳轉
    setIsOpen(!isOpen);
  }
  const handlePublishUnpublishOnclick = (goPublish: boolean) => {

    const goto = goPublish ? 'publish' : 'unpublish';
    const goPublishOrInpublish = async (event: React.MouseEvent) => {
      event.stopPropagation();
      const res = await fetch(`/api/kmEdit/${kmId}/${goto}`, {
        method: 'PUT',
      });

      if (!res.ok) {
        emitAlert('error', 'Change Publish state failed');
        return;
      }


      const { ispublish: kmIsPublished } = await res.json();
      setIsPublish(kmIsPublished);
      if (goPublish) {
        const newPublishedKmMeta = kmAllMeta.drafts.kmMetas?.find(km => km.id === kmId);
        if (!newPublishedKmMeta) return;
        newPublishedKmMeta.isPublished = goPublish;
        const allPublishedKmMeta = kmAllMeta.published.kmMetas ? [newPublishedKmMeta, ...kmAllMeta.published.kmMetas] : [newPublishedKmMeta];
        const updatePublishKmMeta = allPublishedKmMeta.filter(km => km !== undefined) as IKmMeta[] | undefined;

        setKmAllMeta({
          drafts: {
            publishStatus: 'Drafts',
            kmMetas: kmAllMeta.drafts.kmMetas?.filter(km => km.id !== kmId)
          },
          published: {
            publishStatus: 'Published',
            kmMetas: updatePublishKmMeta
          }
        });
      } else {

        const newUnpublishedKmMeta = kmAllMeta.published.kmMetas?.find(km => km.id === kmId);
        if (!newUnpublishedKmMeta) return;
        newUnpublishedKmMeta.isPublished = goPublish;
        const allUnpublishedKmMeta = kmAllMeta.drafts.kmMetas ? [newUnpublishedKmMeta, ...kmAllMeta.drafts.kmMetas] : [newUnpublishedKmMeta];
        const updateUnpublishKmMeta = allUnpublishedKmMeta.filter(km => km !== undefined) as IKmMeta[] | undefined;

        setKmAllMeta({
          drafts: {
            publishStatus: 'Drafts',
            kmMetas: updateUnpublishKmMeta
          },
          published: {
            publishStatus: 'Published',
            kmMetas: kmAllMeta.published.kmMetas?.filter(km => km.id !== kmId)
          }
        });
      }

      emitAlert('success', `Change Publish state to ${goPublish ? 'Published' : 'Unpublished'}`);
    }

    return goPublishOrInpublish;
  }

  const handleDeleteOnclick = async (event: React.MouseEvent) => {
    event.stopPropagation();

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

    setKmAllMeta({
      drafts: {
        publishStatus: 'Drafts',
        kmMetas: kmAllMeta.drafts.kmMetas?.filter(km => km.id !== kmId)
      },
      published: {
        publishStatus: 'Published',
        kmMetas: kmAllMeta.published.kmMetas?.filter(km => km.id !== kmId)
      }
    });
    return;
  }
  return (
    <div className={`${className} z-50`}>
      <button onClick={toggleDropdown} className='size-[44px] bg-darkBlue1/0 p-[7px]'>
        <Image
          src='/elements/more-horizontal.svg'
          height={30}
          width={30}
          alt='More icon'
        />
      </button>
      {
        isOpen && (
          <div className='absolute left-[-96px] flex flex-col items-center justify-center rounded-[5px] bg-mermerTheme shadow-drop'>
            <MerMerDropdownButton
              onClick={handlePublishUnpublishOnclick(!isPublish)}
              hidden={isPublish}
              className='h-[44px] w-[131px] rounded-t-[5px] border-b-[0.5px] border-b-lightWhite1'
            >
              <div className='flex  items-center justify-center gap-2'>
                <Image
                  src='/elements/publish.svg'
                  height={24}
                  width={24}
                  alt='Publish icon'
                />
                <span className='text-base'>
                  Publish
                </span>
              </div>
            </MerMerDropdownButton>
            <MerMerDropdownButton
              onClick={handlePublishUnpublishOnclick(!isPublish)}
              hidden={!isPublish}
              className='h-[44px] w-[131px] rounded-t-[5px] border-b-[0.5px] border-b-lightWhite1'
            >
              <div className='flex items-center justify-center gap-2'>
                <Image
                  src='/elements/unpublished.svg'
                  height={24}
                  width={24}
                  alt='unpublish icon'
                />
                <span className='text-base'>
                  Unpublish
                </span>
              </div>
            </MerMerDropdownButton>
            <MerMerDropdownButton
              onClick={handleDeleteOnclick}
              className='flex h-[44px] w-[131px] rounded-b-[5px]'
            >
              <div className='flex items-center justify-center gap-2'>
                <Image
                  src='/elements/delete.svg'
                  height={20}
                  width={20}
                  alt='delete icon'
                />
                <span className='text-base'>
                  Delete
                </span>
              </div>
            </MerMerDropdownButton>
          </div>
        )
      }
    </div>
  )
}