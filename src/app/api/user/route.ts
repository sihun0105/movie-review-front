import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { UsersRepository } from '@/modules/users/users-repository'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  try {
    const token = await getAuthTokenFromRequest(req)
    if (!token) {
      return NextResponse.json(
        { success: false, message: '로그인이 필요합니다.' },
        { status: 401 },
      )
    }

    const repo = new UsersRepository(token)
    const data = await repo.deleteAccount()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('user DELETE error:', error)
    return NextResponse.json(
      { success: false, message: '회원탈퇴에 실패했습니다.' },
      { status: 500 },
    )
  }
}
