import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { getAuthTokenFromRequest } from './getToken'

vi.mock('@/config/app-env', () => ({
  AppEnv: {
    nextAuthSecret: 'test-secret',
  },
}))

vi.mock('next-auth/jwt', () => ({ getToken: vi.fn() }))

const mockGetToken = vi.mocked(getToken)
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
  })

  it('does not trust the legacy token cookie', async () => {
    mockGetToken.mockResolvedValue(null)
    expect(await getAuthTokenFromRequest(request)).toBeUndefined()
  })
})
