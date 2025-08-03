import { FunctionComponent } from 'react'
import { MatchCard } from '../components/match-card'
import { MatchApplyDialog } from '@/components/app/match-apply-dialog'

interface MatchListSectionProps {
  matchPosts: any[]
  isLoading: boolean
  selectedMatch: any
  showApplyDialog: boolean
  onApply: (_matchId: string) => void
  onApplySubmit: (_message: string) => Promise<void>
  onCloseApplyDialog: () => void
}

const MatchListSection: FunctionComponent<MatchListSectionProps> = ({
  matchPosts,
  isLoading,
  selectedMatch,
  showApplyDialog,
  onApply,
  onApplySubmit,
  onCloseApplyDialog,
}) => {
  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <p>매치 게시글을 불러오는 중...</p>
      </div>
    )
  }

  if (matchPosts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">아직 등록된 매치가 없습니다.</p>
        <p className="text-gray-500">첫 번째 매치를 등록해보세요!</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matchPosts.map((match) => (
          <MatchCard key={match.id} matchPost={match} onApply={onApply} />
        ))}
      </div>

      <MatchApplyDialog
        isOpen={showApplyDialog}
        onClose={onCloseApplyDialog}
        onApply={onApplySubmit}
        matchTitle={selectedMatch?.title || ''}
      />
    </>
  )
}

export { MatchListSection }
