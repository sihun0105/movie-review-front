'use client'

import { ChatRoomEntity } from '@/modules/chat'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function parseRoom(room: ChatRoomEntity, currentUserId: number) {
  const matchId = room.roomName.startsWith('Match Chat - ')
    ? room.roomName.replace('Match Chat - ', '')
    : room.roomName
  const targetUserId = room.memberIds.find((id) => id !== currentUserId) ?? null
  const date = new Date(room.updatedAt)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const timeStr = isToday
    ? date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })
  return { matchId, targetUserId, timeStr }
}

function RoomRow({
  room,
  currentUserId,
}: {
  room: ChatRoomEntity
  currentUserId: number
}) {
  const { matchId, targetUserId, timeStr } = parseRoom(room, currentUserId)
  const href = targetUserId
    ? `/match/${matchId}/chat/${targetUserId}`
    : `/match/${matchId}`
  const initial = matchId.charAt(0).toUpperCase()

  return (
    <Link
      href={href}
      className="flex items-center gap-3 border-b border-border px-4 py-3.5 hover:bg-secondary"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-[17px] font-bold text-foreground">
        {initial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-[14px] font-semibold text-foreground">
            {targetUserId ? `상대방 #${targetUserId}` : room.roomName}
          </span>
          <span className="ml-auto shrink-0 font-mono text-[10px] text-muted-foreground">
            {timeStr}
          </span>
        </div>
        <div className="mt-0.5 font-mono text-[9px] tracking-[0.5px] text-primary">
          🎟 {matchId}
        </div>
        <div className="mt-0.5 text-[12px] text-muted-foreground">채팅방 열기 →</div>
      </div>
    </Link>
  )
}

export function ChatRoomList() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const userId = session?.user?.id ? Number(session.user.id) : null

  const { data, isLoading } = useSWR(
    userId ? `/api/chat/rooms?userId=${userId}` : null,
    fetcher,
    { refreshInterval: 30_000 },
  )

  if (status === 'loading' || isLoading)
    return (
      <div className="flex h-[40vh] items-center justify-center font-mono text-[12px] text-muted-foreground">
        loading...
      </div>
    )

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  const rooms: ChatRoomEntity[] = data?.chatRooms ?? []

  if (rooms.length === 0)
    return (
      <div className="flex h-[40vh] flex-col items-center justify-center gap-3 text-center">
        <div className="text-[18px] font-semibold text-muted-foreground">
          아직 채팅이 없어요
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          매칭 신청이 승인되면 채팅이 시작됩니다.
        </div>
        <Link
          href="/match"
          className="mt-2 rounded-md border border-border px-4 py-2 font-mono text-[11px] text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          매칭 찾아보기 →
        </Link>
      </div>
    )

  return (
    <div>
      {rooms.map((room) => (
        <RoomRow key={room.chatRoomId} room={room} currentUserId={userId!} />
      ))}
    </div>
  )
}
