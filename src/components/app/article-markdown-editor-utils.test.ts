import { describe, expect, it } from 'vitest'
import { insertMarkdownText } from './article-markdown-editor-utils'

describe('insertMarkdownText', () => {
  it('선택 영역을 마크다운 텍스트로 교체하고 커서를 뒤로 이동한다', () => {
    expect(insertMarkdownText('영화 감상평', '**좋아요**', 3, 6)).toEqual({
      value: '영화 **좋아요**',
      cursor: 10,
    })
  })

  it('선택 영역이 없으면 현재 커서 위치에 삽입한다', () => {
    expect(insertMarkdownText('영화', '\n- 항목', 2, 2)).toEqual({
      value: '영화\n- 항목',
      cursor: 7,
    })
  })
})
