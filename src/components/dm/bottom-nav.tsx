'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  key: 'home' | 'match' | 'chat' | 'account'
  label: string
  href: string
  icon: JSX.Element
  isMatch?: boolean
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
    icon: <path d="M4 7h16M4 12h10M4 17h7M18 14l3 3-3 3M16 17h5" />,
    isMatch: true,
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
    <nav className="sticky bottom-0 z-20 flex h-[72px] border-t border-dm-line bg-dm-bg/[0.92] backdrop-blur-md">
      {ITEMS.map((it) => {
        const isActive = active === it.key
        const accentRed = it.isMatch && isActive
        return (
          <Link
            key={it.key}
            href={it.href}
            className={cn(
              'relative flex flex-1 flex-col items-center gap-0.5 pt-2.5',
              isActive
                ? accentRed
                  ? 'text-dm-red'
                  : 'text-dm-text'
                : 'text-dm-text-faint',
            )}
          >
            {isActive && (
              <span
                className={cn(
                  'absolute top-0 h-0.5 w-7',
                  accentRed ? 'bg-dm-red' : 'bg-dm-amber',
                )}
                aria-hidden
              />
            )}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={accentRed ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {it.icon}
            </svg>
            <span className="font-dm-mono text-[10px] uppercase tracking-[0.5px]">
              {it.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
