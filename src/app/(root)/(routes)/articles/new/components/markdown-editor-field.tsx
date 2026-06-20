'use client'

import { ArticleMarkdownEditor } from '@/components/app/article-markdown-editor'
import { useCreateArticleFormContext } from '../hooks/create-article-form-context'

export function MarkdownEditorField() {
  const { form } = useCreateArticleFormContext()
  return <ArticleMarkdownEditor form={form} />
}
