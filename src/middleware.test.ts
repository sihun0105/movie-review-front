import { describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from './middleware'

describe('article viewer middleware', () => {
  it.each(['/articles', '/articles/new'])(
    'keeps the public article route %s accessible',
    (pathname) => {
      const request = new NextRequest(`https://bollae.kr${pathname}`)

      const response = middleware(request)

      expect(response.status).toBe(200)
      expect(response.headers.get('location')).toBeNull()
    },
  )

  it('sets the anonymous viewer cookie before rendering an article detail', () => {
    const request = new NextRequest('https://bollae.kr/articles/4')

    const response = middleware(request)

    expect(response.headers.get('set-cookie')).toContain(
      'bollae_article_viewer=',
    )
  })

  it('does not replace an existing anonymous viewer cookie', () => {
    const request = new NextRequest('https://bollae.kr/articles/4', {
      headers: { cookie: 'bollae_article_viewer=existing-viewer' },
    })

    const response = middleware(request)

    expect(response.headers.get('set-cookie')).toBeNull()
  })

  it('keeps authentication redirects for protected routes', () => {
    const request = new NextRequest('https://bollae.kr/account')

    const response = middleware(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toContain('/login?callbackUrl=')
  })
})
