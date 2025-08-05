import { AppEnv } from '@/config/app-env'
import { cookies } from 'next/dist/client/components/headers'

export const getTokenFromCookie = () => {
  const cookieStore = cookies()
  const token = cookieStore.get(AppEnv.cookieTokenKey)?.value
  return token
}

// // 클라이언트 사이드에서 쿠키에서 토큰을 가져오는 함수
// export const getTokenFromClientCookie = (): string | null => {
//   if (typeof window === 'undefined') return null

//   const cookies = document.cookie.split(';')
//   const tokenCookie = cookies.find((cookie) =>
//     cookie.trim().startsWith(`${AppEnv.cookieTokenKey}=`),
//   )

//   if (tokenCookie) {
//     return tokenCookie.split('=')[1]
//   }

//   return null
// }

// // 서버/클라이언트 환경에 따라 적절한 토큰 가져오기 함수를 선택
// export const getToken = (): string | null => {
//   if (typeof window === 'undefined') {
//     // 서버 사이드
//     return getTokenFromCookie() || null
//   } else {
//     // 클라이언트 사이드
//     return getTokenFromClientCookie()
//   }
// }
