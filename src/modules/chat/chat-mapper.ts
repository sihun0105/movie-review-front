import type { ChatRoomEntity, ChatMessageEntity } from './chat.entity'

export function convertApiResponseToChatRoomEntity(
  apiResponse: any,
): ChatRoomEntity {
  return {
    chatRoomId: apiResponse.id,
    roomName: apiResponse.name,
    type: apiResponse.type,
    memberIds: apiResponse.memberIds,
    createdAt: apiResponse.createdAt,
    updatedAt: apiResponse.updatedAt,
    matchPostId: apiResponse.matchPostId || undefined,
    matchTitle: apiResponse.matchTitle || undefined,
    memberProfiles: apiResponse.memberProfiles || undefined,
    lastMessage: apiResponse.lastMessage || undefined,
    lastMessageAt: apiResponse.lastMessageAt || undefined,
  }
}

export function convertApiResponseToChatMessageEntity(
  apiResponse: any,
): ChatMessageEntity {
  return {
    messageId: apiResponse.id || apiResponse.messageId,
    chatRoomId: apiResponse.chatRoomId,
    senderId: apiResponse.senderId,
    senderName: apiResponse.senderName,
    content: apiResponse.content,
    messageType: apiResponse.messageType,
    createdAt: apiResponse.createdAt,
  }
}
