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
    <section className="flex items-center gap-3.5 border-b border-dm-line px-5 py-5">
      <UpdateProfileModal />
      <div
        aria-hidden
        className="flex h-16 w-16 items-center justify-center rounded-full text-[24px] font-bold text-white"
        style={{
          background: user?.image
            ? undefined
            : 'linear-gradient(135deg, var(--dm-red) 0%, var(--dm-red-deep) 100%)',
          backgroundImage: user?.image ? `url(${user.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!user?.image && initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[17px] font-bold text-dm-text">
          {user?.nickname ?? '게스트'}
        </div>
        <div className="mt-0.5 truncate text-[11px] text-dm-text-muted">
          {user?.email ?? ''}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border border-dm-line-2 px-2.5 py-1.5 font-dm-mono text-[10px] uppercase tracking-[0.5px] text-dm-text-muted hover:border-dm-amber hover:text-dm-amber"
      >
        편집
      </button>
    </section>
  )
}

export default ProfileSection
