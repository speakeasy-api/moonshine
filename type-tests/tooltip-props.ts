import type * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { TooltipProps } from '@/components/Tooltip'

type RadixTooltipProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Root
>

const tooltipProps = {
  children: null,
  open: true,
  defaultOpen: false,
  onOpenChange: (open: boolean) => {
    void open
  },
  delayDuration: 700,
  disableHoverableContent: true,
} satisfies TooltipProps

const radixTooltipProps = tooltipProps satisfies RadixTooltipProps

void radixTooltipProps
