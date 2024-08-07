import 'server-only'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/next-option'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user ?? null
}
