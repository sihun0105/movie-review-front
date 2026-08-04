import { afterEach, describe, expect, it, vi } from 'vitest'
import { UserActivityDatasource } from './user-activity-datasource'

vi.mock('@/config/user-activity-client-api-endpoint', () => ({
  UserActivityClientApiEndpoint: {
    getActivity: (type: string, page: number, pageSize = 10) =>
      `/api/user/activity/${type}?page=${page}&pageSize=${pageSize}`,
    deleteRating: (movieCd: number) => `/api/user/activity/ratings/${movieCd}`,
    deleteMovieComment: (commentId: number) => `/api/comment/${commentId}`,
    deleteComment: (commentId: number) => `/api/article/comment/${commentId}`,
    deleteArticle: (articleId: number) => `/api/article/${articleId}`,
  },
}))

describe('UserActivityDatasource', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('loads a selected activity page', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(
          JSON.stringify({ items: [], totalCount: 0, hasNext: false }),
        ),
      )
    vi.stubGlobal('fetch', fetchMock)

    await new UserActivityDatasource().getActivity('comments', 2)

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/user/activity/comments?page=2&pageSize=10',
      { cache: 'no-store' },
    )
  })

  it('deletes a rating through the activity BFF', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}'))
    vi.stubGlobal('fetch', fetchMock)

    await new UserActivityDatasource().deleteRating(20233219)

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/user/activity/ratings/20233219',
      { method: 'DELETE' },
    )
  })

  it('deletes a movie comment through the movie comment BFF', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}'))
    vi.stubGlobal('fetch', fetchMock)

    await new UserActivityDatasource().deleteItem({
      type: 'comment',
      id: 12,
      targetType: 'movie',
      targetId: 20262770,
      targetTitle: '신작 영화',
      content: '영화 댓글',
      createdAt: '2026-08-04T12:00:00Z',
    })

    expect(fetchMock).toHaveBeenCalledWith('/api/comment/12', {
      method: 'DELETE',
      body: expect.any(FormData),
    })
  })

  it('deletes an article comment through the article comment BFF', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}'))
    vi.stubGlobal('fetch', fetchMock)

    await new UserActivityDatasource().deleteItem({
      type: 'comment',
      id: 7,
      targetType: 'article',
      targetId: 5,
      targetTitle: '영화 후기',
      content: '게시글 댓글',
      createdAt: '2026-08-03T12:00:00Z',
    })

    expect(fetchMock).toHaveBeenCalledWith('/api/article/comment/7', {
      method: 'DELETE',
      body: expect.any(FormData),
    })
  })
})
