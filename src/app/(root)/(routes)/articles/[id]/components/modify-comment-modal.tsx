'use client'
import AppFormDialogue from '@/components/app/app-form-dialogue'
import { FunctionComponent } from 'react'
import { useModifyCommentModalContext } from '../hooks/use-modify-comment-context'
import ModifyCommentForm from './modify-comment'
interface ModifyCommentModalProps {}

const ModifyCommentModal: FunctionComponent<ModifyCommentModalProps> = ({}) => {
  const { open, setOpen } = useModifyCommentModalContext()

  return (
    <AppFormDialogue
      title={
        <div className=" mt-3 flex h-[42px] w-full items-center justify-center text-center">
          <p>댓글 수정</p>
        </div>
      }
      open={open}
      setOpen={(boolean) => {
        setOpen(boolean)
      }}
      render={<ModifyCommentForm />}
    />
  )
}

export { ModifyCommentModal }
