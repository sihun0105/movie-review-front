import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { DmReviewCard } from './dm-review-card'

vi.mock('./dm-user-avatar', () => ({ DmUserAvatar: () => null }))
vi.mock('@/lib/utils', () => ({ cn: (...values: unknown[]) => values.filter(Boolean).join(' ') }))
const reply = {
  id: 1, userno: 4, nickname: '영화좋아용', content: '좋았어요',
  createdAt: new Date(), updatedAt: new Date(),
}

describe('comment author rating', () => {
  it('shows the author rating alongside the nickname', () => {
    const html = renderToStaticMarkup(<DmReviewCard reply={{ ...reply, rating: 4.5 }} />)
    expect(html).toContain('영화좋아용')
    expect(html).toContain('이 영화에 준 평점 4.5점')
  })
  it('does not invent a rating for unrated users or article comments', () => {
    expect(renderToStaticMarkup(<DmReviewCard reply={reply} />)).not.toContain('이 영화에 준 평점')
  })
  it('hides deleted comment ratings', () => {
    const html = renderToStaticMarkup(<DmReviewCard reply={{ ...reply, rating: 4, isDeleted: true }} />)
    expect(html).toContain('삭제된 댓글입니다.')
    expect(html).not.toContain('이 영화에 준 평점')
  })
})
