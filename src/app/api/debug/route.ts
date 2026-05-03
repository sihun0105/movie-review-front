import { NextResponse } from 'next/server'

export async function GET() {
  const serverApi =
    process.env.SERVER_API ||
    process.env.NEXT_PUBLIC_SERVER_API ||
    'http://127.0.0.1:3030'

  let backendStatus = 'unknown'
  let backendError = ''

  try {
    const res = await fetch(`${serverApi}/auth/validate/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@test.com' }),
      signal: AbortSignal.timeout(5000),
    })
    backendStatus = `${res.status} ${res.statusText}`
  } catch (e: any) {
    backendStatus = 'FAILED'
    backendError = e?.message ?? String(e)
  }

  return NextResponse.json({
    SERVER_API: process.env.SERVER_API ?? '(not set)',
    NEXT_PUBLIC_SERVER_API: process.env.NEXT_PUBLIC_SERVER_API ?? '(not set)',
    resolved_base: serverApi,
    backend_reachable: backendStatus,
    backend_error: backendError || undefined,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? '(not set)',
  })
}
