'use client'
import { FunctionComponent } from 'react'
interface CommentSectionProps {}

const CommentSection: FunctionComponent<CommentSectionProps> = ({}) => {
  const newComment = ''
  const setNewComment = (value: string) => {}
  const handleAddComment = () => {}
  const comments = [
    {
      id: 'c1',
      nickname: '무비러버',
      text: '진짜 감명 깊었어요. 후반부 연출이 대박!',
      createdAt: '2025-05-27',
    },
  ]
  return (
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
  )
}

export default CommentSection
