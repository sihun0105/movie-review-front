import { NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { MatchRepository } from '@/modules/match/match-repository'

export async function GET() {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const matchRepository = new MatchRepository(token)
    const applications = await matchRepository.getMyApplications()

    return NextResponse.json({ applications })
  } catch (error) {
    console.error('Error fetching my applications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
