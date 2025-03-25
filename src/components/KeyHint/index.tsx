import { cn } from '@/lib/utils'
import { Icon } from '@/components/Icon'

type Modifier = 'shift' | 'ctrlorcommand' | 'alt' | 'meta' | 'esc'

function checkIsMac(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)
}

const modifierMap: Record<Modifier, string> = {
  shift: '⇧',
  ctrlorcommand: checkIsMac() ? '⌘' : 'Ctrl',
  alt: checkIsMac() ? '⌥' : 'Alt',
  meta: checkIsMac() ? '⌘' : 'Win',
  esc: 'Esc',
}

export function Key({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'from-background to-card text-foreground/70 dark:text-foreground rounded-lg border bg-gradient-to-br px-2 py-0.5 text-sm',
        className
      )}
    >
      {value}
    </span>
  )
}

interface KeyHintItemProps {
  modifiers: Modifier[]
  keys: string[]
  actionText?: string
}

function KeyHintKeys({ modifiers, keys }: KeyHintItemProps) {
  return (
    <div className="flex flex-row items-center gap-1">
      {modifiers.map((modifier, index) => (
        <>
          <Key value={modifierMap[modifier]} />
          {index < modifiers.length - 1 && (
            <span className="text-body-muted text-sm">+</span>
          )}
        </>
      ))}
      {keys.length > 0 && <span className="text-body-muted text-sm">+</span>}
      {keys.map((key, index) => (
        <>
          <Key value={key.toUpperCase()} />
          {index < keys.length - 1 && (
            <span className="text-body-muted text-sm">+</span>
          )}
        </>
      ))}
    </div>
  )
}

interface KeyHintProps extends React.HTMLAttributes<HTMLDivElement> {
  modifiers: Modifier[]
  keys: string[]
  actionText: string
  titleText?: string
  dismissable?: boolean
  onDismiss?: () => void
}

export function KeyHint({
  modifiers,
  keys,
  actionText,
  className,
  dismissable = true,
  onDismiss,
  titleText = 'Key hint',
  ...props
}: KeyHintProps) {
  return (
    <div
      className={cn(
        'inline-flex min-w-24 flex-col items-start gap-1 rounded-lg border text-base font-semibold tracking-tight text-black shadow-sm shadow-black/5 select-none dark:text-white dark:shadow-white/10',
        className
      )}
      {...props}
    >
      <div className="text-body-muted dark:text-body-muted/80 flex w-full flex-row items-center self-start border-b px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase select-none">
        <div>{titleText}</div>
        {dismissable && (
          <div
            className="hover:text-foreground ml-auto cursor-pointer"
            onClick={onDismiss}
            title="Close"
          >
            <Icon name="x" className="h-3.5 w-3.5" />
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-1 px-4 py-3.5">
        <KeyHintKeys modifiers={modifiers} keys={keys} />
        {actionText && (
          <div className="text-body-muted text-sm font-normal">
            {actionText}
          </div>
        )}
      </div>
    </div>
  )
}
