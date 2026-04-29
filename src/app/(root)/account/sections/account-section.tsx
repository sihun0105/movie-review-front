'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { FunctionComponent } from 'react'

interface MenuItem {
  label: string
  href?: string
  onClick?: () => void
  meta?: string
}

const Chevron = () => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 8 14"
    aria-hidden
    className="ml-2 text-dm-text-faint"
  >
    <path
      d="M1 1l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function MenuRow({ item }: { item: MenuItem }) {
  const inner = (
    <div className="flex w-full items-center border-b border-dm-line px-5 py-3.5 text-left text-dm-text">
      <span className="text-[14px]">{item.label}</span>
      {item.meta && (
        <span className="ml-auto font-dm-mono text-[11px] text-dm-text-faint">
          {item.meta}
        </span>
      )}
      <Chevron />
    </div>
  )
  if (item.href) return <Link href={item.href}>{inner}</Link>
  return (
    <button type="button" onClick={item.onClick} className="block w-full">
      {inner}
    </button>
  )
}

const AccountSection: FunctionComponent = () => {
  const items: MenuItem[] = [
    { label: '내가 쓴 매칭', href: '/match/my-matches' },
    { label: '내가 신청한 매칭', href: '/match/my-matches?tab=applied' },
    { label: '알림 설정' },
    { label: '로그아웃', onClick: () => signOut({ callbackUrl: '/' }) },
  ]
  return (
    <section className="bg-dm-bg">
      <div className="flex items-center border-b border-dm-line px-4 py-3.5">
        <h1 className="font-dm-display text-[20px] italic font-bold text-dm-text">
          계정
        </h1>
      </div>
      {items.map((it) => (
        <MenuRow key={it.label} item={it} />
      ))}
    </section>
  )
}

export default AccountSection
