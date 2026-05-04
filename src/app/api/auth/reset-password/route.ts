import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json()
    if (!token || !newPassword) {
      return NextResponse.json({ success: false, message: '토큰과 새 비밀번호를 입력해주세요.' }, { status: 400 })
    }

    const res = await fetch(AppBackEndApiEndpoint.resetPassword(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    })

    if (!res.ok) throw new Error(`Backend responded ${res.status}`)
    return NextResponse.json(await res.json())
  } catch (error) {
    return NextResponse.json({ success: false, message: '비밀번호 재설정 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
