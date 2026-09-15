import { beforeEach, describe, expect, it, vi } from 'vitest'
import { decodeSession, encodeSession, revokeSession } from './backend-auth-session'
import { encode, decode } from 'next-auth/jwt'

vi.mock('next-auth/jwt', () => ({ encode: vi.fn(), decode: vi.fn() }))

describe('backend-managed session', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('fetch', vi.fn())
  })

  it('reuses the backend token without signing an API JWT in the frontend', async () => {
    expect(await encodeSession({ token: { backendToken: 'a.b.c' }, secret: 'secret' })).toBe('a.b.c')
    expect(encode).not.toHaveBeenCalled()
    await expect(encodeSession({ token: { userId: '4' }, secret: 'secret' })).rejects.toThrow('Backend session token is required')
  })

  it('preserves encrypted transient OAuth cookies', async () => {
    vi.mocked(encode).mockResolvedValue('a.b.c.d.e')
    vi.mocked(decode).mockResolvedValue({ state: 'oauth-state' } as never)
    expect(await encodeSession({ token: { state: 'oauth-state' } as never, secret: 'secret' })).toBe('a.b.c.d.e')
    expect(await decodeSession({ token: 'a.b.c.d.e', secret: 'secret' })).toMatchObject({ state: 'oauth-state' })
  })

  it('accepts a session only when the backend says it is active', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: true, json: async () => ({ valid: true, userId: 4, provider: 'google' }) } as Response)
    expect(await decodeSession({ token: 'a.b.c', secret: 'secret' })).toMatchObject({ userId: '4', backendToken: 'a.b.c' })
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/session'), expect.objectContaining({ headers: { Authorization: 'Bearer a.b.c' } }))
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false } as Response)
    expect(await decodeSession({ token: 'old.front.jwt', secret: 'secret' })).toBeNull()
  })

  it('revokes the active token through the backend', async () => {
    await revokeSession('a.b.c')
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/logout'), expect.objectContaining({ method: 'POST', headers: { Authorization: 'Bearer a.b.c' } }))
  })
})
