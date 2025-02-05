import { Logo } from '@/index'
import { WorkspaceSelector } from './WorkspaceSelector'
import { WorkspaceSelectorProps } from './types'
import { cn } from '@/lib/utils'

export interface MainViewProps extends WorkspaceSelectorProps {
  className?: string
}

export function MainView({ className, ...props }: MainViewProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <WorkspaceSelector {...props} />
    </div>
  )
}

MainView.displayName = 'Navbar.MainView'
