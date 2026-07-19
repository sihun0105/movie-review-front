'use client'

import { Form } from '@/components/ui/form'
import { CreateMatchPostRequest } from '@/lib/type'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { FormEvent, FunctionComponent, useMemo, useState } from 'react'
import { useMatchPostFormContext } from './hooks/match-post-form-context'
import { buildMatchPayload, formatMatchDateTime } from './match-post-form-utils'
import { MatchPostFormStep } from './match-post-form-step'

interface MatchPostFormProps {
  onSubmit: (_data: CreateMatchPostRequest) => Promise<void>
  onCancel: () => void
}

const steps = [
  { field: 'movieTitle', label: '영화', title: '어떤 영화를 볼까요?' },
  { field: 'showTime', label: '일정', title: '언제 볼까요?' },
  { field: 'location', label: '장소', title: '어디서 만날까요?' },
  { field: 'maxParticipants', label: '인원', title: '몇 명이 함께 볼까요?' },
  { field: 'confirm', label: '설명', title: '더 전하고 싶은 말이 있나요?' },
] as const

const MatchPostForm: FunctionComponent<MatchPostFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const { form } = useMatchPostFormContext()
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

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

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!isLast) {
      event.preventDefault()
      void goNext()
      return
    }
    void submit(event)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleFormSubmit}
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

        <div className="flex-1">
          <MatchPostFormStep
            field={current.field}
            form={form}
            summary={summary}
          />
        </div>

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

export { MatchPostForm }
