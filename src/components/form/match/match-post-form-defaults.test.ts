import { describe, expect, it } from 'vitest'
import { getMatchPostFormDefaults } from './match-post-form-defaults'

describe('getMatchPostFormDefaults', () => {
  it('수정할 매칭 정보를 첫 렌더 기본값에 병합한다', () => {
    const defaults = getMatchPostFormDefaults({
      movieTitle: '군체',
      content: '조용히 영화만 봐요.',
      maxParticipants: 4,
    })

    expect(defaults.movieTitle).toBe('군체')
    expect(defaults.content).toBe('조용히 영화만 봐요.')
    expect(defaults.maxParticipants).toBe(4)
    expect(defaults.location).toBe('')
  })
})
