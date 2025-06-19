import { Article } from '@/lib/type'
import { FunctionComponent } from 'react'
import { User2, Calendar } from 'lucide-react'
interface ArticleDataSectionProps {
  data: Article
}

const ArticleDataSection: FunctionComponent<ArticleDataSectionProps> = ({
  data,
}) => {
  return (
    <section className="relative mb-8 overflow-hidden rounded-xl border bg-white p-0 shadow-md">
      {/* 썸네일 영역 (이미지가 있다면 표시) */}
      {/* <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">썸네일 이미지</span>
      </div> */}
      {/* 우측 상단 버튼 영역 */}
      {/* <div className="absolute right-4 top-4 z-10 flex gap-2">
        <button className="rounded border bg-white px-3 py-1 text-sm font-medium transition hover:bg-gray-100">
          수정
        </button>
        <button className="rounded border bg-red-50 px-3 py-1 text-sm font-medium text-red-600 transition hover:bg-red-100">
          삭제
        </button>
      </div> */}
      <div className="p-7">
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900">
          {data.title}
        </h1>
        <div className="mb-5 flex items-center gap-3 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            <User2 className="h-4 w-4 text-gray-400" />
            {data.author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-4 w-4 text-gray-400" />
            {data.updatedAt}
          </span>
        </div>
        <hr className="mb-5 border-gray-200" />
        <div className="whitespace-pre-wrap text-base leading-relaxed text-gray-800">
          {data.content}
        </div>
      </div>
    </section>
  )
}

export default ArticleDataSection
