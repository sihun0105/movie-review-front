/* eslint-disable no-unused-vars */

import NextAuth, { DefaultSession } from 'next-auth'
export interface UserEntity {
  id?: string
  provider: string
  name?: string
  email?: string
  nickname?: string
  phone?: string
  image?: string
}
declare module 'next-auth' {
  interface Session {
    user: UserEntity
  }
  interface User {
    backendToken?: string
    phone: string
    nickname: string
    image: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    backendToken?: string
    provider?: string
    userId?: string
    image?: string
    nickname?: string
  }
}
