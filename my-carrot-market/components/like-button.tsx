'use client';

import { dislikePost, likePost } from '@/app/posts/[id]/actions';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { useOptimistic } from 'react';

interface ILikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  postId,
}: ILikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (prevState, payload) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );

  const onClick = async () => {
    reducerFn(undefined);
    if (state.isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-800 transition-colors ${
        state.isLiked
          ? 'bg-orange-500 text-white border-orange-500'
          : 'hover:bg-neutral-800'
      }`}
    >
      <HandThumbUpIcon className='size-5' />
      {state.isLiked ? (
        <span> {state.likeCount}</span>
      ) : (
        <span>Likes ({state.likeCount})</span>
      )}
    </button>
  );
}
