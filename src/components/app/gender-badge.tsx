'use client'

import { Gender } from '@/lib/type'
import { cn } from '@/lib/utils/cn'

interface GenderBadgeProps {
  gender?: Gender
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export const GenderBadge = ({
  gender,
  size = 'md',
  showText = true,
  className,
}: GenderBadgeProps) => {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }

  const genderConfig = {
    [Gender.MALE]: {
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200',
      text: '남',
      fullText: '남성',
    },
    [Gender.FEMALE]: {
      color: 'text-pink-700',
      bgColor: 'bg-pink-100',
      borderColor: 'border-pink-200',
      text: '여',
      fullText: '여성',
    },
  }

  // gender가 undefined이거나 유효하지 않은 경우 컴포넌트를 렌더링하지 않음
  if (!gender || !genderConfig[gender]) {
    return null
  }

  const config = genderConfig[gender]

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border font-medium',
        config.bgColor,
        config.color,
        config.borderColor,
        sizeClasses[size],
        className,
      )}
      title={config.fullText}
    >
      {showText ? config.text : ''}
    </span>
  )
}
