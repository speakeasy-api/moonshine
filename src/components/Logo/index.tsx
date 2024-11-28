import * as svgs from './svgs'

type LogoVariant = 'wordmark' | 'icon'

interface LogoProps {
  variant: LogoVariant
  className?: string
}

// aspect
// todo: move to design system
const fill = '#fbe331'

export function Logo({ variant, className }: LogoProps) {
  switch (variant) {
    case 'wordmark':
      return <svgs.Wordmark fill={fill} className={className} />
    case 'icon':
      return <svgs.Logo fill={fill} className={className} />
  }
}
