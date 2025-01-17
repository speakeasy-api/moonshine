// TODO: https://linear.app/speakeasy/issue/SXF-171/input-component
import { cn } from '@/lib/utils'
import { Icon } from '../Icon'
import { IconName } from '../Icon/names'
import { useCallback, useState } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  icon?: IconName
  multiline?: boolean
  className?: string
}

export function Input({
  value,
  onChange,
  placeholder,
  disabled,
  icon,
  multiline,
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
    onFocus: handleFocus,
    onBlur: handleBlur,
  } as const

  let element: React.ReactNode = (
    <input
      {...commonProps}
      {...props}
      className={cn(
        'bg-background placeholder:text-muted-foreground text-foreground w-full rounded-md py-2 text-sm shadow-sm outline-none placeholder:transition-colors placeholder:duration-500 disabled:cursor-not-allowed disabled:opacity-50',
        isFocused && 'placeholder:text-foreground'
      )}
    />
  )

  if (multiline) {
    element = (
      <textarea
        {...commonProps}
        {...props}
        cols={30}
        rows={10}
        className={cn(
          'bg-background placeholder:text-muted-foreground text-foreground my-2 max-h-60 min-h-16 w-full rounded-md px-3 py-3 text-sm shadow-sm outline-none placeholder:transition-colors placeholder:duration-500 disabled:cursor-not-allowed disabled:opacity-50',
          isFocused && 'placeholder:text-foreground'
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'border-input text-muted-foreground flex items-center gap-3 rounded-md border px-4 py-0.5 transition-colors duration-500',
        icon && 'px-3',
        isFocused && 'text-foreground border-indigo-700',
        className
      )}
    >
      {icon && <Icon name={icon} size="small" />}
      {element}
    </div>
  )
}
