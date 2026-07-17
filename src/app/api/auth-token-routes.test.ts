import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const apiDirectory = fileURLToPath(new URL('.', import.meta.url))

const findRouteFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return findRouteFiles(path)
    return entry.name === 'route.ts' ? [path] : []
  })

describe('BFF authentication token policy', () => {
  it('does not read the legacy token cookie directly from API routes', () => {
    const legacyRoutes = findRouteFiles(apiDirectory)
      .filter((path) => readFileSync(path, 'utf8').includes('getTokenFromCookie'))
      .map((path) => path.replace(`${apiDirectory}/`, ''))

    expect(legacyRoutes).toEqual([])
  })
})
