import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserByDeWT } from './lib/user'
 
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Exclude '/admin/login' from the middleware
  if (url.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const deWT =  String(request.cookies.get('DeWT'))
  if (!deWT) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  const userData = await getUserByDeWT(deWT)

  if (!userData || !userData?.user || !userData?.deWTDecode) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
  ],
}