import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import type {
  ChatRoomEntity,
  ChatRoomsResponseEntity,
  MessagesResponseEntity,
  CreateChatRoomRequest,
  GetChatRoomParams,
  GetChatRoomsParams,
  GetMessagesParams,
  SendMessageRequest,
} from './chat.entity'

export class ChatDatasource {
  private token?: string

  constructor(token?: string) {
    this.token = token
  }

  private getAuthHeaders(): HeadersInit {
    const authToken = this.token || getTokenFromCookie()
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    }
  }

  async createChatRoom(
    request: CreateChatRoomRequest,
  ): Promise<ChatRoomEntity> {
    try {
      const response = await fetch(AppBackEndApiEndpoint.createChatRoom(), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(request),
        cache: 'no-cache',
      })

      if (!response.ok) {
        throw new Error('Failed to create chat room')
      }

      return await response.json()
    } catch (error) {
      console.error('채팅방 생성 API 요청 실패:', error)
      throw error
    }
  }

  async getChatRoom(params: GetChatRoomParams): Promise<ChatRoomEntity> {
    try {
      const url = new URL(AppBackEndApiEndpoint.getChatRoom(params.chatRoomId))
      url.searchParams.append('userId', params.userId.toString())

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getAuthHeaders(),
        cache: 'no-cache',
      })

      if (!response.ok) {
        throw new Error('Failed to get chat room')
      }

      return await response.json()
    } catch (error) {
      console.error(
        `채팅방 조회 API 요청 실패 (ID: ${params.chatRoomId}):`,
        error,
      )
      throw error
    }
  }

  async getChatRooms(
    params: GetChatRoomsParams,
  ): Promise<ChatRoomsResponseEntity> {
    try {
      const url = new URL(AppBackEndApiEndpoint.getChatRooms())
      url.searchParams.append('userId', params.userId.toString())
      url.searchParams.append('page', (params.page || 1).toString())
      url.searchParams.append('pageSize', (params.pageSize || 20).toString())
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getAuthHeaders(),
        cache: 'no-cache',
      })

      if (!response.ok) {
        throw new Error('Failed to get chat rooms')
      }

      return await response.json()
    } catch (error) {
      console.error('채팅방 목록 조회 API 요청 실패:', error)
      throw error
    }
  }

  async getMessages(
    params: GetMessagesParams,
  ): Promise<MessagesResponseEntity> {
    try {
      const url = new URL(
        AppBackEndApiEndpoint.getChatMessages(params.chatRoomId),
      )
      url.searchParams.append('userId', params.userId.toString())
      url.searchParams.append('page', (params.page || 1).toString())
      url.searchParams.append('pageSize', (params.pageSize || 50).toString())

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getAuthHeaders(),
        cache: 'no-cache',
      })
      if (!response.ok) {
        throw new Error('Failed to get messages')
      }

      return await response.json()
    } catch (error) {
      console.error(
        `메시지 히스토리 조회 API 요청 실패 (채팅방: ${params.chatRoomId}):`,
        error,
      )
      throw error
    }
  }

  async getChatHistory(date: string): Promise<any[]> {
    try {
      const response = await fetch(AppBackEndApiEndpoint.getChatHistory(date), {
        method: 'GET',
        headers: this.getAuthHeaders(),
        cache: 'no-cache',
      })

      if (!response.ok) {
        throw new Error('Failed to get chat history')
      }

      return await response.json()
    } catch (error) {
      console.error(`채팅 히스토리 조회 API 요청 실패 (날짜: ${date}):`, error)
      throw error
    }
  }

  async sendMessage(request: SendMessageRequest): Promise<any> {
    try {
      const response = await fetch(
        AppBackEndApiEndpoint.getChatMessages(request.chatRoomId),
        {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({
            content: request.content,
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      return await response.json()
    } catch (error) {
      console.error(
        `메시지 전송 API 요청 실패 (채팅방: ${request.chatRoomId}):`,
        error,
      )
      throw error
    }
  }
}
