import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { MatchRepository } from '@/modules/match/match-repository'

// POST /api/match/[id]/apply - match 신청
export async function POST(
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

    const applyData = {
      matchPostId: id,
      message: body.message,
    }

    await matchRepository.applyToMatch(applyData)
    return NextResponse.json({ message: 'Successfully applied to match' })
  } catch (error) {
    console.error('Match apply API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
