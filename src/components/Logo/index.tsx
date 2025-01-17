import * as svgs from './svgs'

type LogoVariant = 'wordmark' | 'icon'

interface LogoProps {
  variant: LogoVariant
  muted?: boolean
  className?: string
}

// aspect
// todo: move to design system
const defaultFill = '#fbe331'
const mutedFill = 'rgba(255, 255, 255, 1)'

export function Logo({ variant, muted, className }: LogoProps) {
  switch (variant) {
    case 'wordmark':
      return (
        <svgs.Wordmark
          fill={muted ? mutedFill : defaultFill}
          className={className}
        />
      )
    case 'icon':
      return (
        <svgs.Logo
          fill={muted ? mutedFill : defaultFill}
          className={className}
        />
      )
  }
}
