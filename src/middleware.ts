import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  ARTICLE_VIEWER_COOKIE,
  ARTICLE_VIEWER_COOKIE_MAX_AGE,
} from './lib/article-viewer-cookie'

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const protectedRoute =
    path === '/account' ||
    path.startsWith('/account/') ||
    path === '/analytics' ||
    path === '/match/new'
  const functionalRoute =
    /^\/(login|register|forgot-password|reset-password|setup-nickname|settings|notifications|profile|account|analytics)(\/|$)/.test(
      path,
    ) ||
    /^\/articles\/new(\/|$)/.test(path) ||
    /^\/match\/(new|my-matches)(\/|$)/.test(path) ||
    /^\/match\/[^/]+\/chat(\/|$)/.test(path) ||
    ((path === '/chat' || path.startsWith('/chat/')) && path !== '/chat/public')
  const finalize = (response: NextResponse) => {
    if (functionalRoute) response.headers.set('X-Robots-Tag', 'noindex')
    return response
  }
  if (req.nextUrl.pathname.startsWith('/articles')) {
    const response = NextResponse.next()
    const isArticleDetail = /^\/articles\/\d+$/.test(req.nextUrl.pathname)
    if (isArticleDetail && !req.cookies.has(ARTICLE_VIEWER_COOKIE)) {
      response.cookies.set(
        ARTICLE_VIEWER_COOKIE,
        globalThis.crypto.randomUUID(),
        {
          httpOnly: true,
          maxAge: ARTICLE_VIEWER_COOKIE_MAX_AGE,
          path: '/',
          sameSite: 'lax',
          secure: req.nextUrl.protocol === 'https:',
        },
      )
    }
    return finalize(response)
  }

  if (!protectedRoute) return finalize(NextResponse.next())

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
    return finalize(NextResponse.redirect(url))
  }
  return finalize(NextResponse.next())
}

export const config = {
  matcher: [
    '/account/:path*',
    '/analytics',
    '/match/new',
    '/articles/:path*',
    '/login/:path*',
    '/register/:path*',
    '/forgot-password/:path*',
    '/reset-password/:path*',
    '/setup-nickname/:path*',
    '/settings/:path*',
    '/notifications/:path*',
    '/profile/:path*',
    '/match/my-matches/:path*',
    '/chat/:path*',
    '/match/:id/chat/:path*',
  ],
}
