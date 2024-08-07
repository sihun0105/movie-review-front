import NextAuth from 'next-auth'
import { authOptions } from './next-option'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
