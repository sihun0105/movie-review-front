'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  key: 'home' | 'match' | 'chat' | 'account'
  label: string
  href: string
  icon: JSX.Element
}

const ITEMS: NavItem[] = [
  {
    key: 'home',
    label: '홈',
    href: '/',
    icon: <path d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V10z" />,
  },
  {
    key: 'match',
    label: '매칭',
    href: '/match',
    icon: <path d="M4 7h16M4 12h10M4 17h7" />,
  },
  {
    key: 'chat',
    label: '채팅',
    href: '/chat',
    icon: <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-6l-5 4v-4H5a2 2 0 01-2-2V5z" />,
  },
  {
    key: 'account',
    label: '계정',
    href: '/account',
    icon: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z" />,
  },
]

function activeKey(pathname: string): NavItem['key'] {
  if (pathname.startsWith('/match')) return 'match'
  if (pathname.startsWith('/chat')) return 'chat'
  if (pathname.startsWith('/account')) return 'account'
  return 'home'
}

export function DmBottomNav() {
  const pathname = usePathname() ?? '/'
  const active = activeKey(pathname)

  return (
    <nav className="sticky bottom-0 z-20 grid h-16 grid-cols-4 border-t border-border bg-background">
      {ITEMS.map((it) => {
        const isActive = active === it.key
        return (
          <Link
            key={it.key}
            href={it.href}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors',
              isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {it.icon}
            </svg>
            {it.label}
          </Link>
        )
      })}
    </nav>
  )
}
