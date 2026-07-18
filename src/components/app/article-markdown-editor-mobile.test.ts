import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const editorPath = fileURLToPath(
  new URL('./article-markdown-editor.tsx', import.meta.url),
)

describe('article markdown editor mobile controls', () => {
  const source = readFileSync(editorPath, 'utf8')

  it('opens the image picker through a native label control', () => {
    expect(source).toContain('htmlFor={fileInputId}')
    expect(source).not.toContain('fileInputRef.current?.click()')
  })

  it('provides separate write and preview modes on mobile', () => {
    expect(source).toContain("useState<'write' | 'preview'>('write')")
    expect(source).toContain("editorMode === 'preview'")
  })
})
