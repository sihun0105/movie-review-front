import { MovieRepository } from '@/modules/movie/movie-repository'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const rawLimit = Number(request.nextUrl.searchParams.get('limit') ?? 12)
  const limit = Number.isFinite(rawLimit)
    ? Math.min(Math.max(Math.trunc(rawLimit), 1), 24)
    : 12

  try {
    const movies = await new MovieRepository().getTopRatedMovies(limit)
    return NextResponse.json({ movies })
  } catch (error) {
    console.error('Top rated movies API error:', error)
    return NextResponse.json(
      { error: '고평점 영화를 불러오지 못했습니다.' },
      { status: 500 },
    )
  }
}
