import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { MatchRepository } from '@/modules/match/match-repository'

// GET /api/match/[id] - match 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const token = getTokenFromCookie()
    const matchRepository = new MatchRepository(token)

    const data = await matchRepository.getMatchPost(id)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Match detail API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

// PUT /api/match/[id] - match 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const matchRepository = new MatchRepository(token)

    const data = await matchRepository.updateMatchPost(id, body)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Match update API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

// DELETE /api/match/[id] - match 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const matchRepository = new MatchRepository(token)

    await matchRepository.deleteMatchPost(id)
    return NextResponse.json({ message: 'Match deleted successfully' })
  } catch (error) {
    console.error('Match delete API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
