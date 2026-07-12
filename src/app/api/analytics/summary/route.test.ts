import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('analytics summary authentication', () => {
  it('resolves the token from the current NextAuth request', () => {
    const source = readFileSync(new URL('./route.ts', import.meta.url), 'utf8')

    expect(source).toContain('getAuthTokenFromRequest(request)')
    expect(source).not.toContain('getTokenFromCookie()')
  })
})
