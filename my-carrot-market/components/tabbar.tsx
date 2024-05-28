'use client';

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathName = usePathname();
  return (
    <div className='fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800'>
      <Link href='/home' className='tab-link'>
        {pathName === '/home' ? (
          <SolidHomeIcon className='w-7 h-7' />
        ) : (
          <OutlineHomeIcon className='w-7 h-7' />
        )}
        <span>Home</span>
      </Link>
      <Link href='/life' className='tab-link'>
        {pathName === '/life' ? (
          <SolidNewspaperIcon className='w-7 h-7' />
        ) : (
          <OutlineNewspaperIcon className='w-7 h-7' />
        )}
        <span>Life</span>
      </Link>
      <Link href='/chats' className='tab-link'>
        {pathName === '/chats' ? (
          <SolidChatIcon className='w-7 h-7' />
        ) : (
          <OutlineChatIcon className='w-7 h-7' />
        )}
        <span>Chats</span>
      </Link>
      <Link href='/live' className='tab-link'>
        {pathName === '/live' ? (
          <SolidVideoCameraIcon className='w-7 h-7' />
        ) : (
          <OutlineVideoCameraIcon className='w-7 h-7' />
        )}
        <span>Live Streaming</span>
      </Link>
      <Link href='/profile' className='tab-link'>
        {pathName === '/profile' ? (
          <SolidUserIcon className='w-7 h-7' />
        ) : (
          <OutlineUserIcon className='w-7 h-7' />
        )}
        <span>Profile</span>
      </Link>
    </div>
  );
}
