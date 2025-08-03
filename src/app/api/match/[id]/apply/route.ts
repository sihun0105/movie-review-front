import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/next-option'

// POST /api/match/[id]/apply - 매치 신청
export async function POST(
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
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json(
        { error: '신청 메시지를 입력해주세요.' },
        { status: 400 },
      )
    }

    // TODO: 실제 백엔드 API 호출
    // 중복 신청 확인, 매치 존재 확인 등

    const newApplication = {
      id: Date.now().toString(),
      matchPostId: matchId,
      applicantUserno: parseInt(session.user.id || '0'),
      applicantName: session.user.nickname || '익명',
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newApplication, { status: 201 })
  } catch (error) {
    console.error('Match apply error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
