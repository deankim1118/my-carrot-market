import db from '@/lib/db';
import { getGithubAccessToken, getGithubUserProfile } from '@/lib/github-auth';
import { loginWithId } from '@/lib/session';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const access_token = await getGithubAccessToken(code);

  const { username, id, avatar, email } = await getGithubUserProfile(
    access_token
  );

  const user = await db.user.findUnique({
    where: {
      github_id: id + '',
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await loginWithId(user);
    return redirect('/profile');
  }

  const isUsernameExist = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  const newUser = await db.user.create({
    data: {
      username: isUsernameExist ? `${username}-gh` : username,
      github_id: id + '',
      avatar,
      email,
    },
    select: {
      id: true,
    },
  });
  await loginWithId(newUser);
  return redirect('/profile');
}
