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
    <div className="flex gap-3 border-b border-dm-line px-5 py-4">
      <button
        onClick={() => { setSelected('like'); update('like') }}
        disabled={isValidating}
        className={`flex items-center gap-1.5 border px-3 py-1.5 font-dm-mono text-[12px] transition ${
          selected === 'like'
            ? 'border-dm-amber bg-dm-amber/10 text-dm-amber'
            : 'border-dm-line text-dm-text-faint hover:border-dm-amber hover:text-dm-amber'
        }`}
      >
        👍 {likes}
      </button>
      <button
        onClick={() => { setSelected('dislike'); update('dislike') }}
        disabled={isValidating}
        className={`flex items-center gap-1.5 border px-3 py-1.5 font-dm-mono text-[12px] transition ${
          selected === 'dislike'
            ? 'border-dm-red bg-dm-red/10 text-dm-red'
            : 'border-dm-line text-dm-text-faint hover:border-dm-red hover:text-dm-red'
        }`}
      >
        👎 {dislikes}
      </button>
    </div>
  )
}

export default LikeSection
