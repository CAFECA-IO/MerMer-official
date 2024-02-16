import React, { useState } from 'react'
import Image from 'next/image';
import MerMerDropdownButton from '../../mermer_button/mermer_dropdown_button'
import useConfirm from '../../../contexts/confirm_context/use_confirm';

type Props = {
  kmId: string,
  kmTitle: string,
  isPublish: boolean,
  setIsPublish: React.Dispatch<React.SetStateAction<boolean>>
  className?: string,
}


export default function KmCardDropdown({ kmId, kmTitle, isPublish, setIsPublish, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { confirm } = useConfirm();

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation(); // Info (202400125) Murky card 點擊下拉選單時才可以正確點到，不會跳轉
    setIsOpen(!isOpen);
  }
  const handlePublishOnclick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    const res = await fetch(`/api/km/${kmId}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        published: !isPublish,
      })
    });

    if (!res.ok) {
      window.alert('Change Publish state faild');
      return;
    }

    setIsPublish(!isPublish);
  }

  const handleDeleteOnclick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    const isConfirmed = await confirm(`Are you sure you want to delete "${kmTitle}" this article?`);

    if (!isConfirmed) return

    const res = await fetch(`/api/km/${kmId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      window.alert('Delete faild');
      return;
    }
  }
  return (
    <div className={`${className}`}>
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
              onClick={handlePublishOnclick}
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
              onClick={handlePublishOnclick}
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