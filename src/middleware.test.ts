import { webcrypto } from 'node:crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { config, middleware } from './middleware'
import { ARTICLE_VIEWER_COOKIE } from './lib/article-viewer-cookie'

const request = (path: string, cookie?: string) =>
  new NextRequest(`https://bollae.kr${path}`, {
    headers: cookie ? { cookie } : undefined,
  })

describe('functional route indexing without auth expansion', () => {
  beforeEach(() => {
    vi.stubGlobal('crypto', webcrypto)
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it.each([
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password?token=one',
    '/setup-nickname',
    '/settings',
    '/notifications',
    '/profile/name',
    '/articles/new',
    '/match/my-matches',
    '/chat',
    '/chat/123',
    '/chat/public/child',
    '/match/123/chat/456',
  ])('adds noindex without a login redirect: %s', (path) => {
    const response = middleware(request(path))
    expect(response.headers.get('x-robots-tag')).toBe('noindex')
    expect(response.headers.get('location')).toBeNull()
    expect(response.headers.get('x-middleware-next')).toBe('1')
  })

  it.each([
    '/account',
    '/account/edit?tab=profile',
    '/analytics',
    '/match/new',
  ])('retains protected redirects with the relative callback: %s', (path) => {
    const response = middleware(request(path))
    const redirect = new URL(response.headers.get('location')!)
    expect(redirect.pathname).toBe('/login')
    expect(redirect.searchParams.get('callbackUrl')).toBe(path)
    expect(response.headers.get('x-robots-tag')).toBe('noindex')
  })

  it.each(['next-auth.session-token', '__Secure-next-auth.session-token'])(
    'retains cookie-presence auth for %s',
    (name) => {
      const response = middleware(request('/account', `${name}=existing`))
      expect(response.headers.get('location')).toBeNull()
      expect(response.headers.get('x-robots-tag')).toBe('noindex')
    },
  )

  it.each([
    '/articles',
    '/articles/5',
    '/movie/123',
    '/match',
    '/match/123',
    '/chat/public',
  ])('leaves public discovery indexable: %s', (path) => {
    const response = middleware(request(path))
    expect(response.headers.get('x-robots-tag')).toBeNull()
    expect(response.headers.get('location')).toBeNull()
  })

  it('sets the article viewer cookie only when absent on numeric details', () => {
    const response = middleware(request('/articles/5'))
    const cookie = response.cookies.get(ARTICLE_VIEWER_COOKIE)
    expect(cookie?.value).toBeTruthy()
    expect(cookie).toMatchObject({
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'lax',
    })
    expect(
      middleware(
        request('/articles/5', `${ARTICLE_VIEWER_COOKIE}=known`),
      ).cookies.get(ARTICLE_VIEWER_COOKIE),
    ).toBeUndefined()
    expect(
      middleware(request('/articles/new')).cookies.get(ARTICLE_VIEWER_COOKIE),
    ).toBeUndefined()
  })

  it('matches functional routes as well as the existing protected and article routes', () => {
    expect(config.matcher).toEqual(
      expect.arrayContaining([
        '/account/:path*',
        '/analytics',
        '/articles/:path*',
        '/match/new',
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
      ]),
    )
  })
})
