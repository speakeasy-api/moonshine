import type { Org, Workspace } from '@/types'

export interface WorkspaceSelectorProps {
  orgs: Org[]
  onSelect: (org: Org, workspace: Workspace) => void
}

export interface NavbarProps extends WorkspaceSelectorProps {
  /**
   * Called when the user clicks the home button.
   */
  onHomeNavigation?: () => void
}
