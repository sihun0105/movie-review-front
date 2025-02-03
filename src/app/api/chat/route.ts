import { ChatRepository } from '@/modules/chat/chat-repository'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const nowDate = searchParams.get('nowDate')
  if (!nowDate) {
    return new Response(JSON.stringify({ message: 'nowDate is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  const repository = new ChatRepository()
  try {
    const data = await repository.getChatHistory({
      nowDate,
    })
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
