'use client'
import { cn } from '@/lib/utils'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { Button } from '../ui/button'
interface HeaderProps {
  className?: string
}

const Header: FunctionComponent<HeaderProps> = ({ className }) => {
  const { status } = useSession()
  const isLogin = status === 'authenticated'
  return (
    <nav
      className={cn(
        'flex h-full w-full items-center justify-between bg-white',
        className,
      )}
    >
      {isLogin && (
        <>
          <Button
            onClick={() => {
              signOut()
            }}
            variant={'outline'}
            size={'sm'}
            className=""
          >
            로그아웃
          </Button>
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
