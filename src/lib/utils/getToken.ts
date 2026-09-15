import { AppEnv } from '@/config/app-env'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export const getAuthTokenFromRequest = async (req: NextRequest) => {
  const nextAuthToken = await getToken({
    req,
    secret: AppEnv.nextAuthSecret,
    raw: true,
  })

  return nextAuthToken ?? undefined
}
