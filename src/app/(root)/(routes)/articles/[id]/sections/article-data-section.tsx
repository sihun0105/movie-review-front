'use client'

import { Article } from '@/lib/type'
import { useAppToast } from '@/hooks/use-app-toast'
import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useDeleteArticle } from '../../new/hooks/use-delete-article'
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
  const { deleteArticle, isDeleting } = useDeleteArticle(Number(data.id))
  const { setOpen, setArticle } = useModifyArticleModalContext()

  const handleDelete = () => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) return
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

  const dateStr = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString('ko-KR')
    : ''

  return (
    <section className="border-b border-dm-line px-5 py-5">
      <ModifyArticleModal />

      <div className="flex items-start justify-between gap-2">
        <h1 className="flex-1 text-[20px] font-bold leading-snug text-dm-text">
          {data.title}
        </h1>
        {userId === data.userno && (
          <div className="flex shrink-0 gap-1.5">
            <button
              className="border border-dm-line p-1.5 text-dm-text-muted hover:border-dm-amber hover:text-dm-amber"
              onClick={() => {
                setArticle(data)
                setOpen(true)
              }}
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              className="border border-dm-line p-1.5 text-dm-text-muted hover:border-dm-red hover:text-dm-red disabled:opacity-50"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2 font-dm-mono text-[11px] text-dm-text-faint">
        <span>{data.author}</span>
        <span>·</span>
        <span>{dateStr}</span>
      </div>

      <div className="mt-5 border-t border-dm-line pt-5 text-[14px] leading-relaxed text-dm-text-muted whitespace-pre-wrap">
        {data.content}
      </div>
    </section>
  )
}

export default ArticleDataSection
