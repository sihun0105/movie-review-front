'use client'

import React, { FunctionComponent, PropsWithChildren } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { AppPath } from '@/config/app-path'

interface NavbarProps extends PropsWithChildren {
  className?: string
}

const Navbar: FunctionComponent<NavbarProps> = ({ className }) => {
  return (
    <nav
      className={cn(
        'flex h-full w-full items-center justify-between bg-white',
        className,
      )}
    >
      <Link href={'/'}>
        <p>Home</p>
      </Link>

      <Link
        className="flex items-center justify-center"
        href={AppPath.mypage()}
      >
        <p>My</p>
      </Link>
    </nav>
  )
}

export default Navbar
