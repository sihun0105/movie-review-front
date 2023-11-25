import { assertValue } from '@/lib/utils'

const AppEnv = {
  cookieTokenKey: assertValue(
    process.env.COOKIE_TOKEN_KEY,
    'COOKIE_TOKEN_KEY is not defined',
  ),
  nextAuthUrl: assertValue(
    process.env.NEXTAUTH_URL,
    'NEXTAUTH_URL is not defined',
  ),
  nextAuthSecret: assertValue(
    process.env.NEXTAUTH_SECRET,
    'NEXTAUTH_SECRET is not defined',
  ),
}

export { AppEnv }
