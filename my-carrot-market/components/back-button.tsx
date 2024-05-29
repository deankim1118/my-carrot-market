'use client';

import { BackspaceIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  const onBackClick = () => {
    router.back();
  };

  return (
    <button
      onClick={onBackClick}
      className='absolute left-1 top-4 text-neutral-200'
    >
      <BackspaceIcon className='size-10' />
    </button>
  );
}
