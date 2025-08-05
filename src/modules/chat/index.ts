// 채팅 모듈의 메인 exports
export { ChatRepository } from './chat-repository'
export { ChatDatasource } from './chat-datasource'
export type {
  ChatRoomEntity,
  ChatMessageEntity,
  ChatRoomsResponseEntity,
  MessagesResponseEntity,
} from './chat.entity'
export type {
  CreateChatRoomRequest,
  GetChatRoomParams,
  GetChatRoomsParams,
  GetMessagesParams,
  SendMessageRequest,
} from './chat-datasource'

// 편의를 위한 기본 인스턴스 export
import { ChatRepository } from './chat-repository'
export const chatRepository = new ChatRepository()
