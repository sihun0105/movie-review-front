import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { NextRequest } from 'next/server'

const createEmptyScore = (movieCd: string) => ({
  id: 0,
  score: 0,
  userId: 0,
  movieCd: Number(movieCd) || 0,
})

const scoreResponse = (data: ReturnType<typeof createEmptyScore>) =>
  new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: number } },
) => {
  const { id } = params
  const token = await getAuthTokenFromRequest(req)
  if (!token) {
    return new Response(JSON.stringify({ message: '로그인이 필요합니다.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const { score } = await req.json()
  const repository = new MovieRepository(token)
  try {
    const data = await repository.updateScore(id, score)
    if (!data) {
      return new Response(
        JSON.stringify({ message: 'Failed to update score' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }
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

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  const token = await getAuthTokenFromRequest(req)

  if (!token) {
    return scoreResponse(createEmptyScore(id))
  }

  const repository = new MovieRepository(token)
  try {
    const data = await repository.getScore(id)
    if (!data) {
      return new Response(JSON.stringify({ message: 'Failed to get score' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
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
    return scoreResponse(createEmptyScore(id))
  }
}
