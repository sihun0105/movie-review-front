'use client'
import { Article } from '@/lib/type'
import { FunctionComponent } from 'react'
import { User2, Calendar, Pencil, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useDeleteArticle } from '../../new/hooks/use-delete-article'
import { useAppToast } from '@/hooks/use-app-toast'
import { ModifyArticleModal } from '../components/modify-article-modal'
import { useModifyArticleModalContext } from '../hooks/use-modify-article-context'

interface ArticleDataSectionProps {
  data: Article
}

const ArticleDataSection: FunctionComponent<ArticleDataSectionProps> = ({
  data,
}) => {
  const { showToast } = useAppToast()
  const { data: session } = useSession()
  const userId = session?.user?.id ?? -1
  const { deleteArticle, deleteError, isDeleting } = useDeleteArticle(
    Number(data.id),
  )
  const { setOpen, setArticle, open } = useModifyArticleModalContext()
  const handleDelete = () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      deleteArticle(
        { articleId: Number(data.id) },
        {
          onSuccess: () => {
            showToast('게시글이 삭제되었습니다.')
            window.location.href = '/articles'
          },
          onError: () => {
            showToast('게시글 삭제에 실패했습니다. 다시 시도해주세요.')
          },
        },
      )
    }
  }
  return (
    <section className="relative mb-8 overflow-hidden rounded-xl border bg-white p-0 shadow-md">
      {/* 썸네일 영역 (이미지가 있다면 표시) */}
      {/* <div className="flex h-48 w-full items-center justify-center bg-gray-100">
        <span className="text-gray-400">썸네일 이미지</span>
      </div> */}
      {/* 우측 상단 버튼 영역 */}
      {userId === data.userno && (
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            className="rounded border bg-white p-2 transition hover:bg-gray-100"
            onClick={() => {
              setArticle(data)
              setOpen(true)
            }}
          >
            <Pencil className="h-4 w-4 text-gray-600" />
          </button>
          <button
            className="rounded border bg-red-50 p-2 transition hover:bg-red-100"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      )}
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
      <ModifyArticleModal />
    </section>
  )
}

export default ArticleDataSection
