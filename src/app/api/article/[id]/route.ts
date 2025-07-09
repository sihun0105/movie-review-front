import { getTokenFromCookie } from '@/lib/utils/getToken'
import { ArticleRepository } from '@/modules/article/article-repository'
import { NextRequest, NextResponse } from 'next/server'

// 게시글 조회
export const GET = async (
  req: NextRequest,
  context: { params: { id: string } },
) => {
  const { id } = context.params
  const repo = new ArticleRepository()

  try {
    const data = await repo.getArticle(id)
    if (!data) {
      return new NextResponse('Not Found', { status: 404 })
    }
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    if (
      error?.message?.includes('존재하지 않는') ||
      error?.message?.includes('Not Found')
    ) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 그 외 에러는 500
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// 게시글 수정
export const PATCH = async (
  req: NextRequest,
  context: { params: { id: string } },
) => {
  const { id } = context.params
  const form = await req.formData()
  const title = form.get('title') as string
  const content = form.get('content') as string

  try {
    const token = await getTokenFromCookie()
    if (!token) return new Response(null, { status: 401 })

    const repo = new ArticleRepository(token)
    const data = await repo.updateArticle(id, { title, content })
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

// 게시글 삭제
export const DELETE = async (
  _req: NextRequest,
  context: { params: { id: string } },
) => {
  const { id } = context.params

  try {
    const token = await getTokenFromCookie()
    if (!token) return new Response(null, { status: 401 })

    const repo = new ArticleRepository(token)
    const data = await repo.deleteArticle(id)
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
