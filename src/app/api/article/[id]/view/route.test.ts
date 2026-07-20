import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { ArticleViewRepository } from '@/modules/article/article-view-repository'
import { POST } from './route'

vi.mock('@/modules/article/article-view-repository', () => ({
  ArticleViewRepository: vi.fn(),
}))

const MockArticleViewRepository = vi.mocked(ArticleViewRepository)

describe('article view tracking', () => {
  const recordArticleView = vi
    .fn()
    .mockResolvedValue({ viewCount: 5, counted: true })

  beforeEach(() => {
    vi.clearAllMocks()
    MockArticleViewRepository.mockImplementation(
      () => ({ recordArticleView }) as unknown as ArticleViewRepository,
    )
  })

  it('creates an anonymous cookie and sends only its SHA-256 digest', async () => {
    const request = new NextRequest('http://localhost/api/article/4/view', {
      method: 'POST',
    })

    const response = await POST(request, { params: { id: '4' } })

    expect(recordArticleView).toHaveBeenCalledWith(
      '4',
      expect.stringMatching(/^[a-f0-9]{64}$/),
    )
    expect(response.headers.get('set-cookie')).toContain(
      'bollae_article_viewer=',
    )
    expect(await response.json()).toEqual({ viewCount: 5, counted: true })
  })

  it('reuses the existing anonymous cookie without forwarding its raw value', async () => {
    const request = new NextRequest('http://localhost/api/article/4/view', {
      method: 'POST',
      headers: { cookie: 'bollae_article_viewer=existing-viewer' },
    })

    await POST(request, { params: { id: '4' } })

    const viewerKey = recordArticleView.mock.calls[0][1]
    expect(viewerKey).toMatch(/^[a-f0-9]{64}$/)
    expect(viewerKey).not.toBe('existing-viewer')
  })
})
