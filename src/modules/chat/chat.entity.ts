// 채팅방 엔티티
export interface ChatRoomEntity {
  chatRoomId: string
  roomName: string
  type: 'direct' | 'group'
  memberIds: number[]
  createdAt: string
  updatedAt: string
}

// 채팅 메시지 엔티티
export interface ChatMessageEntity {
  messageId: string
  chatRoomId: string
  senderId: number
  senderName?: string // 옵션으로 변경
  content: string
  messageType?: 'text' | 'image' | 'file' // 옵션으로 변경
  createdAt: string
}

// 채팅방 목록 응답 엔티티
export interface ChatRoomsResponseEntity {
  chatRooms: ChatRoomEntity[]
  totalCount: number
  currentPage: number
  totalPages: number
}

// 메시지 목록 응답 엔티티
export interface MessagesResponseEntity {
  messages: ChatMessageEntity[]
  totalCount: number
  currentPage: number
  totalPages: number
}

// 채팅방 엔티티 검증
export function isChatRoomEntity(arg: any): arg is ChatRoomEntity {
  //
  return (
    arg &&
    typeof arg.chatRoomId === 'string' &&
    typeof arg.roomName === 'string' &&
    (arg.type === 'direct' || arg.type === 'group') &&
    Array.isArray(arg.memberIds) &&
    typeof arg.createdAt === 'string' &&
    typeof arg.updatedAt === 'string'
  )
}

// 채팅 메시지 엔티티 검증
export function isChatMessageEntity(arg: any): arg is ChatMessageEntity {
  return (
    arg &&
    typeof arg.messageId === 'string' &&
    typeof arg.chatRoomId === 'string' &&
    typeof arg.senderId === 'number' &&
    (arg.senderName === undefined || typeof arg.senderName === 'string') &&
    typeof arg.content === 'string' &&
    (arg.messageType === undefined ||
      ['text', 'image', 'file'].includes(arg.messageType)) &&
    typeof arg.createdAt === 'string'
  )
}

export function assertChatRoomEntity(arg: any): asserts arg is ChatRoomEntity {
  if (!isChatRoomEntity(arg)) {
    throw new Error('Invalid ChatRoomEntity')
  }
}

export function assertChatMessageEntity(
  arg: any,
): asserts arg is ChatMessageEntity {
  if (!isChatMessageEntity(arg)) {
    throw new Error('Invalid ChatMessageEntity')
  }
}

// 요청·파라미터 타입
export interface CreateChatRoomRequest {
  memberIds: number[]
  roomName: string
  type: 'direct' | 'group'
}

export interface GetChatRoomParams {
  chatRoomId: string
  userId: number
}

export interface GetChatRoomsParams {
  userId: number
  page?: number
  pageSize?: number
}

export interface GetMessagesParams {
  chatRoomId: string
  userId: number
  page?: number
  pageSize?: number
}

export interface SendMessageRequest {
  chatRoomId: string
  senderId: number
  content: string
}
