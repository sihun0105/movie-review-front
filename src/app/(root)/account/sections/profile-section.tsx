'use client'

import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { UpdateProfileModal } from '../components/update-profile-modal'
import { useUpdateProfileModalContext } from '../hooks/use-update-profile-modal-context'

const ProfileSection: FunctionComponent = () => {
  const { data } = useSession()
  const { setOpen } = useUpdateProfileModalContext()
  const user = data?.user
  const initial = user?.nickname?.charAt(0).toUpperCase() ?? '?'

  return (
    <section className="border-b border-border px-4 py-4">
      <UpdateProfileModal />
      <div className="flex items-center gap-3.5 rounded-lg border border-border bg-card p-4">
        <div
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-[22px] font-bold text-foreground"
          style={{
            backgroundImage: user?.image ? `url(${user.image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!user?.image && initial}
        </div>
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
