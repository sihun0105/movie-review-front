// 새로운 Auth 모듈을 사용하도록 리다이렉트
export { authRepository } from '@/modules/auth'

// 기존 API와의 호환성을 위한 래퍼 함수들
export const validateEmail = async (email: string) => {
  const { authRepository } = await import('@/modules/auth')
  return authRepository.validateEmail(email)
}

export const validateNickname = async (nickname: string) => {
  const { authRepository } = await import('@/modules/auth')
  return authRepository.validateNickname(nickname)
}
