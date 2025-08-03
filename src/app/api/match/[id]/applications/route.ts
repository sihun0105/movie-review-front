import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/next-option'

// GET /api/match/[id]/applications - 매치 신청 목록 조회 (작성자만)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 },
      )
    }

    const matchId = params.id

    // TODO: 실제 백엔드 API 호출
    // 매치 게시글 작성자인지 확인

    // 임시 더미 데이터
    const mockApplications = [
      {
        id: '1',
        matchPostId: matchId,
        applicantUserno: 2,
        applicantName: '영화팬123',
        message:
          '안녕하세요! 어벤져스 정말 좋아하는데 같이 보면 재미있을 것 같아요. 영화 후에 감상평도 나누고 싶어요!',
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        matchPostId: matchId,
        applicantUserno: 3,
        applicantName: '마블러버',
        message: '마블 시리즈 다 봤어요! 함께 보면서 이야기 나누면 좋겠습니다.',
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json(mockApplications)
  } catch (error) {
    console.error('Applications list error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
