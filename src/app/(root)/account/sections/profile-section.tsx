'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { useUpdateProfileModalContext } from '../hooks/use-update-profile-modal-context'
import { UpdateProfileModal } from '../components/update-profile-modal'
interface ProfileSectionProps {}

const ProfileSection: FunctionComponent<ProfileSectionProps> = ({}) => {
  const userData = useSession()
  const { setOpen } = useUpdateProfileModalContext()
  return (
    <main className="container ">
      <UpdateProfileModal />
      <p className="font-bold">프로필</p>
      <div className="flex flex-row justify-between gap-2 rounded-md ">
        <div className="flex flex-row items-center justify-center gap-2">
          <Avatar className="h-[32px] w-[32px]">
            <AvatarImage
              src={userData.data?.user?.image}
              width={32}
              height={32}
              alt="User_Avatar"
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>

          <p>{userData.data?.user?.nickname}</p>
        </div>
        <div className="flex items-center">
          <button onClick={() => setOpen(true)}>
            <p>편집</p>
          </button>
        </div>
      </div>
    </main>
  )
}

export default ProfileSection
