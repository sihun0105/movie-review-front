'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MatchPost, MatchApplication } from '@/lib/type'
import { MatchService } from '@/modules/match'
import { Button } from '@/components/ui/button'
import { MatchApplyDialog } from '@/components/app/match-apply-dialog'
import Box from '@/components/ui/box'
import { useToast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'

const MatchDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()

  const [matchPost, setMatchPost] = useState<MatchPost | null>(null)
  const [applications, setApplications] = useState<MatchApplication[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showApplyDialog, setShowApplyDialog] = useState(false)

  const matchId = params?.id as string
  const isAuthor = matchPost?.userno.toString() === session?.user?.id

  // 로그인 체크
  useEffect(() => {
    if (status === 'loading') return // 로딩 중이면 대기

    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
  }, [status, router])

  const fetchMatchDetail = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await MatchService.getMatchPost(matchId)
      setMatchPost(data)
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 정보를 불러오는데 실패했습니다.',
        variant: 'destructive',
      })
      router.push('/match')
    } finally {
      setIsLoading(false)
    }
  }, [matchId, toast, router])

  const fetchApplications = useCallback(async () => {
    try {
      const data = await MatchService.getMatchApplications(matchId)
      setApplications(data)
    } catch (error) {
      toast({
        title: '오류',
        description: '신청 목록을 불러오는데 실패했습니다.',
        variant: 'destructive',
      })
    }
  }, [matchId, toast])

  useEffect(() => {
    if (matchId) {
      fetchMatchDetail()
    }
  }, [matchId, fetchMatchDetail])

  useEffect(() => {
    if (matchPost && isAuthor) {
      fetchApplications()
    }
  }, [matchPost, isAuthor, fetchApplications])

  const handleApply = async (message: string) => {
    try {
      await MatchService.applyToMatch({
        matchPostId: matchId,
        message,
      })
      toast({
        title: '성공',
        description: '매치 신청이 완료되었습니다.',
      })
      fetchMatchDetail()
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 신청에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  const handleApplicationStatus = async (
    applicationId: string,
    status: 'accepted' | 'rejected',
  ) => {
    try {
      await MatchService.updateApplicationStatus(matchId, applicationId, status)
      toast({
        title: '성공',
        description:
          status === 'accepted'
            ? '신청을 승인했습니다.'
            : '신청을 거절했습니다.',
      })
      fetchApplications()

      if (status === 'accepted') {
        // TODO: 1:1 채팅방 생성 로직
        toast({
          title: '채팅방 생성',
          description: '1:1 채팅방이 생성되었습니다.',
        })
      }
    } catch (error) {
      toast({
        title: '오류',
        description: '신청 상태 변경에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  if (status === 'loading' || isLoading || !matchPost) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">로딩 중...</div>
      </main>
    )
  }

  if (status === 'unauthenticated') {
    return null // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  const isFullyBooked =
    matchPost.currentParticipants >= matchPost.maxParticipants

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Button
          variant="outline"
          onClick={() => router.push('/match')}
          className="mb-6"
        >
          ← 목록으로 돌아가기
        </Button>

        <Box className="mb-6 p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-bold">{matchPost.title}</h1>
              <p className="mb-4 text-gray-600">{matchPost.content}</p>
            </div>
            <div className="text-right">
              <div className="mb-2 text-sm text-gray-500">
                현재 인원: {matchPost.currentParticipants}/
                {matchPost.maxParticipants}명
              </div>
              {!isAuthor && (
                <Button
                  onClick={() => setShowApplyDialog(true)}
                  disabled={isFullyBooked}
                >
                  {isFullyBooked ? '모집완료' : '신청하기'}
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="mb-3 text-lg font-semibold">영화 정보</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="w-24 font-medium text-gray-700">
                      영화:
                    </span>
                    <span>{matchPost.movieTitle}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-medium text-gray-700">
                      영화관:
                    </span>
                    <span>{matchPost.theaterName}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-medium text-gray-700">
                      상영시간:
                    </span>
                    <span>
                      {new Date(matchPost.showTime).toLocaleString('ko-KR')}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-medium text-gray-700">
                      위치:
                    </span>
                    <span>{matchPost.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-3 text-lg font-semibold">작성자 정보</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="w-24 font-medium text-gray-700">
                      닉네임:
                    </span>
                    <span>{matchPost.author}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-medium text-gray-700">
                      작성일:
                    </span>
                    <span>
                      {new Date(matchPost.createdAt).toLocaleDateString(
                        'ko-KR',
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>

        {/* 신청자 목록 (작성자만 볼 수 있음) */}
        {isAuthor && applications.length > 0 && (
          <Box className="p-6">
            <h2 className="mb-4 text-xl font-semibold">신청자 목록</h2>
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-lg border bg-gray-50 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 font-medium">
                        {application.applicantName}
                      </div>
                      <p className="mb-3 text-sm text-gray-600">
                        {application.message}
                      </p>
                      <div className="text-xs text-gray-500">
                        신청일:{' '}
                        {new Date(application.createdAt).toLocaleString(
                          'ko-KR',
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex gap-2">
                      {application.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleApplicationStatus(
                                application.id,
                                'accepted',
                              )
                            }
                          >
                            승인
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleApplicationStatus(
                                application.id,
                                'rejected',
                              )
                            }
                          >
                            거절
                          </Button>
                        </>
                      )}
                      {application.status === 'accepted' && (
                        <span className="font-medium text-green-600">
                          승인됨
                        </span>
                      )}
                      {application.status === 'rejected' && (
                        <span className="font-medium text-red-600">거절됨</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Box>
        )}
      </div>

      <MatchApplyDialog
        isOpen={showApplyDialog}
        onClose={() => setShowApplyDialog(false)}
        onApply={handleApply}
        matchTitle={matchPost.title}
      />
    </main>
  )
}

export default MatchDetailPage
