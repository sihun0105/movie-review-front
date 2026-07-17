import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { CommentRepository } from '@/modules/comment/comment-repository'
import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from './route'

vi.mock('@/lib/utils/getToken', () => ({ getAuthTokenFromRequest: vi.fn() }))
vi.mock('@/modules/comment/comment-repository', () => ({
  CommentRepository: vi.fn(),
}))

const mockAuthToken = vi.mocked(getAuthTokenFromRequest)
const MockCommentRepository = vi.mocked(CommentRepository)

describe('movie comment reply route', () => {
  beforeEach(() => vi.clearAllMocks())

  it('forwards the OAuth token and parent comment id', async () => {
    const createComment = vi.fn().mockResolvedValue({})
    mockAuthToken.mockResolvedValue('oauth-token')
    MockCommentRepository.mockImplementation(
      () => ({ createComment }) as unknown as CommentRepository,
    )
    const form = new FormData()
    form.append('movieId', '20233219')
    form.append('comment', '대댓글입니다')
    form.append('parentId', '10')

    const response = await POST(
      new NextRequest('http://localhost/api/comment/20233219', {
        method: 'POST',
        body: form,
      }),
    )

    expect(MockCommentRepository).toHaveBeenCalledWith('oauth-token')
    expect(createComment).toHaveBeenCalledWith('20233219', '대댓글입니다', 10)
    expect(response.status).toBe(200)
  })
})
