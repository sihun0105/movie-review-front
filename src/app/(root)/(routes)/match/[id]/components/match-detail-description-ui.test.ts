import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const readComponent = (name: string) =>
  fs.readFileSync(path.join(__dirname, name), 'utf8')

describe('match detail description UI', () => {
  it('작성자 화면에도 저장한 설명을 표시한다', () => {
    const source = readComponent('match-author-view.tsx')

    expect(source).toContain(
      '<MatchDescriptionSection content={matchPost.content} />',
    )
  })
})
