import { NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { NotificationRepository } from '@/modules/notification'

export async function PATCH() {
  const token = getTokenFromCookie()
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const repo = new NotificationRepository(token)
    await repo.markAllAsRead()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
