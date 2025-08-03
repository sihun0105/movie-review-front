'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { CreateMatchPostRequest } from '@/lib/type'
import { useMatchPosts, useCreateMatch } from '../hooks'
import { MatchHeaderSection } from '../sections/match-header-section'
import { MatchFormSection } from '../sections/match-form-section'
import { MatchListSection } from '../sections/match-list-section'

export const MatchContainer = () => {
  const { status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<any>(null)

  // SWR hooks
  const { matchPosts, isLoading: isLoadingPosts, mutate } = useMatchPosts()
  const { createMatch } = useCreateMatch()

  // 매치 신청 함수
  const handleApplyToMatch = async (matchId: string, message: string) => {
    try {
      const response = await fetch(`/api/match/${matchId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error('Failed to apply to match')
      }

      return await response.json()
    } catch (error) {
      throw error
    }
  }

  // 인증 체크
  if (status === 'loading') {
    return (
      <div className="py-8 text-center">
        <p>로딩 중...</p>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  // 매치 생성
  const handleCreateMatch = async (data: CreateMatchPostRequest) => {
    try {
      await createMatch(data)
      toast({
        title: '성공',
        description: '매치가 성공적으로 등록되었습니다.',
      })
      setShowForm(false)
      mutate() // 목록 새로고침
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 등록에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  // 매치 신청
  const handleApply = (matchId: string) => {
    const match = matchPosts.find((m) => m.id === matchId)
    setSelectedMatch(match)
    setShowApplyDialog(true)
  }

  const handleApplySubmit = async (message: string) => {
    if (!selectedMatch) return

    try {
      await handleApplyToMatch(selectedMatch.id, message)
      toast({
        title: '성공',
        description: '매치 신청이 완료되었습니다.',
      })
      setShowApplyDialog(false)
      setSelectedMatch(null)
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 신청에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <MatchHeaderSection onCreateClick={() => setShowForm(true)} />

      {showForm && (
        <div className="mb-8">
          <MatchFormSection
            onSubmit={handleCreateMatch}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <MatchListSection
        matchPosts={matchPosts}
        isLoading={isLoadingPosts}
        selectedMatch={selectedMatch}
        showApplyDialog={showApplyDialog}
        onApply={handleApply}
        onApplySubmit={handleApplySubmit}
        onCloseApplyDialog={() => {
          setShowApplyDialog(false)
          setSelectedMatch(null)
        }}
      />
    </>
  )
}
