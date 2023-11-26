import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes, ReactNode } from 'react'

interface BoxProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  children: ReactNode
  asChild?: boolean
}

const boxVariants = cva('relative', {
  variants: {
    boxColor: {
      default: 'bg-transparent',
      white: 'bg-white',
      gray: 'bg-app-gray-002',
      primary: 'bg-primary',
    },
    shadow: {
      none: 'shadow-none',
      default: 'shadow-[0_0_6px_0_rgba(0,0,0,0.2)]',
      drop: 'shadow-[0_4px_12px_0_rgba(0,0,0,0.25)]',
    },
    rounded: {
      default: 'rounded-2xl',
      sm: 'rounded-sm',
    },
  },
  defaultVariants: {
    boxColor: 'default',
    rounded: 'default',
  },
})

const Box = ({
  boxColor,
  shadow,
  children,
  className,
  rounded,
  asChild,
  ...props
}: BoxProps) => {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      className={cn(boxVariants({ boxColor, shadow, rounded }), className)}
      {...props}
    >
      {children}
    </Comp>
  )
}

export default Box
