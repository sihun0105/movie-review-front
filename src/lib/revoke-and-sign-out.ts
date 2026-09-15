import { signOut } from 'next-auth/react'

export async function revokeAndSignOut(callbackUrl = '/') {
  const response = await fetch('/api/auth/revoke', { method: 'POST' })
  if (!response.ok && response.status !== 401) {
    throw new Error('Failed to revoke session')
  }
  await signOut({ callbackUrl })
}
