import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { IconName } from '../Icon/names'
import { Icon as IconComponent } from '../Icon'
import { TextVariant } from '../Text'

type LinkVariant = 'primary' | 'secondary'

const linkVariants = cva(
  'group visited:text-link-visited visited:hover:text-link-visited items-center inline-flex flex-row',
  {
    variants: {
      variant: {
        primary: 'text-link-default',
        secondary: 'text-white',
      },
      size: {
        xs: 'typography-body-xs gap-1',
        sm: 'typography-body-sm gap-1',
        md: 'typography-body-md gap-2',
        lg: 'typography-body-lg gap-2',
      },
    },
  }
)

const linkTextVariants = cva('underline-offset-4 decoration-1', {
  variants: {
    variant: {
      primary: '',
      secondary: 'decoration-white/40',
    },
    underline: {
      false: 'no-underline group-hover:underline',
      true: 'underline group-hover:no-underline',
    },
  },
})

const iconWrapperVariants = cva('inline-block', {
  variants: {
    size: {
      xs: 'size-3 [&>svg]:size-3',
      sm: 'size-3 [&>svg]:size-3',
      md: 'size-4 [&>svg]:size-4',
      lg: 'size-4 [&>svg]:size-4',
    },
  },
})

export interface LinkProps {
  href: string
  children: ReactNode
  variant?: LinkVariant
  size?: TextVariant
  underline?: boolean
  target?: '_blank' | '_self'
  iconPrefixName?: IconName
  iconSuffixName?: IconName
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  variant = 'primary',
  size = 'md',
  underline = true,
  target = '_blank',
  iconPrefixName,
  iconSuffixName,
}) => {
  return (
    <a
      href={href}
      target={target}
      className={cn(linkVariants({ variant, size }))}
    >
      {iconPrefixName && (
        <IconWrapper size={size}>
          <IconComponent name={iconPrefixName} size="small" />
        </IconWrapper>
      )}

      <Text underline={underline} variant={variant}>
        {children}
      </Text>

      {iconSuffixName && (
        <IconWrapper size={size}>
          <IconComponent name={iconSuffixName} size="small" />
        </IconWrapper>
      )}
    </a>
  )
}
Link.displayName = 'Link'

interface TextProps {
  underline?: boolean
  variant?: LinkVariant
}

const Text = ({
  children,
  underline,
  variant,
}: React.PropsWithChildren<TextProps>) => {
  return (
    <span className={cn(linkTextVariants({ underline, variant }))}>
      {children}
    </span>
  )
}

interface IconWrapperProps {
  size?: TextVariant
}

const IconWrapper = ({
  children,
  size,
}: React.PropsWithChildren<IconWrapperProps>) => {
  return <span className={cn(iconWrapperVariants({ size }))}>{children}</span>
}
