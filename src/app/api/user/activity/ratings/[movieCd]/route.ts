import { UserActivityBackEndApiEndpoint } from '@/config/user-activity-backend-api-endpoint'
import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { movieCd: string } },
) {
  const token = await getAuthTokenFromRequest(request)
  if (!token) {
    return NextResponse.json(
      { message: '로그인이 필요합니다.' },
      { status: 401 },
    )
  }
  try {
    const response = await fetch(
      UserActivityBackEndApiEndpoint.deleteRating(params.movieCd),
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const body = await response.json().catch(() => ({ success: response.ok }))
    return NextResponse.json(body, { status: response.status })
  } catch {
    return NextResponse.json(
      { message: '평점을 삭제하지 못했습니다.' },
      { status: 502 },
    )
  }
}
