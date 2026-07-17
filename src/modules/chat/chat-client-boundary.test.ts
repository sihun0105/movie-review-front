import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDirectory = fileURLToPath(new URL('../../', import.meta.url))

function findSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return findSourceFiles(path)
    return /\.tsx?$/.test(entry.name) ? [path] : []
  })
}

describe('chat client module boundary', () => {
  it('does not import the server-backed chat barrel from client modules', () => {
    const violations = findSourceFiles(srcDirectory)
      .filter((path) => {
        const source = readFileSync(path, 'utf8')
        return (
          /^['"]use client['"]/m.test(source) &&
          /from ['"]@\/modules\/chat['"]/.test(source)
        )
      })
      .map((path) => path.replace(srcDirectory, ''))

    expect(violations).toEqual([])
  })
})
