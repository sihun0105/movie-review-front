// app/articles/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제 요청은 fetch/axios로 POST
    console.log({ title, content })

    // 작성 완료 후 게시판으로 이동
    router.push('/articles')
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">✍️ 글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="내용을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 rounded min-h-[200px]"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          등록하기
        </button>
      </form>
    </main>
  )
}
