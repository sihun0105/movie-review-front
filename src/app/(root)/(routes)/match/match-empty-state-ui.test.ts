import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const source = fs.readFileSync(
  path.join(
    process.cwd(),
    'src/app/(root)/(routes)/match/sections/match-list-section.tsx',
  ),
  'utf8',
)

describe('match empty state UI', () => {
  it('offers a create action that keeps the selected movie', () => {
    expect(source).toContain('매치 만들기')
    expect(source).toContain('buildNewMatchHref(movieTitle)')
  })
})
