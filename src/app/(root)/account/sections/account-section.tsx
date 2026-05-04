'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { FunctionComponent } from 'react'

interface MenuItem {
  label: string
  href?: string
  onClick?: () => void
  destructive?: boolean
}

function MenuRow({ item, isLast }: { item: MenuItem; isLast: boolean }) {
  const inner = (
    <div
      className={`flex w-full items-center px-4 py-3.5 text-left transition-colors hover:bg-accent ${!isLast ? 'border-b border-border' : ''}`}
    >
      <span className={`text-[14px] ${item.destructive ? 'text-destructive' : 'text-foreground'}`}>
        {item.label}
      </span>
      {!item.destructive && (
        <svg
          width="7" height="12" viewBox="0 0 8 14"
          aria-hidden className="ml-auto text-muted-foreground"
        >
          <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
  if (item.href) return <Link href={item.href}>{inner}</Link>
  return <button type="button" onClick={item.onClick} className="block w-full">{inner}</button>
}

const AccountSection: FunctionComponent = () => {
  const items: MenuItem[] = [
    { label: '내가 쓴 매칭', href: '/match/my-matches' },
    { label: '내가 신청한 매칭', href: '/match/my-matches?tab=applied' },
    { label: '알림 설정' },
    { label: '로그아웃', onClick: () => signOut({ callbackUrl: '/' }), destructive: true },
  ]
  return (
    <section>
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <h1 className="text-[18px] font-bold tracking-tight text-foreground">계정</h1>
      </div>

      <div className="px-4 pt-4">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">활동</p>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {items.map((it, i) => (
            <MenuRow key={it.label} item={it} isLast={i === items.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AccountSection
