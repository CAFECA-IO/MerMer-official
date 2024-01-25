import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';

type Props = {
  iconSrc: string,
  tagName: string,
  activeUrl: string,
  clickHandler: () => void
}


export default function NavItem({iconSrc, tagName, activeUrl, clickHandler}: Props) {
  const router = useRouter()
  const isActive = router.pathname === activeUrl
  return (
    <div
      className={`flex h-[44px] w-full
        items-center justify-center gap-2
        rounded-[5px]  px-6
        py-[2px]
        ${isActive ? 'bg-darkBlue3/100' : 'bg-darkBlue3/0 hover:bg-dropDownHover hover:text-lightBlue1'}`}
      onClick={clickHandler}
    >
      <Image
        src={iconSrc}
        alt={`${tagName} icon`}
        width={24}
        height={24}
        style={{width: '24px', height: '24px'}}
      />
      <span className='grow text-sm'>{tagName}</span>
    </div>
  );
}