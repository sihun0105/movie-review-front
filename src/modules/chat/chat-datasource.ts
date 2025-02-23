import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'

export class ChatDatasource {
  private token?: string
  constructor(token?: string) {
    this.token = token
  }

  async getChatHistory({ nowDate }: { nowDate: string }) {
    try {
      const res = await fetch(AppBackEndApiEndpoint.getChatHistory(nowDate), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'default',
      })
      if (!res.ok) {
        throw new Error('ChatDatasource-getChatHistory 통신에러 발생')
      }
      const result = await res.json()
      return result
    } catch (err) {
      throw new Error('ChatDatasource-getChatHistory 에러')
    }
  }
}
