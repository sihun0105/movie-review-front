import { getTokenFromCookie } from '@/lib/utils/getToken'
import { ArticleRepository } from '@/modules/article/article-repository'
import { NextRequest } from 'next/server'

// 게시글 생성
export const POST = async (req: NextRequest) => {
  const form = await req.formData()
  const title = form.get('title') as string
  const content = form.get('content') as string

  try {
    const token = await getTokenFromCookie()
    if (!token) return new Response(null, { status: 401 })

    const repo = new ArticleRepository(token)
    const data = await repo.createArticle({ title, content })
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

// 게시글 목록 조회
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  try {
    const token = await getTokenFromCookie()
    const repo = new ArticleRepository(token)
    const data = await repo.listArticles(page, pageSize)
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
