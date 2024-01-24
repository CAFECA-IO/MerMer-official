import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {MERURL} from '../../../constants/url';
import { merMerAdminConfig } from '../../../constants/config';
import { useRouter } from 'next/router';
import NavItem from './nav_item';

type Props = {
  className?: string
}

export default function Navbar({className}: Props) {
  const router = useRouter()
  const [activeUrl, setActiveUrl] = useState(merMerAdminConfig.browsePageUrl);

  const navItems = [
    { iconSrc: '/elements/star2.svg', tagName: 'Dashboard', activeUrl: merMerAdminConfig.dashboardPageUrl },
    { iconSrc: '/elements/Group17.svg', tagName: 'Knowledge Management', activeUrl: merMerAdminConfig.browsePageUrl },
    // ... other nav items
  ];

  const handleClick = (url: string) => {
    setActiveUrl(url);
    router.push(url)
    // additional click handling logic if needed
  };

  const navItemsDiv = (
    <div className='flex w-full flex-col gap-2'>
    {navItems.map((item) => (
      <NavItem
        key={item.activeUrl}
        iconSrc={item.iconSrc}
        tagName={item.tagName}
        activeUrl={activeUrl}
        clickHandler={() => handleClick(item.activeUrl)}
      />
    ))}
    </div>
  );
  return (
    <div className={`flex h-full flex-col items-center justify-start gap-4 rounded-e-[20px] bg-mermerTheme px-4 py-6 shadow-adminNavbar ${className}`}>
      <Link href={MERURL.HOME}>
        <Image
          src="/logos/mermer_logo.svg"
          alt="MerMer_logo"
          width={0}
          height={0}
          style={{width: '192px', height: 'auto'}}
        />
      </Link>
      {navItemsDiv}
    </div>
  )
}