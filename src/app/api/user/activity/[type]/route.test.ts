import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { NextRequest } from 'next/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { GET } from './route'

vi.mock('@/lib/utils/getToken', () => ({ getAuthTokenFromRequest: vi.fn() }))
vi.mock('@/config/user-activity-backend-api-endpoint', () => ({
  UserActivityBackEndApiEndpoint: {
    getActivity: (type: string, page: string, pageSize: string) =>
      `http://backend/user/activity/${type}?page=${page}&pageSize=${pageSize}`,
  },
}))
const tokenMock = vi.mocked(getAuthTokenFromRequest)

describe('user activity list BFF', () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('requires a current token', async () => {
    tokenMock.mockResolvedValue(undefined)
    const request = new NextRequest(
      'http://localhost/api/user/activity/comments',
    )

    const response = await GET(request, { params: { type: 'comments' } })

    expect(response.status).toBe(401)
  })

  it('forwards type, pagination, and bearer token', async () => {
    tokenMock.mockResolvedValue('token')
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ items: [] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)
    const request = new NextRequest(
      'http://localhost/api/user/activity/ratings?page=2&pageSize=10',
    )

    const response = await GET(request, { params: { type: 'ratings' } })

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/user/activity/ratings?page=2&pageSize=10'),
      expect.objectContaining({
        headers: { Authorization: 'Bearer token' },
      }),
    )
    expect(response.status).toBe(200)
  })

  it('rejects an unknown activity type', async () => {
    tokenMock.mockResolvedValue('token')
    const request = new NextRequest('http://localhost/api/user/activity/nope')

    const response = await GET(request, { params: { type: 'nope' } })

    expect(response.status).toBe(400)
  })
})
