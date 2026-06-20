'use client'

import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { MarkdownContent } from '@/components/app/markdown-content'
import { useAppToast } from '@/hooks/use-app-toast'
import { Bold, Eye, ImagePlus, Italic, List, Pencil } from 'lucide-react'
import { useRef, useState } from 'react'
import { useCreateArticleFormContext } from '../hooks/create-article-form-context'

type Mode = 'write' | 'preview'

export function MarkdownEditorField() {
  const { form } = useCreateArticleFormContext()
  const { showToast } = useAppToast()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [mode, setMode] = useState<Mode>('write')
  const [uploading, setUploading] = useState(false)

  const insertText = (text: string) => {
    const current = form.getValues('content') ?? ''
    const target = textareaRef.current
    const start = target?.selectionStart ?? current.length
    const end = target?.selectionEnd ?? current.length
    const next = `${current.slice(0, start)}${text}${current.slice(end)}`
    form.setValue('content', next, { shouldDirty: true, shouldValidate: true })
    requestAnimationFrame(() => {
      target?.focus()
      target?.setSelectionRange(start + text.length, start + text.length)
    })
  }

  const uploadImage = async (file: File) => {
    const body = new FormData()
    body.append('file', file)
    const res = await fetch('/api/article/image', { method: 'POST', body })
    const data = await res.json().catch(() => null)
    if (!res.ok || !data?.url) throw new Error('이미지 업로드에 실패했습니다.')
    insertText(`\n\n![${file.name}](${data.url})\n`)
  }

  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="rounded-md border border-border bg-secondary">
            <div className="flex items-center gap-1 border-b border-border p-2">
              <button
                type="button"
                title="작성"
                onClick={() => setMode('write')}
                className={toolClass(mode === 'write')}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                title="미리보기"
                onClick={() => setMode('preview')}
                className={toolClass(mode === 'preview')}
              >
                <Eye className="h-4 w-4" />
              </button>
              <span className="mx-1 h-5 w-px bg-border" />
              <button
                type="button"
                title="굵게"
                onClick={() => insertText('**텍스트**')}
                className={toolClass(false)}
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                type="button"
                title="기울임"
                onClick={() => insertText('*텍스트*')}
                className={toolClass(false)}
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                type="button"
                title="목록"
                onClick={() => insertText('\n- 항목')}
                className={toolClass(false)}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                title="이미지"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className={toolClass(false)}
              >
                <ImagePlus className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (event) => {
                  const file = event.target.files?.[0]
                  event.target.value = ''
                  if (!file) return
                  try {
                    setUploading(true)
                    await uploadImage(file)
                    showToast('이미지를 추가했습니다.')
                  } catch {
                    showToast('이미지 업로드에 실패했습니다.')
                  } finally {
                    setUploading(false)
                  }
                }}
              />
            </div>
            <FormControl>
              {mode === 'write' ? (
                <textarea
                  {...field}
                  ref={(element) => {
                    field.ref(element)
                    textareaRef.current = element
                  }}
                  rows={14}
                  placeholder="내용을 입력해주세요."
                  className="min-h-[360px] w-full resize-none bg-transparent px-3.5 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              ) : (
                <div className="min-h-[360px] px-3.5 py-3">
                  <MarkdownContent content={field.value || ''} />
                </div>
              )}
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  )
}

function toolClass(active: boolean) {
  return `flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50 ${
    active ? 'bg-background text-foreground' : 'bg-transparent'
  }`
}
