import { describe, expect, it, vi } from 'vitest'
import { CommentRepository } from './comment-repository'

vi.mock('./comment-datasource', () => ({ CommentDatasource: class {} }))

describe('CommentRepository', () => {
  it('keeps profile images and nested replies from the API response', async () => {
    const getCommentList = vi.fn().mockResolvedValue({
      hasNext: false,
      replies: [
        {
          replyId: 10,
          userId: 4,
          nickname: '영화좋아용',
          avatar: 'https://cdn.bollae.kr/profile.png',
          comment: '원댓글',
          createdAt: '2026-07-17T00:00:00Z',
          updatedAt: '2026-07-17T00:00:00Z',
          replies: [
            {
              replyId: 11,
              userId: 5,
              nickname: '답글러',
              avatar: 'https://cdn.bollae.kr/replier.png',
              comment: '대댓글',
              parentId: 10,
              createdAt: '2026-07-17T00:01:00Z',
              updatedAt: '2026-07-17T00:01:00Z',
            },
          ],
        },
      ],
    })
    const datasource = { getCommentList } as never
    const repository = new CommentRepository(undefined, datasource)

    const result = await repository.getCommentList('20233219', 1)

    expect(result.comments[0].avatar).toBe('https://cdn.bollae.kr/profile.png')
    expect(result.comments[0].replies?.[0]).toMatchObject({
      parentId: 10,
      avatar: 'https://cdn.bollae.kr/replier.png',
    })
  })
})
