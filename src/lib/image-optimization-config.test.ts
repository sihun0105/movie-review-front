import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('production image optimization', () => {
  it('packages sharp and its runtime dependencies after building', () => {
    const packageJson = readFileSync('package.json', 'utf8')
    const verifier = readFileSync('scripts/verify.mjs', 'utf8')

    expect(packageJson).toContain('node scripts/package-sharp-runtime.mjs')
    expect(verifier).toContain('package-sharp-runtime.mjs')
  })
})
