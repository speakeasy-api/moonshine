import React, { forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { IconName } from '../Icon/names'
import { Icon as IconComponent } from '../Icon'
import { TextVariant } from '../Text'

type LinkVariant = 'primary' | 'secondary'

const linkVariants = cva(
  'group/link items-center inline-flex flex-row cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'text-link visited:text-link-visited-primary visited:hover:text-link-visited-primary',
        secondary:
          'text-link-secondary visited:text-link-visited-secondary visited:hover:text-link-visited-secondary',
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

const linkTextVariants = cva(
  'underline-offset-4 decoration-1 inline-flex flex-row items-center',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '[&:not(:visited)]:decoration-link-secondary/40',
      },
      underline: {
        false: 'no-underline group-hover/link:underline',
        true: 'underline group-hover/link:no-underline',
      },
    },
  }
)

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
  href?: string
  children: ReactNode
  variant?: LinkVariant
  size?: TextVariant
  underline?: boolean
  target?: '_blank' | '_self'
  iconPrefixName?: IconName
  iconSuffixName?: IconName
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const Link: React.FC<LinkProps> = forwardRef<
  HTMLAnchorElement,
  LinkProps
>(
  (
    {
      href,
      children,
      variant = 'primary',
      size = 'md',
      underline = true,
      target = '_blank',
      iconPrefixName,
      iconSuffixName,
      className,
      onClick,
      ...rest // ...rest is needed so that we can use Link with <TooltipTrigger asChild>
    },
    ref
  ) => {
    return (
      <a
        href={href}
        ref={ref}
        target={target}
        className={cn(linkVariants({ variant, size }), className)}
        onClick={onClick}
        {...rest}
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
)
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
