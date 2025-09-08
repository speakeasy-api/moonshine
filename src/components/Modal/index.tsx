import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { useModal } from '@/hooks/useModal'
import { cn } from '@/lib/utils'
import { IconButton } from '@/components/IconButton'
import { Icon } from '../Icon'

export interface ModalProps {
  closable?: boolean
  className?: string
}

export const Modal = ({ closable = false, className }: ModalProps) => {
  const { screens, currentIndex, isOpen, close } = useModal()

  const currentScreen = screens[currentIndex]

  if (!isOpen) return null
  if (!currentScreen) return null

  return (
    <Dialog open={isOpen} onOpenChange={closable ? close : undefined}>
      <DialogPortal>
        <DialogOverlay className="bg-surface-secondary fixed h-screen w-screen opacity-85" />
        <DialogContent
          className={cn(
            'bg-surface-primary border-neutral-default fixed top-1/2 left-1/2 z-10 flex h-auto max-h-[85vh] min-h-[40vh] w-[90vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 overflow-y-auto rounded-md p-10 shadow-lg outline-none',
            className
          )}
        >
          {closable && (
            <DialogClose asChild>
              <IconButton
                variant="tertiary"
                icon={
                  <Icon
                    name="x"
                    className="text-neutral-default hover:text-neutral-default/80 size-7 focus:outline-none"
                  />
                }
                aria-label="Close modal"
                className="absolute top-4 right-4 focus:ring-0 focus:outline-none focus-visible:ring-0"
              />
            </DialogClose>
          )}
          {currentScreen.title && (
            <DialogTitle className="text-display-sm">
              {currentScreen.title}
            </DialogTitle>
          )}
          <DialogDescription>{currentScreen.component}</DialogDescription>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
