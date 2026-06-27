import { UsersRepository } from '@/modules/users/users-repository'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: { id: string }
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const userId = Number(params.id)
    if (!Number.isInteger(userId) || userId <= 0) {
      return NextResponse.json(
        { success: false, message: '사용자 정보가 올바르지 않습니다.' },
        { status: 400 },
      )
    }

    const user = await new UsersRepository().getUser(userId)
    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        nickname: user.nickname,
        image: user.image,
      },
    })
  } catch (error) {
    console.error('user GET error:', error)
    return NextResponse.json(
      { success: false, message: '프로필을 불러오지 못했습니다.' },
      { status: 404 },
    )
  }
}
