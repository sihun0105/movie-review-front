import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { NotificationRepository } from '@/modules/notification'

export async function GET(request: NextRequest) {
  const token = getTokenFromCookie()
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page') || '1')
  const pageSize = Number(searchParams.get('pageSize') || '20')

  try {
    const repo = new NotificationRepository(token)
    const data = await repo.getNotifications(page, pageSize)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
