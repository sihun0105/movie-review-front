import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { MatchRepository } from '@/modules/match/match-repository'

// GET /api/match/[id]/my-application - 내 신청 상태 조회
export async function GET(
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

    // 현재 사용자의 신청 상태만 조회
    const myApplication = await matchRepository.getMyApplication(id)

    return NextResponse.json({
      application: myApplication,
    })
  } catch (error) {
    console.error('My application API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
