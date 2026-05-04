'use client'

import type { LikeState } from '@/lib/type'
import { FunctionComponent, useState } from 'react'
import { useUpdateLike } from '../hooks/use-update-like'

interface LikeSectionProps {
  id: string
}

const LikeSection: FunctionComponent<LikeSectionProps> = ({ id }) => {
  const { data, update, isValidating } = useUpdateLike(+id)
  const [selected, setSelected] = useState<LikeState | null>(null)

  const likes = data?.likes || 0
  const dislikes = data?.dislikes || 0

  return (
    <div className="flex gap-3 border-b border-border px-5 py-4">
      <button
        onClick={() => { setSelected('like'); update('like') }}
        disabled={isValidating}
        className={`flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[12px] transition ${
          selected === 'like'
            ? 'border-yellow-400 bg-dm-amber/10 text-yellow-400'
            : 'border-border text-muted-foreground hover:border-primary hover:text-yellow-400'
        }`}
      >
        👍 {likes}
      </button>
      <button
        onClick={() => { setSelected('dislike'); update('dislike') }}
        disabled={isValidating}
        className={`flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[12px] transition ${
          selected === 'dislike'
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
        }`}
      >
        👎 {dislikes}
      </button>
    </div>
  )
}

export default LikeSection
