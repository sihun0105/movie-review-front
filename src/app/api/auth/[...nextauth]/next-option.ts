import { UsersRepository } from '@/modules/users/users-repository'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AppPath } from '@/config/app-path'
import { AppEnv } from '@/config/app-env'
import GoogleProvider from 'next-auth/providers/google'
import { syncSessionUser } from '@/lib/utils/session-user'
import { decodeSession, encodeSession, revokeSession } from '@/lib/backend-auth-session'

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
    encode: encodeSession,
    decode: decodeSession,
    secret: AppEnv.nextAuthSecret,
  },
  callbacks: {
    async signIn({ user, account }) {
      const repo = new UsersRepository()
      try {
        if (account && account?.provider !== 'credentials') {
          if (!account.id_token) {
            return false
          }

          const result = await repo.signInWithProvider({ idToken: account.id_token })
          user.id = result.id
          user.email = result.email ?? user.email
          user.nickname = result.nickname ?? user.nickname
          user.image = result.image || user.image
          user.backendToken = result.backendToken
          return true
        }
      } catch (error) {
        console.log(error)
        return false
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
        if (!user.backendToken) throw new Error('Backend session token is required')
        token.backendToken = user.backendToken
        token.provider = account.provider
        token.userId = user.id
        token.nickname = user.nickname
        token.image = user.image
      }
      return token
    },

    async session({ session, token }) {
      if (!token) return session
      const repo = new UsersRepository()
      return syncSessionUser(session, token, (id) => repo.getUser(id))
    },
  },
  events: {
    async signOut({ token }) {
      if (token?.backendToken) await revokeSession(token.backendToken)
    },
  },
}
