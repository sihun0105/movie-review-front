'use client'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SKIP_PATHS = ['/setup-nickname', '/login', '/register', '/forgot-password', '/reset-password']

export function NicknameGuard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname() ?? ''

  useEffect(() => {
    if (status !== 'authenticated') return
    if (SKIP_PATHS.some((p) => pathname.startsWith(p))) return
    if (!session.user.nickname) {
      router.replace('/setup-nickname')
    }
  }, [status, session, pathname, router])

  return null
}
