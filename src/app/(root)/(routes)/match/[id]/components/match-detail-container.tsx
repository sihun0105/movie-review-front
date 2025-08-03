'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MatchApplyDialog } from '@/components/app/match-apply-dialog'
import Box from '@/components/ui/box'
import { useToast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'
import {
  useMatchPost,
  useMatchApplications,
  useApplyMatch,
  useDeleteMatch,
} from '../../hooks'

const MatchDetailContainer = () => {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [showApplyDialog, setShowApplyDialog] = useState(false)

  const matchId = params?.id as string

  // SWR hooks 사용
  const {
    matchPost,
    isLoading: isMatchLoading,
    error: matchError,
  } = useMatchPost(matchId)
  const {
    applications,
    isLoading: isApplicationsLoading,
    mutate: mutateApplications,
  } = useMatchApplications(matchId)
  const { applyToMatch } = useApplyMatch(matchId)
  const { deleteMatch, isDeleting } = useDeleteMatch(matchId)

  const isAuthor = matchPost?.userno?.toString() === session?.user?.id

  // 로그인 체크
  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // 매치 신청
  const handleApplySubmit = async (message: string) => {
    try {
      await applyToMatch({ message })
      toast({
        title: '성공',
        description: '매치 신청이 완료되었습니다.',
      })
      setShowApplyDialog(false)
      mutateApplications() // 신청 목록 새로고침
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 신청에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  // 신청 상태 변경
  const handleApplicationStatus = async (
    applicationId: string,
    status: 'accepted' | 'rejected',
  ) => {
    try {
      const response = await fetch(
        `/api/match/${matchId}/applications/${applicationId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to update application status')
      }

      toast({
        title: '성공',
        description:
          status === 'accepted'
            ? '신청을 승인했습니다.'
            : '신청을 거절했습니다.',
      })
      mutateApplications() // 신청 목록 새로고침
    } catch (error) {
      toast({
        title: '오류',
        description: '신청 상태 변경에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  // 매치 삭제
  const handleDelete = async () => {
    if (!window.confirm('정말로 이 매치를 삭제하시겠습니까?')) return

    try {
      await deleteMatch()
      toast({
        title: '성공',
        description: '매치가 삭제되었습니다.',
      })
      router.push('/match')
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 삭제에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  // 1:1 채팅방 오픈 (추후 구현)
  const handleOpenChat = (_applicantId: string) => {
    // TODO: 1:1 채팅방 오픈 로직 구현
    toast({
      title: '준비 중',
      description: '1:1 채팅 기능은 곧 제공될 예정입니다.',
    })
  }

  // 로딩 상태
  if (status === 'loading' || isMatchLoading) {
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

  // 에러 상태
  if (matchError || !matchPost) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="py-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">오류</h1>
          <p className="text-gray-600">매치 정보를 불러올 수 없습니다.</p>
          <Button onClick={() => router.push('/match')} className="mt-4">
            목록으로 돌아가기
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.push('/match')}>
          ← 목록으로
        </Button>
      </div>

      <Box className="mb-8">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold">{matchPost.title}</h1>
            <div className="mb-4 text-sm text-gray-600">
              <span>작성자: {matchPost.author}</span>
              <span className="mx-2">•</span>
              <span>
                작성일:{' '}
                {new Date(matchPost.createdAt).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </div>
          {isAuthor && (
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </Button>
            </div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold">영화 정보</h3>
            <p className="text-gray-600">{matchPost.movieTitle}</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">상영관</h3>
            <p className="text-gray-600">{matchPost.theaterName}</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">상영 시간</h3>
            <p className="text-gray-600">
              {new Date(matchPost.showTime).toLocaleString('ko-KR')}
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">모집 인원</h3>
            <p className="text-gray-600">
              {matchPost.currentParticipants}/{matchPost.maxParticipants}명
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">위치</h3>
            <p className="text-gray-600">{matchPost.location}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 font-semibold">상세 내용</h3>
          <p className="whitespace-pre-wrap text-gray-700">
            {matchPost.content}
          </p>
        </div>

        {!isAuthor && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => setShowApplyDialog(true)}
              disabled={
                matchPost.currentParticipants >= matchPost.maxParticipants
              }
            >
              {matchPost.currentParticipants >= matchPost.maxParticipants
                ? '모집 완료'
                : '신청하기'}
            </Button>
          </div>
        )}
      </Box>

      {/* 신청 목록 */}
      <Box>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">신청 목록</h2>
          {isAuthor && (
            <span className="text-sm text-gray-500">
              총 {applications.length}명 신청
            </span>
          )}
        </div>

        {isApplicationsLoading ? (
          <div className="py-4 text-center">
            <p>신청 목록을 불러오는 중...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="py-4 text-center">
            <p className="text-gray-500">아직 신청자가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application: any) => (
              <div key={application.id} className="rounded border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-medium">
                        {application.applicantName}
                      </span>
                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          application.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : application.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {application.status === 'pending'
                          ? '대기 중'
                          : application.status === 'accepted'
                            ? '승인됨'
                            : '거절됨'}
                      </span>
                    </div>
                    <p className="mb-3 text-sm text-gray-600">
                      {application.message}
                    </p>
                    <div className="text-xs text-gray-500">
                      신청일:{' '}
                      {new Date(application.createdAt).toLocaleString('ko-KR')}
                    </div>
                  </div>
                  <div className="ml-4 flex gap-2">
                    {isAuthor && application.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleApplicationStatus(application.id, 'accepted')
                          }
                        >
                          승인
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleApplicationStatus(application.id, 'rejected')
                          }
                        >
                          거절
                        </Button>
                      </>
                    )}
                    {application.status === 'accepted' && (
                      <>
                        <span className="font-medium text-green-600">
                          승인됨
                        </span>
                        {isAuthor && (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleOpenChat(
                                application.applicantUserno.toString(),
                              )
                            }
                          >
                            채팅하기
                          </Button>
                        )}
                      </>
                    )}
                    {application.status === 'rejected' && (
                      <span className="font-medium text-red-600">거절됨</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Box>

      {/* 매치 신청 다이얼로그 */}
      <MatchApplyDialog
        isOpen={showApplyDialog}
        onClose={() => setShowApplyDialog(false)}
        onApply={handleApplySubmit}
        matchTitle={matchPost?.title || ''}
      />
    </main>
  )
}

export { MatchDetailContainer }
