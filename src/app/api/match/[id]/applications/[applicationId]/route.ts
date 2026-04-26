import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { MatchApplicationRepository } from '@/modules/match/match-application-repository'

// PUT /api/match/[id]/applications/[applicationId] - 신청 상태 변경 (승인/거절)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; applicationId: string } },
) {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, applicationId } = params
    const body = await request.json()
    const matchRepository = new MatchApplicationRepository(token)

    await matchRepository.updateApplicationStatus(
      id,
      applicationId,
      body.status,
    )
    return NextResponse.json({
      message: 'Application status updated successfully',
    })
  } catch (error) {
    console.error('Update application status API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
