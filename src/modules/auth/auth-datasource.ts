import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import {
  ValidationResponse,
  RegisterRequest,
  LoginRequest,
  AuthResponse,
} from './auth.entity'

export class AuthDataSource {
  async validateEmail(email: string): Promise<ValidationResponse> {
    try {
      const response = await fetch(AppBackEndApiEndpoint.validateEmail(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'default',
        body: JSON.stringify({
          email: email,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to validate email')
      }

      return await response.json()
    } catch (error) {
      console.error('Email validation error:', error)
      return {
        isAvailable: false,
        message: '이메일 검증 중 오류가 발생했습니다.',
      }
    }
  }

  async validateNickname(nickname: string): Promise<ValidationResponse> {
    try {
      const response = await fetch(AppBackEndApiEndpoint.validateNickname(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
      })

      if (!response.ok) {
        throw new Error('Failed to validate nickname')
      }

      return await response.json()
    } catch (error) {
      console.error('Nickname validation error:', error)
      return {
        isAvailable: false,
        message: '닉네임 검증 중 오류가 발생했습니다.',
      }
    }
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(AppBackEndApiEndpoint.signUp(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.userId,
          password: data.password,
          nickname: data.nickname,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to register')
      }

      const result = await response.json()
      return {
        success: true,
        message: '회원가입이 완료되었습니다.',
        ...result,
      }
    } catch (error) {
      console.error('Register error:', error)
      return {
        success: false,
        message: '회원가입 중 오류가 발생했습니다.',
      }
    }
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(AppBackEndApiEndpoint.login(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to login')
      }

      const result = await response.json()
      return {
        success: true,
        message: '로그인이 완료되었습니다.',
        ...result,
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: '로그인 중 오류가 발생했습니다.',
      }
    }
  }
}
