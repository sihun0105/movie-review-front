'use client'
import { cn } from '@/lib/utils'
import { signIn, useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { Button } from '../ui/button'
import HeaderActiveButton from '../layout/header-active-button'
import { Clapperboard } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  className?: string
}

const Header: FunctionComponent<HeaderProps> = ({ className }) => {
  const { status } = useSession()
  const isLogin = status === 'authenticated'
  return (
    <nav
      className={cn(
        'bg-whtie flex h-full w-full items-center justify-between border-b-2 border-primary px-9 py-2',
        className,
      )}
    >
      <Link href={'/'}>
        <Clapperboard />
      </Link>
      {isLogin && (
        <>
          <HeaderActiveButton />
        </>
      )}
      {!isLogin && (
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
