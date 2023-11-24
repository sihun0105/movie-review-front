import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'

export class UsersDatasource {
  private token?: string
  constructor(token?: string) {
    this.token = token
  }

  async login({ userId, password }: { userId: string; password: string }) {
    try {
      const res = await fetch(AppBackEndApiEndpoint.login(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userId,
          password: password,
        }),
      })
      if (!res.ok) {
        throw new Error('UsersDatasource-login 에러')
      }
      const result = await res.json()
      return result
    } catch (err) {
      throw new Error('UsersDatasource-login 통신에러 발생')
    }
  }
}
