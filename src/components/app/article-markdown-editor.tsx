'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { MarkdownContent } from '@/components/app/markdown-content'
import { useAppToast } from '@/hooks/use-app-toast'
import { Bold, ImagePlus, Italic, List } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface ArticleMarkdownEditorProps {
  form: UseFormReturn<any>
  name?: string
}

export function ArticleMarkdownEditor({
  form,
  name = 'content',
}: ArticleMarkdownEditorProps) {
  const { showToast } = useAppToast()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)

  const insertText = (text: string) => {
    const current = form.getValues(name) ?? ''
    const target = textareaRef.current
    const start = target?.selectionStart ?? current.length
    const end = target?.selectionEnd ?? current.length
    const next = `${current.slice(0, start)}${text}${current.slice(end)}`
    form.setValue(name, next, { shouldDirty: true, shouldValidate: true })
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
    if (!res.ok || !data?.url) throw new Error('이미지 업로드 실패')
    insertText(`\n\n![${file.name}](${data.url})\n`)
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="rounded-md border border-border bg-secondary">
            <div className="flex items-center gap-1 border-b border-border p-2">
              <EditorButton title="굵게" onClick={() => insertText('**텍스트**')}>
                <Bold className="h-4 w-4" />
              </EditorButton>
              <EditorButton title="기울임" onClick={() => insertText('*텍스트*')}>
                <Italic className="h-4 w-4" />
              </EditorButton>
              <EditorButton title="목록" onClick={() => insertText('\n- 항목')}>
                <List className="h-4 w-4" />
              </EditorButton>
              <EditorButton
                title="이미지"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="h-4 w-4" />
              </EditorButton>
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
              <div className="grid min-h-[520px] grid-rows-[minmax(260px,1fr)_minmax(220px,0.8fr)] lg:min-h-[440px] lg:grid-cols-2 lg:grid-rows-1">
                <textarea
                  {...field}
                  ref={(element) => {
                    field.ref(element)
                    textareaRef.current = element
                  }}
                  rows={14}
                  placeholder="내용을 입력해주세요."
                  className="min-h-[260px] w-full resize-none bg-transparent px-3.5 py-3 text-[14px] leading-6 text-foreground placeholder:text-muted-foreground focus:outline-none lg:min-h-[440px]"
                />
                <div className="border-t border-border bg-background px-3.5 py-3 lg:border-l lg:border-t-0">
                  <div className="h-full min-h-[220px] overflow-y-auto">
                    {field.value ? (
                      <MarkdownContent content={field.value} />
                    ) : (
                      <p className="text-[13px] text-muted-foreground">
                        작성한 내용이 여기에 미리 표시됩니다.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function EditorButton({
  children,
  disabled,
  onClick,
  title,
}: {
  children: ReactNode
  disabled?: boolean
  onClick: () => void
  title: string
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-transparent text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
    >
      {children}
    </button>
  )
}
