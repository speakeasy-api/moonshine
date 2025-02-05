import { cva, type VariantProps } from 'class-variance-authority'
import { Modifier, Variant } from './types'
import { Icon } from '@/components/Icon'
import { iconNames } from '../Icon/names'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const flexClasses = 'flex flex-row items-center gap-3'

const alertVariants = cva<{
  variant: {
    [k in Variant]: string
  }
  modifiers: {
    [k in Modifier]: string
  }
}>(
  `min-w-48 max-h-fit flex flex-row subpixel-antialiased font-light items-center px-3 pr-2 py-2 w-full`,
  {
    variants: {
      variant: {
        default: 'bg-card',
        success: 'bg-success text-success-foreground',
        error: 'bg-destructive text-destructive-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
        feature: 'bg-feature text-feature-foreground',
      },
      modifiers: {
        inline: 'inline-flex',
      },
    },
  }
)

type AlertProps = {
  variant: NonNullable<VariantProps<typeof alertVariants>['variant']>
  children: React.ReactNode
  inline?: boolean
  dismissible?: boolean
  onDismiss?: () => void
  iconName?: (typeof iconNames)[number]
  useContainer?: boolean
  className?: string
}

const iconForVariant: Record<Variant, (typeof iconNames)[number] | undefined> =
  {
    default: 'info',
    success: 'check',
    error: 'circle-alert',
    warning: 'circle-alert',
    info: 'info',
    feature: 'star',
  }

export function Alert({
  variant = 'default',
  children,
  inline = false,
  dismissible = true,
  onDismiss,
  iconName,
  useContainer = false,
  className,
}: AlertProps) {
  const [isDismissing, setIsDismissing] = useState(false)
  const handleDismiss = () => {
    setIsDismissing(true)
    onDismiss?.()
  }
  const icon = iconName ?? iconForVariant[variant]
  const innerContent = (
    <div className={flexClasses}>
      <div className="flex-shrink-0">
        {icon && <Icon name={icon} size="small" />}
      </div>
      <div>{children}</div>
    </div>
  )

  const dismissableContent = dismissible && (
    <div className="ml-auto self-start">
      <button
        className="hover:bg-accent/10 p-2 hover:rounded-lg"
        onClick={handleDismiss}
      >
        <Icon name="x" />
      </button>
    </div>
  )

  return (
    <div
      className={cn(
        alertVariants({ variant, modifiers: inline ? 'inline' : undefined }),
        isDismissing && 'opacity-0 transition-opacity duration-500',
        className
      )}
    >
      {useContainer ? (
        <div className="container flex">
          {innerContent}
          {dismissableContent}
        </div>
      ) : (
        <>
          {innerContent}
          {dismissableContent}
        </>
      )}
    </div>
  )
}
