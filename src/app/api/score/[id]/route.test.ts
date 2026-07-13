import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('movie score authentication', () => {
  it('resolves the token from the current NextAuth request', () => {
    const source = readFileSync(new URL('./route.ts', import.meta.url), 'utf8')

    expect(source.match(/getAuthTokenFromRequest\(req\)/g)).toHaveLength(2)
    expect(source).not.toContain('getTokenFromCookie()')
  })
})
