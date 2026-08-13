import { AuthBackEndEndpoint } from '@/config/auth-backend-endpoint'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()
    if (!token) {
      return NextResponse.json(
        { isAvailable: false, message: '토큰을 입력해주세요.' },
        { status: 400 },
      )
    }

    const response = await fetch(AuthBackEndEndpoint.validateResetToken(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      cache: 'no-store',
    })
    if (!response.ok) throw new Error(`Backend responded ${response.status}`)
    return NextResponse.json(await response.json())
  } catch {
    return NextResponse.json(
      { isAvailable: false, message: '링크를 확인하지 못했습니다.' },
      { status: 500 },
    )
  }
}
