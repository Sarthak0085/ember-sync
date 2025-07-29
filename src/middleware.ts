import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// public routes
const publicRoutes = ['/auth/login', '/auth/register', '/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) => pathname === route);
  const isProtectedRoute = pathname.startsWith('/profile');

  // find the cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('firebase_auth_access_token');
  const userIsAuthenticated = !!token;

  if (isProtectedRoute && !userIsAuthenticated) {
    console.log(`Redirecting unauthenticated user from ${pathname} to /login`);
    const loginUrl = new URL('/auth/login', request.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  // if user is authenticated and and path is login and signup then redirects to home
  if (
    userIsAuthenticated &&
    (pathname === '/auth/login' || pathname === '/auth/register')
  ) {
    console.log(`Redirecting authenticated user from ${pathname} to /home`);
    const homeUrl = new URL('/', request.nextUrl.origin); // Or your primary authenticated page
    return NextResponse.redirect(homeUrl);
  }

  // If none of the above conditions are met, allow the request to proceed.
  return NextResponse.next();
}

// Optional: Configure the matcher to run middleware only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - any other static assets you might have in /public
     * - Make sure to include all routes you want to protect or redirect from.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
