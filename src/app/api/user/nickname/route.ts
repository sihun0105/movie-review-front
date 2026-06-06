import { AppEnv } from '@/config/app-env'
import { UsersRepository } from '@/modules/users/users-repository'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const { nickname } = await req.json()
    if (!nickname?.trim()) {
      return NextResponse.json({ success: false, message: '닉네임을 입력해주세요.' }, { status: 400 })
    }

    const token = await getToken({
      req,
      secret: AppEnv.nextAuthSecret,
      raw: true,
    })

    if (!token) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const repo = new UsersRepository(token)
    const data = await repo.updateProfile({ nickname: nickname.trim() })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('user/nickname PATCH error:', error)
    return NextResponse.json({ success: false, message: '닉네임 변경에 실패했습니다.' }, { status: 500 })
  }
}
