import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MatchPostRepository } from './match-post-repository'

const { getMatchPosts } = vi.hoisted(() => ({ getMatchPosts: vi.fn() }))
vi.mock('./match-post-datasource', () => ({
  MatchPostDataSource: class {
    getMatchPosts = getMatchPosts
  },
}))

describe('match list response boundary', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('normalizes an omitted repeated field', async () => {
    getMatchPosts.mockResolvedValue({ hasNext: false })
    await expect(new MatchPostRepository().getMatchPosts()).resolves.toEqual({
      matchPosts: [],
      hasNext: false,
    })
  })

  it.each([null, 'invalid', {}, 1])(
    'rejects malformed matchPosts: %j',
    async (value) => {
      getMatchPosts.mockResolvedValue({ matchPosts: value, hasNext: false })
      await expect(new MatchPostRepository().getMatchPosts()).rejects.toThrow()
    },
  )

  it.each([null, {}, { hasNext: 'false' }])(
    'rejects malformed envelopes: %j',
    async (value) => {
      getMatchPosts.mockResolvedValue(value)
      await expect(new MatchPostRepository().getMatchPosts()).rejects.toThrow()
    },
  )

  it('preserves populated lists, pagination and request parameters', async () => {
    const response = { matchPosts: [{ id: 'one' }], hasNext: true }
    getMatchPosts.mockResolvedValue(response)
    await expect(
      new MatchPostRepository('token').getMatchPosts(2, 100, {
        filter: 'all',
      }),
    ).resolves.toEqual(response)
    expect(getMatchPosts).toHaveBeenCalledWith(2, 100, { filter: 'all' })
  })

  it('preserves upstream failures', async () => {
    const failure = new Error('upstream unavailable')
    getMatchPosts.mockRejectedValue(failure)
    await expect(new MatchPostRepository().getMatchPosts()).rejects.toBe(
      failure,
    )
  })
})
