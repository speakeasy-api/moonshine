// TODO: https://linear.app/speakeasy/issue/SXF-171/input-component
import { cn } from '@/lib/utils'
import { Icon } from '../Icon'
import { IconName } from '../Icon/names'
import { useCallback, useState } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  icon?: IconName
  multiline?: boolean
  error?: boolean
  className?: string
}

export function Input({
  value,
  onChange,
  placeholder,
  disabled,
  icon,
  multiline,
  error,
  className,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (props.onFocus) {
        props.onFocus(event)
      }
      setIsFocused(true)
    },
    [props.onFocus]
  )
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (props.onBlur) {
        props.onBlur(event)
      }
      setIsFocused(false)
    },
    [props.onBlur]
  )

  const commonProps = {
    value,
    onChange,
    placeholder,
    disabled,
  } as const

  let element: React.ReactNode = (
    <input
      {...commonProps}
      {...props}
      onFocus={onFocus}
      onBlur={onBlur}
      className={cn(
        'bg-surface-primary-default placeholder:text-placeholder text-default h-full w-full text-sm shadow-none outline-none disabled:cursor-not-allowed disabled:opacity-50',
        isFocused && 'placeholder:text-default'
      )}
    />
  )

  if (multiline) {
    element = (
      <textarea
        {...commonProps}
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        cols={30}
        rows={10}
        className={cn(
          'bg-surface-primary-default placeholder:text-placeholder text-default my-2 h-full max-h-60 min-h-16 w-full px-3 py-3 text-sm shadow-none outline-none disabled:cursor-not-allowed disabled:opacity-50',
          isFocused && 'placeholder:text-default'
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'bg-surface-primary-default border-input text-muted-foreground flex items-center gap-3 rounded-md border px-4 py-3',
        icon && 'px-3',
        isFocused && 'text-default border-focus',
        error && 'border-destructive-default',
        className
      )}
    >
      {icon && <Icon name={icon} size="small" />}
      {element}
    </div>
  )
}
