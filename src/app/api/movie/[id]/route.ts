import { MovieRepository } from '@/modules/movie/movie-repository'
import { NextRequest } from 'next/server'

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
    return new Response(JSON.stringify({ message: 'An error occurred' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
