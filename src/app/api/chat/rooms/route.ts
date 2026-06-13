import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { ChatRepository } from '@/modules/chat/chat-repository'
import { MatchPostRepository } from '@/modules/match/match-post-repository'
import type { ChatRoomsResponseEntity } from '@/modules/chat/chat.entity'

async function addMatchTitles(
  data: ChatRoomsResponseEntity,
  token: string,
): Promise<ChatRoomsResponseEntity> {
  const matchIds = Array.from(
    new Set(data.chatRooms.map((room) => room.matchPostId).filter(Boolean)),
  ) as string[]

  if (matchIds.length === 0) return data

  const matchRepository = new MatchPostRepository(token)
  const entries = await Promise.all(
    matchIds.map(async (matchId) => {
      try {
        const match = await matchRepository.getMatchPost(matchId)
        return [matchId, match.title || match.movieTitle] as const
      } catch (error) {
        console.warn(`Match title fetch skipped (${matchId}):`, error)
        return [matchId, ''] as const
      }
    }),
  )
  const titleMap = new Map(entries.filter(([, title]) => Boolean(title)))

  return {
    ...data,
    chatRooms: data.chatRooms.map((room) => ({
      ...room,
      matchTitle: room.matchPostId
        ? titleMap.get(room.matchPostId) || room.matchTitle
        : room.matchTitle,
    })),
  }
}

// POST /api/chat/rooms - 채팅방 생성
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const chatRepository = new ChatRepository(token)

    const data = await chatRepository.createChatRoom(body)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Chat room create API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

// GET /api/chat/rooms - 채팅방 목록 조회
export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = parseInt(searchParams.get('userId') || '0')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const chatRepository = new ChatRepository(token)

    const data = await chatRepository.getChatRooms({
      userId,
      page,
      pageSize,
    })
    return NextResponse.json(await addMatchTitles(data, token))
  } catch (error) {
    console.error('Chat rooms list API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
