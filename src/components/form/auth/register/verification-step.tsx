'use client'

import { useRef, useState } from 'react'
import type { ClipboardEvent, KeyboardEvent } from 'react'

interface VerificationStepProps {
  email: string
  onVerified: () => void
}

function VerificationStep({ email, onVerified }: VerificationStepProps) {
  const [codes, setCodes] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const next = [...codes]
    next[index] = value.slice(-1)
    setCodes(next)
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, event: KeyboardEvent) => {
    if (event.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault()
    const digits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6)
    if (!digits) return

    const next = [...codes]
    digits.split('').forEach((digit, index) => {
      next[index] = digit
    })
    setCodes(next)
    inputRefs.current[Math.min(digits.length, 5)]?.focus()
  }

  const handleVerify = async () => {
    const code = codes.join('')
    if (code.length < 6) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })
      const data = await res.json()
      if (data.isAvailable) {
        onVerified()
      } else {
        setError(data.message || '인증에 실패했습니다.')
        setCodes(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
      }
    } catch {
      setError('오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    setError(null)
    try {
      await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setCodes(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setResending(false)
    }
  }

  const isFull = codes.every((code) => code !== '')

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-3 text-[13px] text-muted-foreground">
        <span className="font-medium text-foreground">{email}</span>으로 인증 코드를 보냈습니다
      </div>

      <div className="flex gap-2">
        {codes.map((code, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={code}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className="h-12 w-0 min-w-0 flex-1 rounded-md border border-input bg-transparent text-center font-mono text-[18px] font-bold text-foreground focus:border-ring focus:outline-none"
          />
        ))}
      </div>

      {error && <p className="text-[12px] text-destructive">{error}</p>}

      <button
        type="button"
        onClick={handleVerify}
        disabled={!isFull || loading}
        className="h-11 w-full rounded-md bg-primary text-[14px] font-medium text-primary-foreground disabled:opacity-50"
      >
        {loading ? '확인 중...' : '인증 완료'}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="text-[12px] text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          {resending ? '발송 중...' : '코드 다시 받기'}
        </button>
      </div>
    </div>
  )
}

export { VerificationStep }
