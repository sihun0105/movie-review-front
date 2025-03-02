import { FunctionComponent } from 'react'
import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
export interface IconProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  src: string | StaticImageData
}

const Icon: FunctionComponent<IconProps> = ({
  className,
  size = 'md',
  src,
}) => {
  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center',
        {
          'h-4 w-4': size === 'sm',
          'h-5 w-5': size === 'md',
          'h-6 w-6': size === 'lg',
        },
        className,
      )}
    >
      <Image fill src={src} alt="user icon" />
    </span>
  )
}

export default Icon
