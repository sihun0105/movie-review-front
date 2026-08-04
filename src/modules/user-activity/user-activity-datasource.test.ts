import { afterEach, describe, expect, it, vi } from 'vitest'
import { UserActivityDatasource } from './user-activity-datasource'

vi.mock('@/config/user-activity-client-api-endpoint', () => ({
  UserActivityClientApiEndpoint: {
    getActivity: (type: string, page: number, pageSize = 10) =>
      `/api/user/activity/${type}?page=${page}&pageSize=${pageSize}`,
    deleteRating: (movieCd: number) => `/api/user/activity/ratings/${movieCd}`,
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
})
