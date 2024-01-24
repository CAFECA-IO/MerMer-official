import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { User } from '@prisma/client';
import { iDeWTDecode } from './interfaces/deWT';
import { merMerAdminConfig } from './constants/config'; 
async function postLogin (deWT: string, hostName: string): Promise<{
    user: User | null,
    deWTDecode: iDeWTDecode | null
  }> {
    let user = null;
    let deWTDecode = null;
    const res = await fetch(`${hostName}${merMerAdminConfig.postloginVerifyUrl}`, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
      },
      body: JSON.stringify({
        deWT
      })
    })
    if (res.ok) {
      const result = await res.json();
      user = result?.data?.user
      deWTDecode = result?.data?.deWTDecode
    }
    return {
      user,
      deWTDecode
    };
  }



export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = url.origin;

  const deWT =  request.cookies.get('DeWT');

  // Exclude '/admin/login' from the middleware
  // Info (20240124) Murky 在登入頁面如果有合法的DeWT就直接跳轉到使用頁面
  if (url.pathname === merMerAdminConfig.redirectUrlIfLoginFail) {
    if(deWT) {
      const userData = await postLogin(String(deWT.value), hostname);
      if(userData && userData?.user && userData?.deWTDecode) {
        return NextResponse.redirect(new URL(merMerAdminConfig.redirectUrlIfLoginSuccess, request.url));
      }
    }
    return NextResponse.next();
  }

  if (!deWT) {
    return NextResponse.redirect(new URL(merMerAdminConfig.redirectUrlIfLoginFail, request.url));
  }

  const userData = await postLogin(String(deWT.value), hostname);

  if (!userData || !userData?.user || !userData?.deWTDecode) {
    return NextResponse.redirect(new URL(merMerAdminConfig.redirectUrlIfLoginFail, request.url));
  }

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
  ],
}