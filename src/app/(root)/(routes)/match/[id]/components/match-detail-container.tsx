'use client'

import { useAppToast } from '@/hooks/use-app-toast'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  useApplyMatch,
  useDeleteMatch,
  useMatchApplications,
  useMatchPost,
} from '../../hooks'
import { MatchAuthorView } from './match-author-view'
import { MatchViewerView } from './match-viewer-view'

const MatchDetailContainer = () => {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const { showToast } = useAppToast()
  const matchId = params?.id as string

  const { matchPost, isLoading: isMatchLoading, error: matchError } = useMatchPost(matchId)
  const { applyToMatch } = useApplyMatch(matchId)
  const { deleteMatch, isDeleting } = useDeleteMatch(matchId)
  const isAuthor = matchPost?.userno === session?.user?.id
  const { applications, mutate: mutateApplications } = useMatchApplications(
    isAuthor ? matchId : '',
  )

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  const handleApplySubmit = async (message: string) => {
    try {
      await applyToMatch({ message })
      showToast('매치 신청이 완료되었습니다.')
      mutateApplications()
    } catch {
      showToast('매치 신청에 실패했습니다.')
    }
  }

  const handleApplicationStatus = async (
    applicationId: string,
    appStatus: 'accepted' | 'rejected',
  ) => {
    try {
      const res = await fetch(`/api/match/${matchId}/applications/${applicationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: appStatus }),
      })
      if (!res.ok) throw new Error()
      showToast(appStatus === 'accepted' ? '신청을 승인했습니다.' : '신청을 거절했습니다.')
      mutateApplications()
    } catch {
      showToast('신청 상태 변경에 실패했습니다.')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteMatch()
      showToast('매치가 삭제되었습니다.')
      router.push('/match')
    } catch {
      showToast('매치 삭제에 실패했습니다.')
    }
  }

  if (status === 'loading' || isMatchLoading)
    return (
      <div className="flex min-h-page items-center justify-center bg-dm-bg font-dm-mono text-[12px] text-dm-text-faint">
        loading...
      </div>
    )

  if (status === 'unauthenticated') return null

  if (matchError || !matchPost)
    return (
      <div className="flex min-h-page flex-col items-center justify-center gap-4 bg-dm-bg text-dm-text">
        <div className="font-dm-mono text-[11px] uppercase tracking-[1px] text-dm-red">Error</div>
        <div className="text-[14px] text-dm-text-muted">매치 정보를 불러올 수 없습니다.</div>
        <button
          onClick={() => router.push('/match')}
          className="border border-dm-line px-4 py-2 font-dm-mono text-[12px] text-dm-text-faint hover:border-dm-amber hover:text-dm-amber"
        >
          목록으로 돌아가기
        </button>
      </div>
    )

  if (isAuthor)
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

  return <MatchViewerView matchPost={matchPost} onApply={handleApplySubmit} />
}

export { MatchDetailContainer }
