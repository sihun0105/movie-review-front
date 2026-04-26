import { NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { MatchPostRepository } from '@/modules/match/match-post-repository'

export async function GET() {
  try {
    const token = getTokenFromCookie()
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
