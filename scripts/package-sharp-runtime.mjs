import { cpSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const outputRoot = join(projectRoot, '.next/standalone/node_modules')
const require = createRequire(import.meta.url)
const copied = new Set()

function copyPackage(name, resolveFrom) {
  if (copied.has(name)) return

  const manifestPath = require.resolve(`${name}/package.json`, {
    paths: [resolveFrom],
  })
  const source = dirname(manifestPath)
  const target = join(outputRoot, name)
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

  copied.add(name)
  mkdirSync(dirname(target), { recursive: true })
  rmSync(target, { force: true, recursive: true })
  cpSync(source, target, { dereference: true, recursive: true })

  for (const dependency of Object.keys(manifest.dependencies ?? {})) {
    copyPackage(dependency, source)
  }
}

copyPackage('sharp', projectRoot)
console.log(`[standalone] packaged ${copied.size} sharp runtime packages`)
