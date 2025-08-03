import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CreateMatchPostRequest } from '@/lib/type'
import { MatchPostForm } from '@/components/app/match-post-form'
import { MatchApplyDialog } from '@/components/app/match-apply-dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useMatchPosts, useCreateMatch, useApplyMatch } from './hooks'
import { MatchCard } from './components/match-card'

const MatchPage = () => {
  const { data: _session, status } = useSession()
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<any>(null)
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const { toast } = useToast()

  // SWR hooks 사용
  const { matchPosts, isLoading, mutate } = useMatchPosts(1, 10)
  const { createMatch } = useCreateMatch()
  const { applyToMatch } = useApplyMatch(selectedMatch?.id || '')

  // 로그인 체크
  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // 로딩 중이거나 로그인되지 않은 경우
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
    return null
  }

  // 매치 게시글 작성
  const handleCreateMatch = async (data: CreateMatchPostRequest) => {
    try {
      await createMatch(data)
      toast({
        title: '성공',
        description: '매치 게시글이 작성되었습니다.',
      })
      setShowForm(false)
      mutate() // 목록 새로고침
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 게시글 작성에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  // 매치 신청
  const handleApplySubmit = async (message: string) => {
    if (!selectedMatch) return

    try {
      await applyToMatch({ message })
      toast({
        title: '성공',
        description: '매치 신청이 완료되었습니다.',
      })
      setShowApplyDialog(false)
      setSelectedMatch(null)
      mutate() // 목록 새로고침
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 신청에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  if (showForm) {
    return (
      <main className="container mx-auto px-4 py-8">
        <MatchPostForm
          onSubmit={handleCreateMatch}
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
          <p>매치 게시글을 불러오는 중...</p>
        </div>
      ) : matchPosts.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">아직 등록된 매치가 없습니다.</p>
          <p className="text-gray-500">첫 번째 매치를 등록해보세요!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matchPosts.map((match) => (
            <MatchCard
              key={match.id}
              matchPost={match}
              onApply={(_matchId) => {
                setSelectedMatch(match)
                setShowApplyDialog(true)
              }}
            />
          ))}
        </div>
      )}

      {/* 매치 신청 다이얼로그 */}
      <MatchApplyDialog
        isOpen={showApplyDialog}
        onClose={() => {
          setShowApplyDialog(false)
          setSelectedMatch(null)
        }}
        onApply={handleApplySubmit}
        matchTitle={selectedMatch?.title || ''}
      />
    </main>
  )
}

export default MatchPage
