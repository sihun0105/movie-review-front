import { AppEnv } from '@/config/app-env'
import { cookies } from 'next/dist/client/components/headers'

export const getTokenFromCookie = () => {
  const cookieStore = cookies()
  const token = cookieStore.get(AppEnv.cookieTokenKey)?.value
  return token
}
