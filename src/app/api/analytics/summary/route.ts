import { NextRequest, NextResponse } from 'next/server'
import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { AnalyticsRepository } from '@/modules/analytics'

export async function GET(request: NextRequest) {
  const token = await getAuthTokenFromRequest(request)
  if (!token) {
    return NextResponse.json(
      { message: '로그인이 필요합니다.' },
      { status: 401 },
    )
  }

  try {
    const summary = await new AnalyticsRepository(token).getSummary()
    return NextResponse.json(summary)
  } catch (error) {
    const status = Number((error as { status?: number }).status) || 500
    const message =
      status === 403
        ? '관리자 권한이 필요합니다.'
        : '통계 정보를 불러오지 못했습니다.'
    return NextResponse.json({ message }, { status })
  }
}
