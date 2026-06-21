import { NextRequest, NextResponse } from 'next/server'
import { MovieRepository } from '@/modules/movie/movie-repository'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageSize = Number(searchParams.get('pageSize') || '8')
    const movies = await new MovieRepository().getMovie()

    return NextResponse.json({
      movies: movies.slice(0, Math.min(Math.max(pageSize, 1), 12)),
    })
  } catch (error) {
    console.error('Movie list API error:', error)
    return NextResponse.json(
      { error: '영화 목록을 불러오지 못했습니다.' },
      { status: 500 },
    )
  }
}
