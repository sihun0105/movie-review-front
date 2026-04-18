'use client'
import { FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Article } from '@/lib/type'
import { useModifyArticle } from '../../new/hooks/use-modify-article'
import { useModifyArticleModalContext } from '../hooks/use-modify-article-context'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAppToast } from '@/hooks/use-app-toast'

const formSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  content: z.string().min(1, { message: '내용을 입력해주세요.' }),
})

interface ModifyArticleFormProps {
  article: Article
}

const ModifyArticleForm: FunctionComponent<ModifyArticleFormProps> = ({
  article,
}) => {
  const { showToast } = useAppToast()
  const { setOpen } = useModifyArticleModalContext()
  const { modifyArticle, isModifying } = useModifyArticle(Number(article.id))
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article.title,
      content: article.content,
    },
    mode: 'onTouched',
  })

  const handleSubmit = form.handleSubmit((data) => {
    modifyArticle(
      {
        title: data.title,
        content: data.content,
      },
      {
        onSuccess: () => {
          setOpen(false)
          showToast('게시글 수정에 성공했습니다!')
          form.reset()
          window.location.reload() // 또는 router.push('/articles') 등
        },
        onError: () => {
          // 에러 토스트 등 처리 필요시 추가
          showToast('게시글 수정에 실패했습니다. 다시 시도해주세요.')
        },
      },
    )
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="제목을 입력해주세요." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="내용을 입력해주세요." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isModifying}>
          수정하기
        </Button>
      </form>
    </Form>
  )
}

export default ModifyArticleForm
