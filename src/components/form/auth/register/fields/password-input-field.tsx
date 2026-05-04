'use client'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FunctionComponent, useEffect, useState } from 'react'
import { useRegisterFormContext } from '../hook/register-form-context'

const inputCls = 'w-full border border-border bg-secondary px-3.5 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none'
const labelCls = 'mb-2 block font-mono text-[10px] uppercase tracking-[1px] text-muted-foreground'

const rules = [
  { key: 'length', label: '8자 이상', test: (v: string) => v.length >= 8 },
  { key: 'letter', label: '영문 포함', test: (v: string) => /[a-zA-Z]/.test(v) },
  { key: 'number', label: '숫자 포함', test: (v: string) => /\d/.test(v) },
  { key: 'special', label: '특수문자 포함 (@$!%*?&)', test: (v: string) => /[@$!%*?&]/.test(v) },
]

const PasswordInputField: FunctionComponent = () => {
  const { form } = useRegisterFormContext()
  const [checks, setChecks] = useState({ length: false, letter: false, number: false, special: false })
  const pw = form.watch('password')

  useEffect(() => {
    if (!pw) { setChecks({ length: false, letter: false, number: false, special: false }); return }
    setChecks({ length: pw.length >= 8, letter: /[a-zA-Z]/.test(pw), number: /\d/.test(pw), special: /[@$!%*?&]/.test(pw) })
  }, [pw])

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <label className={labelCls}>비밀번호</label>
          <FormControl>
            <input {...field} type="password" placeholder="••••••••" className={inputCls} />
          </FormControl>
          <FormMessage className="font-mono text-[11px] text-primary" />
          {pw && (
            <div className="mt-2 space-y-1.5">
              {rules.map((r) => {
                const ok = checks[r.key as keyof typeof checks]
                return (
                  <div key={r.key} className={`flex items-center gap-2 font-mono text-[11px] ${ok ? 'text-green-400' : 'text-muted-foreground'}`}>
                    <span>{ok ? '✓' : '○'}</span>{r.label}
                  </div>
                )
              })}
            </div>
          )}
        </FormItem>
      )}
    />
  )
}

export { PasswordInputField }
