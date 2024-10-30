import * as svgs from './svgs'

type LogoVariant = 'wordmark' | 'icon'

interface LogoProps {
  variant: LogoVariant
}

// aspect
// todo: move to design system
const fill = '#fbe331'

export function Logo({ variant }: LogoProps) {
  switch (variant) {
    case 'wordmark':
      return <svgs.Wordmark fill={fill} />
    case 'icon':
      return <svgs.Logo fill={fill} />
  }
}
