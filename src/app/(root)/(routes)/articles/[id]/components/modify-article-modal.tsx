'use client'
import AppFormDialogue from '@/components/app/app-form-dialogue'
import { FunctionComponent } from 'react'
import { useModifyArticleModalContext } from '../hooks/use-modify-article-context'
import ModifyArticleForm from './modify-article-form'

interface ModifyArticleModalProps {}

const ModifyArticleModal: FunctionComponent<ModifyArticleModalProps> = ({}) => {
  const { open, setOpen, article } = useModifyArticleModalContext()

  return (
    <AppFormDialogue
      title={
        <div className="mt-3 flex h-[42px] w-full items-center justify-center text-center">
          <p>게시글 수정</p>
        </div>
      }
      open={open}
      setOpen={setOpen}
      className="max-h-[92dvh] w-[calc(100vw-2rem)] max-w-[960px] overflow-y-auto"
      render={article ? <ModifyArticleForm article={article} /> : null}
    />
  )
}

export { ModifyArticleModal }
