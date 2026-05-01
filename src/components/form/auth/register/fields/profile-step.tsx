'use client'

import { FormControl, FormField, FormMessage } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useRegisterFormContext } from '../hook/register-form-context'

const labelCls = 'mb-2 block font-dm-mono text-[10px] uppercase tracking-[1px] text-dm-text-muted'

const ProfileStep: FunctionComponent = () => {
  const { form } = useRegisterFormContext()
  const genderValue = form.watch('gender')
  const termsValue = form.watch('termsAgreed')

  const genders: [string, string, string][] = [
    ['female', '여성', '#e67a9a'],
    ['male', '남성', '#7aa8e6'],
  ]

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <div>
            <div className={labelCls}>
              성별{' '}
              <span className="text-dm-amber normal-case tracking-normal">
                · 매칭에 사용
              </span>
            </div>
            <FormControl>
              <div className="flex gap-2">
                {genders.map(([val, label, color]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => field.onChange(val)}
                    style={{
                      flex: 1,
                      padding: 14,
                      background:
                        genderValue === val ? color + '22' : 'transparent',
                      border: `1px solid ${genderValue === val ? color : 'var(--dm-line-2)'}`,
                      color: genderValue === val ? color : 'var(--dm-text-muted)',
                      fontFamily: 'inherit',
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </FormControl>
            <FormMessage className="mt-1 font-dm-mono text-[11px] text-dm-red" />
          </div>
        )}
      />

      <FormField
        control={form.control}
        name="termsAgreed"
        render={({ field }) => (
          <div>
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={field.value ?? false}
                onChange={(e) => field.onChange(e.target.checked)}
                style={{ accentColor: 'var(--dm-red)', marginTop: 2 }}
              />
              <div className="text-[12px] leading-relaxed text-dm-text-muted">
                <span className="text-dm-text">이용약관</span> 및{' '}
                <span className="text-dm-text">개인정보 처리방침</span>에
                동의해요.
                <br />
                <span className="font-dm-mono text-[10px] text-dm-text-faint">
                  (만 14세 이상만 가입 가능합니다)
                </span>
              </div>
            </label>
            {!termsValue && form.formState.isSubmitted && (
              <p className="mt-1 font-dm-mono text-[11px] text-dm-red">
                약관에 동의해주세요.
              </p>
            )}
          </div>
        )}
      />
    </div>
  )
}

export { ProfileStep }
