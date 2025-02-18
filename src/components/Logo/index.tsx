import * as svgs from './svgs'

type LogoVariant = 'wordmark' | 'icon'

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant: LogoVariant
  muted?: boolean
}

export function Logo({ variant, className, ...props }: LogoProps) {
  switch (variant) {
    case 'wordmark':
      return <svgs.Wordmark {...props} className={className} />
    case 'icon':
      return <svgs.Logo className={className} {...props} />
  }
}
