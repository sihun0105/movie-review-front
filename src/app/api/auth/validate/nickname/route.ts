import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { nickname } = await request.json()

    if (!nickname) {
      return NextResponse.json({ isAvailable: false, message: '닉네임을 입력해주세요.' }, { status: 400 })
    }

    const res = await fetch(AppBackEndApiEndpoint.validateNickname(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    })

    if (!res.ok) throw new Error(`Backend responded ${res.status}`)

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('validate/nickname error:', error)
    return NextResponse.json(
      { isAvailable: false, message: '닉네임 검증 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
