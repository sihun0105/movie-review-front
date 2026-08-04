'use client'

import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { UpdateProfileModal } from '../components/update-profile-modal'
import { useUpdateProfileModalContext } from '../hooks/use-update-profile-modal-context'
import { DmUserAvatar } from '@/components/dm'
import { Pencil } from 'lucide-react'

const ProfileSection: FunctionComponent = () => {
  const { data } = useSession()
  const { setOpen } = useUpdateProfileModalContext()
  const user = data?.user

  return (
    <section className="border-b border-border px-4 py-6 xl:border-0 xl:px-0 xl:py-0">
      <UpdateProfileModal />
      <div className="relative flex items-center gap-4 xl:flex-col xl:items-start">
        <DmUserAvatar
          name={user?.nickname}
          image={user?.image}
          className="h-16 w-16 xl:h-20 xl:w-20"
          fallbackClassName="text-[22px]"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[20px] font-bold tracking-tight text-foreground">
            {user?.nickname ?? '게스트'}
          </div>
          <div className="mt-0.5 truncate font-mono text-[12px] text-muted-foreground">
            {user?.email ?? ''}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="프로필 편집"
          title="프로필 편집"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-accent hover:text-foreground xl:absolute xl:right-0 xl:top-0"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}

export default ProfileSection
