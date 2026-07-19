import { describe, expect, it } from 'vitest'
import { buildMatchPayload } from './match-post-form-utils'

const baseData = {
  title: '자동 생성',
  content: '',
  movieTitle: '모아나',
  theaterName: '상영관 미정',
  showTime: '2026-07-20T19:00',
  maxParticipants: 3,
  location: '강남',
}

describe('buildMatchPayload', () => {
  it('입력한 선택 설명을 매칭 내용으로 보존한다', () => {
    const result = buildMatchPayload({
      ...baseData,
      content: '영화 보고 근처에서 감상도 나눠요.',
    })

    expect(result.content).toBe('영화 보고 근처에서 감상도 나눠요.')
  })

  it('설명이 비어 있으면 기본 안내 문구를 만든다', () => {
    const result = buildMatchPayload(baseData)

    expect(result.content).toBe('강남에서 3명이 함께 볼 영화 약속입니다.')
  })
})
