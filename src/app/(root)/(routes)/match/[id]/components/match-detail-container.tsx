'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'
import {
  useMatchPost,
  useMatchApplications,
  useApplyMatch,
  useDeleteMatch,
} from '../../hooks'
import { MatchAuthorView } from './match-author-view'
import { MatchViewerView } from './match-viewer-view'

const MatchDetailContainer = () => {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()

  const matchId = params?.id as string

  // SWR hooks 사용
  const {
    matchPost,
    isLoading: isMatchLoading,
    error: matchError,
  } = useMatchPost(matchId)

  const { applyToMatch } = useApplyMatch(matchId)
  const { deleteMatch, isDeleting } = useDeleteMatch(matchId)
  const isAuthor = matchPost?.userno === session?.user?.id

  // 작성자인 경우에만 신청 목록 조회
  const {
    applications,
    isLoading: _isApplicationsLoading,
    error: _applicationsError,
    mutate: mutateApplications,
  } = useMatchApplications(isAuthor ? matchId : '')

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

  // 작성자인지 비작성자인지에 따라 다른 컴포넌트 렌더링
  if (isAuthor) {
    return (
      <MatchAuthorView
        matchPost={matchPost}
        applications={applications}
        isDeleting={isDeleting}
        onDelete={handleDelete}
        onApplicationStatusChange={handleApplicationStatus}
        mutateApplications={mutateApplications}
      />
    )
  }

  return <MatchViewerView matchPost={matchPost} onApply={handleApplySubmit} />
}

export { MatchDetailContainer }
