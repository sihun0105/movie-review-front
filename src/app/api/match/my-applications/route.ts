import { NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { MatchApplicationRepository } from '@/modules/match/match-application-repository'

export async function GET() {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const matchRepository = new MatchApplicationRepository(token)
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
