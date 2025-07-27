import { AuthDataSource } from './auth-datasource'
import {
  ValidationResponse,
  RegisterRequest,
  LoginRequest,
  AuthResponse,
} from './auth.entity'

export class AuthRepository {
  private dataSource: AuthDataSource

  constructor() {
    this.dataSource = new AuthDataSource()
  }

  async validateEmail(email: string): Promise<ValidationResponse> {
    console.log('Validating email:', email)
    if (!email || !email.includes('@')) {
      return {
        isAvailable: false,
        message: '올바른 이메일 형식을 입력해주세요.',
      }
    }

    const result = await this.dataSource.validateEmail(email)
    console.log('Email validation result:', result)
    return result
  }

  async validateNickname(nickname: string): Promise<ValidationResponse> {
    if (!nickname || nickname.length < 2) {
      return {
        isAvailable: false,
        message: '닉네임은 최소 2자 이상이어야 합니다.',
      }
    }

    if (nickname.length > 10) {
      return {
        isAvailable: false,
        message: '닉네임은 최대 10자까지 가능합니다.',
      }
    }

    return await this.dataSource.validateNickname(nickname)
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    // 클라이언트 사이드 validation
    if (!data.userId || !data.password || !data.nickname) {
      return {
        success: false,
        message: '모든 필드를 입력해주세요.',
      }
    }

    // 최종 서버 검증
    const [emailValidation, nicknameValidation] = await Promise.all([
      this.validateEmail(data.userId),
      this.validateNickname(data.nickname),
    ])

    if (!emailValidation.isAvailable) {
      return {
        success: false,
        message: emailValidation.message,
      }
    }

    if (!nicknameValidation.isAvailable) {
      return {
        success: false,
        message: nicknameValidation.message,
      }
    }

    return await this.dataSource.register(data)
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    if (!data.userId || !data.password) {
      return {
        success: false,
        message: '이메일과 비밀번호를 입력해주세요.',
      }
    }

    return await this.dataSource.login(data)
  }
}

// 싱글톤 패턴으로 인스턴스 생성
export const authRepository = new AuthRepository()
