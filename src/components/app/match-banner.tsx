'use client'

import Box from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MatchBannerProps {
  isAuthenticated: boolean
}

export const MatchBanner = ({ isAuthenticated }: MatchBannerProps) => {
  const router = useRouter()

  const handleClickMatch = () => {
    if (!isAuthenticated) {
      router.push('/login')
    } else {
      router.push('/match')
    }
  }

  return (
    <Box className="mb-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-lg">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Users className="h-5 w-5" />
            <h2 className="text-xl font-bold">영화 메이트 찾기</h2>
          </div>
          <p className="mb-4 text-blue-100">
            혼자 영화 보기 아쉬우시나요? 함께 영화를 즐길 메이트를 찾아보세요!
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleClickMatch}
            size="lg"
            className="bg-white px-6 font-semibold text-blue-600 hover:bg-blue-50"
          >
            {isAuthenticated ? '메이트 찾러가기' : '로그인하고 시작하기'}
          </Button>
          <p className="text-center text-xs text-blue-200">
            {isAuthenticated
              ? '새로운 사람들과 영화 취향을 공유해보세요!'
              : '회원가입 후 바로 이용 가능'}
          </p>
        </div>
      </div>
    </Box>
  )
}
