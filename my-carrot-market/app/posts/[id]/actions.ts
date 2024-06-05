'use server';

import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { revalidateTag } from 'next/cache';

export async function likePost(postId: number) {
  // await new Promise((r) => setTimeout(r, 3000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (err) {}
}

export async function dislikePost(postId: number) {
  // await new Promise((r) => setTimeout(r, 3000));
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          postId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (err) {}
}