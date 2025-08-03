'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { MatchPost, CreateMatchPostRequest } from '@/lib/type'
import { MatchService } from '@/modules/match'
import { MatchCard } from '@/components/app/match-card'
import { MatchPostForm } from '@/components/app/match-post-form'
import { MatchApplyDialog } from '@/components/app/match-apply-dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

const MatchPage = () => {
  const { data: _session, status } = useSession()
  const router = useRouter()
  const [matchPosts, setMatchPosts] = useState<MatchPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<MatchPost | null>(null)
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const { toast } = useToast()

  // 로그인 체크
  useEffect(() => {
    if (status === 'loading') return // 로딩 중이면 대기

    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
  }, [status, router])

  // 매치 게시글 목록 조회
  useEffect(() => {
    if (status !== 'authenticated') return // 로그인된 경우에만 실행

    const loadMatchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await MatchService.getMatchPosts()
        setMatchPosts(response.matchPosts)
      } catch (error) {
        toast({
          title: '오류',
          description: '매치 게시글을 불러오는데 실패했습니다.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadMatchPosts()
  }, [status, toast])

  // 로그인되지 않은 경우 렌더링하지 않음
  if (status === 'loading') {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="py-8 text-center">
          <p>로딩 중...</p>
        </div>
      </main>
    )
  }

  if (status === 'unauthenticated') {
    return null // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  // 매치 게시글 목록 조회
  const fetchMatchPosts = async () => {
    setIsLoading(true)
    try {
      const response = await MatchService.getMatchPosts()
      setMatchPosts(response.matchPosts)
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 게시글을 불러오는데 실패했습니다.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 매치 게시글 작성
  const handleCreatePost = async (data: CreateMatchPostRequest) => {
    try {
      await MatchService.createMatchPost(data)
      toast({
        title: '성공',
        description: '매치 게시글이 작성되었습니다.',
      })
      setShowForm(false)
      fetchMatchPosts()
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 게시글 작성에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  // 매치 신청
  const handleApply = (matchId: string) => {
    const match = matchPosts.find((m) => m.id === matchId)
    if (match) {
      setSelectedMatch(match)
      setShowApplyDialog(true)
    }
  }

  // 매치 신청 제출
  const handleApplySubmit = async (message: string) => {
    if (!selectedMatch) return

    try {
      await MatchService.applyToMatch({
        matchPostId: selectedMatch.id,
        message,
      })
      toast({
        title: '성공',
        description: '매치 신청이 완료되었습니다.',
      })
      fetchMatchPosts()
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 신청에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  // 상세보기 (추후 구현)
  // const handleViewDetails = (matchId: string) => {
  //   // TODO: 상세 페이지로 이동 또는 모달 표시
  //   console.log('View details for match:', matchId)
  // }

  if (showForm) {
    return (
      <main className="container mx-auto px-4 py-8">
        <MatchPostForm
          onSubmit={handleCreatePost}
          onCancel={() => setShowForm(false)}
        />
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">영화 메이트 찾기</h1>
          <p className="text-gray-600">함께 영화를 볼 사람을 찾아보세요!</p>
        </div>
        <Button onClick={() => setShowForm(true)}>매치 등록하기</Button>
      </div>

      {isLoading ? (
        <div className="py-8 text-center">
          <p>로딩 중...</p>
        </div>
      ) : matchPosts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-4 text-gray-500">아직 등록된 매치가 없습니다.</p>
          <Button onClick={() => setShowForm(true)}>
            첫 번째 매치 등록하기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matchPosts.map((match) => (
            <MatchCard key={match.id} matchPost={match} onApply={handleApply} />
          ))}
        </div>
      )}

      <MatchApplyDialog
        isOpen={showApplyDialog}
        onClose={() => setShowApplyDialog(false)}
        onApply={handleApplySubmit}
        matchTitle={selectedMatch?.title || ''}
      />
    </main>
  )
}

export default MatchPage
