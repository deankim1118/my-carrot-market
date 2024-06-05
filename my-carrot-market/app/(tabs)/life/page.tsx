import db from '@/lib/db';
import { formatToTimeAgoDetailVersion } from '@/lib/utils';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      _count: {
        select: {
          Like: true,
          Comment: true,
        },
      },
    },
  });
  return posts;
}

export const metadata = {
  title: 'Life',
};

export default async function Life() {
  const posts = await getPosts();
  return (
    <div className='p-5 flex flex-col'>
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className='pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex  flex-col gap-2 last:pb-0 last:border-b-0'
        >
          <h2 className='text-white text-lg font-semibold'>{post.title}</h2>
          <p>{post.description}</p>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex gap-4 items-center'>
              <span>
                {formatToTimeAgoDetailVersion(post.created_at.toString())}
              </span>
              <span>·</span>
              <span>views {post.views}</span>
            </div>
            <div className='flex gap-4 items-center *:flex *:gap-1 *:items-center'>
              <span>
                <HandThumbUpIcon className='size-4' />
                {post._count.Like}
              </span>
              <span>
                <ChatBubbleBottomCenterIcon className='size-4' />
                {post._count.Comment}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
