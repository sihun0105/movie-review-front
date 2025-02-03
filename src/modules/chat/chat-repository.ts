import { ChatDatasource } from './chat-datasource'
import { assertChatEntity } from './chat.entity'

export class ChatRepository {
  private datasource: ChatDatasource
  constructor(
    private token?: string,
    datasource?: ChatDatasource,
  ) {
    this.datasource = datasource ?? new ChatDatasource(token)
  }
  async getChatHistory({ nowDate }: { nowDate: string }) {
    try {
      const result = await this.datasource.getChatHistory({
        nowDate,
      })
      return this.convertToChatEntity(result)
    } catch (err) {
      throw new Error('Failed to get chat history')
    }
  }

  convertToChatEntity(arg: any) {
    const result = {
      id: arg.id,
      nickname: arg.nickname,
      createdAt: arg.createdAt,
      updatedAt: arg.updatedAt,
      content: arg.content,
    }
    assertChatEntity(result)
    return result
  }
}
