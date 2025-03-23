import { UsersRepository } from '@/modules/users/users-repository'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AppPath } from '@/config/app-path'
import * as jose from 'jose'
import { AppEnv } from '@/config/app-env'
import GoogleProvider from 'next-auth/providers/google'
import { assertProviderType } from '@/lib/utils/auth'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: AppEnv.googleClientId,
      clientSecret: AppEnv.googleClientSecret,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: { label: 'userId', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, _req) {
        const repo = new UsersRepository()
        if (!credentials) {
          return null
        }
        try {
          const user = await repo.login({
            userId: credentials.userId,
            password: credentials.password,
          })

          return user
        } catch (error) {
          console.log(`['CredentialsProvider.authorize'] error: ${error}`)
          return null
        }
      },
    }),
  ],

  pages: {
    signIn: AppPath.login(),
  },
  jwt: {
    encode: async ({ secret, token, maxAge }) => {
      if (!token) {
        throw new Error('error encoding token')
      }
      const jwtSecret = new TextEncoder().encode(secret as string)
      const exp = Math.floor(Date.now() / 1000) + (maxAge || 0)
      const alg = 'HS256'
      const jwt = await new jose.SignJWT({
        ...token,
        userid: token.userId,
        username: token.email,
      })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(jwtSecret)
      return jwt
    },
    decode: async ({ secret, token }) => {
      if (!secret) {
        throw new Error('Secret not provided')
      }
      const jwtSecret = new TextEncoder().encode(secret as string)
      const decoded = await jose.jwtVerify(token as string, jwtSecret)
      return decoded.payload
    },
    secret: AppEnv.nextAuthSecret,
  },
  callbacks: {
    async signIn({ user, account }) {
      const repo = new UsersRepository()
      try {
        if (account && account?.provider !== 'credentials') {
          const result = await repo.signInWithProvider({ id: user.id })
          user.id = result.id ?? user.id
          user.nickname = result.nickname ?? user.nickname
          user.image = result.image ?? user.image
          return true
        }
      } catch (error) {
        console.log(error)
      }

      return true
    },

    async jwt({ token, account, user, trigger, session }) {
      if (trigger === 'update' && session?.nickname) {
        token.nickname = session.nickname ?? token.nickname
        return token
      }
      if (trigger === 'update' && session?.image) {
        token.image = session.image ?? token.image
        return token
      }

      if (account) {
        token.provider = account.provider
        token.userId = user.id
        token.nickname = user.nickname
        token.image = user.image ?? undefined
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId ?? ''
        session.user.nickname = token.nickname ?? ''
        session.user.provider = token.provider ?? ''
        session.user.image = token.image ?? ''
      }
      return session
    },
  },
}
