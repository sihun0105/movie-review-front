'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import type { PosterPalette } from './poster-palette'

interface PosterProps {
  title: string
  palette: PosterPalette
  imageUrl?: string
  className?: string
  rounded?: 'none' | 'sm' | 'md'
  sizes?: string
  priority?: boolean
}

function posterSource(imageUrl?: string): string {
  const src = imageUrl?.trim() ?? ''
  if (src.startsWith('/') && !src.startsWith('//')) return src
  try {
    const url = new URL(src)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : ''
  } catch {
    return ''
  }
}

export function Poster({
  title,
  palette: _palette,
  imageUrl,
  className,
  rounded = 'sm',
  sizes = '(max-width: 639px) 33vw, 160px',
  priority = false,
}: PosterProps) {
  const src = posterSource(imageUrl)
  const [imageState, setImageState] = useState<{
    src: string
    status: 'loading' | 'loaded' | 'error'
  }>({ src, status: 'loading' })
  const status = imageState.src === src ? imageState.status : 'loading'
  const showImage = !!src && status !== 'error'
  const loaded = showImage && status === 'loaded'

  return (
    <div
      aria-busy={showImage && !loaded}
      className={cn(
        'relative aspect-[2/3] overflow-hidden border border-border bg-muted',
        rounded === 'none' && 'rounded-none',
        rounded === 'sm' && 'rounded-[2px]',
        rounded === 'md' && 'rounded',
        className,
      )}
    >
      {!loaded && (
        <div className="absolute inset-x-2 bottom-2 break-keep font-dm-display text-[11px] italic leading-[1.15] text-muted-foreground">
          {title}
        </div>
      )}
      {showImage && (
        <Image
          key={src}
          src={src}
          alt={`${title} 포스터`}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="object-cover object-center"
          onLoadingComplete={() => setImageState({ src, status: 'loaded' })}
          onError={() => setImageState({ src, status: 'error' })}
        />
      )}
    </div>
  )
}
