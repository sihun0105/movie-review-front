'use client'

import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { UpdateProfileModal } from '../components/update-profile-modal'
import { useUpdateProfileModalContext } from '../hooks/use-update-profile-modal-context'
import { DmUserAvatar } from '@/components/dm'

const ProfileSection: FunctionComponent = () => {
  const { data } = useSession()
  const { setOpen } = useUpdateProfileModalContext()
  const user = data?.user

  return (
    <section className="border-b border-border px-4 py-4">
      <UpdateProfileModal />
      <div className="flex items-center gap-3.5 rounded-lg border border-border bg-card p-4">
        <DmUserAvatar
          name={user?.nickname}
          image={user?.image}
          className="h-14 w-14"
          fallbackClassName="text-[22px]"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[16px] font-semibold text-foreground">
            {user?.nickname ?? '게스트'}
          </div>
          <div className="mt-0.5 truncate font-mono text-[12px] text-muted-foreground">
            {user?.email ?? ''}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="h-8 rounded-md border border-border px-3 text-[12px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          편집
        </button>
      </div>
    </section>
  )
}

export default ProfileSection
