import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const readComponent = (name: string) =>
  fs.readFileSync(path.join(__dirname, name), 'utf8')

describe('match detail participants integration', () => {
  it('loads participants once and provides them to both detail views', () => {
    const container = readComponent('match-detail-container.tsx')
    const author = readComponent('match-author-view.tsx')
    const viewer = readComponent('match-viewer-view.tsx')

    expect(container).toContain('useMatchParticipants(matchId)')
    expect(container).toContain('participants={participants}')
    expect(author).toContain('<MatchParticipantsSection')
    expect(viewer).toContain('<MatchParticipantsSection')
  })
})
