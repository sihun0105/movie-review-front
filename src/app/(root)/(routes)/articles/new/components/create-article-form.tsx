'use client'

import { useAppToast } from '@/hooks/use-app-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import { Form } from '@/components/ui/form'
import { useCreateArticleFormContext } from '../hooks/create-article-form-context'
import { useCreateArticle } from '../hooks/use-create-article'
import { ContentInputField } from './content-input-field'
import { TitleInputField } from './title-input-field'

const CreateArticleForm: FunctionComponent = () => {
  const { form } = useCreateArticleFormContext()
  const { showToast } = useAppToast()
  const { createArticle, isCreating } = useCreateArticle()
  const { status } = useSession()
  const router = useRouter()

  if (status === 'loading')
    return (
      <div className="py-8 text-center font-dm-mono text-[12px] text-dm-text-faint">
        loading...
      </div>
    )

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  const handleSubmit = form.handleSubmit((data) => {
    createArticle(
      { title: data.title, content: data.content },
      {
        onSuccess: () => {
          showToast('게시글 작성에 성공했습니다!')
          form.reset()
          router.push('/articles')
        },
        onError: () => {
          showToast('게시글 작성에 실패했습니다.')
        },
      },
    )
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <TitleInputField />
        <ContentInputField />
        <button
          type="submit"
          disabled={isCreating}
          className="w-full bg-dm-red py-3.5 font-dm-mono text-[13px] uppercase tracking-[0.5px] text-white disabled:bg-dm-surface-2 disabled:text-dm-text-faint"
        >
          {isCreating ? '작성 중...' : '게시글 작성 →'}
        </button>
      </form>
    </Form>
  )
}

export { CreateArticleForm }
