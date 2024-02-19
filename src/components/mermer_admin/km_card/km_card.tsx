import React, { Dispatch, useState } from 'react'
import KmCardDropdown from './km_card_dropdown'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IAllKmMeta } from '../../../interfaces/km'
type Props = {
  kmId: string,
  published: boolean,
  title: string,
  date: string,
  view: number,
  share: number,
  cover: string | null,
  kmAllMeta: IAllKmMeta,
  setKmAllMeta: Dispatch<React.SetStateAction<IAllKmMeta>>,
}

export default function KmCard({ kmId, published, title, date, view, share, cover, kmAllMeta, setKmAllMeta }: Props) {
  const parsedDate = new Date(date)
  const router = useRouter()

  function handleClick() {
    router.push(`/admin/edit/${kmId}`)
  }
  const [isPublish, setIsPublish] = useState(published)
  return (
    <div id={kmId} data-tag={"key"} onClick={handleClick} className='relative flex h-[166px] w-full max-w-[944px] cursor-pointer items-center justify-start  gap-6 rounded-[10px] border-[3px] border-darkBlue3 bg-mermerTheme p-2 hover:border-lightBlue1/100'>
      <KmCardDropdown
        className='absolute right-2 top-[23px]'
        kmId={kmId}
        kmTitle={title}
        isPublish={isPublish}
        setIsPublish={setIsPublish}
        kmAllMeta={kmAllMeta}
        setKmAllMeta={setKmAllMeta}
      />
      <div className='relative h-[150px] w-[183px] overflow-hidden'>
        <Image
          src={`${cover}` || '/elements/bluewaves_3.png'}
          alt="cover"
          fill={true}
        />
        {/* <img src={`${cover}` || '/elements/bluewaves_3.png'} alt="cover" className='size-full object-cover' /> */}
      </div>
      <div className='flex w-[585px] flex-col items-start justify-center gap-[11px] font-Dosis text-lightWhite1'>
        <h2 className='text-2xl font-bold '>{title}</h2>
        <div className='flex w-full items-center justify-between text-base'>
          <span>{[parsedDate.getFullYear(), parsedDate.getMonth() + 1, parsedDate.getDate()].join('/')}</span>
          <div className={`${isPublish ? 'flex' : 'hidden'} flex items-center justify-between gap-6`}>
            <div className='flex items-center justify-center gap-2'>
              <Image
                className='opacity-60'
                src='/elements/view.svg'
                height={24}
                width={24}
                alt="view"
              />
              <span>{view}</span>
            </div>
            <div className={`flex items-center justify-center gap-2`}>
              <Image
                className='opacity-60'
                src='/elements/share.svg'
                height={24}
                width={24}
                alt="share"
              />
              <span>{share}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}