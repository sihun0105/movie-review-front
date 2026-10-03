import { describe, expect, it } from 'vitest'
import { getMatchPostFormDefaults } from './match-post-form-defaults'

describe('getMatchPostFormDefaults', () => {
  it('새 매칭은 최소 2명이며 성별 조건을 선택하지 않은 상태로 시작한다', () => {
    const defaults = getMatchPostFormDefaults()

    expect(defaults.maxParticipants).toBe(2)
    expect(defaults.genderCondition).toBe('')
  })

  it('수정할 매칭 정보를 첫 렌더 기본값에 병합한다', () => {
    const defaults = getMatchPostFormDefaults({
      movieTitle: '군체',
      content: '조용히 영화만 봐요.',
      maxParticipants: 4,
    })

    expect(defaults.movieTitle).toBe('군체')
    expect(defaults.content).toBe('조용히 영화만 봐요.')
    expect(defaults.maxParticipants).toBe(4)
    expect(defaults.genderCondition).toBe('')
    expect(defaults.location).toBe('')
  })
})
