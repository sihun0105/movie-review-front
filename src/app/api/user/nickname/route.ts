import { getTokenFromCookie } from '@/lib/utils/getToken'
import { UsersRepository } from '@/modules/users/users-repository'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const { nickname } = await req.json()
    if (!nickname?.trim()) {
      return NextResponse.json({ success: false, message: '닉네임을 입력해주세요.' }, { status: 400 })
    }

    const token = await getTokenFromCookie()
    const repo = new UsersRepository(token)
    const data = await repo.updateProfile({ nickname: nickname.trim() })
    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json({ success: false, message: '닉네임 변경에 실패했습니다.' }, { status: 500 })
  }
}
