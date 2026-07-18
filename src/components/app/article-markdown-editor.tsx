'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { MarkdownContent } from '@/components/app/markdown-content'
import { useAppToast } from '@/hooks/use-app-toast'
import { cn } from '@/lib/utils'
import { Bold, ImagePlus, Italic, List } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { EditorButton, ModeButton } from './article-markdown-editor-controls'
import { insertMarkdownText } from './article-markdown-editor-utils'

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
  const fileInputId = useId()
  const [uploading, setUploading] = useState(false)
  const [editorMode, setEditorMode] = useState<'write' | 'preview'>('write')

  const insertText = (text: string) => {
    const current = form.getValues(name) ?? ''
    const target = textareaRef.current
    const start = target?.selectionStart ?? current.length
    const end = target?.selectionEnd ?? current.length
    const result = insertMarkdownText(current, text, start, end)
    form.setValue(name, result.value, {
      shouldDirty: true,
      shouldValidate: true,
    })
    requestAnimationFrame(() => {
      target?.focus()
      target?.setSelectionRange(result.cursor, result.cursor)
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
            <div className="flex items-center gap-1 overflow-x-auto border-b border-border p-2">
              <EditorButton title="굵게" onClick={() => insertText('**텍스트**')}>
                <Bold className="h-4 w-4" />
              </EditorButton>
              <EditorButton title="기울임" onClick={() => insertText('*텍스트*')}>
                <Italic className="h-4 w-4" />
              </EditorButton>
              <EditorButton title="목록" onClick={() => insertText('\n- 항목')}>
                <List className="h-4 w-4" />
              </EditorButton>
              <label
                htmlFor={fileInputId}
                title="이미지 추가"
                className={cn(
                  'relative flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground sm:h-9 sm:w-9',
                  uploading && 'pointer-events-none opacity-50',
                )}
              >
                <ImagePlus className="h-4 w-4" />
                <span className="sr-only">
                  {uploading ? '이미지 업로드 중' : '이미지 추가'}
                </span>
                <input
                  id={fileInputId}
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  aria-label="이미지 추가"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
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
              </label>
              <div className="ml-auto flex shrink-0 rounded-md bg-background p-0.5 lg:hidden">
                <ModeButton
                  active={editorMode === 'write'}
                  onClick={() => setEditorMode('write')}
                >
                  작성
                </ModeButton>
                <ModeButton
                  active={editorMode === 'preview'}
                  onClick={() => setEditorMode('preview')}
                >
                  미리보기
                </ModeButton>
              </div>
            </div>
            <FormControl>
              <div className="min-h-[360px] lg:grid lg:min-h-[440px] lg:grid-cols-2">
                <textarea
                  {...field}
                  ref={(element) => {
                    field.ref(element)
                    textareaRef.current = element
                  }}
                  rows={14}
                  placeholder="내용을 입력해주세요."
                  className={cn(
                    'min-h-[360px] w-full resize-none bg-transparent px-3.5 py-3 text-[16px] leading-7 text-foreground placeholder:text-muted-foreground focus:outline-none lg:block lg:min-h-[440px] lg:text-[14px] lg:leading-6',
                    editorMode === 'preview' && 'hidden',
                  )}
                />
                <div
                  className={cn(
                    'min-h-[360px] bg-background px-3.5 py-3 lg:block lg:min-h-[440px] lg:border-l lg:border-border',
                    editorMode === 'write' && 'hidden',
                  )}
                >
                  <div className="h-full min-h-[336px] overflow-y-auto">
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
