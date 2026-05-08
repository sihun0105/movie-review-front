import { NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { NotificationRepository } from '@/modules/notification'

export async function GET() {
  const token = getTokenFromCookie()
  if (!token) return NextResponse.json({ count: 0 })

  try {
    const repo = new NotificationRepository(token)
    const data = await repo.getUnreadCount()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
