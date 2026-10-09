import { MatchParticipantRepository } from '@/modules/match'
import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GET } from './route'

vi.mock('@/modules/match', () => ({
  MatchParticipantRepository: vi.fn(),
}))

describe('GET /api/match/[id]/participants', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns public match participants without requiring a token', async () => {
    const participants = [
      { nickname: '호스트', image: 'host.jpg', role: 'host' },
    ]
    const getParticipants = vi.fn().mockResolvedValue(participants)
    vi.mocked(MatchParticipantRepository).mockImplementation(
      () => ({ getParticipants }) as any,
    )

    const response = await GET(
      new NextRequest('http://localhost/api/match/match-1/participants'),
      { params: { id: 'match-1' } },
    )

    expect(response.status).toBe(200)
    expect(getParticipants).toHaveBeenCalledWith('match-1')
    await expect(response.json()).resolves.toEqual({ participants })
  })
})
