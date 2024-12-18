import * as svgs from './svgs'

type LogoVariant = 'wordmark' | 'icon'

interface LogoProps {
  variant: LogoVariant
  muted?: boolean
  width?: number
  height?: number
}

// aspect
// todo: move to design system
const defaultFill = '#fbe331'
const mutedFill = 'rgba(255, 255, 255, 1)'

export function Logo({ variant, muted, width, height }: LogoProps) {
  switch (variant) {
    case 'wordmark':
      return (
        <svgs.Wordmark
          fill={muted ? mutedFill : defaultFill}
          width={width}
          height={height}
        />
      )
    case 'icon':
      return (
        <svgs.Logo
          fill={muted ? mutedFill : defaultFill}
          width={width}
          height={height}
        />
      )
  }
}
