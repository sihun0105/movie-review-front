import { NextRequest, NextResponse } from 'next/server'
import { UsersRepository } from '@/modules/users/users-repository'

interface RouteParams {
  params: { nickname: string }
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const nickname = decodeURIComponent(params.nickname).trim()
    if (!nickname) {
      return NextResponse.json(
        { success: false, message: '닉네임 정보가 올바르지 않습니다.' },
        { status: 400 },
      )
    }

    const user = await new UsersRepository().getUserByNickname(nickname)
    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        nickname: user.nickname,
        image: user.image,
      },
    })
  } catch (error) {
    console.error('user nickname GET error:', error)
    return NextResponse.json(
      { success: false, message: '프로필을 불러오지 못했습니다.' },
      { status: 404 },
    )
  }
}
