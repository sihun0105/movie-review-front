import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { NextRequest, NextResponse } from 'next/server'
import { UserActivityBackEndApiEndpoint } from '../../../../config/user-activity-backend-api-endpoint'

export async function GET(request: NextRequest) {
  const token = await getAuthTokenFromRequest(request)
  if (!token) {
    return NextResponse.json(
      { message: '로그인이 필요합니다.' },
      { status: 401 },
    )
  }

  try {
    const response = await fetch(UserActivityBackEndApiEndpoint.getSummary(), {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    const body = await response.json().catch(() => ({
      message: '커뮤니티 활동을 불러오지 못했습니다.',
    }))
    return NextResponse.json(body, { status: response.status })
  } catch {
    return NextResponse.json(
      { message: '커뮤니티 활동을 불러오지 못했습니다.' },
      { status: 502 },
    )
  }
}
