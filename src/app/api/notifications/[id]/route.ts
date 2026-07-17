import { NextRequest, NextResponse } from 'next/server'
import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { NotificationRepository } from '@/modules/notification'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const token = await getAuthTokenFromRequest(request)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const repo = new NotificationRepository(token)
    await repo.markAsRead(params.id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
