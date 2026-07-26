import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (relativePath: string) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), 'utf8')

describe('account community summary', () => {
  it('shows the four useful community activity metrics', () => {
    const page = read('./page.tsx')
    const section = read('./sections/community-summary-section.tsx')

    expect(page).toContain('<CommunitySummarySection />')
    expect(section).toContain('작성 댓글')
    expect(section).toContain('영화 평가')
    expect(section).toContain('작성 게시글')
    expect(section).toContain('받은 좋아요')
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
