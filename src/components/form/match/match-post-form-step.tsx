import { CreateMatchPostRequest } from '@/lib/type'
import { CalendarDays } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { MovieSuggestionChips } from './movie-suggestion-chips'

export type MatchFormStep =
  | 'movieTitle'
  | 'showTime'
  | 'location'
  | 'maxParticipants'
  | 'confirm'

interface MatchPostFormStepProps {
  field: MatchFormStep
  form: UseFormReturn<CreateMatchPostRequest>
  summary: string[][]
}

const inputCls =
  'w-full rounded-xl border border-border bg-secondary px-4 py-4 text-[18px] font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none'

export function MatchPostFormStep({
  field,
  form,
  summary,
}: MatchPostFormStepProps) {
  if (field === 'confirm') {
    return (
      <div className="space-y-5">
        <div className="space-y-3">
          {summary.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-xl bg-secondary px-4 py-4"
            >
              <span className="text-[13px] text-muted-foreground">{label}</span>
              <span className="text-right text-[15px] font-bold text-foreground">
                {value}
              </span>
            </div>
          ))}
        </div>
        <label className="block">
          <span className="mb-2 block text-[13px] font-semibold text-foreground">
            설명 (선택)
          </span>
          <textarea
            value={form.watch('content')}
            onChange={(event) => form.setValue('content', event.target.value)}
            maxLength={500}
            rows={4}
            placeholder="같이 볼 사람에게 알려둘 내용을 적어주세요."
            className={`${inputCls} resize-none text-[15px] font-normal`}
          />
          <span className="mt-1 block text-right text-[11px] text-muted-foreground">
            {form.watch('content').length}/500
          </span>
        </label>
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
                form.setValue('maxParticipants', count, {
                  shouldValidate: true,
                })
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

  const isSchedule = field === 'showTime'
  const placeholder =
    field === 'movieTitle' ? '영화 제목' : '예: 강남, 홍대, 잠실'

  return (
    <div>
      <div className={isSchedule ? 'relative' : undefined}>
        <input
          type={isSchedule ? 'datetime-local' : 'text'}
          value={form.watch(field) as string}
          onChange={(event) =>
            form.setValue(field, event.target.value, { shouldValidate: true })
          }
          placeholder={placeholder}
          className={`${inputCls} ${
            isSchedule
              ? 'pr-12 [color-scheme:light] dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0'
              : ''
          }`}
        />
        {isSchedule && (
          <CalendarDays
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground"
            size={22}
          />
        )}
      </div>
      <p className="mt-3 text-[13px] text-destructive">
        {form.formState.errors[field]?.message as string}
      </p>
      {field === 'movieTitle' && (
        <MovieSuggestionChips
          selectedTitle={form.watch('movieTitle')}
          onSelect={(title) =>
            form.setValue('movieTitle', title, { shouldValidate: true })
          }
        />
      )}
    </div>
  )
}
