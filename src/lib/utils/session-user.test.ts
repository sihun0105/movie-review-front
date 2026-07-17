import { describe, expect, it, vi } from 'vitest'
import { syncSessionUser } from './session-user'

describe('syncSessionUser', () => {
  it('prefers the current database profile over stale token values', async () => {
    const session = {
      user: { id: '', nickname: '', provider: '', image: '' },
      expires: '2099-01-01',
    }
    const getUser = vi.fn().mockResolvedValue({
      id: 4,
      nickname: '현재 닉네임',
      image: 'current.png',
    })

    const result = await syncSessionUser(
      session as any,
      {
        userId: 4,
        nickname: '이전 닉네임',
        image: 'old.png',
        provider: 'google',
      } as any,
      getUser,
    )

    expect(result.user).toMatchObject({
      id: 4,
      nickname: '현재 닉네임',
      image: 'current.png',
      provider: 'google',
    })
  })
})
