import { NextRequest, NextResponse } from 'next/server'
import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { ChatRepository } from '@/modules/chat/chat-repository'

// GET /api/chat/rooms/[roomId] - 특정 채팅방 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } },
) {
  try {
    const token = await getAuthTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { roomId } = params
    const { searchParams } = new URL(request.url)
    const userId = parseInt(searchParams.get('userId') || '0')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const chatRepository = new ChatRepository(token)

    const data = await chatRepository.getChatRoom({
      chatRoomId: roomId,
      userId,
    })
    // 기존 페이지가 { chatRoom } 형태 기대 → 래핑해 반환
    return NextResponse.json({ chatRoom: data })
  } catch (error) {
    console.error('Chat room detail API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
