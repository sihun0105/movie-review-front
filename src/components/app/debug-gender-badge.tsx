'use client'

import { Gender } from '@/lib/type'
import { GenderBadge } from './gender-badge'

interface DebugGenderBadgeProps {
  gender?: Gender | string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const DebugGenderBadge = ({
  gender,
  size = 'md',
  className,
}: DebugGenderBadgeProps) => {
  // 디버깅을 위한 로그
  console.log('DebugGenderBadge received gender:', gender, typeof gender)

  // gender가 문자열인 경우 enum으로 변환
  let normalizedGender: Gender | undefined

  if (typeof gender === 'string') {
    if (gender.toLowerCase() === 'male') {
      normalizedGender = Gender.MALE
    } else if (gender.toLowerCase() === 'female') {
      normalizedGender = Gender.FEMALE
    }
  } else {
    normalizedGender = gender
  }

  console.log('Normalized gender:', normalizedGender)

  // 임시로 더미 성별 표시 (개발용)
  if (!normalizedGender) {
    return (
      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
        성별미정
      </span>
    )
  }

  return (
    <GenderBadge gender={normalizedGender} size={size} className={className} />
  )
}
