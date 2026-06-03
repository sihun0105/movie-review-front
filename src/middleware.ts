import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // NextAuth 세션 쿠키 존재만 확인 (JWT 검증은 API 레벨에서 이미 수행됨)
  // HTTP/HTTPS 양쪽 쿠키 이름 모두 체크
  const token =
    req.cookies.get('next-auth.session-token')?.value ||
    req.cookies.get('__Secure-next-auth.session-token')?.value

  if (!token) {
    // callbackUrl은 상대경로로 — req.url은 reverse proxy 뒤에서
    // 내부 host(localhost:3000)를 가리킬 수 있어 절대 URL을 쓰면
    // callbackUrl에 localhost가 박혀 외부 IP/도메인에서 깨짐
    const callbackPath = req.nextUrl.pathname + (req.nextUrl.search || '')
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.search = `?callbackUrl=${encodeURIComponent(callbackPath)}`
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*', '/match/new'],
}
