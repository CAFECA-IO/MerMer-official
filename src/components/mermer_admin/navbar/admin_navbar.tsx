import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {MERURL} from '../../../constants/url';
import {merMerAdminConfig} from '../../../constants/config';
import {useRouter} from 'next/router';
import NavItem from './nav_item';
import NavUserProfile from './nav_user_profile';
import {getCookieByName, getUserDataLanguageName} from '../../../lib/common';

type Props = {
  className?: string;
};

export default function Navbar({className}: Props) {
  const navItems = [
    {
      iconSrc: '/elements/star.svg',
      tagName: 'Dashboard',
      activeUrls: [merMerAdminConfig.dashboardPageUrl],
    },
    {
      iconSrc: '/elements/Group17.svg',
      tagName: 'Knowledge Management',
      activeUrls: [merMerAdminConfig.browsePageUrl, merMerAdminConfig.editPageUrl],
    },
    // ... other nav items
  ];

  const [userProfile, setUserProfile] = useState({
    userName: 'Not Found',
    userAvatar: merMerAdminConfig.defaultUserAvatarUrl,
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchUserProfile() {
      const deWT = getCookieByName('DeWT');
      try {
        const res = await fetch('/api/users/profile', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({deWT}),
        });

        if (!res.ok) throw new Error('Response is not ok');

        const userData = await res.json();
        if (userData?.success && userData?.data) {
          const userDataLanguage = getUserDataLanguageName(router);
          setUserProfile({
            userName: userData.data[userDataLanguage].name,
            userAvatar: userData.data.avatar,
          });
        }
      } catch (error) {
        throw new Error(`Failed to fetch user profile: ${error}`);
      }
    }

    fetchUserProfile();
  }, [router]);

  const handleClick = (url: string) => {
    router.push(url);
    // additional click handling logic if needed
  };

  const navItemsDiv = (
    <div className="flex w-full flex-col gap-2">
      {navItems.map(item => (
        <NavItem
          key={item.tagName}
          iconSrc={item.iconSrc}
          tagName={item.tagName}
          activeUrls={item.activeUrls}
          clickHandler={() => handleClick(item.activeUrls[0])}
        />
      ))}
    </div>
  );
  return (
    <div
      className={`flex h-full flex-col items-center justify-start gap-4 rounded-e-[20px] bg-mermerTheme px-4 py-6 shadow-adminNavbar ${className}`}
    >
      <Link href={MERURL.HOME}>
        <Image
          src="/logos/mermer_logo.svg"
          alt="MerMer_logo"
          width={0}
          height={0}
          style={{width: '192px', height: 'auto'}}
        />
      </Link>
      <NavUserProfile userProfile={userProfile} />
      {navItemsDiv}
    </div>
  );
}
