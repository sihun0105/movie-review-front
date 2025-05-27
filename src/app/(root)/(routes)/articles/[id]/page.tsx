'use client'

import { useState } from 'react'
import { notFound, useRouter } from 'next/navigation'

interface Article {
  id: string
  title: string
  author: string
  content: string
  createdAt: string
}

interface Comment {
  id: string
  nickname: string
  text: string
  createdAt: string
}

const mockArticle: Article = {
  id: '1',
  title: '이번에 개봉한 "미키17" 보신 분 계신가요?',
  author: '영화덕후',
  content:
    '어제 보고 왔는데요, SF 느낌보단 철학적인 내용이 강해서 좀 어려웠어요. 다들 어떻게 보셨나요?',
  createdAt: '2025-05-26',
}

const mockComments: Comment[] = [
  {
    id: 'c1',
    nickname: '무비러버',
    text: '진짜 감명 깊었어요. 후반부 연출이 대박!',
    createdAt: '2025-05-27',
  },
]

export default function ArticleDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [likes, setLikes] = useState(3)
  const [dislikes, setDislikes] = useState(1)
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState('')

  if (params.id !== mockArticle.id) {
    return notFound()
  }

  const handleLike = () => setLikes((l) => l + 1)
  const handleDislike = () => setDislikes((d) => d + 1)
  const handleAddComment = () => {
    if (!newComment.trim()) return
    const comment: Comment = {
      id: `c${Date.now()}`,
      nickname: '익명',
      text: newComment,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setComments((prev) => [comment, ...prev])
    setNewComment('')
  }

  return (
    <main className="container mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">{mockArticle.title}</h1>
      <div className="mb-4 text-sm text-gray-500">
        작성자: {mockArticle.author} • {mockArticle.createdAt}
      </div>
      <div className="mb-4 whitespace-pre-wrap text-base">
        {mockArticle.content}
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={handleLike}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          👍 좋아요 ({likes})
        </button>
        <button
          onClick={handleDislike}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          👎 싫어요 ({dislikes})
        </button>
      </div>

      <section className="border-t pt-6">
        <h2 className="mb-2 text-lg font-semibold">💬 댓글</h2>

        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow rounded border px-3 py-2"
          />
          <button
            onClick={handleAddComment}
            className="rounded bg-blue-600 px-4 text-white hover:bg-blue-700"
          >
            등록
          </button>
        </div>

        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c.id} className="rounded border p-3">
              <div className="mb-1 text-sm text-gray-600">
                {c.nickname} • {c.createdAt}
              </div>
              <div>{c.text}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
