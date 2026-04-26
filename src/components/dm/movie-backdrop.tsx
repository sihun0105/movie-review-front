import type { CSSProperties } from 'react'
import type { PosterPalette } from './poster-palette'

interface MovieBackdropProps {
  palette: PosterPalette
  height?: number
}

export function MovieBackdrop({ palette, height = 220 }: MovieBackdropProps) {
  const { h, c } = palette
  const style: CSSProperties = {
    height,
    background: [
      `linear-gradient(180deg, transparent 0%, var(--dm-bg) 95%)`,
      `linear-gradient(135deg, oklch(0.25 ${c} ${h}) 0%, oklch(0.08 ${c * 0.5} ${h}) 100%)`,
    ].join(', '),
  }
  return (
    <div className="relative" style={style} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '3px 3px',
        }}
      />
    </div>
  )
}
