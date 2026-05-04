import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()
    if (!email || !code) {
      return NextResponse.json({ isAvailable: false, message: '이메일과 코드를 입력해주세요.' }, { status: 400 })
    }

    const res = await fetch(AppBackEndApiEndpoint.verifyCode(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    })

    if (!res.ok) throw new Error(`Backend responded ${res.status}`)
    return NextResponse.json(await res.json())
  } catch (error) {
    return NextResponse.json({ isAvailable: false, message: '인증 코드 확인 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
