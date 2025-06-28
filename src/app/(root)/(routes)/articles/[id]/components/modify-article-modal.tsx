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
      render={article ? <ModifyArticleForm article={article} /> : null}
    />
  )
}

export { ModifyArticleModal }
