'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MatchPost } from '@/lib/type'
import { Button } from '@/components/ui/button'
import Box from '@/components/ui/box'
import { GenderIcon } from '@/components/app/gender-icon'
import { GenderBadge } from '@/components/app/gender-badge'

interface MatchCardProps {
  matchPost: MatchPost
  onApply: (_matchId: string) => void
}

export const MatchCard = ({ matchPost, onApply }: MatchCardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleApply = async () => {
    setIsLoading(true)
    try {
      await onApply(matchPost.id)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewDetails = () => {
    router.push(`/match/${matchPost.id}`)
  }

  const isFullyBooked =
    matchPost.currentParticipants >= matchPost.maxParticipants

  return (
    <Box className="rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-lg font-semibold">{matchPost.title}</h3>
            <GenderBadge gender={matchPost.authorGender} size="sm" />
          </div>
          <p className="mb-2 text-sm text-gray-600">{matchPost.content}</p>
        </div>
        <div className="text-sm text-gray-500">
          {matchPost.currentParticipants}/{matchPost.maxParticipants}명
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center text-sm">
          <span className="w-20 font-medium text-gray-700">영화:</span>
          <span>{matchPost.movieTitle}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-20 font-medium text-gray-700">영화관:</span>
          <span>{matchPost.theaterName}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-20 font-medium text-gray-700">상영시간:</span>
          <span>{new Date(matchPost.showTime).toLocaleString('ko-KR')}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-20 font-medium text-gray-700">위치:</span>
          <span>{matchPost.location}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-20 font-medium text-gray-700">작성자:</span>
          <div className="flex items-center gap-2">
            <GenderIcon gender={matchPost.authorGender} size="sm" />
            <span>{matchPost.author}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleViewDetails}>
          상세보기
        </Button>
        <Button
          size="sm"
          onClick={handleApply}
          disabled={isLoading || isFullyBooked}
        >
          {isLoading ? '신청 중...' : isFullyBooked ? '모집완료' : '신청하기'}
        </Button>
      </div>
    </Box>
  )
}
