interface StarsProps {
  value: number
  size?: number
  className?: string
}

export function Stars({ value, size = 12, className }: StarsProps) {
  const filled = Math.round(value)
  return (
    <span className={`inline-flex gap-[1px] text-yellow-400 ${className ?? ''}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill={i <= filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path
            d="M8 1.5l2 4.5 5 .5-3.8 3.3 1.1 4.8L8 12l-4.3 2.6L4.8 9.8 1 6.5l5-.5 2-4.5z"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  )
}
