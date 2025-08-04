'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MatchApplyDialog } from '@/components/app/match-apply-dialog'
import { ChatDialog } from '@/components/app/chat-dialog'
import Box from '@/components/ui/box'
import { MatchPost } from '@/lib/type'
import { useMyApplication } from '../../hooks/use-my-application'

interface MatchViewerViewProps {
  matchPost: MatchPost
  onApply: (message: string) => Promise<void>
}

const MatchViewerView = ({ matchPost, onApply }: MatchViewerViewProps) => {
  const router = useRouter()
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  // 특정 매치에 대한 내 신청 상태 조회
  const { application: myApplication } = useMyApplication(matchPost.id)

  // 매치 신청
  const handleApplySubmit = async (message: string) => {
    await onApply(message)
    setShowApplyDialog(false)
  }

  // 채팅 시작
  const handleStartChat = () => {
    setChatOpen(true)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.push('/match')}>
          ← 목록으로
        </Button>
      </div>

      {/* 매치 정보 */}
      <Box className="mb-8">
        <div className="mb-6">
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

        {/* 신청하기 버튼 또는 현재 상태 */}
        <div className="mt-6 flex flex-col items-center gap-4">
          {!myApplication ? (
            // 아직 신청하지 않은 경우
            <Button
              onClick={() => setShowApplyDialog(true)}
              disabled={
                matchPost.currentParticipants >= matchPost.maxParticipants
              }
              size="lg"
            >
              {matchPost.currentParticipants >= matchPost.maxParticipants
                ? '모집 완료'
                : '신청하기'}
            </Button>
          ) : (
            // 이미 신청한 경우
            <div className="text-center">
              <div
                className={`inline-block rounded px-4 py-2 text-sm font-medium ${
                  myApplication.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : myApplication.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                }`}
              >
                {myApplication.status === 'pending'
                  ? '신청 대기 중'
                  : myApplication.status === 'accepted'
                    ? '신청 승인됨'
                    : '신청 거절됨'}
              </div>
              {myApplication.status === 'accepted' && (
                <div className="mt-4">
                  <Button onClick={handleStartChat} size="lg">
                    작성자와 채팅하기
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Box>

      {/* 모집 현황 */}
      <Box>
        <div className="mb-4">
          <h2 className="text-xl font-bold">모집 현황</h2>
        </div>

        <div className="py-6 text-center">
          <div className="mb-2 text-3xl font-bold text-blue-600">
            {matchPost.currentParticipants}
          </div>
          <div className="mb-4 text-sm text-gray-600">
            / {matchPost.maxParticipants}명
          </div>

          {matchPost.currentParticipants >= matchPost.maxParticipants && (
            <div className="mt-4 rounded-lg bg-red-50 p-3">
              <p className="font-medium text-red-600">모집이 완료되었습니다</p>
            </div>
          )}
        </div>
      </Box>

      {/* 매치 신청 다이얼로그 */}
      <MatchApplyDialog
        isOpen={showApplyDialog}
        onClose={() => setShowApplyDialog(false)}
        onApply={handleApplySubmit}
        matchTitle={matchPost?.title || ''}
      />

      {/* 채팅 다이얼로그 */}
      {myApplication?.status === 'accepted' && (
        <ChatDialog
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          targetUserId={matchPost.userno.toString()}
          targetUserName={matchPost.author}
          matchTitle={matchPost.title}
        />
      )}
    </main>
  )
}

export { MatchViewerView }
