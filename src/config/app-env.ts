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
  googleClientId: assertValue(
    process.env.GOOGLE_CLIENT_ID,
    'GOOGLE_CLIENT_ID is not defined',
  ),
  googleClientSecret: assertValue(
    process.env.GOOGLE_CLIENT_SECRET,
    'GOOGLE_CLIENT_SECRET is not defined',
  ),
}

export { AppEnv }
