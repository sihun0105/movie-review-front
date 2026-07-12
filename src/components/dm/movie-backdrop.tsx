import type { CSSProperties } from 'react'
import type { PosterPalette } from './poster-palette'

interface MovieBackdropProps {
  palette: PosterPalette
  height?: number
}

export function MovieBackdrop({ palette, height = 220 }: MovieBackdropProps) {
  void palette
  const style: CSSProperties = {
    height,
    background: 'hsl(var(--muted))',
  }
  return <div className="relative" style={style} aria-hidden />
}
