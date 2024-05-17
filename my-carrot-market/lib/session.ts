import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface ISessionContent {
  id?: number;
}

export default function getSession() {
  return getIronSession<ISessionContent>(cookies(), {
    cookieName: 'yummy-carrot',
    password: process.env.COOKIE_PASSWORD!,
  });
}
