'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, content })
    router.push('/articles')
  }

  return (
    <main className="container mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">✍️ 글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />
        <textarea
          placeholder="내용을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px] w-full rounded border px-3 py-2"
          required
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          등록하기
        </button>
      </form>
    </main>
  )
}
