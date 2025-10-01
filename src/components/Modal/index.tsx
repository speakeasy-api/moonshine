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
import { Icon } from '../Icon'

export interface ModalProps {
  className?: string
}

export const Modal = ({ className }: ModalProps) => {
  const { screens, currentIndex, isOpen, close } = useModal()

  const currentScreen = screens[currentIndex]

  if (!isOpen) return null
  if (!currentScreen) return null

  const closable = currentScreen.closable

  return (
    <Dialog open={isOpen} onOpenChange={closable ? close : undefined}>
      <DialogPortal>
        <DialogOverlay className="bg-surface-secondary fixed h-screen w-screen opacity-85" />
        <DialogContent
          className={cn(
            'bg-surface-primary border-neutral-default fixed top-1/2 left-1/2 z-10 flex h-auto max-h-[85vh] min-h-[40vh] w-[90vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 overflow-y-auto rounded-md px-10 py-6 shadow-lg outline-none',
            className
          )}
        >
          {closable && (
            <DialogClose asChild>
              <button className="hover:bg-muted/40 border-neutral-softest absolute top-6 right-6 rounded-full border p-2">
                <Icon name="x" className="size-5 text-current" />
              </button>
            </DialogClose>
          )}
          {currentScreen.title && (
            <DialogTitle className="text-heading-lg">
              {currentScreen.title}
            </DialogTitle>
          )}
          <DialogDescription>{currentScreen.component}</DialogDescription>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
