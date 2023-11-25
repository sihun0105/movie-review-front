import { UsersRepository } from '@/modules/users/users-repository'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import { AppPath } from '@/config/app-path'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: { label: 'userId', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, _req) {
        const repo = new UsersRepository()
        if (!credentials) return null
        try {
          const user = await repo.login({
            userId: credentials.userId,
            password: credentials.password,
          })
          return user
        } catch (error) {
          return null
        }
      },
    }),
  ],

  pages: {
    signIn: AppPath.login(),
  },

  callbacks: {
    async signIn({}) {
      return true
    },

    async jwt({ token, account, user, trigger, session }) {
      if (user) {
        token.accessToken = user?.accessToken
        token.refreshToken = user.refreshToken
        token.expireTime = user.expireTime
        return token
      }

      if (new Date() < new Date(token.expireTime * 1000)) {
        return token
      } else {
        const newToken = await refreshAccessToken(token.refreshToken)
        token.accessToken = newToken.accessToken
        token.refreshToken = newToken.refreshToken
        token.expireTime = newToken.expireTime
        return token
      }
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
      }
      return session
    },
  },
}

async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await fetch(AppBackEndApiEndpoint.refresh(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!res.ok) {
      throw new Error('invalid refresh token')
    }
    const result = await res.json()
    return result.data
  } catch (err: any) {
    throw new Error('invalid refresh token')
  }
}
