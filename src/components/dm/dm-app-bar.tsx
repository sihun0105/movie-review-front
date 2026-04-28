'use client'

import HeaderActiveButton from '@/components/layout/header-active-button'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

export function DmAppBar() {
  const { status } = useSession()
  const isLogin = status === 'authenticated'
  const isLoading = status === 'loading'

  return (
    <header className="sticky top-0 z-30 flex items-center border-b border-dm-line bg-dm-bg/95 px-4 py-2.5 backdrop-blur-md">
      <Link
        href="/"
        className="font-dm-display text-[20px] italic font-bold tracking-[-0.01em] text-dm-text"
      >
        drunken<span className="text-dm-red">movie</span>
      </Link>

      <div className="ml-auto flex items-center gap-2">
        {isLoading && (
          <span className="font-dm-mono text-[10px] text-dm-text-faint">
            ···
          </span>
        )}
        {isLogin && <HeaderActiveButton />}
        {!isLoading && !isLogin && (
          <button
            type="button"
            onClick={() => signIn()}
            className="border border-dm-line-2 px-3 py-1.5 font-dm-mono text-[11px] uppercase tracking-[0.5px] text-dm-text-muted hover:border-dm-amber hover:text-dm-amber"
          >
            Login
          </button>
        )}
      </div>
    </header>
  )
}
