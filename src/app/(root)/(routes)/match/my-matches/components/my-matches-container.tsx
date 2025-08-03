'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Box from '@/components/ui/box'
import { useToast } from '@/hooks/use-toast'
import {
  useMyApplications,
  useMyPosts,
  useCancelApplication,
} from '../../hooks'

const MyMatchesContainer = () => {
  const { data: _session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<'applied' | 'created'>('applied')

  // SWR hooks
  const {
    applications: appliedMatches,
    isLoading: loadingApplications,
    refetch: refetchApplications,
  } = useMyApplications()
  const { matches: createdMatches, isLoading: loadingPosts } = useMyPosts()
  const { cancelApplication } = useCancelApplication()

  const isLoading = activeTab === 'applied' ? loadingApplications : loadingPosts

  // 로그인 체크
  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // 신청 취소
  const handleCancelApplication = useCallback(
    async (applicationId: string) => {
      if (!window.confirm('정말로 신청을 취소하시겠습니까?')) return

      try {
        await cancelApplication(applicationId)
        toast({
          title: '성공',
          description: '신청이 취소되었습니다.',
        })
        refetchApplications()
      } catch (error) {
        toast({
          title: '오류',
          description: '신청 취소에 실패했습니다.',
          variant: 'destructive',
        })
      }
    },
    [cancelApplication, toast, refetchApplications],
  )

  // 로딩 상태
  if (status === 'loading') {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="py-8 text-center">
          <p>로딩 중...</p>
        </div>
      </main>
    )
  }

  // 로그인되지 않은 경우
  if (status === 'unauthenticated') {
    return null
  }

  // 상태 텍스트 및 색상
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '대기 중'
      case 'accepted':
        return '승인됨'
      case 'rejected':
        return '거절됨'
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'accepted':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">내 매칭 관리</h1>
        <p className="text-gray-600">
          신청한 매칭과 내가 만든 매칭을 관리하세요.
        </p>
      </div>

      {/* 탭 메뉴 */}
      <div className="mb-6 flex space-x-1 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab('applied')}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'applied'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          신청한 매칭
        </button>
        <button
          onClick={() => setActiveTab('created')}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'created'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          내가 만든 매칭
        </button>
      </div>

      {/* 콘텐츠 */}
      {isLoading ? (
        <div className="py-8 text-center">
          <p>데이터를 불러오는 중...</p>
        </div>
      ) : activeTab === 'applied' ? (
        <div className="space-y-4">
          {appliedMatches.length === 0 ? (
            <Box className="py-8 text-center">
              <p className="text-gray-500">신청한 매칭이 없습니다.</p>
              <Button onClick={() => router.push('/match')} className="mt-4">
                매칭 찾아보기
              </Button>
            </Box>
          ) : (
            appliedMatches.map((application) => (
              <Box key={application.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3
                        className="cursor-pointer text-lg font-semibold hover:text-blue-600"
                        onClick={() =>
                          router.push(`/match/${application.matchPostId}`)
                        }
                      >
                        매칭 상세보기
                      </h3>
                      <span
                        className={`rounded px-2 py-1 text-xs ${getStatusColor(
                          application.status,
                        )}`}
                      >
                        {getStatusText(application.status)}
                      </span>
                    </div>
                    <p className="mb-3 text-gray-600">{application.message}</p>
                    <div className="text-sm text-gray-500">
                      신청일:{' '}
                      {new Date(application.createdAt).toLocaleString('ko-KR')}
                    </div>
                  </div>
                  <div className="ml-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/match/${application.matchPostId}`)
                      }
                    >
                      상세보기
                    </Button>
                    {application.status === 'pending' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelApplication(application.id)}
                      >
                        신청 취소
                      </Button>
                    )}
                  </div>
                </div>
              </Box>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {createdMatches.length === 0 ? (
            <Box className="py-8 text-center">
              <p className="text-gray-500">작성한 매칭이 없습니다.</p>
              <Button onClick={() => router.push('/match')} className="mt-4">
                매칭 작성하기
              </Button>
            </Box>
          ) : (
            createdMatches.map((match) => (
              <Box key={match.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3
                      className="mb-2 cursor-pointer text-lg font-semibold hover:text-blue-600"
                      onClick={() => router.push(`/match/${match.id}`)}
                    >
                      {match.title}
                    </h3>
                    <div className="mb-3 grid gap-2 text-sm text-gray-600 md:grid-cols-2">
                      <div>영화: {match.movieTitle}</div>
                      <div>상영관: {match.theaterName}</div>
                      <div>
                        상영시간:{' '}
                        {new Date(match.showTime).toLocaleString('ko-KR')}
                      </div>
                      <div>
                        모집인원: {match.currentParticipants}/
                        {match.maxParticipants}명
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      작성일:{' '}
                      {new Date(match.createdAt).toLocaleString('ko-KR')}
                    </div>
                  </div>
                  <div className="ml-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/match/${match.id}`)}
                    >
                      관리하기
                    </Button>
                  </div>
                </div>
              </Box>
            ))
          )}
        </div>
      )}
    </main>
  )
}

export { MyMatchesContainer }
