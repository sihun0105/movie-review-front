import { NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { MatchApplicationRepository } from '@/modules/match/match-application-repository'

export async function DELETE(
  _request: Request,
  { params }: { params: { applicationId: string } },
) {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { applicationId } = params
    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 },
      )
    }

    const matchRepository = new MatchApplicationRepository(token)
    await matchRepository.cancelApplication(applicationId)

    return NextResponse.json({
      message: 'Application cancelled successfully',
    })
  } catch (error) {
    console.error('Error cancelling application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
