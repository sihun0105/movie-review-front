import { notFound } from 'next/navigation'
import { DmUserAvatar } from '@/components/dm'
import { UsersRepository } from '@/modules/users/users-repository'

interface ProfilePageProps {
  params: { nickname: string }
}

interface PublicProfile {
  id: number
  nickname: string
  image?: string
}

async function getProfile(nickname: string): Promise<PublicProfile | null> {
  const decodedNickname = decodeURIComponent(nickname).trim()
  if (!decodedNickname) return null

  try {
    const user = await new UsersRepository().getUserByNickname(decodedNickname)
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
  const profile = await getProfile(params.nickname)
  if (!profile) notFound()

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-10rem)] w-full max-w-[42rem] flex-col px-5 py-8">
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <DmUserAvatar
          name={profile.nickname}
          image={profile.image}
          className="h-28 w-28"
          fallbackClassName="text-3xl"
        />
        <h1 className="mt-5 text-2xl font-bold">{profile.nickname}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          볼래에서 같이 영화 볼 사람을 찾고 있어요.
        </p>
      </section>
    </main>
  )
}
