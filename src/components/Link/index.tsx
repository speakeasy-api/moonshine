import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { IconName } from '../Icon/names'
import { Icon as IconComponent } from '../Icon'

type LinkVariant = 'primary' | 'secondary'
type LinkSize = 'lg' | 'md' | 'sm' | 'xs'

const linkVariants = cva(
  'group visited:text-violet-400 visited:hover:text-violet-400  items-center inline-flex flex-row',
  {
    variants: {
      variant: {
        primary: 'text-sky-500',
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
    silent: {
      true: 'no-underline group-hover:underline',
      false: 'underline group-hover:no-underline',
    },
  },
})

const linkVisualVariants = cva('inline-block', {
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
  size?: LinkSize
  silent?: boolean
}

type ChildProps = Pick<LinkProps, 'variant' | 'size' | 'silent'>

const Root: React.FC<LinkProps> = ({
  href,
  children,
  variant = 'primary',
  size = 'md',
  silent = false,
}) => {
  /**
   * If the Link only contains text there is no need to require wrapping it a `Link.Text` component.
   * It will be added automatically in the render function
   */
  const isTextOnly = typeof children === 'string'

  const childrenWithProps = React.Children.map(children, (child) => {
    if (
      !isTextOnly &&
      React.isValidElement(child) &&
      (child.type === Visual || child.type === Text || child.type === Icon)
    ) {
      return React.cloneElement(
        child as React.ReactElement<React.PropsWithChildren<ChildProps>>,
        { variant, size, silent }
      )
    }
    return child
  })

  return (
    <a
      href={href}
      className={cn(
        linkVariants({ variant, size }),
        'align-center inline-flex flex-row'
      )}
    >
      {isTextOnly ? (
        <Link.Text silent={silent}>{children}</Link.Text>
      ) : (
        childrenWithProps
      )}
    </a>
  )
}
Root.displayName = 'Link'

interface TextProps {
  /**
   * @internal
   * This prop will be set by the parent `Link` component
   * */
  silent?: boolean

  /**
   * @internal
   * This prop will be set by the parent `Link` component
   * */
  variant?: LinkVariant
}

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  silent,
  variant,
}) => {
  return (
    <span className={cn(linkTextVariants({ silent, variant }))}>
      {children}
    </span>
  )
}
Text.displayName = 'Link.Text'

interface VisualProps {
  /**
   * @ignore
   * This prop will be set by the parent `Link` component
   * */
  size?: LinkSize
}

const Visual: React.FC<React.PropsWithChildren<VisualProps>> = ({
  children,
  size,
}) => {
  return <span className={cn(linkVisualVariants({ size }))}>{children}</span>
}
Visual.displayName = 'Link.Visual'

interface IconProps {
  /**
   * @ignore
   * This prop will be set by the parent `Link` component
   * */
  size?: LinkSize

  /**
   * Name of the Lucide icon to render
   */
  name: IconName
}

const Icon: React.FC<IconProps> = ({ size, name }) => {
  /**
   * The `Icon` component doesn't have a 12px x 12px size so the size here is fixed and
   * the size is controlled by the css
   */
  return (
    <Visual size={size}>
      <IconComponent name={name} size="small" />
    </Visual>
  )
}
Icon.displayName = 'Link.Icon'

export const Link = Object.assign(Root, {
  Text,
  Icon,
})
