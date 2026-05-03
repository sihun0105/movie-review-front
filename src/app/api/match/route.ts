import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { MatchPostRepository } from '@/modules/match/match-post-repository'

// GET /api/match - match 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('pageSize') || searchParams.get('limit') || '10')

    const token = getTokenFromCookie()
    const matchRepository = new MatchPostRepository(token)

    const data = await matchRepository.getMatchPosts(page, limit)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Match list API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

// POST /api/match - match 생성
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const matchRepository = new MatchPostRepository(token)

    const data = await matchRepository.createMatchPost(body)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Match create API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
