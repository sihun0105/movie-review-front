import { UserRound } from 'lucide-react'
import { notFound } from 'next/navigation'
import { UsersRepository } from '@/modules/users/users-repository'

interface ProfilePageProps {
  params: { id: string }
}

interface PublicProfile {
  id: number
  nickname: string
  image?: string
}

async function getProfile(id: string): Promise<PublicProfile | null> {
  const userId = Number(id)
  if (!Number.isInteger(userId) || userId <= 0) return null

  try {
    const user = await new UsersRepository().getUser(userId)
    return {
      id: user.id,
      nickname: user.nickname,
      image: user.image,
    }
  } catch {
    return null
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getProfile(params.id)
  if (!profile) notFound()

  const initial = profile.nickname.trim().charAt(0).toUpperCase()

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-10rem)] w-full max-w-[42rem] flex-col px-5 py-8">
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary text-3xl font-bold text-muted-foreground">
          {profile.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.image}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : initial ? (
            initial
          ) : (
            <UserRound className="h-10 w-10" />
          )}
        </div>
        <h1 className="mt-5 text-2xl font-bold">{profile.nickname}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          볼래에서 같이 영화 볼 사람을 찾고 있어요.
        </p>
      </section>
    </main>
  )
}
