import { AppEnv } from '@/config/app-env'
import { cookies } from 'next/dist/client/components/headers'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export const getTokenFromCookie = () => {
  const cookieStore = cookies()
  const token = cookieStore.get(AppEnv.cookieTokenKey)?.value
  return token
}

export const getAuthTokenFromRequest = async (req: NextRequest) => {
  const nextAuthToken = await getToken({
    req,
    secret: AppEnv.nextAuthSecret,
    raw: true,
  })

  return nextAuthToken ?? getTokenFromCookie()
}
