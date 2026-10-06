import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (relativePath: string) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), 'utf8')

describe('public UX hardening', () => {
  it('keeps public pages runtime-rendered while caching their data', () => {
    const home = read('./(home)/page.tsx')
    const articles = read('./articles/page.tsx')

    expect(home).toContain("dynamic = 'force-dynamic'")
    expect(home).toContain("fetchCache = 'default-cache'")
    expect(articles).toContain("dynamic = 'force-dynamic'")
    expect(articles).toContain("fetchCache = 'default-cache'")
  })

  it('offers useful actions when the desktop matching rail is empty', () => {
    const source = read('../../../components/dm/dm-desktop-right-sidebar.tsx')
    expect(source).toContain('새 매칭 만들기')
    expect(source).toContain('공개 채팅 참여')
  })

  it('links users and crawlers to the complete movie catalog', () => {
    const home = read('./(home)/page.tsx')
    const nav = read('../../../components/dm/dm-desktop-left-nav.tsx')
    expect(home).toContain('href="/movies"')
    expect(nav).toContain("href: '/movies'")
  })

  it('prioritizes the first box-office poster and names community navigation', () => {
    const home = read('./(home)/page.tsx')
    const articles = read('./(home)/components/recent-articles.tsx')

    expect(home).toContain('priority={index === 0}')
    expect(articles).toContain('커뮤니티 전체 보기')
  })

  it('uses a contrast-safe primary action on the matching hero', () => {
    const source = read('../../../components/dm/match-hero-banner.tsx')
    expect(source).toContain('bg-blue-600')
    expect(source).toContain('text-white')
  })

  it('avoids a render-blocking third-party font stylesheet', () => {
    const layout = read('../../layout.tsx')
    const tokens = read('../../../styles/dm/tokens.css')

    expect(layout).not.toContain('fonts.googleapis.com')
    expect(tokens).toContain('ui-monospace')
  })

  it('gives comment and public chat fields an accessible name', () => {
    const comment = read('./articles/[id]/components/comment-input-field.tsx')
    const chat = read('./chat/public/components/public-chat-room.tsx')
    expect(comment).toContain('aria-label="댓글 입력"')
    expect(chat).toContain('aria-label="공개 채팅 메시지 입력"')
  })
})
