'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'

const NAV = [
  {
    href: '/',
    label: '홈',
    exact: true,
    icon: <path d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V10z" />,
  },
  {
    href: '/match',
    label: '매칭',
    icon: <path d="M4 7h16M4 12h10M4 17h7" />,
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

function NavItem({ href, label, icon, exact }: (typeof NAV)[number]) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : !!pathname?.startsWith(href)

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2.5 rounded-md px-3 py-2 text-[14px] transition-colors',
        isActive
          ? 'bg-secondary text-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground',
      )}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
    <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[240px] lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:border-r lg:border-border">
      <div className="px-4 pb-4 pt-5">
        <Link href="/" className="text-[18px] font-bold tracking-[-0.02em] text-foreground">
          drunken<span className="text-primary">movie</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 px-2">
        {NAV.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>

      {user && (
        <div className="border-t border-border px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[13px] font-bold text-foreground">
              {initial}
            </div>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold text-foreground">{user.nickname}</div>
              <div className="font-mono text-[10px] text-muted-foreground">멤버</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
