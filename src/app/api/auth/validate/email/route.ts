import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ isAvailable: false, message: '이메일을 입력해주세요.' }, { status: 400 })
    }

    const res = await fetch(AppBackEndApiEndpoint.validateEmail(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (!res.ok) throw new Error(`Backend responded ${res.status}`)

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('validate/email error:', error)
    return NextResponse.json(
      { isAvailable: false, message: '이메일 검증 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
