import type { ChatRoomEntity, ChatRoomMemberProfileEntity } from './chat.entity'

export function findChatMemberProfile(
  room: ChatRoomEntity | null | undefined,
  userId: number,
): ChatRoomMemberProfileEntity | undefined {
  return room?.memberProfiles?.find((profile) => profile.userId === userId)
}
