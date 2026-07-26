import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GET } from './route'

vi.mock('@/lib/utils/getToken', () => ({ getAuthTokenFromRequest: vi.fn() }))

const mockAuthToken = vi.mocked(getAuthTokenFromRequest)

describe('user activity summary BFF', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('returns 401 without a current token', async () => {
    mockAuthToken.mockResolvedValue(undefined)

    const response = await GET(
      new NextRequest('http://localhost/api/user/activity-summary'),
    )

    expect(response.status).toBe(401)
  })

  it('forwards the current token and upstream response', async () => {
    mockAuthToken.mockResolvedValue('oauth-token')
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ articleCount: 2 }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const response = await GET(
      new NextRequest('http://localhost/api/user/activity-summary'),
    )

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/user/activity-summary'),
      expect.objectContaining({
        headers: { Authorization: 'Bearer oauth-token' },
      }),
    )
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ articleCount: 2 })
  })

  it('preserves an expired-token response from the backend', async () => {
    mockAuthToken.mockResolvedValue('expired-token')
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: '로그인이 필요합니다.' }), {
          status: 401,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    )

    const response = await GET(
      new NextRequest('http://localhost/api/user/activity-summary'),
    )

    expect(response.status).toBe(401)
  })
})
