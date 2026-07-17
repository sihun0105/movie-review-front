import { beforeEach, describe, expect, it, vi } from 'vitest'
import { cookies } from 'next/dist/client/components/headers'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { getAuthTokenFromRequest } from './getToken'

vi.mock('@/config/app-env', () => ({
  AppEnv: {
    cookieTokenKey: 'legacy-token',
    nextAuthSecret: 'test-secret',
  },
}))

vi.mock('next-auth/jwt', () => ({ getToken: vi.fn() }))
vi.mock('next/dist/client/components/headers', () => ({ cookies: vi.fn() }))

const mockGetToken = vi.mocked(getToken)
const mockCookies = vi.mocked(cookies)
const request = {} as NextRequest

describe('getAuthTokenFromRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('prefers the NextAuth request token for OAuth sessions', async () => {
    mockGetToken.mockResolvedValue('oauth-token')

    const token = await getAuthTokenFromRequest(request)

    expect(token).toBe('oauth-token')
    expect(mockGetToken).toHaveBeenCalledWith({
      req: request,
      secret: 'test-secret',
      raw: true,
    })
    expect(mockCookies).not.toHaveBeenCalled()
  })

  it('falls back to the legacy token cookie', async () => {
    mockGetToken.mockResolvedValue(null)
    mockCookies.mockReturnValue({
      get: vi.fn().mockReturnValue({ value: 'legacy-cookie-token' }),
    } as unknown as ReturnType<typeof cookies>)

    expect(await getAuthTokenFromRequest(request)).toBe('legacy-cookie-token')
  })
})
