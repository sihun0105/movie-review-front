import { authOptions } from '@/app/api/auth/[...nextauth]/next-option'
import { getServerSession } from 'next-auth'

export const getToken = async () => {
  const session = await getServerSession(authOptions)
  return session?.accessToken
}
