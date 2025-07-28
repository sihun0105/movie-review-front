import { UsersRepository } from '@/modules/users/users-repository'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const form = await req.formData()
  const userId = form.get('email') as string
  const password = form.get('password') as string
  const nickname = form.get('nickname') as string
  try {
    const repo = new UsersRepository()
    const data = await repo.signUp({ userId, password, nickname })
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
