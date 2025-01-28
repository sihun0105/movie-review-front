'use client'
import { cn } from '@/lib/utils'
import { signIn, useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { Button } from '../ui/button'
import HeaderActiveButton from '../layout/header-active-button'
import { Clapperboard } from 'lucide-react'
import Link from 'next/link'
import { AppSkeleton } from './app-skeleton'
import { DarkModeToggle } from './dark-mode-toggle'

interface HeaderProps {
  className?: string
}

const Header: FunctionComponent<HeaderProps> = ({ className }) => {
  const { status } = useSession()
  const isLogin = status === 'authenticated'
  const isLoading = status === 'loading'
  const isNotLogin = status === 'unauthenticated'
  return (
    <nav
      className={cn(
        'flex justify-between border-b-2 border-gray-50 px-6 py-2',
        className,
      )}
    >
      <Link href={'/'}>
        <Clapperboard />
      </Link>
      <DarkModeToggle />
      {isLoading && <AppSkeleton className="h-8 w-20" />}
      {isLogin && (
        <>
          <HeaderActiveButton />
        </>
      )}
      {isNotLogin && (
        <Button
          onClick={() => {
            signIn()
          }}
          variant={'outline'}
          size={'sm'}
          className=""
        >
          로그인
        </Button>
      )}
    </nav>
  )
}

export default Header
