'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import { useCreateArticleFormContext } from '../hooks/create-article-form-context'
import { useCreateArticle } from '../hooks/use-create-article'
import { TitleInputField } from './title-input-field'
import { ContentInputField } from './content-input-field'
import { useAppToast } from '@/hooks/use-app-toast'

interface CreateArticleFormProps {}

const CreateArticleForm: FunctionComponent<CreateArticleFormProps> = ({}) => {
  const { form } = useCreateArticleFormContext()
  const { showToast } = useAppToast()
  const { createArticle, isCreating } = useCreateArticle()
  const router = useRouter()

  const handleSubmit = form.handleSubmit((data) => {
    createArticle(
      {
        title: data.title,
        content: data.content,
      },
      {
        onSuccess: () => {
          showToast('게시글 작성에 성공했습니다!')
          form.reset()
          router.push('/articles')
        },
        onError: () => {
          console.error('Failed to create article')
        },
      },
    )
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TitleInputField />
        <ContentInputField />
        <Button
          variant="default"
          type="submit"
          className=""
          disabled={isCreating}
        >
          댓글작성
        </Button>
      </form>
    </Form>
  )
}

export { CreateArticleForm }
