import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { MatchParticipantsSection } from './match-participants-section'

vi.mock('next/link', () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}))
vi.mock('@/components/dm', () => ({
  DmUserAvatar: ({ name, image }: { name: string; image?: string }) => (
    <span data-image={image}>{name}</span>
  ),
  Skeleton: ({ className }: { className?: string }) => (
    <span className={className}>skeleton</span>
  ),
}))

describe('MatchParticipantsSection', () => {
  const participants = [
    { nickname: '호스트', image: 'host.jpg', role: 'host' as const },
    {
      nickname: '참여자',
      image: 'member.jpg',
      role: 'participant' as const,
    },
  ]

  it('shows current participants with roles, profiles, and images', () => {
    const html = renderToStaticMarkup(
      <MatchParticipantsSection
        participants={participants}
        isLoading={false}
      />,
    )

    expect(html).toContain('함께 보는 사람들')
    expect(html).toContain('호스트')
    expect(html).toContain('참여자')
    expect(html).toContain('host.jpg')
    expect(html).toContain('member.jpg')
    expect(html).toContain('/profile/%ED%98%B8%EC%8A%A4%ED%8A%B8')
  })

  it('shows stable skeletons while loading', () => {
    const html = renderToStaticMarkup(
      <MatchParticipantsSection participants={[]} isLoading />,
    )

    expect(html).toContain('참여자 정보 로딩 중')
  })

  it('does not render an empty completed section', () => {
    expect(
      renderToStaticMarkup(
        <MatchParticipantsSection participants={[]} isLoading={false} />,
      ),
    ).toBe('')
  })
})
