export interface ValidationRequest {
  email?: string
  nickname?: string
}

export interface ValidationResponse {
  isAvailable: boolean
  message: string
}

export interface RegisterRequest {
  userId: string
  password: string
  nickname: string
  marketingAgreed?: boolean
}

export interface LoginRequest {
  userId: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  token?: string
  user?: {
    id: string
    email: string
    nickname: string
  }
}
