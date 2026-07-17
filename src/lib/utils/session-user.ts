import type { Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

interface CurrentUserProfile {
  id: number | string
  nickname?: string | null
  image?: string | null
}

type GetCurrentUser = (_id: number) => Promise<CurrentUserProfile>

export async function syncSessionUser(
  session: Session,
  token: JWT,
  getCurrentUser: GetCurrentUser,
) {
  const userId = Number(token.userId)
  let currentUser: CurrentUserProfile | null = null

  if (Number.isInteger(userId) && userId > 0) {
    try {
      currentUser = await getCurrentUser(userId)
    } catch {
      currentUser = null
    }
  }

  const id = currentUser?.id ?? token.userId ?? ''
  const nickname = currentUser?.nickname ?? token.nickname ?? ''
  const image = currentUser?.image ?? token.image ?? ''

  session.user.id = id as string
  session.user.nickname = nickname
  session.user.provider = token.provider ?? ''
  session.user.image = image
  token.nickname = nickname
  token.image = image

  return session
}
