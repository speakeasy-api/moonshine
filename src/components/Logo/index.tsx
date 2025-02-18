import * as svgs from './svgs'

type LogoVariant = 'wordmark' | 'icon'

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant: LogoVariant
  muted?: boolean
}

const defaultFill = '#fbe331'
const mutedFill = 'rgba(255, 255, 255, 1)'

export function Logo({ variant, muted, className, ...props }: LogoProps) {
  switch (variant) {
    case 'wordmark':
      return (
        <svgs.Wordmark
          {...props}
          fill={muted ? mutedFill : defaultFill}
          className={className}
        />
      )
    case 'icon':
      return (
        <svgs.Logo
          fill={muted ? mutedFill : defaultFill}
          className={className}
          {...props}
        />
      )
  }
}
