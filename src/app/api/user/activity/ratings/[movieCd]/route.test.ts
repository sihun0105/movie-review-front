import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { NextRequest } from 'next/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DELETE } from './route'

vi.mock('@/lib/utils/getToken', () => ({ getAuthTokenFromRequest: vi.fn() }))
vi.mock('@/config/user-activity-backend-api-endpoint', () => ({
  UserActivityBackEndApiEndpoint: {
    deleteRating: (movieCd: string) =>
      `http://backend/user/activity/ratings/${movieCd}`,
  },
}))
const tokenMock = vi.mocked(getAuthTokenFromRequest)

describe('delete user rating BFF', () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('forwards the signed-in user token', async () => {
    tokenMock.mockResolvedValue('token')
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)
    const request = new NextRequest(
      'http://localhost/api/user/activity/ratings/20233219',
      { method: 'DELETE' },
    )

    const response = await DELETE(request, {
      params: { movieCd: '20233219' },
    })

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/user/activity/ratings/20233219'),
      expect.objectContaining({
        method: 'DELETE',
        headers: { Authorization: 'Bearer token' },
      }),
    )
    expect(response.status).toBe(200)
  })
})
