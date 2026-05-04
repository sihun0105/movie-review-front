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
  palette,
  imageUrl,
  className,
  rounded = 'sm',
}: PosterProps) {
  const { h, c, lt, lb } = palette
  const style: CSSProperties = imageUrl
    ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {
        background: [
          `linear-gradient(155deg, oklch(${lt} ${c} ${h}) 0%, oklch(${lb} ${c * 0.6} ${h}) 100%)`,
          `repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 4px)`,
        ].join(', '),
      }

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
      {/* grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '3px 3px',
        }}
        aria-hidden
      />
      {/* vignette */}
      {!imageUrl && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, oklch(${lt + 0.1} ${c} ${h} / 0.35) 0%, transparent 60%)`,
          }}
          aria-hidden
        />
      )}
      {/* title card (only when no image) */}
      {!imageUrl && (
        <div className="absolute inset-x-1.5 bottom-1.5 break-keep font-dm-display text-[11px] italic leading-[1.15] text-foreground [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
          {title}
        </div>
      )}
    </div>
  )
}
