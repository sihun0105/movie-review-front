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
  async signUp({
    userId,
    password,
    nickname,
  }: {
    userId: string
    password: string
    nickname: string
  }) {
    try {
      const res = await fetch(AppBackEndApiEndpoint.signUp(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userId,
          password: password,
          nickname: nickname,
        }),
      })
      if (!res.ok) {
        throw new Error('UsersDatasource-signUp 에러')
      }
      const result = await res.json()
      return result
    } catch (err) {
      throw new Error('UsersDatasource-signUp 통신에러 발생')
    }
  }

  async signInWithProvider(params: { id: string }) {
    try {
      const res = await fetch(AppBackEndApiEndpoint.oAuth(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'google',
          accessToken: params.id,
        }),
      })
      if (!res.ok) {
        throw new Error(`[${res.status}] ${res.statusText}`)
      }
      return res.json()
    } catch (error) {
      throw new Error('UsersDatasource-signInWithProvider 에러')
    }
  }

  async signUpWithProvider(params: {
    email: string
    platform: string
    nickname: string
  }) {
    const res = await fetch(AppBackEndApiEndpoint.signUp(), {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error(`[${res.status}] ${res.statusText}`)
    }
    return res.json()
  }

  async updateProfile({ nickname }: { nickname: string }) {
    const formData = new FormData()
    formData.append('nickname', nickname)
    const res = await fetch(AppBackEndApiEndpoint.updateProfileNickname(), {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error(`[${res.status}] ${res.statusText}`)
    }
    return res.json()
  }
  async updateImage({ file }: { file: File | null }) {
    const formData = new FormData()
    formData.append('file', file ? file : '')
    const res = await fetch(AppBackEndApiEndpoint.updateProfileImage(), {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error(`[${res.status}] ${res.statusText}`)
    }
    return res.json()
  }
}
