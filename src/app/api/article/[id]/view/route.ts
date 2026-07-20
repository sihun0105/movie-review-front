import { createHash, randomUUID } from 'crypto'
import {
  ARTICLE_VIEWER_COOKIE,
  ARTICLE_VIEWER_COOKIE_MAX_AGE,
} from '../../../../../lib/article-viewer-cookie'
import { ArticleViewRepository } from '@/modules/article/article-view-repository'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  const existingViewer = request.cookies.get(ARTICLE_VIEWER_COOKIE)?.value
  const viewer = existingViewer || randomUUID()
  const viewerKey = createHash('sha256').update(viewer).digest('hex')

  try {
    const repository = new ArticleViewRepository()
    const result = await repository.recordArticleView(
      context.params.id,
      viewerKey,
    )
    const response = NextResponse.json(result)
    if (!existingViewer) {
      response.cookies.set(ARTICLE_VIEWER_COOKIE, viewer, {
        httpOnly: true,
        maxAge: ARTICLE_VIEWER_COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    }
    return response
  } catch {
    return NextResponse.json(
      { message: '조회수를 기록하지 못했습니다.' },
      { status: 500 },
    )
  }
}
