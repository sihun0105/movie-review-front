import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { ChatRepository } from '@/modules/chat/chat-repository'

// POST /api/chat/direct - 1:1 채팅방 찾기 또는 생성
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { currentUserId, targetUserId, targetUserName } = body

    if (!currentUserId || !targetUserId) {
      return NextResponse.json(
        { error: 'currentUserId and targetUserId are required' },
        { status: 400 },
      )
    }

    const chatRepository = new ChatRepository(token)

    const data = await chatRepository.findOrCreateDirectChatRoom(
      currentUserId,
      targetUserId,
      targetUserName,
    )
    return NextResponse.json({ chatRoom: data })
  } catch (error) {
    console.error('Direct chat room API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
