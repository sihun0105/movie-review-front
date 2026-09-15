import { encode as nextAuthEncode, decode as nextAuthDecode } from 'next-auth/jwt'
import type { JWT } from 'next-auth/jwt'

const serverApi = process.env.SERVER_API || process.env.NEXT_PUBLIC_SERVER_API || 'http://127.0.0.1:3030'

export async function encodeSession({ token, secret, maxAge }: {
  token?: JWT
  secret: string | Buffer
  maxAge?: number
}) {
  if (token?.backendToken) return token.backendToken
  if (token?.userId) throw new Error('Backend session token is required')
  return nextAuthEncode({ token, secret, maxAge })
}

export async function decodeSession({ token, secret }: { token?: string; secret: string | Buffer }) {
  if (!token) return null
  if (token.split('.').length === 5) {
    const transient = await nextAuthDecode({ token, secret })
    return transient?.userId ? null : transient
  }
  if (token.split('.').length !== 3) return null
  try {
    const response = await fetch(`${serverApi}/auth/session`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!response.ok) return null
    const session = await response.json()
    return session.valid ? { userId: String(session.userId), provider: session.provider, backendToken: token } : null
  } catch {
    return null
  }
}

export async function revokeSession(token: string) {
  return fetch(`${serverApi}/auth/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
}
