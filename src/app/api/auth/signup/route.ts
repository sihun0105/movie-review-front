import { UsersRepository } from '@/modules/users/users-repository'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, nickname, gender } = await request.json()

    if (!email || !password || !nickname || !gender) {
      return NextResponse.json(
        { success: false, message: '모든 필드를 입력해주세요.' },
        { status: 400 },
      )
    }

    const repo = new UsersRepository()
    const data = await repo.signUp({ userId: email, password, nickname, gender })
    return NextResponse.json({ success: true, message: '회원가입이 완료되었습니다.', ...data })
  } catch (error) {
    console.error('signup route error:', error)
    return NextResponse.json(
      { success: false, message: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
