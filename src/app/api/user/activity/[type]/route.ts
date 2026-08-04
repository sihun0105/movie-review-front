import { UserActivityBackEndApiEndpoint } from '@/config/user-activity-backend-api-endpoint'
import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import type { UserActivityType } from '@/modules/user-activity'
import { NextRequest, NextResponse } from 'next/server'

const supportedTypes = new Set<UserActivityType>([
  'comments',
  'ratings',
  'articles',
  'likes',
])

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } },
) {
  const token = await getAuthTokenFromRequest(request)
  if (!token) {
    return NextResponse.json(
      { message: '로그인이 필요합니다.' },
      { status: 401 },
    )
  }
  if (!supportedTypes.has(params.type as UserActivityType)) {
    return NextResponse.json(
      { message: '잘못된 활동 유형입니다.' },
      { status: 400 },
    )
  }
  const page = request.nextUrl.searchParams.get('page') ?? '1'
  const pageSize = request.nextUrl.searchParams.get('pageSize') ?? '10'
  try {
    const response = await fetch(
      UserActivityBackEndApiEndpoint.getActivity(params.type, page, pageSize),
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      },
    )
    const body = await response.json().catch(() => ({
      message: '활동 목록을 불러오지 못했습니다.',
    }))
    return NextResponse.json(body, { status: response.status })
  } catch {
    return NextResponse.json(
      { message: '활동 목록을 불러오지 못했습니다.' },
      { status: 502 },
    )
  }
}
