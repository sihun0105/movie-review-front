import { SectionHead } from '@/components/dm'

interface MatchDescriptionSectionProps {
  content?: string
}

export function MatchDescriptionSection({
  content,
}: MatchDescriptionSectionProps) {
  const message = content?.trim()
  if (!message) return null

  return (
    <section className="mt-4">
      <SectionHead className="mt-0">호스트의 인사</SectionHead>
      <div className="whitespace-pre-wrap break-words rounded-lg border border-border bg-card p-4 text-[14px] leading-[1.7] text-foreground">
        {message}
      </div>
    </section>
  )
}
