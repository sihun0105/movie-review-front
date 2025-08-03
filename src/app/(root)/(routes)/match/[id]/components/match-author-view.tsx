'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Box from '@/components/ui/box'
import { useToast } from '@/hooks/use-toast'
import { MatchPost, MatchApplication } from '@/lib/type'

interface MatchAuthorViewProps {
  matchPost: MatchPost
  applications: MatchApplication[]
  isDeleting: boolean
  onDelete: () => Promise<void>
  onApplicationStatusChange: (
    applicationId: string,
    status: 'accepted' | 'rejected',
  ) => Promise<void>
  mutateApplications: () => void
}

const MatchAuthorView = ({
  matchPost,
  applications,
  isDeleting,
  onDelete,
  onApplicationStatusChange,
  mutateApplications: _mutateApplications,
}: MatchAuthorViewProps) => {
  const router = useRouter()
  const { toast } = useToast()

  // 매치 삭제
  const handleDelete = async () => {
    if (!window.confirm('정말로 이 매치를 삭제하시겠습니까?')) return
    await onDelete()
  }

  // 1:1 채팅방 오픈 (추후 구현)
  const handleOpenChat = (_applicantId: string) => {
    // TODO: 1:1 채팅방 오픈 로직 구현
    toast({
      title: '준비 중',
      description: '1:1 채팅 기능은 곧 제공될 예정입니다.',
    })
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
      </Box>

      {/* 신청 목록 관리 */}
      <Box>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">신청 목록 관리</h2>
          <span className="text-sm text-gray-500">
            총 {applications.length}명 신청
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">아직 신청자가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
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
                    {application.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() =>
                            onApplicationStatusChange(
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
                            onApplicationStatusChange(
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
                      <>
                        <span className="mr-2 font-medium text-green-600">
                          승인됨
                        </span>
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
    </main>
  )
}

export { MatchAuthorView }
