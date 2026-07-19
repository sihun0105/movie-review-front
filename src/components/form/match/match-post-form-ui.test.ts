import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const source = fs.readFileSync(
  path.join(
    process.cwd(),
    'src/components/form/match/match-post-form-step.tsx',
  ),
  'utf8',
)

describe('match post form UI contract', () => {
  it('마지막 단계에 선택 설명 입력을 제공한다', () => {
    expect(source).toContain('설명 (선택)')
    expect(source).toContain("form.setValue('content'")
  })

  it('일정 입력에 밝은 화면에서도 보이는 달력 아이콘을 제공한다', () => {
    expect(source).toContain('CalendarDays')
    expect(source).toContain('[color-scheme:light]')
    expect(source).toContain('dark:[color-scheme:dark]')
  })
})
