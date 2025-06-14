import { Article } from '@/lib/type'
import { FunctionComponent } from 'react'
interface ArticleDataSectionProps {
  data: Article
}

const ArticleDataSection: FunctionComponent<ArticleDataSectionProps> = ({
  data,
}) => {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold">{data.title}</h1>
      <div className="mb-4 text-sm text-gray-500">
        작성자: {data.author} • {data.updatedAt}
      </div>
      <div className="mb-4 whitespace-pre-wrap text-base">{data.content}</div>
    </>
  )
}

export default ArticleDataSection
