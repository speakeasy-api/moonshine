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
}>(`min-w-48 flex flex-row items-center px-3 pr-2 py-2 w-full`, {
  variants: {
    variant: {
      default: 'bg-card',
      success: 'bg-green-700',
      error: 'bg-red-900',
      warning: 'bg-yellow-600/90',
      info: 'bg-blue-900',
      custom: '',
    },
    modifiers: {
      inline: 'inline-flex',
    },
  },
})

type AlertProps = {
  variant: NonNullable<VariantProps<typeof alertVariants>['variant']>
  children: React.ReactNode
  inline?: boolean
  dismissible?: boolean
  onDismiss?: () => void
  iconName?: (typeof iconNames)[number]
  useContainer?: boolean
}

const iconForVariant: Record<Variant, (typeof iconNames)[number] | undefined> =
  {
    default: 'info',
    success: 'check',
    error: 'circle-alert',
    warning: 'circle-alert',
    info: 'info',
    custom: undefined,
  }

export function Alert({
  variant = 'default',
  children,
  inline = false,
  dismissible = true,
  onDismiss,
  iconName,
  useContainer = false,
}: AlertProps) {
  const [isDismissing, setIsDismissing] = useState(false)
  const handleDismiss = () => {
    setIsDismissing(true)
    onDismiss?.()
  }
  const icon =
    variant === 'custom' && iconName ? iconName : iconForVariant[variant]
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
        isDismissing && 'opacity-0 transition-opacity duration-500'
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
