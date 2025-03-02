import icon from '/public/assets/circle-x.png'
import { FunctionComponent } from 'react'
import { cn } from '@/lib/utils'
import Icon, { IconProps } from './icon'

const IconCloseCircle: FunctionComponent<Omit<IconProps, 'src'>> = ({
  className,
  size,
}) => <Icon className={cn(className)} size={size} src={icon} />

export default IconCloseCircle
