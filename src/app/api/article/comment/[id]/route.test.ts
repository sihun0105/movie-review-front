import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { ArticleRepository } from '@/modules/article/article-repository'
import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PATCH } from './route'

vi.mock('@/lib/utils/getToken', () => ({
  getAuthTokenFromRequest: vi.fn(),
}))
vi.mock('@/modules/article/article-repository', () => ({
  ArticleRepository: vi.fn(),
}))

const mockToken = vi.mocked(getAuthTokenFromRequest)
const MockRepository = vi.mocked(ArticleRepository)

describe('article comment reaction', () => {
  beforeEach(() => vi.clearAllMocks())

  it('uses the current token to react to a comment', async () => {
    const reactComment = vi.fn().mockResolvedValue({ likeCount: 1 })
    mockToken.mockResolvedValue('oauth-token')
    MockRepository.mockImplementation(
      () => ({ reactComment }) as unknown as ArticleRepository,
    )
    const form = new FormData()
    form.set('commentId', '10')
    form.set('reaction', 'like')
    const request = new NextRequest('http://localhost/api/article/comment/10', {
      method: 'PATCH',
      body: form,
    })

    const response = await PATCH(request)

    expect(MockRepository).toHaveBeenCalledWith('oauth-token')
    expect(reactComment).toHaveBeenCalledWith(10, 'like')
    expect(response.status).toBe(200)
  })
})
