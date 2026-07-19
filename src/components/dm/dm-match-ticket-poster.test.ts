import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('DmMatchTicket poster', () => {
  it('매칭 응답의 영화 포스터 URL을 카드에 전달한다', () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'src/components/dm/dm-match-ticket.tsx'),
      'utf8',
    )

    expect(source).toContain('imageUrl={match.moviePoster}')
  })
})
