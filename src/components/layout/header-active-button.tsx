'use client'
import { FunctionComponent, useContext } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { SessionContext, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface HeaderActiveButtonProps {}

const HeaderActiveButton: FunctionComponent<HeaderActiveButtonProps> = ({}) => {
  const userdata = useContext(SessionContext)
  const nickname = userdata?.data?.user.nickname || 'User'
  const avatarUrl = userdata?.data?.user.image // 이미지가 있다면 사용
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 px-3 py-2">
          <Avatar className="h-7 w-7">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={nickname} />
            ) : (
              <AvatarFallback>{nickname.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <span className="max-w-[100px] truncate text-base font-medium text-gray-800 dark:text-gray-100">
            {nickname}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={'/account'}>내 정보</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            signOut()
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HeaderActiveButton
