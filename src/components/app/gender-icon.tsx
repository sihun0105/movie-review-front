'use client'

import { Gender } from '@/lib/type'
import { User2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface GenderIconProps {
  gender: Gender
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const GenderIcon = ({ gender, size = 'md', className }: GenderIconProps) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  const genderConfig = {
    [Gender.MALE]: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      label: '남성'
    },
    [Gender.FEMALE]: {
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      label: '여성'
    }
  }

  const config = genderConfig[gender]

  return (
    <div 
      className={cn(
        'inline-flex items-center justify-center rounded-full p-1',
        config.bgColor,
        className
      )}
      title={config.label}
    >
      <User2 className={cn(sizeClasses[size], config.color)} />
    </div>
  )
}
