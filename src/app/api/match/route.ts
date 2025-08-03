import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/next-option'

// GET /api/match - 매치 게시글 목록 조회
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(request.url)
    const _page = parseInt(searchParams.get('page') || '1')
    const _pageSize = parseInt(searchParams.get('pageSize') || '10')

    // TODO: 실제 백엔드 API 호출
    // 임시 더미 데이터
    const mockData = {
      matchPosts: [
        {
          id: '1',
          title: '어벤져스 같이 볼 사람 구해요!',
          userno: 1,
          author: '영화매니아',
          content:
            '오늘 저녁 7시 CGV 강남점에서 어벤져스 보실 분 구해요. 재미있게 보고 가벼운 대화 나누면 좋겠어요!',
          movieTitle: '어벤져스: 엔드게임',
          theaterName: 'CGV 강남점',
          showTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2시간 후
          maxParticipants: 2,
          currentParticipants: 1,
          location: '강남구',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: '로맨스 영화 함께 보실 분!',
          userno: 2,
          author: '로맨스러버',
          content:
            '이번 주말에 로맨스 영화 보실 분 구해요. 영화 후에 카페에서 이야기 나누어요.',
          movieTitle: '사랑의 불시착',
          theaterName: '롯데시네마 홍대입구점',
          showTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 내일
          maxParticipants: 2,
          currentParticipants: 1,
          location: '홍대',
          createdAt: new Date().toISOString(),
        },
      ],
      hasNext: false,
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error('Match list error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}

// POST /api/match - 매치 게시글 작성
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 },
      )
    }

    const body = await request.json()
    const {
      title,
      content,
      movieTitle,
      theaterName,
      showTime,
      maxParticipants,
      location,
    } = body

    // 유효성 검사
    if (
      !title ||
      !content ||
      !movieTitle ||
      !theaterName ||
      !showTime ||
      !maxParticipants ||
      !location
    ) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 },
      )
    }

    // TODO: 실제 백엔드 API 호출
    // 임시 응답
    const newMatch = {
      id: Date.now().toString(),
      title,
      userno: parseInt(session.user.id || '0'),
      author: session.user.nickname || '익명',
      content,
      movieTitle,
      theaterName,
      showTime,
      maxParticipants,
      currentParticipants: 1,
      location,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newMatch, { status: 201 })
  } catch (error) {
    console.error('Match creation error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
