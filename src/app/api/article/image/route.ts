import { getTokenFromCookie } from '@/lib/utils/getToken'
import { NextRequest } from 'next/server'

const base =
  process.env.SERVER_API ||
  process.env.NEXT_PUBLIC_SERVER_API ||
  'http://127.0.0.1:3030'

export const POST = async (req: NextRequest) => {
  const token = await getTokenFromCookie()
  if (!token) return new Response(null, { status: 401 })

  const form = await req.formData()
  const file = form.get('file')
  if (!(file instanceof File)) {
    return json({ message: '파일이 없습니다.' }, 400)
  }

  const body = new FormData()
  body.append('file', file)

  const res = await fetch(`${base}/article/image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body,
    cache: 'no-cache',
  })

  const data = await res.json().catch(() => null)
  return json(data ?? {}, res.status)
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
