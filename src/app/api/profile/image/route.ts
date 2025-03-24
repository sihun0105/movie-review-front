import { getTokenFromCookie } from '@/lib/utils/getToken'
import { UsersRepository } from '@/modules/users/users-repository'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const form = await req.formData()
  const file = form.get('file') as File
  const token = await getTokenFromCookie()
  try {
    const repo = new UsersRepository(token)
    const data = await repo.updateImage({ file })
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
