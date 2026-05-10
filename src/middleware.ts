import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // NextAuth 세션 쿠키 존재만 확인 (JWT 검증은 API 레벨에서 이미 수행됨)
  // HTTP/HTTPS 양쪽 쿠키 이름 모두 체크
  const token =
    req.cookies.get('next-auth.session-token')?.value ||
    req.cookies.get('__Secure-next-auth.session-token')?.value

  if (!token) {
    const url = new URL('/login', req.url)
    url.searchParams.set('callbackUrl', req.url)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*'],
}
