import type { ChatRoomEntity, ChatRoomMemberProfileEntity } from './chat.entity'

export function findChatMemberProfile(
  room: ChatRoomEntity | null | undefined,
  userId: number,
): ChatRoomMemberProfileEntity | undefined {
  return room?.memberProfiles?.find(
    (profile) => Number(profile.userId) === Number(userId),
  )
}

export function findChatCounterpart(
  room: ChatRoomEntity | null | undefined,
  currentUserId: number,
) {
  const currentId = Number(currentUserId)
  const userId = room?.memberIds
    .map(Number)
    .find((memberId) => memberId !== currentId)

  if (!userId) return undefined

  return {
    userId,
    profile: findChatMemberProfile(room, userId),
  }
}

export function getChatRoomDisplayName(
  room: ChatRoomEntity,
  currentUserId: number,
) {
  const fallback = room.matchTitle || room.roomName
  if (room.type !== 'direct') return fallback

  return findChatCounterpart(room, currentUserId)?.profile?.nickname || fallback
}
