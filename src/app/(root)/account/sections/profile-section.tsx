'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'
import { FunctionComponent, useEffect, useState } from 'react'
import { useUpdateProfileModalContext } from '../hooks/use-update-profile-modal-context'
import { UpdateProfileModal } from '../components/update-profile-modal'
import { FaBeer } from 'react-icons/fa'
interface ProfileSectionProps {}

const ProfileSection: FunctionComponent<ProfileSectionProps> = ({}) => {
  const userData = useSession()
  const { setOpen } = useUpdateProfileModalContext()
  const [imageUrl, setImageUrl] = useState<string | null>(
    userData?.data?.user?.image || null,
  )
  useEffect(() => {
    if (userData?.data?.user?.image) {
      setImageUrl(userData.data.user.image)
    }
  }, [userData?.data?.user?.image])
  return (
    <main className="container ">
      <UpdateProfileModal />
      <p className="font-bold">프로필</p>
      <div className="flex flex-row justify-between gap-2 rounded-md ">
        <div className="flex flex-row items-center justify-center gap-2">
          <Avatar className="h-[32px] w-[32px]">
            {imageUrl ? (
              <AvatarImage
                src={imageUrl}
                width={32}
                height={32}
                alt="User_Avatar"
              />
            ) : (
              <AvatarFallback>
                <FaBeer />
              </AvatarFallback>
            )}

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
