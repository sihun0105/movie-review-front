import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/next-option'

// GET /api/match/[id] - 매치 게시글 상세 조회
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
    // 임시 더미 데이터
    const mockMatch = {
      id: matchId,
      title: '어벤져스 같이 볼 사람 구해요!',
      userno: 1,
      author: '영화매니아',
      content:
        '오늘 저녁 7시 CGV 강남점에서 어벤져스 보실 분 구해요. 재미있게 보고 가벼운 대화 나누면 좋겠어요!',
      movieTitle: '어벤져스: 엔드게임',
      theaterName: 'CGV 강남점',
      showTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      maxParticipants: 2,
      currentParticipants: 1,
      location: '강남구',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(mockMatch)
  } catch (error) {
    console.error('Match detail error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}

// PUT /api/match/[id] - 매치 게시글 수정
export async function PUT(
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
    const _body = await request.json()

    // TODO: 실제 백엔드 API 호출 및 권한 확인

    return NextResponse.json({ message: '수정 완료', id: matchId })
  } catch (error) {
    console.error('Match update error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}

// DELETE /api/match/[id] - 매치 게시글 삭제
export async function DELETE(
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

    // TODO: 실제 백엔드 API 호출 및 권한 확인

    return NextResponse.json({ message: '삭제 완료', id: matchId })
  } catch (error) {
    console.error('Match delete error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
