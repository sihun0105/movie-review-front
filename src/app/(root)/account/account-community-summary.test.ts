import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (relativePath: string) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), 'utf8')

describe('account community summary', () => {
  it('shows the four useful community activity metrics', () => {
    const page = read('./page.tsx')
    const section = read('./components/activity/activity-summary-nav.tsx')

    expect(page).toContain('<CommunitySummarySection />')
    expect(section).toContain('작성 댓글')
    expect(section).toContain('영화 평가')
    expect(section).toContain('작성 게시글')
    expect(section).toContain('받은 좋아요')
  })

  it('uses a one-line four-column activity navigation without a heading', () => {
    const section = read('./sections/community-summary-section.tsx')
    const navigation = read('./components/activity/activity-summary-nav.tsx')

    expect(section).not.toContain('나의 커뮤니티')
    expect(navigation).toContain('grid-cols-4')
    expect(navigation).toContain('aria-pressed')
  })

  it('renders linked activity rows and delete controls', () => {
    const item = read('./components/activity/activity-list-item.tsx')
    const panel = read('./components/activity/activity-list-panel.tsx')

    expect(item).toContain('/articles/${item.articleId}')
    expect(item).toContain('/movie/${item.movieCd}')
    expect(item).toContain('삭제')
    expect(panel).toContain('ActivityDeleteDialog')
    expect(panel).toContain('더 보기')
  })

  it('loads the summary through an authenticated BFF route', () => {
    const route = read('../../api/user/activity-summary/route.ts')
    const datasource = read(
      '../../../modules/user-activity/user-activity-datasource.ts',
    )

    expect(route).toContain('getAuthTokenFromRequest(request)')
    expect(route).toContain('Authorization: `Bearer ${token}`')
    expect(datasource).toContain('UserActivityClientApiEndpoint.getSummary()')
  })

  it('does not show the unsupported notification settings menu', () => {
    const accountSection = read('./sections/account-section.tsx')

    expect(accountSection).not.toContain('알림 설정')
  })

  it('offers a retry when the summary cannot be loaded', () => {
    const section = read('./sections/community-summary-section.tsx')

    expect(section).toContain('활동 정보를 불러오지 못했어요.')
    expect(section).toContain('mutate()')
  })
})
