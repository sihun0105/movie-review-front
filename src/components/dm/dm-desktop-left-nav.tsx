'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const NAV = [
  {
    href: '/',
    label: '홈',
    exact: true,
    icon: <path d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V10z" />,
  },
  {
    href: '/match',
    label: '같이 볼 사람',
    icon: <><path d="M4 7h16M4 12h10M4 17h7" /><path d="M18 14l3 3-3 3M16 17h5" /></>,
  },
  {
    href: '/chat',
    label: '채팅',
    icon: <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-6l-5 4v-4H5a2 2 0 01-2-2V5z" />,
  },
  {
    href: '/articles',
    label: '아티클',
    icon: <path d="M4 19.5V5a2 2 0 012-2h12a2 2 0 012 2v14.5a.5.5 0 01-.8.4L12 15l-7.2 4.9a.5.5 0 01-.8-.4z" />,
  },
  {
    href: '/account',
    label: '계정',
    icon: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></>,
  },
]

const BROWSE = ['박스오피스', '장르별', '개봉 예정작']

function NavItem({ href, label, icon, exact }: (typeof NAV)[number]) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : !!pathname?.startsWith(href)

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-3 py-2.5 text-[13px] transition-colors ${
        isActive
          ? 'border-l-2 border-dm-red bg-dm-surface pl-[10px] text-dm-text'
          : 'text-dm-text-muted hover:text-dm-text'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {icon}
      </svg>
      {label}
    </Link>
  )
}

export function DmDesktopLeftNav() {
  const { data: session } = useSession()
  const user = session?.user
  const initial = user?.nickname?.charAt(0).toUpperCase() ?? '?'

  return (
    <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[240px] lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:border-r lg:border-dm-line" style={{ background: '#0e0e12' }}>
      <div className="px-4 pb-4 pt-5">
        <Link href="/" className="font-dm-display text-[22px] italic font-bold tracking-[-0.01em]">
          drunken<span className="text-dm-red">movie</span>
        </Link>
      </div>

      <nav className="flex-1 px-2">
        {NAV.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}

        <div className="mt-4 px-3 pb-1.5 font-dm-mono text-[10px] uppercase tracking-[1.5px] text-dm-text-faint">
          탐색
        </div>
        {BROWSE.map((label) => (
          <div
            key={label}
            className="px-3 py-2 text-[13px] text-dm-text-muted"
          >
            {label}
          </div>
        ))}
      </nav>

      {user && (
        <div className="border-t border-dm-line px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, var(--dm-red) 0%, var(--dm-red-deep) 100%)' }}
            >
              {initial}
            </div>
            <div className="min-w-0">
              <div className="truncate text-[12px] font-semibold text-dm-text">{user.nickname}</div>
              <div className="font-dm-mono text-[10px] text-dm-text-faint">Lv.1</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
