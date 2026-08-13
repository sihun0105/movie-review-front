import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/config/auth-backend-endpoint', () => ({
  AuthBackEndEndpoint: {
    validateResetToken: () => 'http://backend/auth/validate-reset-token',
  },
}))

import { POST } from './route'

describe('POST /api/auth/validate-reset-token', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('forwards the token validity response from the backend', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ isAvailable: false, message: '만료된 토큰입니다.' }),
    }))
    const request = new Request('http://localhost/api/auth/validate-reset-token', {
      method: 'POST',
      body: JSON.stringify({ token: 'expired-token' }),
    })

    const response = await POST(request as never)

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      isAvailable: false,
      message: '만료된 토큰입니다.',
    })
  })
})
