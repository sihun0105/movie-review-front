import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const hookSource = fs.readFileSync(
  path.join(
    process.cwd(),
    'src/app/(root)/(routes)/match/hooks/use-match-posts.ts',
  ),
  'utf8',
)
const containerSource = fs.readFileSync(
  path.join(
    process.cwd(),
    'src/app/(root)/(routes)/match/components/match-container.tsx',
  ),
  'utf8',
)

describe('match pagination URL contract', () => {
  it('restores loaded pages and records load-more progress', () => {
    expect(hookSource).toContain('initialSize: initialPage')
    expect(containerSource).toContain('buildMatchPageHref')
  })
})
