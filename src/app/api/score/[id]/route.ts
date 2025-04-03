import { getTokenFromCookie } from '@/lib/utils/getToken'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { NextRequest } from 'next/server'

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  const token = await getTokenFromCookie()
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
  const token = await getTokenFromCookie()
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
    return new Response(JSON.stringify({ message: 'An error occurred' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
