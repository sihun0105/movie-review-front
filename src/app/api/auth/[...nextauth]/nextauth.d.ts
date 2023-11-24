import { UserEntity } from '@/modules/users/user-entity'
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id?: string
    accessToken: string
    refreshToken: string
    expireTime: number
  }
  interface Session {
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
    expireTime: number
    id?: string
    name?: string
    email?: string
  }
}
