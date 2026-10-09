import { MatchParticipantRepository } from '@/modules/match'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const repository = new MatchParticipantRepository()
    const participants = await repository.getParticipants(params.id)
    return NextResponse.json({ participants })
  } catch (error) {
    console.error('Match participants API error:', error)
    return NextResponse.json(
      { error: '참여자 정보를 불러오지 못했습니다.' },
      { status: 500 },
    )
  }
}
