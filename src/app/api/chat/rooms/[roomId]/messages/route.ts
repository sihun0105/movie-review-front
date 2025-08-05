import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { ChatRepository } from '@/modules/chat/chat-repository'

// GET /api/chat/rooms/[roomId]/messages - 특정 채팅방의 메시지 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } },
) {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { roomId } = params
    const { searchParams } = new URL(request.url)
    const userId = parseInt(searchParams.get('userId') || '0')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '50')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const chatRepository = new ChatRepository(token)

    const data = await chatRepository.getMessages({
      chatRoomId: roomId,
      userId,
      page,
      pageSize,
    })
    return NextResponse.json(data)
  } catch (error) {
    console.error('Chat messages API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

// POST /api/chat/rooms/[roomId]/messages - 메시지 전송
export async function POST(
  request: NextRequest,
  { params }: { params: { roomId: string } },
) {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { roomId } = params
    const body = await request.json()
    const { content, senderId } = body
    console.log('POST /api/chat/rooms/[roomId]/messages body:', body)
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 },
      )
    }

    if (!senderId || typeof senderId !== 'number') {
      return NextResponse.json(
        { error: 'SenderId is required' },
        { status: 400 },
      )
    }

    const chatRepository = new ChatRepository(token)

    const data = await chatRepository.sendMessage({
      chatRoomId: roomId,
      senderId,
      content,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Send message API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
