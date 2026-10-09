import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MatchParticipantRepository } from './match-participant-repository'

const { getParticipants } = vi.hoisted(() => ({ getParticipants: vi.fn() }))
vi.mock('./match-participant-datasource', () => ({
  MatchParticipantDataSource: class {
    getParticipants = getParticipants
  },
}))

describe('MatchParticipantRepository', () => {
  beforeEach(() => vi.resetAllMocks())

  it('normalizes an omitted repeated participants field', async () => {
    getParticipants.mockResolvedValue({})

    await expect(
      new MatchParticipantRepository().getParticipants('match-1'),
    ).resolves.toEqual([])
  })

  it('preserves participants returned by the backend', async () => {
    const participants = [
      { nickname: '호스트', image: 'host.jpg', role: 'host' },
    ]
    getParticipants.mockResolvedValue({ participants })

    await expect(
      new MatchParticipantRepository().getParticipants('match-1'),
    ).resolves.toBe(participants)
  })

  it('rejects an invalid match id and malformed response', async () => {
    await expect(
      new MatchParticipantRepository().getParticipants(' '),
    ).rejects.toThrow('매치 ID')

    getParticipants.mockResolvedValue({ participants: 'invalid' })
    await expect(
      new MatchParticipantRepository().getParticipants('match-1'),
    ).rejects.toThrow('Invalid match participants response')
  })
})
