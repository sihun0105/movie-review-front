import { LikeState } from '@/lib/type'
import { getTokenFromCookie } from '@/lib/utils/getToken'
import { ArticleRepository } from '@/modules/article/article-repository'
import { NextRequest } from 'next/server'

// 좋아요 가져오기
export const GET = async (
  req: NextRequest,
  context: { params: { id: string } },
) => {
  const { id } = context.params
  const repo = new ArticleRepository()
  try {
    const data = await repo.getArticleLikes(id)
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// 좋아요 업데이트
export const POST = async (
  req: NextRequest,
  context: { params: { id: string } },
) => {
  const { id } = context.params
  const state = req.nextUrl.searchParams.get('state') as LikeState

  if (!state) {
    return new Response(JSON.stringify({ message: 'state is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const token = await getTokenFromCookie()
    if (!token) return new Response(null, { status: 401 })

    const repo = new ArticleRepository(token)
    const data = await repo.updateArticleLike(id, state)
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
