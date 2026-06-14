'use client'

import { ChatRoomEntity } from '@/modules/chat'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function formatRoomTime(value?: string) {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  return isToday
    ? date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })
}

function parseRoom(room: ChatRoomEntity, currentUserId: number) {
  // 우선순위: matchPostId 필드(신규) → roomName 파싱(레거시)
  let matchId: string | null = room.matchPostId ?? null
  if (!matchId && room.roomName.startsWith('Match Chat - ')) {
    matchId = room.roomName.replace('Match Chat - ', '')
  }
  const targetUserId = room.memberIds.find((id) => id !== currentUserId) ?? null
  const targetProfile = room.memberProfiles?.find(
    (profile) => profile.userId !== currentUserId,
  )
  const timeStr = formatRoomTime(room.lastMessageAt || room.updatedAt)
  const title = room.matchTitle || (matchId ? '매칭 채팅' : room.roomName)
  const preview = room.lastMessage || '아직 주고받은 메시지가 없어요'

  return { matchId, targetUserId, targetProfile, timeStr, title, preview }
}

function RoomRow({
  room,
  currentUserId,
}: {
  room: ChatRoomEntity
  currentUserId: number
}) {
  const { matchId, targetUserId, targetProfile, timeStr, title, preview } =
    parseRoom(room, currentUserId)
  // matchId가 있으면 매치 컨텍스트가 있는 채팅 페이지로,
  // 없으면(레거시 룸) chatRoomId 직접 진입 페이지로 폴백
  const href =
    matchId && targetUserId
      ? `/match/${matchId}/chat/${targetUserId}`
      : `/chat/${room.chatRoomId}`
  const avatarLabel = targetProfile?.nickname || title || room.roomName
  const initial = avatarLabel.charAt(0).toUpperCase()
  const avatarStyle = targetProfile?.image
    ? {
        backgroundImage: `url("${targetProfile.image}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }
    : undefined

  return (
    <Link
      href={href}
      className="flex items-center gap-3 border-b border-border px-4 py-3.5 hover:bg-secondary"
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-[17px] font-bold text-foreground"
        style={avatarStyle}
        aria-label={avatarLabel}
      >
        {!targetProfile?.image && initial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-[14px] font-semibold text-foreground">
            {title}
          </span>
          {timeStr && (
            <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
              마지막 {timeStr}
            </span>
          )}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-muted-foreground">
          {targetProfile?.nickname && (
            <span className="max-w-[34%] truncate">
              {targetProfile.nickname}
            </span>
          )}
          {targetProfile?.nickname && <span aria-hidden="true">·</span>}
          <span className="truncate">{preview}</span>
        </div>
      </div>
    </Link>
  )
}

export function ChatRoomList() {
  const { data: session, status } = useSession()
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
    return (
      <div className="mx-4 mt-4 rounded-md border border-border px-4 py-5 text-center">
        <div className="text-[14px] font-semibold text-foreground">
          로그인하면 매칭 채팅을 볼 수 있어요
        </div>
        <Link
          href="/login?callbackUrl=%2Fchat"
          className="mt-3 inline-flex rounded-md border border-border px-4 py-2 text-[12px] text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          로그인
        </Link>
      </div>
    )
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
