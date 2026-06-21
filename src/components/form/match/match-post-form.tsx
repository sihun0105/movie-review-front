'use client'

import { Form } from '@/components/ui/form'
import { CreateMatchPostRequest } from '@/lib/type'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useMatchPostFormContext } from './hooks/match-post-form-context'
import { buildMatchPayload, formatMatchDateTime } from './match-post-form-utils'

interface MatchPostFormProps {
  onSubmit: (_data: CreateMatchPostRequest) => Promise<void>
  onCancel: () => void
  initialData?: Partial<CreateMatchPostRequest>
}

const steps = [
  { field: 'movieTitle', label: '영화', title: '어떤 영화를 볼까요?' },
  { field: 'showTime', label: '일정', title: '언제 볼까요?' },
  { field: 'location', label: '장소', title: '어디서 만날까요?' },
  { field: 'maxParticipants', label: '인원', title: '몇 명이 함께 볼까요?' },
  { field: 'confirm', label: '확인', title: '이대로 매치를 만들까요?' },
] as const

const inputCls =
  'w-full rounded-xl border border-border bg-secondary px-4 py-4 text-[18px] font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none'

const MatchPostForm: FunctionComponent<MatchPostFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const { form } = useMatchPostFormContext()
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!initialData) return
    Object.entries(initialData).forEach(([key, value]) => {
      if (value !== undefined) {
        form.setValue(key as keyof CreateMatchPostRequest, value as any)
      }
    })
  }, [form, initialData])

  const values = form.watch()
  const current = steps[step]
  const isLast = step === steps.length - 1
  const progress = ((step + 1) / steps.length) * 100

  const summary = useMemo(
    () => [
      ['영화', values.movieTitle || '미정'],
      ['일정', values.showTime ? formatMatchDateTime(values.showTime) : '미정'],
      ['장소', values.location || '미정'],
      ['인원', `${values.maxParticipants || 1}명`],
    ],
    [values],
  )

  const goNext = async () => {
    if (current.field === 'confirm') return
    const ok = await form.trigger(current.field)
    if (ok) setStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const submit = form.handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      await onSubmit(buildMatchPayload(data))
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <Form {...form}>
      <form
        onSubmit={submit}
        className="mx-auto flex min-h-[calc(100dvh-220px)] max-w-[520px] flex-col"
      >
        <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mb-3 text-[13px] font-semibold text-primary">
          {step + 1} / {steps.length} · {current.label}
        </p>
        <h2 className="mb-8 text-[28px] font-bold leading-tight text-foreground">
          {current.title}
        </h2>

        <div className="flex-1">{renderStep(current.field, form, summary)}</div>

        <div className="sticky bottom-0 flex gap-2 border-t border-border bg-background/95 py-3 backdrop-blur">
          <button
            type="button"
            onClick={step === 0 ? onCancel : () => setStep((prev) => prev - 1)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground hover:border-primary hover:text-primary"
            title={step === 0 ? '취소' : '이전'}
          >
            <ArrowLeft size={20} />
          </button>
          {isLast ? (
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-bold text-white disabled:bg-secondary disabled:text-muted-foreground"
            >
              {isLoading ? '등록 중...' : '매치 만들기'} <Check size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-bold text-white"
            >
              다음 <ArrowRight size={18} />
            </button>
          )}
        </div>
      </form>
    </Form>
  )
}

function renderStep(field: (typeof steps)[number]['field'], form: any, summary: string[][]) {
  if (field === 'confirm') {
    return (
      <div className="space-y-3">
        {summary.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-xl bg-secondary px-4 py-4"
          >
            <span className="text-[13px] text-muted-foreground">{label}</span>
            <span className="text-right text-[15px] font-bold text-foreground">{value}</span>
          </div>
        ))}
      </div>
    )
  }

  if (field === 'maxParticipants') {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6].map((count) => {
          const selected = form.watch('maxParticipants') === count
          return (
            <button
              key={count}
              type="button"
              onClick={() =>
                form.setValue('maxParticipants', count, { shouldValidate: true })
              }
              className={`rounded-xl border px-4 py-5 text-[18px] font-bold ${
                selected
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-secondary text-foreground'
              }`}
            >
              {count}명
            </button>
          )
        })}
      </div>
    )
  }

  const type = field === 'showTime' ? 'datetime-local' : 'text'
  const placeholder = field === 'movieTitle' ? '영화 제목' : '예: 강남, 홍대, 잠실'

  return (
    <div>
      <input
        type={type}
        value={form.watch(field) as string}
        onChange={(event) => form.setValue(field, event.target.value, { shouldValidate: true })}
        placeholder={placeholder}
        className={`${inputCls} ${field === 'showTime' ? '[color-scheme:dark]' : ''}`}
      />
      <p className="mt-3 text-[13px] text-destructive">
        {form.formState.errors[field]?.message as string}
      </p>
    </div>
  )
}

export { MatchPostForm }
