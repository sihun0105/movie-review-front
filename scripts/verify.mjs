import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

process.chdir(fileURLToPath(new URL('..', import.meta.url)))
const args = process.argv.slice(2).filter((arg) => arg !== '--')
const tests = []
let build = false
let buildOnly = false
for (let index = 0; index < args.length; index++) {
  const arg = args[index]
  if (arg === '--help') {
    console.log('verify [--test <file>]... [--build | --build-only]\nDefault: lint and tests. --build adds a production build. --build-only retries only that phase.')
    process.exit(0)
  }
  if (arg === '--build') build = true
  else if (arg === '--build-only') buildOnly = true
  else if (arg === '--test' && existsSync(args[index + 1] || '')) tests.push(args[++index])
  else throw new Error(`Unknown option or missing test file: ${arg}`)
}

// Keep build prerequisites reproducible without copying production credentials.
const env = {
  ...process.env,
  NEXT_TELEMETRY_DISABLED: '1',
  COOKIE_TOKEN_KEY: 'verification-only',
  NEXTAUTH_URL: 'http://localhost:3000',
  NEXTAUTH_SECRET: 'verification-only-not-for-deployment',
  GOOGLE_CLIENT_ID: 'verification-only',
  GOOGLE_CLIENT_SECRET: 'verification-only',
  NEXT_PUBLIC_SERVER_API: 'http://127.0.0.1:3030',
  NEXT_PUBLIC_CHAT_SERVER_API: 'http://127.0.0.1:3031',
  SERVER_API: 'http://127.0.0.1:3030',
  CHAT_SERVER_API: 'http://127.0.0.1:3031',
}
const steps = buildOnly ? [] : [
  ['lint', 'next/dist/bin/next', ['lint']],
  ['tests', 'vitest/vitest.mjs', ['run', '--threads', 'false', ...tests]],
]
if (build || buildOnly) steps.push(['build', 'next/dist/bin/next', ['build']])

for (const [label, binary, options] of steps) {
  const path = `node_modules/${binary}`
  if (!existsSync(path)) throw new Error('Dependencies missing. Run corepack pnpm install --frozen-lockfile.')
  const start = Date.now()
  console.log(`\n[verify] ${label}`)
  const result = spawnSync(process.execPath, [path, ...options], { env, stdio: 'inherit' })
  console.log(`[verify] ${label}: ${result.status === 0 ? 'PASS' : 'FAIL'} (${((Date.now() - start) / 1000).toFixed(1)}s)`)
  if (result.error) console.error(result.error.message)
  if (result.status !== 0) process.exit(result.status || 1)
}
console.log('\nVerification passed. Authenticated flows and mobile keyboard behavior still require their own checks.')
