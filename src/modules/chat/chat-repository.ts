import { ChatDatasource } from './chat-datasource'
import {
  ChatRoomEntity,
  ChatRoomsResponseEntity,
  MessagesResponseEntity,
  CreateChatRoomRequest,
  GetChatRoomParams,
  GetChatRoomsParams,
  GetMessagesParams,
  SendMessageRequest,
  assertChatRoomEntity,
  assertChatMessageEntity,
} from './chat.entity'
import {
  convertApiResponseToChatRoomEntity,
  convertApiResponseToChatMessageEntity,
} from './chat-mapper'

export class ChatRepository {
  private datasource: ChatDatasource

  constructor(token?: string) {
    this.datasource = new ChatDatasource(token)
  }

  /**
   * 채팅방 생성
   */
  async createChatRoom(
    request: CreateChatRoomRequest,
  ): Promise<ChatRoomEntity> {
    try {
      const result = await this.datasource.createChatRoom(request)
      const convertedRoom = convertApiResponseToChatRoomEntity(result)
      assertChatRoomEntity(convertedRoom)
      return convertedRoom
    } catch (error) {
      console.error('채팅방 생성 실패:', error)
      throw new Error('Failed to create chat room')
    }
  }

  /**
   * 채팅방 조회
   */
  async getChatRoom(params: GetChatRoomParams): Promise<ChatRoomEntity> {
    try {
      const result = await this.datasource.getChatRoom(params)
      const convertedRoom = convertApiResponseToChatRoomEntity(result)
      assertChatRoomEntity(convertedRoom)
      return convertedRoom
    } catch (error) {
      console.error(`채팅방 조회 실패 (ID: ${params.chatRoomId}):`, error)
      throw new Error('Failed to get chat room')
    }
  }

  /**
   * 사용자의 채팅방 목록 조회
   */
  async getChatRooms(
    params: GetChatRoomsParams,
  ): Promise<ChatRoomsResponseEntity> {
    try {
      const result = await this.datasource.getChatRooms(params)

      // 각 채팅방 API 응답을 엔티티로 변환하고 검증
      const convertedChatRooms = result.chatRooms.map((room) => {
        const convertedRoom = convertApiResponseToChatRoomEntity(room)
        assertChatRoomEntity(convertedRoom)
        return convertedRoom
      })

      return {
        ...result,
        chatRooms: convertedChatRooms,
      }
    } catch (error) {
      console.error('채팅방 목록 조회 실패:', error)
      throw new Error('Failed to get chat rooms')
    }
  }
  /**
   * 메시지 히스토리 조회
   */
  async getMessages(
    params: GetMessagesParams,
  ): Promise<MessagesResponseEntity> {
    try {
      const result = await this.datasource.getMessages(params)

      // 메시지가 없는 경우 빈 배열로 초기화
      if (!result.messages || !Array.isArray(result.messages)) {
        return {
          ...result,
          messages: [],
        }
      }

      // 각 메시지 API 응답을 엔티티로 변환하고 검증
      const convertedMessages = result.messages.map((message) => {
        const convertedMessage = convertApiResponseToChatMessageEntity(message)
        assertChatMessageEntity(convertedMessage)
        return convertedMessage
      })

      return {
        ...result,
        messages: convertedMessages,
      }
    } catch (error) {
      console.error(
        `메시지 히스토리 조회 실패 (채팅방: ${params.chatRoomId}):`,
        error,
      )
      throw new Error('Failed to get messages')
    }
  }

  /**
   * 1:1 채팅방 찾기 또는 생성
   * 두 사용자 간의 direct 채팅방이 이미 존재하면 반환하고, 없으면 새로 생성
   */
  async findOrCreateDirectChatRoom(
    currentUserId: number,
    targetUserId: number,
    targetUserName?: string,
  ): Promise<ChatRoomEntity> {
    try {
      // 먼저 사용자의 채팅방 목록을 조회
      const chatRoomsResponse = await this.getChatRooms({
        userId: currentUserId,
      })
      // direct 타입 채팅방 중에서 상대방과의 채팅방이 있는지 확인
      const existingRoom = chatRoomsResponse.chatRooms.find(
        (room) =>
          room.type === 'direct' &&
          room.memberIds.includes(targetUserId) &&
          room.memberIds.includes(currentUserId) &&
          room.memberIds.length === 2,
      )

      if (existingRoom) {
        return existingRoom
      }

      // 기존 채팅방이 없으면 새로 생성
      const roomName = targetUserName
        ? `${targetUserName}과의 채팅`
        : '1:1 채팅'
      return await this.createChatRoom({
        memberIds: [currentUserId, targetUserId],
        roomName,
        type: 'direct',
      })
    } catch (error) {
      console.error('1:1 채팅방 찾기/생성 실패:', error)
      throw new Error('Failed to find or create direct chat room')
    }
  }

  /**
   * 채팅 히스토리 조회 (날짜별)
   */
  async getChatHistory(date: string): Promise<any[]> {
    try {
      const result = await this.datasource.getChatHistory(date)
      return result
    } catch (error) {
      console.error(`채팅 히스토리 조회 실패 (날짜: ${date}):`, error)
      throw new Error('Failed to get chat history')
    }
  }

  /**
   * 메시지 전송
   */
  async sendMessage(request: SendMessageRequest): Promise<any> {
    try {
      const result = await this.datasource.sendMessage(request)
      return result
    } catch (error) {
      console.error(`메시지 전송 실패 (채팅방: ${request.chatRoomId}):`, error)
      throw new Error('Failed to send message')
    }
  }
}
