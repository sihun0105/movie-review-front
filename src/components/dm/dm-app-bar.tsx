'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

export function DmAppBar() {
  const { status } = useSession()
  const isLogin = status === 'authenticated'
  const isLoading = status === 'loading'

  return (
    <header className="sticky top-0 z-30 flex items-center border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md">
      <Link href="/" className="text-[17px] font-bold tracking-[-0.02em] text-foreground">
        drunken<span className="text-primary">movie</span>
      </Link>

      <div className="ml-auto flex items-center gap-2">
        {isLoading && (
          <span className="font-mono text-[11px] text-muted-foreground">···</span>
        )}
        {isLogin && (
          <Link
            href="/account"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </Link>
        )}
        {!isLoading && !isLogin && (
          <button
            type="button"
            onClick={() => signIn()}
            className="h-9 rounded-md border border-border px-3 text-[13px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            로그인
          </button>
        )}
      </div>
    </header>
  )
}
