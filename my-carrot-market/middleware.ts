import { NextRequest } from 'next/server';
import { getSession } from './lib/session';

interface IRoutes {
  [key: string]: boolean;
}

const publicOnlyUrls: IRoutes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
  '/github/start': true,
  '/github/complete': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return Response.redirect(new URL('/login', request.url));
    }
  } else {
    if (exists) {
      return Response.redirect(new URL('/home', request.url));
    }
  }
}
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
