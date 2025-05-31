'use client'

import { FunctionComponent, useState } from 'react'
import Link from 'next/link'
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react'
import NewArticleToggle from './components/new-article-toggle'

interface Article {
  id: string
  title: string
  content: string
  author: string
  likeCount: number
  dislikeCount: number
  commentCount: number
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: '이번 주 추천 영화 TOP 5 🎬',
    content: '이번 주말에 볼만한 영화를 추천드립니다...',
    author: 'cinephile77',
    likeCount: 12,
    dislikeCount: 1,
    commentCount: 3,
  },
  {
    id: '2',
    title: '미키 17 기대되시나요?',
    content:
      '로버트 패틴슨의 미키 17, 기대감이 큽니다. 여러분은 어떻게 생각하시나요?',
    author: 'filmfan22',
    likeCount: 7,
    dislikeCount: 0,
    commentCount: 5,
  },
]

const ArticleCard: FunctionComponent<{ article: Article }> = ({ article }) => {
  return (
    <div className="rounded-2xl border p-4 shadow-sm transition hover:shadow-md">
      <Link href={`/articles/${article.id}`}>
        <h2 className="mb-1 text-lg font-semibold hover:underline">
          {article.title}
        </h2>
        <p className="mb-2 text-sm text-gray-500">by {article.author}</p>
        <p className="mb-3 line-clamp-2 text-sm text-gray-700">
          {article.content}
        </p>
      </Link>
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <ThumbsUp className="h-4 w-4" /> {article.likeCount}
        </div>
        <div className="flex items-center gap-1">
          <ThumbsDown className="h-4 w-4" /> {article.dislikeCount}
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" /> {article.commentCount}
        </div>
      </div>
    </div>
  )
}

const Page: FunctionComponent = () => {
  const [articles] = useState<Article[]>(mockArticles)

  return (
    <>
      <main className="container relative max-w-[460px] space-y-4 p-4 ">
        <h1 className="mb-4 text-2xl font-bold">영화 커뮤니티 게시판</h1>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}

        <NewArticleToggle className="absolute bottom-0 right-6">
          글쓰기
        </NewArticleToggle>
      </main>
    </>
  )
}

export default Page
