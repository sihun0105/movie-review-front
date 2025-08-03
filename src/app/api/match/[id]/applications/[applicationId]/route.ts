import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../auth/[...nextauth]/next-option'

// PUT /api/match/[id]/applications/[applicationId] - 신청 상태 업데이트
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; applicationId: string } },
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 },
      )
    }

    const { id: matchId, applicationId } = params
    const body = await request.json()
    const { status } = body

    if (!status || !['accepted', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: '올바른 상태를 입력해주세요.' },
        { status: 400 },
      )
    }

    // TODO: 실제 백엔드 API 호출
    // 매치 게시글 작성자인지 확인
    // 신청이 존재하는지 확인
    // 상태 업데이트
    // accepted인 경우 채팅방 생성 로직 추가

    return NextResponse.json({
      message: '상태가 업데이트되었습니다.',
      matchId,
      applicationId,
      status,
    })
  } catch (error) {
    console.error('Application status update error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
