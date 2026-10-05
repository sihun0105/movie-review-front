import { NextRequest, NextResponse } from 'next/server'
import { MovieRepository } from '@/modules/movie/movie-repository'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const query = params.get('query')?.trim().slice(0, 50) ?? ''
  const genre = params.get('genre')?.trim().slice(0, 50) ?? ''
  const page = Number(params.get('page')) || 1
  const pageSize = Number(params.get('pageSize')) || 24

  try {
    const data = await new MovieRepository().getMovieCatalog(
      query,
      genre,
      page,
      pageSize,
    )
    return NextResponse.json(data)
  } catch (error) {
    console.error('Movie catalog API error:', error)
    return NextResponse.json(
      { error: '영화 목록을 불러오지 못했습니다.' },
      { status: 500 },
    )
  }
}
