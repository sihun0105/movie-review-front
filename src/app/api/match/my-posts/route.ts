import { NextRequest, NextResponse } from 'next/server'
import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { MatchPostRepository } from '@/modules/match/match-post-repository'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const token = await getAuthTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const matchRepository = new MatchPostRepository(token)
    const matches = await matchRepository.getMyPosts()

    return NextResponse.json({ matches })
  } catch (error) {
    console.error('Error fetching my posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
