import { getTokenFromCookie } from '@/lib/utils/getToken'
import { CommentRepository } from '@/modules/comment/comment-repository'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const form = await req.formData()
  const movieId = form.get('movieId') as string
  const comment = form.get('comment') as string
  try {
    const token = await getTokenFromCookie()
    if (!token) {
      return new Response(null, { status: 401 })
    }
    const repo = new CommentRepository(token)
    const data = await repo.createComment(movieId, comment)
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

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const page = searchParams.get('page') ?? '0'
  const parsedPage = Number(page) + 1
  const movieId = searchParams.get('movieId')
  const token = await getTokenFromCookie()
  const repository = new CommentRepository(token)
  try {
    const data = await repository.getCommentList(
      movieId+'',
      parsedPage,
    )
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


export const DELETE = async (req: NextRequest) => {
  const form = await req.formData()
  const commentId = form.get('commentId') as string
  try {
    const token = await getTokenFromCookie()
    if (!token) {
      return new Response(null, { status: 401 })
    }
    const repo = new CommentRepository(token)
    const data = await repo.deleteComment(commentId)
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
