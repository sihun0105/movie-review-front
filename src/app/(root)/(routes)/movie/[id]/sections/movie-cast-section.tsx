import { MovieActor } from '@/modules/movie/movie.entity'
import Image from 'next/image'
import { SectionHead } from '@/components/dm/section-head'
import React from 'react'

interface MovieCastSectionProps {
  actors: MovieActor[]
}

function ActorCard({ actor }: { actor: MovieActor }) {
  return (
    <article className="w-[112px] shrink-0 overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative aspect-[2/3] w-full bg-muted">
        <Image
          src={actor.profileUrl}
          alt={`${actor.name} 배우 프로필`}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>
      <div className="min-h-[64px] px-2 py-2">
        <h3 className="truncate text-[13px] font-semibold text-foreground">
          {actor.name}
        </h3>
        {actor.character && (
          <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-muted-foreground">
            {actor.character}
          </p>
        )}
      </div>
    </article>
  )
}

export function MovieCastSection({ actors }: MovieCastSectionProps) {
  if (actors.length === 0) return null

  return (
    <section className="px-4 pb-5">
      <SectionHead>주연 배우</SectionHead>
      <div className="-mx-4 overflow-x-auto overscroll-x-contain px-4 pb-1">
        <div className="flex w-max gap-3 pr-4">
          {actors.map((actor) => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </div>
      </div>
    </section>
  )
}
