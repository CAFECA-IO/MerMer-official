import React, { Dispatch, SetStateAction, forwardRef } from 'react'
import type { Category } from '@prisma/client';
import Image from 'next/image';
type Props = {
  tag: Category,
  setTags: Dispatch<SetStateAction<Category[]>>,
}

export const Tag = forwardRef<HTMLDivElement, Props>(({ tag, setTags }, ref) => {
  function handleDeleteClick() {
    setTags((prev) => prev.filter((prevTag) => prevTag.id !== tag.id));
  }

  return (
    <div ref={ref} className='flex h-6 items-center justify-center gap-2 rounded-full bg-lightBlue1 px-2 py-1 font-Dosis text-[#21272A]'>
      <span className='text-[14px]'>{tag.name}</span>
      <button onClick={handleDeleteClick}>
        <Image src="/elements/cross.svg" alt="Close" height={7} width={7} />
      </button>
    </div>
  );
})