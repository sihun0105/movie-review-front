import { cn } from '@/lib/utils'
import type { CSSProperties } from 'react'
import type { PosterPalette } from './poster-palette'

interface PosterProps {
  title: string
  palette: PosterPalette
  imageUrl?: string
  className?: string
  rounded?: 'none' | 'sm' | 'md'
}

export function Poster({
  title,
  palette: _palette,
  imageUrl,
  className,
  rounded = 'sm',
}: PosterProps) {
  const style: CSSProperties = imageUrl
    ? {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { background: 'hsl(var(--muted))' }

  return (
    <div
      style={style}
      className={cn(
        'relative aspect-[2/3] overflow-hidden border border-border',
        rounded === 'none' && 'rounded-none',
        rounded === 'sm' && 'rounded-[2px]',
        rounded === 'md' && 'rounded',
        className,
      )}
    >
      {/* title card (only when no image) */}
      {!imageUrl && (
        <div className="absolute inset-x-2 bottom-2 break-keep font-dm-display text-[11px] italic leading-[1.15] text-muted-foreground">
          {title}
        </div>
      )}
    </div>
  )
}
