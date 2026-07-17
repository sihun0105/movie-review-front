import { describe, expect, it, vi } from 'vitest'
import { ArticleRepository } from './article-repository'

vi.mock('./article-datasource', () => ({ ArticleDatasource: class {} }))

describe('ArticleRepository comments', () => {
  it('keeps nested replies, reactions, and edit state', async () => {
    const getCommentList = vi.fn().mockResolvedValue({
      comments: [
        {
          id: 1,
          userno: 4,
          content: '원댓글',
          nickname: '볼래',
          avatar: 'avatar.png',
          createdAt: '2026-07-17T00:00:00.000Z',
          updatedAt: '2026-07-17T00:00:00.000Z',
          likeCount: 2,
          dislikeCount: 1,
          userReaction: 'like',
          isEdited: true,
          replies: [
            {
              id: 2,
              userno: 5,
              content: '대댓글',
              nickname: '영화팬',
              avatar: 'reply.png',
              createdAt: '2026-07-17T00:01:00.000Z',
              updatedAt: '2026-07-17T00:01:00.000Z',
              parentId: 1,
              replies: [],
            },
          ],
        },
      ],
      hasNext: false,
      totalCount: 1,
    })
    const repository = new ArticleRepository(undefined, {
      getCommentList,
    } as never)

    const result = await repository.getCommentList('4', 1)

    expect(result.comments[0]).toMatchObject({
      likeCount: 2,
      userReaction: 'like',
      isEdited: true,
    })
    expect(result.comments[0].replies?.[0]).toMatchObject({
      content: '대댓글',
      parentId: 1,
    })
  })

  it('forwards a reaction through the datasource', async () => {
    const reactComment = vi.fn().mockResolvedValue({ likeCount: 1 })
    const repository = new ArticleRepository(undefined, {
      reactComment,
    } as never)

    await (repository as any).reactComment(10, 'like')

    expect(reactComment).toHaveBeenCalledWith(10, 'like')
  })
})
