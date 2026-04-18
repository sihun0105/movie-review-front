import withAuth from 'next-auth/middleware'
import { authOptions } from './app/api/auth/[...nextauth]/next-option'

export default withAuth({
  jwt: {
    decode: authOptions.jwt!.decode,
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export const config = {
  matcher: ['/account/:path*'],
}
