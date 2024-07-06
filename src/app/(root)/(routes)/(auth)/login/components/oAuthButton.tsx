'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FunctionComponent, ReactElement } from 'react'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiNaver } from 'react-icons/si'
import { FcGoogle } from 'react-icons/fc'
import { IoLogoApple } from 'react-icons/io'
import { IconType } from 'react-icons'

type AuthType = 'kakao' | 'naver' | 'google' | 'apple'

const buttonStyles: Record<AuthType, string> = {
  kakao: 'bg-[#FAE64C] text-black',
  naver: 'bg-[#1EC800] text-white',
  google: 'bg-white text-black border',
  apple: 'bg-white text-black border',
} as const

const socialIcon: {
  // eslint-disable-next-line no-unused-vars
  [key in AuthType]: ReactElement<IconType>
} = {
  kakao: <RiKakaoTalkFill size={24} />,
  naver: <SiNaver className={'ml-1'} />,
  google: <FcGoogle size={24} />,
  apple: <IoLogoApple size={28} />,
}

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: AuthType
}

const AuthButton: FunctionComponent<AuthButtonProps> = ({
  children,
  provider,
  onClick,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      className={cn(
        'relative flex w-full items-center text-[16px] font-semibold ',
        {
          [buttonStyles[provider]]: true,
        },
        className,
      )}
    >
      <span className="absolute left-[48px]">{socialIcon[provider]}</span>
      {children}
    </Button>
  )
}

export default AuthButton
