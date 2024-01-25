import React from 'react';
import Image from 'next/image';
type Props = {
  userProfile: {
    userName: string,
    userAvatar: string
  };
};

export default function NavUserProfile({ userProfile: {userName, userAvatar} }: Props) {
  return (
    <div className='flex h-auto w-[224px] items-center justify-center px-0 py-6'>
      <Image
      className='rounded-full'
        src={userAvatar}
        width={48}
        height={48}
        alt='userIcon'
      />
      <div className='flex items-center justify-center px-3 py-4'>
        <span className='text-[20px]'>{userName}</span>
      </div>
    </div>
  )
}