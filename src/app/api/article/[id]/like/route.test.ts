import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { ArticleRepository } from '@/modules/article/article-repository'
import { POST } from './route'

vi.mock('@/lib/utils/getToken', () => ({
  getAuthTokenFromRequest: vi.fn(),
}))

vi.mock('@/modules/article/article-repository', () => ({
  ArticleRepository: vi.fn(),
}))

const mockAuthToken = vi.mocked(getAuthTokenFromRequest)
const MockArticleRepository = vi.mocked(ArticleRepository)

describe('article like authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('uses the current NextAuth token to update a like', async () => {
    const updateArticleLike = vi
      .fn()
      .mockResolvedValue({ likes: 2, dislikes: 0 })
    mockAuthToken.mockResolvedValue('oauth-token')
    MockArticleRepository.mockImplementation(
      () => ({ updateArticleLike } as unknown as ArticleRepository),
    )
    const request = new NextRequest(
      'http://localhost/api/article/4/like?state=like',
      { method: 'POST' },
    )

    const response = await POST(request, { params: { id: '4' } })

    expect(MockArticleRepository).toHaveBeenCalledWith('oauth-token')
    expect(updateArticleLike).toHaveBeenCalledWith('4', 'like')
    expect(response.status).toBe(200)
  })

  it('returns 401 when no session token exists', async () => {
    mockAuthToken.mockResolvedValue(undefined)
    const request = new NextRequest(
      'http://localhost/api/article/4/like?state=like',
      { method: 'POST' },
    )

    const response = await POST(request, { params: { id: '4' } })

    expect(response.status).toBe(401)
    expect(MockArticleRepository).not.toHaveBeenCalled()
  })
})
