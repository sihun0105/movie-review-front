import { MovieRepository } from '@/modules/movie/movie-repository'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name') || ''
    const excludeMovieCd = Number(searchParams.get('excludeMovieCd') || '0')
    const limit = Number(searchParams.get('limit') || '12')

    if (!name.trim()) {
      return NextResponse.json({ movies: [] })
    }

    const movies = await new MovieRepository().getMoviesByDirector(
      name,
      Number.isFinite(excludeMovieCd) ? excludeMovieCd : 0,
      Number.isFinite(limit) ? limit : 12,
    )

    return NextResponse.json({ movies: movies ?? [] })
  } catch (error) {
    console.error('Director filmography API error:', error)
    return NextResponse.json(
      { error: '감독 필모그래피를 불러오지 못했습니다.' },
      { status: 500 },
    )
  }
}
