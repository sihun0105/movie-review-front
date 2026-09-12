import { MovieRepository } from '@/modules/movie/movie-repository'
import { NextRequest } from 'next/server'
import { HttpResponseError } from '@/lib/http-response-error'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const movieCd = searchParams.get('movieCd')
  if (!movieCd) {
    return new Response(JSON.stringify({ message: 'movieCd is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  const repository = new MovieRepository()
  try {
    const data = await repository.getMovieDetail(movieCd)
    return new Response(
      JSON.stringify({
        data,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    const status = error instanceof HttpResponseError ? error.status : 500
    return new Response(
      JSON.stringify({
        message:
          status === 404
            ? '영화를 찾을 수 없습니다.'
            : '영화 정보를 불러오지 못했습니다.',
      }),
      {
        status,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
