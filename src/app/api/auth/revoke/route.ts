import { revokeSession } from '@/lib/backend-auth-session'
import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const token = await getAuthTokenFromRequest(req)
  if (!token) return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 })
  try {
    const response = await revokeSession(token)
    if (!response.ok) return NextResponse.json({ message: '로그아웃에 실패했습니다.' }, { status: response.status })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ message: '로그아웃에 실패했습니다.' }, { status: 503 })
  }
}
