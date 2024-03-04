import React from 'react';
import Image from 'next/image';
type Props = {
  userProfile: {
    userName: string,
    userAvatar: string
  };
};

export default function NavUserProfile({ userProfile: { userName, userAvatar } }: Props) {
  return (
    <div className='flex h-auto w-[224px] items-center justify-center px-0 py-6'>

      <div className="relative flex size-48px items-center justify-center overflow-hidden rounded-full bg-lightGray2">
        <Image
          className='size-12 rounded-full'
          src={userAvatar}
          fill
          style={{ objectFit: 'cover' }}
          alt='userIcon'

        />
      </div>
      <div className='flex items-center justify-center px-3 py-4'>
        <span className='text-[20px]'>{userName}</span>
      </div>
    </div>
  )
}